const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = './db/data.json'; // Chemin vers le fichier JSON contenant les offres

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Clés VAPID pour l'authentification des notifications push
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:lozi.amina.sio@gmail.com', // Remplacez par votre adresse e-mail
  publicVapidKey,
  privateVapidKey
);

let subscribers = []; // Liste des abonnés aux notifications push

// Fonction pour lire les données du fichier JSON
function readJobs() {
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data).jobs;
}

// Fonction pour écrire les données dans le fichier JSON
function writeJobs(jobs) {
  const data = { jobs };
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html')); 
});

// Endpoint pour récupérer les offres d'emploi
app.get('/api/jobs', (req, res) => {
  const jobs = readJobs();
  res.json(jobs);
});

// Endpoint pour ajouter une nouvelle offre d'emploi
app.post('/api/jobs', (req, res) => {
  const newJob = req.body;
  const jobs = readJobs();
  jobs.push(newJob);
  writeJobs(jobs); // Sauvegarder la nouvelle offre dans le fichier JSON
  sendNotification(newJob); // Envoie une notification pour la nouvelle offre
  res.status(201).json(newJob);
});

// Endpoint pour enregistrer un abonné aux notifications
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscribers.push(subscription);
  res.status(201).json({});
});

// Fonction pour envoyer des notifications push à tous les abonnés
function sendNotification(job) {
  const payload = JSON.stringify({
    title: 'Nouvelle Offre d\'Emploi',
    body: `Un nouvel emploi est disponible : ${job.title} chez ${job.name}`,
    data: job
  });

  subscribers.forEach(subscription => {
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error('Erreur lors de l\'envoi de notification:', error);
    });
  });
}

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
