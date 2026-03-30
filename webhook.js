import http from 'http';
import https from 'https';
import crypto from 'crypto';
import { exec } from 'child_process';

// Tentative de chargement du fichier cache environnement (Natif Node.js v20.6+)
try { process.loadEnvFile('/var/www/portfolio_v3/.env'); } catch (e) { console.error("ERREUR ENV", e) }

// ============================================
// CONFIGURATION GLOBALE DYNAMIQUE
// ============================================
const PORT = process.env.PORT || 9001;
const SCRIPT_PATH = process.env.SCRIPT_PATH || '/var/www/portfolio_v3/deploy.sh';
const DEPLOY_SECRET = process.env.DEPLOY_SECRET || 'SecretDeSecours2026!';
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || 'Client_Id_Inconnu';
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || 'Secret_Github_Inconnu';


const server = http.createServer((req, res) => {
  // Autoriser Decap CMS depuis le navigateur à parler à notre API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-hub-signature-256, x-github-event');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  // ============================================
  // ROUTE 1 : DÉBUT DE CONNEXION GITHUB
  // ============================================
  if (req.url.startsWith('/oauth/auth')) {
    // Decap CMS veut se connecter : On le redirige vers l'interface de mot de passe Github
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&scope=repo`;
    res.writeHead(302, { Location: authUrl });
    return res.end();
  }

  // ============================================
  // ROUTE 2 : RETOUR DE GITHUB (CALLBACK)
  // ============================================
  if (req.url.startsWith('/oauth/callback')) {
    // L'utilisateur a dit "Oui" à Github, Github nous ramène ici avec un code temporaire
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const code = urlParams.get('code');

    if (!code) {
      res.writeHead(400);
      return res.end('Erreur : Code d\'autorisation Github manquant.');
    }

    // Notre serveur échange ce code public contre le vrai Token Secret de l'utilisateur
    const data = JSON.stringify({
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      code: code
    });

    const options = {
      hostname: 'github.com',
      port: 443,
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const githubReq = https.request(options, (githubRes) => {
      let body = '';
      githubRes.on('data', chunk => { body += chunk; });
      githubRes.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.error) {
            console.error('Erreur Github:', parsed);
            res.writeHead(400);
            return res.end(`Erreur d'autorisation: ${parsed.error_description || parsed.error}`);
          }
          
          const token = parsed.access_token;
          
          // Script Injection HTML exigé par Decap CMS ("PostMessage")
          const htmlResponse = `
            <!DOCTYPE html>
            <html>
            <head><title>Autorisation OK</title></head>
            <body>
              <p>Authentification reussie ! Vous pouvez fermer cette fenetre.</p>
              <script>
                function receiveMessage(e) {
                  if (e.data !== "authorizing:github") return;
                  // On renvoie le jeton à la fenetre parente Decap CMS !
                  window.opener.postMessage(
                    'authorization:github:success:{"token":"' + '${token}' + '", "provider":"github"}',
                    e.origin
                  );
                }
                window.addEventListener("message", receiveMessage, false);
                window.opener.postMessage("authorizing:github", "*");
              </script>
            </body>
            </html>
          `;

          res.writeHead(200, { 'Content-Type': 'text/html' });
          return res.end(htmlResponse);

        } catch (e) {
          console.error(e);
          res.writeHead(500);
          return res.end('Erreur serveur lors de la lecture du token GitHub.');
        }
      });
    });

    githubReq.on('error', (e) => {
      res.writeHead(500);
      return res.end('Impossible de se connecter a l API GitHub.');
    });

    githubReq.write(data);
    githubReq.end();
    return;
  }

  // ============================================
  // ROUTE 3 : WEBHOOK DE DÉPLOIEMENT
  // ============================================
  if (req.url === '/webhook-deploy') {
    if (req.method !== 'POST') {
      res.writeHead(405);
      return res.end('Methode non autorisee.');
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const signature = req.headers['x-hub-signature-256'];
      if (!signature) {
        res.writeHead(401);
        return res.end('Requete rejetee : signature manquante');
      }

      const hmac = crypto.createHmac('sha256', DEPLOY_SECRET);
      const expectedSignature = 'sha256=' + hmac.update(body).digest('hex');

      if (signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        res.writeHead(401);
        return res.end('Requete rejetee : signature invalide');
      }

      const event = req.headers['x-github-event'];
      if (event === 'ping') {
        res.writeHead(200);
        return res.end('PONG (Webhook operationnel)');
      }

      if (event === 'push') {
        console.log(`[${new Date().toISOString()}] Push detecte !! Lancement du deploiement Bash...`);
        res.writeHead(200);
        res.end('Deploiement lance en fond');

        exec(`bash ${SCRIPT_PATH}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Erreur deploiement: ${error.message}`);
          }
          console.log(`STDOUT:\n${stdout}`);
        });
      } else {
        res.writeHead(200);
        res.end('Evenement ignore');
      }
    });
    return;
  }

  // ======= ROUTE 404 =======
  res.writeHead(404);
  res.end('Cette route n existe pas sur notre Proxy (Port 9001).');
});

// Le serveur n'écoute que sur localhost (NGINX s'occupe de router les bonnes URL publiques vers lui)
server.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 Serveur Maestro (OAuth + Webhook) operationnel sur http://127.0.0.1:${PORT}`);
});
