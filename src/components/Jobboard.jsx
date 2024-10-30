import React, { useEffect, useState } from "react";

function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")  // Utilise l'URL de l'API pour récupérer les données
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Erreur lors de la récupération des offres :", error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Offres d'emploi</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index} className="border-b border-gray-200 p-2">
            <h3 className="font-semibold">{job.titre}</h3>
            <p>{job.entreprise}</p>
            <p>{job.location}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobBoard;
