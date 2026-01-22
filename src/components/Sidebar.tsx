import { Home, Moon, Download, Info, School, Tv, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    {
      id: 'islami',
      title: 'Islami',
      icon: <Moon size={20} />,
      items: ['Asmaul Husna', 'Audio Ayat', 'Audio Surah', 'Ayat Al - Quran', 'Jadwal Shalat', 'Kisah Nabi', 'Niat Sholat', 'Surah Al - Quran']
    },
    {
      id: 'download',
      title: 'Downloader',
      icon: <Download size={20} />,
      items: ['Youtube', 'Facebook', 'Instagram', 'JOOX', 'Mediafire', 'Tiktok noWM', 'Tiktok Audio', 'X(Twitter)']
    },
    {
      id: 'informasi',
      title: 'Informasi',
      icon: <Info size={20} />,
      items: ['Cuaca (by Kota)', 'Cuaca (by Long&Lat)', 'Jadwal Bola', 'Jadwal TV(by Channel)', 'Translate', 'Lirik Lagu', 'Chord Lagu']
    },
    {
      id: 'edukasi',
      title: 'Edukasi',
      icon: <School size={20} />,
      items: ['Brainly', 'KBBI', 'Roboguru', 'Wikipedia', 'Translate']
    },
    {
      id: 'wibu',
      title: 'Anime & TV',
      icon: <Tv size={20} />,
      items: ['Anime Search', 'Manga Search', 'Character Search', 'Anime News']
    },
    {
      id: 'kreasi',
      title: 'Kreasi Gambar',
      icon: <ImageIcon size={20} />,
      items: ['Text to Image', 'Meme Maker', 'Filter Image']
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen flex flex-col">
      <div className="p-6 flex items-center justify-center border-b border-gray-100">
        <span className="text-blue-600 text-3xl font-bold">😊</span>
        <div className="ml-3 text-lg font-bold text-gray-800 uppercase tracking-wider">RoiDev Tools</div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-6 py-2">
          <a href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Home size={20} className="mr-3" />
            <span className="font-medium">Home</span>
          </a>
        </div>
        
        <div className="px-6 py-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Fitur</div>
          
          <ul className="space-y-1">
            {menuItems.map((menu) => (
              <li key={menu.id}>
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className="w-full flex items-center justify-between py-2 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <div className="flex items-center">
                    <span className="mr-3 group-hover:scale-110 transition-transform">{menu.icon}</span>
                    <span className="font-medium">{menu.title}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${openMenus[menu.id] ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {openMenus[menu.id] && (
                  <ul className="ml-8 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                    {menu.items.map((item) => (
                      <li key={item}>
                        <a href="#" className="block py-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
