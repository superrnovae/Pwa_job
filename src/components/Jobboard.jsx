import React, { useEffect, useState } from "react";
import JobCard from "./JobCard"; 

function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")  
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Erreur lors de la récupération des offres :", error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Offres d'emploi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} /> 
        ))}
      </div>
    </div>
  );
}

export default JobBoard;
