#!/bin/bash
# Aller dans le répertoire du projet pour être sûr d'avoir les droits et variables
cd /root/portfolio_v3 || exit 1

# Récupérer les articles depuis GitHub
echo "Telechargement des modifications via git pull..."
git pull origin master

# Sécurité si de nouveaux paquets npm sont apparus
echo "Verification des dependances npm..."
npm install --legacy-peer-deps

# Recompilation de Nuxt Content
echo "Lancement de Nuxt Build..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Redémarrage propre sans interruption du trafic
echo "Redemarrage de l'application via PM2..."
pm2 reload portfolio-v3 --update-env

echo "✅ Deploiement 100% termine."
