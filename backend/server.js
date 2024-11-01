const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, "db", "data.json"); // Chemin absolu vers le fichier JSON

// Clés VAPID pour l'authentification des notifications push
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Vérification des clés VAPID
if (!publicVapidKey || !privateVapidKey) {
  console.error(
    "Les clés VAPID ne sont pas définies. Vérifiez votre fichier .env."
  );
  process.exit(1);
}

// Configuration des clés VAPID pour Web Push
webpush.setVapidDetails(
  "mailto:lozi.amina.sio@example.com",
  publicVapidKey,
  privateVapidKey
);

const subscribers = [];

app.get("/vapidPublicKey", (req, res) => {
  res.json({ publicVapidKey });
});

function readJobs() {
  try {
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data); // Renvoie directement l'objet JSON
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON :", error);
    return { jobs: [] }; // Retourne un tableau vide si la lecture échoue
  }
}

function writeJobs(jobs) {
  const data = { jobs };
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Erreur lors de l'écriture dans le fichier JSON :", error);
  }
}

app.get("/api/jobs", (req, res) => {
  const data = readJobs();
  res.json(data.jobs);
});

app.post("/api/jobs", (req, res) => {
  const newJob = req.body;
  const data = readJobs();
  data.jobs.push(newJob); // Ajoute l'offre au tableau d'emplois
  writeJobs(data.jobs); // Sauvegarde la nouvelle liste dans le fichier JSON

  // Envoie une notification pour la nouvelle offre
  sendNotification(newJob);
  res.status(201).json(newJob);
});

// Endpoint pour récupérer une offre spécifique par ID
app.get("/api/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id); 
  const data = readJobs(); 

  const job = data.jobs.find((job) => job.id === jobId);

  if (job) {
    res.json(job); 
  } else {
    res.status(404).json({ message: "Offre non trouvée" }); 
  }
});

// Endpoint pour enregistrer un abonné aux notifications
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  const isSubscribed = subscribers.some(
    (sub) => JSON.stringify(sub) === JSON.stringify(subscription)
  );
  if (!isSubscribed) {
    subscribers.push(subscription);
  }
  res.status(201).json({});
});

// Fonction pour envoyer des notifications push à tous les abonnés
function sendNotification(job) {
  const payload = JSON.stringify({
    title: "Nouvelle Offre d'Emploi",
    body: `Un nouvel emploi est disponible : ${job.titre} chez ${job.entreprise}`,
    icon: "/logo192.png",
    data: { id: job.id },
  });

  subscribers.forEach((subscription) => {
    webpush.sendNotification(subscription, payload).catch((error) => {
      console.error("Erreur lors de l'envoi de notification:", error);
    });
  });
}

// Démarrage du serveur
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
