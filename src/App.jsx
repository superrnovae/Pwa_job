import "./App.css";
import JobBoard from "./components/Jobboard";
import Navbar from "./components/Navbar";
import NotificationsButton from "./components/NotificationsButton";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bienvenue sur JobBoard</h1>
      </div>
      <div className="p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex gap-6 justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon Logo"
              width="100"
            />
          </div>
        </div>
      </div>
      <JobBoard />
    </div>
  );
}

export default App;
