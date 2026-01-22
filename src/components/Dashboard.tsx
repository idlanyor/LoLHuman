import { Download, User, ShoppingCart, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Visitor', value: 'Downloader', icon: <Download className="text-blue-600" size={32} />, label: 'Visitor' },
    { title: 'Visitor (Unique)', value: '0', icon: <User className="text-blue-600" size={32} />, label: 'Unique' },
    { title: 'Requests', value: '0', icon: <ShoppingCart className="text-blue-600" size={32} />, label: 'Requests' },
    { title: 'Requests (Today)', value: '0', icon: <Calendar className="text-blue-600" size={32} />, label: 'Today' },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-blue-600 font-bold text-lg mb-2">Daftar Usefull Api Roidev</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Ini adalah implementasi web dari fitur Bot Whatsapp{' '}
          <a href="https://t.me/LoLHumen" target="_blank" className="text-blue-600 hover:underline">
            Hinami Bot.
          </a>{' '}
          Yang menggunakan referensi API dari koleksi Public api{' '}
          <a href="https://api.lolhuman.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            LoL Human
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.title}</div>
              <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
