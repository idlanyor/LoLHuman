import React from 'react';
import EndpointViewer from './EndpointViewer';
import { useApiDoc } from '../../context/ApiDocContext';
import { BookOpen, Loader2 } from 'lucide-react';

const ApiDocs: React.FC = () => {
  const { activeOp, loading } = useApiDoc();

  if (loading) {
    return (
        <div className="flex items-center justify-center h-full bg-slate-950">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                <h2 className="text-slate-400 font-bold uppercase text-xs tracking-widest">Loading API Reference...</h2>
            </div>
        </div>
    );
  }

  if (!activeOp) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center h-full text-slate-600 bg-slate-950">
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <BookOpen size={64} className="mb-6 text-slate-800" />
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Select an endpoint from the sidebar</p>
            </div>
        </div>
      );
  }

  return (
    <div className="h-full overflow-hidden bg-slate-950">
        <EndpointViewer operation={activeOp} />
    </div>
  );
};

export default ApiDocs;