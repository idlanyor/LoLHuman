import React, { useState } from 'react';
import { ApiOperation } from '../../lib/swagger';
import { Play, Copy, Check, Server } from 'lucide-react';
import axios from 'axios';

interface EndpointViewerProps {
  operation: ApiOperation;
}

const methodColors: Record<string, string> = {
  get: 'bg-blue-600',
  post: 'bg-green-600',
  put: 'bg-orange-600',
  delete: 'bg-red-600',
};

const EndpointViewer: React.FC<EndpointViewerProps> = ({ operation }) => {
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [requestBody, setRequestBody] = useState<string>('');

  // Initialize request body example if available
  React.useEffect(() => {
    setResponse(null);
    setParams({});
    if (operation.requestBody?.content?.['application/json']?.example) {
      setRequestBody(JSON.stringify(operation.requestBody.content['application/json'].example, null, 2));
    } else {
        setRequestBody('');
    }
  }, [operation]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + operation.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    try {
      let url = operation.path;
      
      // Replace path params
      Object.keys(params).forEach(key => {
        if (operation.path.includes(`{${key}}`)) {
          url = url.replace(`{${key}}`, params[key]);
        }
      });

      // Prepare payload
      let dataPayload = undefined;
      if (['post', 'put'].includes(operation.method) && requestBody) {
        try {
            dataPayload = JSON.parse(requestBody);
        } catch (e) {
            alert('Invalid JSON Body');
            setLoading(false);
            return;
        }
      }

      const res = await axios({
        method: operation.method,
        url,
        data: dataPayload,
        params: Object.keys(params).reduce((acc, key) => {
            // Include only query params here, not path params
            if (!operation.path.includes(`{${key}}`)) {
                acc[key] = params[key];
            }
            return acc;
        }, {} as any)
      });
      setResponse(res.data);
    } catch (err: any) {
      setResponse(err.response?.data || { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const parameters = operation.parameters || [];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 scrollbar-hide">
      <div className="max-w-4xl mx-auto p-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className={`${methodColors[operation.method] || 'bg-slate-600'} text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg`}>
              {operation.method}
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">{operation.summary || operation.operationId}</h1>
          </div>
          
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-xl backdrop-blur-sm">
            <code className="text-blue-400 font-mono text-sm font-bold">{operation.path}</code>
            <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
              {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
            </button>
          </div>

          <p className="mt-6 text-slate-400 leading-relaxed font-medium">{operation.description}</p>
        </div>

        {/* Parameters */}
        {parameters.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-800"></span>
                Parameters
            </h3>
            <div className="space-y-4">
              {parameters.map((param: any) => (
                <div key={param.name} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 transition-all shadow-xl group">
                  <div className="md:col-span-1">
                    <div className="font-mono text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{param.name}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase mt-2 tracking-widest bg-white/5 inline-block px-2 py-0.5 rounded-md">{param.in} • {param.required ? 'Required' : 'Optional'}</div>
                  </div>
                  <div className="md:col-span-2 text-sm text-slate-400 font-medium leading-relaxed">
                    {param.description}
                  </div>
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      placeholder="Value"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
                      onChange={(e) => setParams(p => ({ ...p, [param.name]: e.target.value }))}
                      value={params[param.name] || ''}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request Body */}
        {operation.requestBody && (
          <div className="mb-12">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-800"></span>
                Request Body
            </h3>
            <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">JSON Payload</span>
                </div>
                <textarea
                    className="w-full h-64 font-mono text-sm bg-slate-900 text-blue-300 p-6 focus:outline-none scrollbar-hide resize-none"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                />
            </div>
          </div>
        )}

        {/* Try It Out */}
        <div className="mb-12 flex justify-center">
          <button
            onClick={handleExecute}
            disabled={loading}
            className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-500 transition-all disabled:opacity-50 shadow-xl shadow-blue-600/20 active:scale-95 group"
          >
            {loading ? <Server className="animate-pulse" size={18} /> : <Play size={18} className="group-hover:fill-current" />}
            {loading ? 'Executing...' : 'Execute Request'}
          </button>
        </div>

        {/* Response */}
        {response && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-12">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-800"></span>
                Response Output
                <span className="ml-auto text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">200 OK</span>
            </h3>
            <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">application/json</span>
                    <button className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Copy Result</button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm font-mono text-blue-200 scrollbar-hide leading-relaxed">
                    {JSON.stringify(response, null, 2)}
                </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EndpointViewer;