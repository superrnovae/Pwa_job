function JobCard({ job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-2 text-red-700">{job.title}</h2>
      <h3 className="text-lg text-gray-700 mb-2">{job.company}</h3>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="text-gray-600">{job.description}</p>
    </div>
  );
}

export default JobCard;
