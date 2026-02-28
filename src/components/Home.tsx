import React, { useEffect, useState } from 'react';
import { getKanataScraperAPI, GetApiServerinfo200 } from '../api/generated';
import { Server, Cpu, HardDrive, Activity, RefreshCw } from 'lucide-react';

const api = getKanataScraperAPI();

const Home = () => {
  const [info, setInfo] = useState<GetApiServerinfo200 | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const result = await api.getApiServerinfo();
      setInfo(result);
    } catch (err) {
      console.error('Failed to fetch server info', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    const interval = setInterval(fetchInfo, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Dashboard</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">System monitoring and server status</p>
        </div>
        <button 
          onClick={fetchInfo}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-white/5 rounded-xl transition-all shadow-lg"
          title="Refresh"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin text-blue-400' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Platform Card */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-white/5 flex items-center gap-4 group hover:border-blue-500/30 transition-all">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
            <Server size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform</div>
            <div className="text-lg font-bold text-slate-100">{info?.platform || '...'}</div>
          </div>
        </div>

        {/* Uptime Card */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-white/5 flex items-center gap-4 group hover:border-emerald-500/30 transition-all">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Uptime</div>
            <div className="text-lg font-bold text-slate-100">{info?.uptime || '...'}</div>
          </div>
        </div>

        {/* Memory Card */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-white/5 flex items-center gap-4 group hover:border-orange-500/30 transition-all">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl group-hover:scale-110 transition-transform">
            <HardDrive size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Memory Usage</div>
            <div className="text-lg font-bold text-slate-100">{(info?.memory as any)?.percentage || '...'}</div>
          </div>
        </div>

        {/* CPU Card */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-white/5 flex items-center gap-4 group hover:border-purple-500/30 transition-all">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
            <Cpu size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CPU Cores</div>
            <div className="text-lg font-bold text-slate-100">{(info?.cpu as any)?.cores || '...'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Detailed Memory Info */}
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 font-bold text-xs uppercase tracking-widest text-slate-400 bg-white/5">Memory Details</div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Total Memory</span>
              <span className="font-mono font-bold text-slate-200">{(info?.memory as any)?.total || '-'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Used Memory</span>
              <span className="font-mono font-bold text-rose-400">{(info?.memory as any)?.used || '-'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Free Memory</span>
              <span className="font-mono font-bold text-emerald-400">{(info?.memory as any)?.free || '-'}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full mt-6 overflow-hidden border border-white/5">
                <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                    style={{ width: (info?.memory as any)?.percentage || '0%' }}
                ></div>
            </div>
          </div>
        </div>

        {/* CPU Info */}
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 font-bold text-xs uppercase tracking-widest text-slate-400 bg-white/5">Processor Info</div>
          <div className="p-6 space-y-6">
            <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Model</div>
                <div className="text-slate-200 font-bold bg-slate-800/50 p-3 rounded-xl border border-white/5">{(info?.cpu as any)?.model || 'Unknown'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">Speed</div>
                    <div className="text-slate-200 font-bold font-mono">{(info?.cpu as any)?.speed || 0} MHz</div>
                </div>
                <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">OS Release</div>
                    <div className="text-slate-200 font-bold font-mono">{info?.release || 'Unknown'}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
