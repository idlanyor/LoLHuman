import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-6 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <div className="text-slate-500 mb-4 text-[10px] font-bold uppercase tracking-[0.2em]">Developer</div>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://trakteer.id/Kanata" 
            target="_blank" 
            className="flex items-center px-4 py-2 bg-slate-900 text-slate-300 border border-white/10 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg"
          >
            <Github size={14} className="mr-2" />
            Roynaldi
          </a>
          <a 
            href="https://paypal.me/Kanata" 
            target="_blank" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            <Github size={14} className="mr-2" />
            Kanata
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
