import { Menu, UserCircle } from 'lucide-react';

const Topbar = () => {
  return (
    <nav className="h-16 bg-blue-600 flex items-center justify-between px-6 shadow-md">
      <button className="text-white hover:bg-blue-700 p-2 rounded-full transition-colors">
        <Menu size={24} />
      </button>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <UserCircle size={32} />
          <span className="font-bold text-sm hidden sm:inline">LoL Human</span>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
