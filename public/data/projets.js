const projets = [
  {
    id: 2,
    title: "My Daily Tracking",
    description:
      "Application de suivi quotidien pour organiser et améliorer vos habitudes.",
    longDescription:
      "Application web complète de suivi d'habitudes permettant de créer, suivre et visualiser ses habitudes quotidiennes. L'objectif : rendre la progression visible pour rester motivé sur le long terme.",
    image: "mydt.png",
    stack: ["Vue.js", "Nuxt", "TailwindCSS", "Node.js"],
    features: [
      "Création et gestion d'habitudes personnalisées",
      "Suivi quotidien avec historique",
      "Visualisation de la progression",
      "Interface responsive",
    ],
    link: "https://mdt.nocteln.fr",
    link2: "https://github.com/Nocteln/habit-tracker",
  },
  {
    id: 3,
    title: "Site nike",
    description: "site vitrine fictif de vente de chaussures",
    longDescription:
      "Site vitrine fictif inspiré de Nike, réalisé pour m'entraîner à intégrer une maquette moderne avec des animations et un design soigné.",
    image: "nike.jpg",
    stack: ["React", "TailwindCSS"],
    features: [
      "Intégration fidèle d'une maquette moderne",
      "Design responsive mobile-first",
      "Composants réutilisables",
    ],
    link: "https://nike-practice-01.netlify.app",
    link2: "https://github.com/Nocteln/nike_app",
  },
  {
    id: 1,
    title: "Ancien portfolio",
    description: "Mon ancien portfolio, développé avec ReactJS",
    longDescription:
      "Mon premier portfolio personnel, développé avec ReactJS. Il m'a permis d'apprendre les bases du développement front-end moderne : composants, routing et déploiement.",
    image: "/ancienSite.png",
    stack: ["React", "CSS"],
    features: [
      "Présentation de mes projets et compétences",
      "Navigation entre plusieurs pages",
      "Formulaire de contact",
    ],
    link2: "https://github.com/Nocteln/site-perso",
  },
  {
    id: 5,
    title: "crf-stocks",
    description:
      "PWA de gestion d'inventaire du matériel de secourisme, utilisée en production par une unité locale de la Croix-Rouge française.",
    longDescription:
      "PWA de gestion d'inventaire du matériel de secourisme pour une unité locale de la Croix-Rouge française, utilisée en production. Après chaque poste de secours, les réponses du Google Form de consommation décrémentent automatiquement la réserve : le stock n'est jamais modifié directement, toute écriture passe par un journal de mouvements auditable (append-only) et des triggers Postgres. Les ruptures de stock et péremptions proches remontent en alertes sur la page d'accueil. Sécurité : Row Level Security sur toutes les tables, route API protégée par secret partagé, RPC en SECURITY DEFINER, audits réguliers avant chaque release — assistés par des subagents Claude Code spécialisés que j'ai configurés (audit, correction, chasse aux bugs). App interne, pas de lien public.",
    image: "stockcrf.png",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "PWA",
      "Google Apps Script",
    ],
    features: [
      "Utilisée en production par l'unité locale",
      "Pipeline Google Form → API sécurisée → décrément automatique du stock",
      "Journal de mouvements append-only : le client ne touche jamais le stock directement",
      "Alertes de rupture de stock et de péremption",
      "Row Level Security sur toutes les tables, audits de sécurité avant chaque release",
      "Développement assisté par des subagents Claude Code spécialisés (audit, fix, bug-hunt)",
    ],
  },
  {
    id: 4,
    title: "Blackout",
    description: "Projet d'école, jeu vidéo fait avec unity",
    longDescription:
      "Jeu vidéo développé en équipe dans le cadre d'un projet d'école. Travail collaboratif avec Git au sein d'une organisation GitHub, gestion du gameplay et des mécaniques de jeu sous Unity. Le projet inclut aussi un site vitrine développé avec Nuxt et TailwindCSS pour présenter le jeu.",
    image: "/winterArchitect.png",
    stack: ["Unity", "C#", "Git", "Nuxt", "Vue.js", "TailwindCSS"],
    features: [
      "Développement en équipe (organisation GitHub)",
      "Mécaniques de gameplay sous Unity",
      "Site vitrine du jeu en Nuxt + TailwindCSS",
      "Déployé sur Netlify",
    ],
    link: "https://winter-architect.netlify.app",
    link2: "https://github.com/orgs/Winter-Architect/repositories",
  },
];

export default projets;
