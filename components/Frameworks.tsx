
import React from 'react';
import { Framework } from '../types';
// Fixed missing 'Plus' icon import
import { Layout, Check, ShieldCheck, Plus } from 'lucide-react';

interface FrameworksProps {
  frameworks: Framework[];
  onUpdate: (updated: Framework[]) => void;
}

const Frameworks: React.FC<FrameworksProps> = ({ frameworks, onUpdate }) => {
  const toggleFramework = (id: string) => {
    onUpdate(frameworks.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  return (
    <div className="space-y-8">
      <div className="bg-indigo-900 text-white p-8 rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl font-serif">Structural Frameworks</h2>
          <p className="text-indigo-100/70 max-w-xl">
            Applying structural lenses to your research ensures that synthesized ideas adhere to specific intellectual paradigms or methodologies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map(f => (
          <button
            key={f.id}
            onClick={() => toggleFramework(f.id)}
            className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col justify-between h-48 group ${
              f.active 
                ? 'bg-indigo-50 border-indigo-600 shadow-md ring-1 ring-indigo-600' 
                : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Layout className={`w-6 h-6 ${f.active ? 'text-indigo-600' : 'text-slate-400'}`} />
                {f.active && <ShieldCheck className="w-5 h-5 text-indigo-600" />}
              </div>
              <h3 className={`text-lg font-bold ${f.active ? 'text-slate-900' : 'text-slate-700'}`}>{f.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{f.description}</p>
            </div>
            
            <div className={`mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${f.active ? 'text-indigo-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {f.active ? (
                <><Check className="w-3 h-3" /> Framework Active</>
              ) : (
                'Click to Activate'
              )}
            </div>
          </button>
        ))}
        
        <button 
          onClick={() => {
            const name = prompt("Framework Name?");
            const desc = prompt("Description?");
            if (name && desc) {
              onUpdate([...frameworks, { id: Math.random().toString(), name, description: desc, active: false }]);
            }
          }}
          className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all flex flex-col items-center justify-center gap-3 bg-slate-50/50"
        >
          <Plus className="w-8 h-8 opacity-20" />
          <span className="font-bold text-sm uppercase tracking-widest">Custom Template</span>
        </button>
      </div>
    </div>
  );
};

export default Frameworks;
