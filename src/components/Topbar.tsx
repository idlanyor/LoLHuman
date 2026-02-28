import { Menu, UserCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/5 shadow-lg relative z-20 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
          <Menu size={22} />
        </button>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Kanata API</span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Control Panel</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-slate-200 dark:border-white/10"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          Server Online
        </div>
        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-white/10 overflow-hidden">
            <UserCircle size={24} className="text-slate-500 dark:text-slate-400" />
          </div>
          <span className="font-bold text-sm hidden sm:inline">Kanata</span>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;