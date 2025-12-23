
import React, { useState } from 'react';
import { Bookmark, Resource } from '../types';
import { Book, ChevronRight, FileText, Link as LinkIcon, Plus, Trash2, X, ExternalLink } from 'lucide-react';

interface LabJournalProps {
  bookmarks: Bookmark[];
  onUpdate: (updated: Bookmark[]) => void;
}

const LabJournal: React.FC<LabJournalProps> = ({ bookmarks, onUpdate }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIdea = bookmarks.find(b => b.id === selectedId);

  const updateNotes = (notes: string) => {
    const updated = bookmarks.map(b => b.id === selectedId ? { ...b, notes } : b);
    onUpdate(updated);
  };

  const addResource = (name: string, url: string) => {
    const resource: Resource = { id: Math.random().toString(), name, url, type: 'link' };
    const updated = bookmarks.map(b => b.id === selectedId ? { ...b, resources: [...b.resources, resource] } : b);
    onUpdate(updated);
  };

  const removeResource = (resId: string) => {
    const updated = bookmarks.map(b => b.id === selectedId ? { ...b, resources: b.resources.filter(r => r.id !== resId) } : b);
    onUpdate(updated);
  };

  const removeBookmark = (id: string) => {
    onUpdate(bookmarks.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[70vh]">
      {/* Sidebar List */}
      <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Book className="w-4 h-4 text-indigo-500" />
            Saved Inquiries
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {bookmarks.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No bookmarks yet.</div>
          ) : (
            bookmarks.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`w-full p-4 text-left border-b border-slate-100 transition-all hover:bg-slate-50 flex items-center justify-between group ${selectedId === b.id ? 'bg-indigo-50 border-r-4 border-r-indigo-500' : ''}`}
              >
                <div className="truncate">
                  <div className="text-sm font-semibold text-slate-900 truncate">{b.title}</div>
                  <div className="text-xs text-slate-500">{new Date(b.timestamp).toLocaleDateString()}</div>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors ${selectedId === b.id ? 'text-indigo-500' : ''}`} />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail View */}
      <div className="md:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
        {selectedIdea ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-serif text-slate-900">{selectedIdea.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedIdea.core_question}</p>
              </div>
              <button onClick={() => removeBookmark(selectedIdea.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Notes Area */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Journal Notes
                </label>
                <textarea
                  value={selectedIdea.notes}
                  onChange={(e) => updateNotes(e.target.value)}
                  placeholder="Record your findings, hypotheses, or external references here..."
                  className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-slate-700 resize-none leading-relaxed"
                />
              </div>

              {/* Resources Area */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <LinkIcon className="w-3 h-3" />
                    External Resources
                  </label>
                  <button 
                    onClick={() => {
                      const name = prompt("Resource Name?");
                      const url = prompt("URL?");
                      if (name && url) addResource(name, url);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Link
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedIdea.resources.map(res => (
                    <div key={res.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 group">
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-600 transition-colors truncate">
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        {res.name}
                      </a>
                      <button onClick={() => removeResource(res.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedIdea.resources.length === 0 && (
                    <div className="col-span-full py-4 text-center border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-xs">
                      No external resources linked.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 text-center space-y-4">
            <Book className="w-12 h-12 opacity-20" />
            <p>Select an inquiry from the sidebar to view details and add notes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabJournal;
