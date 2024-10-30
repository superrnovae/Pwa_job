function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a href="#" className="flex items-center py-5 px-2 text-gray-700">
                <span className="font-bold">Mustapha JobBoard</span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button className="relative py-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Notifications
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
