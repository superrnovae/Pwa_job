import React, { useEffect, useState } from "react";
import JobCard from "./JobCard"; 
import { useNavigate } from "react-router";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")  
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Erreur lors de la récupération des offres :", error));
  }, []);

  return (
    <div className="mx-4 pb-20">
      <h2 className="text-xl font-bold mb-4 mt-5 lg:mt-10 lg:text-2xl">Offres d'emploi</h2>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500">
          Pas d'offres pour l'instant
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 hover:cursor-pointer">
          {jobs.map((job, index) => (
          <JobCard key={index} job={job} onClick={() => { console.log("click"); navigate(`/offre/${job.id}`)} } /> 
        ))}
        </div>
      )}
    </div>
  );
}

export default JobBoard;
