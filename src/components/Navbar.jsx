import NotificationsButton from "./NotificationsButton";
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
            <NotificationsButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
