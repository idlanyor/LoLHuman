import { Home, Moon, Download, Info, School, Tv, Image as ImageIcon, ChevronDown, Code, FileJson, LayoutDashboard, Zap } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApiDoc } from '../context/ApiDocContext';
import { ApiOperation } from '../lib/swagger';

const Sidebar = () => {
  const { groups, activeOp, setActiveOp } = useApiDoc();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({ 'Otakudesu': true });
  const navigate = useNavigate();

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleOpClick = (op: ApiOperation) => {
    setActiveOp(op);
    navigate('/docs');
  };

  const handleHomeClick = () => {
    setActiveOp(null as any);
  };

  const methodColors: Record<string, string> = {
    get: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    post: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    put: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    delete: 'text-rose-500 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="w-72 bg-white dark:bg-slate-950 h-full flex flex-col border-r border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden relative transition-colors duration-300">
      {/* Brand Logo */}
      <div className="p-8 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <Zap size={22} className="text-white fill-white" />
        </div>
        <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Kanata</span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">API Platform</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
        
        {/* Dashboard Group */}
        <div>
            <div className="px-4 mb-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Main Menu</div>
            <div className="space-y-1">
                <NavLink
                    to="/"
                    onClick={handleHomeClick}
                    className={({ isActive }) => `flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 active-glow' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                    <LayoutDashboard size={20} className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${location.pathname === '/' ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
                    <span className="font-semibold text-sm">Dashboard</span>
                </NavLink>
            </div>
        </div>
        
        {/* Dynamic API Documentation Section */}
        <div>
          <div className="px-4 mb-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
             API Reference
          </div>
          
          <ul className="space-y-2">
            {groups.map((group) => (
              <li key={group.name} className="space-y-1">
                <button
                  onClick={() => toggleMenu(group.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    openMenus[group.name] ? 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${openMenus[group.name] ? 'bg-blue-500/10 dark:bg-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                        <FileJson size={16} className={openMenus[group.name] ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} />
                    </div>
                    <span className="font-semibold text-sm">{group.name}</span>
                  </div>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${openMenus[group.name] ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-600'}`} 
                  />
                </button>
                
                {openMenus[group.name] && (
                  <ul className="mt-1 space-y-1 ml-4 border-l border-slate-200 dark:border-slate-800 pl-4 py-1">
                    {group.operations.map((op: ApiOperation) => {
                       const isActive = activeOp?.operationId === op.operationId && activeOp?.path === op.path;
                       return (
                        <li key={`${op.method}-${op.path}`}>
                            <button 
                                onClick={() => handleOpClick(op)}
                                className={`text-left flex items-center px-3 py-2 rounded-lg text-[13px] transition-all duration-200 w-full group relative ${
                                    isActive 
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-500/20' 
                                        : 'text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                                }`}
                            >
                                <span className={`uppercase text-[9px] font-black px-1.5 py-0.5 rounded border mr-2.5 transition-colors ${methodColors[op.method] || 'text-slate-400 border-slate-300 dark:border-slate-700'}`}>
                                    {op.method}
                                </span>
                                <span className="truncate flex-1">{op.summary || op.path}</span>
                                {isActive && <div className="absolute right-3 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full shadow-lg dark:shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>}
                            </button>
                        </li>
                       )
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* System Info / Bottom area */}
        <div className="pt-4 mt-auto">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">System Status</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 dark:text-slate-500 uppercase font-medium">API Latency</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">12ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 dark:text-slate-500 uppercase font-medium">Uptime</span>
                        <span className="text-slate-600 dark:text-slate-300 font-mono italic">99.9%</span>
                    </div>
                </div>
            </div>
        </div>

      </nav>

      {/* Subtle bottom decoration */}
      <div className="h-1 bg-gradient-to-r from-blue-600/50 via-indigo-500/50 to-purple-500/50"></div>
    </div>
  );
};

export default Sidebar;