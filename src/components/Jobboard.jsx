import JobCard from "./Jobcard";

const jobs = [
  {
    id: 1,
    title: "Développeur Frontend",
    company: "TechCorp",
    location: "Paris",
    description: "Développer des interfaces utilisateur modernes.",
  },
  {
    id: 2,
    title: "Développeur Backend",
    company: "Innovatech",
    location: "Lyon",
    description: "Travailler sur des API robustes et évolutives.",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Marseille",
    description: "Analyser des données complexes pour des insights.",
  },
];

function JobBoard() {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobBoard;
