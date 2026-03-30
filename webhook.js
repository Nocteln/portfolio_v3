const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

// Remplacez par une phrase secrète complexe que vous renseignerez aussi sur GitHub.
const SECRET = 'MiiaEtLaSecuriteDesWriteups2026';
const PORT = process.env.PORT || 9001;
const SCRIPT_PATH = './deploy.sh';

const server = http.createServer((req, res) => {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // Rejetez tout ce qui n'est pas un POST (webhook)
    if (req.method !== 'POST') {
      res.writeHead(405);
      return res.end('Method Not Allowed');
    }

    // GitHub signe cryptographiquement le "body" et met la signature dans le header
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
      res.writeHead(401);
      return res.end('Aucune signature GitHub detectee');
    }

    // Fabriquer notre propre signature avec le Secret
    const hmac = crypto.createHmac('sha256', SECRET);
    const expectedSignature = 'sha256=' + hmac.update(body).digest('hex');

    // Comparer les deux (on utilise timingSafeEqual pour éviter les attaques temporelles)
    if (signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      console.log('Tentative d intrusion refusee sur le Webhook');
      res.writeHead(401);
      return res.end('Signature invalide');
    }

    // 🔒 SI ON ARRIVE LÀ, C'EST QUE GITHUB ET LE SECRET SONT 100% VALIDES 🔒
    
    const event = req.headers['x-github-event'];
    
    // Le ping initial de config GitHub
    if (event === 'ping') {
      res.writeHead(200);
      return res.end('PONG (Configuration reussie!)');
    }

    // Lorsqu'un article est ajouté (ou tout autre push)
    if (event === 'push') {
      console.log(`[${new Date().toISOString()}] Push sur GitHub detecte. Lancement de deploy.sh...`);
      
      // On répond OK immédiatement à GitHub pour ne pas qu'il fasse de Timeout (le build prend du temps)
      res.writeHead(200);
      res.end('Deploiement lance sur le VPS');

      // On lance silencieusement la commande bash
      exec(`bash ${SCRIPT_PATH}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur critique de deploiment: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Alertes (stderr): ${stderr}`);
        }
        console.log(`Resultat de la compilation Nuxt:\n${stdout}`);
      });
    } else {
      res.writeHead(200);
      res.end('Evenement ignore (seuls les "push" relancent le site)');
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serveur Webhook operationnel sur http://127.0.0.1:${PORT}`);
  console.log(`Secret en attente : ${SECRET}`);
});
