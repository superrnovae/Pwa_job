function JobCard({ job, onClick }) {

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 shadow hover:shadow-lg transition-shadow duration-200" onClick={onClick}>
      <h2 className="text-lg font-semibold mb-1 text-blue-700">{job.titre}</h2>
      <h3 className="text-md text-gray-600 mb-1">{job.entreprise}</h3>
      <p className="text-sm text-gray-500 mb-1">{job.location}</p>
      <p className="text-sm text-gray-600">{job.description}</p>
    </div>
  );
}

export default JobCard;
