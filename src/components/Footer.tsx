import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <div className="text-gray-600 mb-4 font-medium">Developer</div>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://trakteer.id/LoLHuman" 
            target="_blank" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Github size={16} className="mr-2" />
            Roynaldi
          </a>
          <a 
            href="https://paypal.me/LoLHuman" 
            target="_blank" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Github size={16} className="mr-2" />
            LolHuman
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
