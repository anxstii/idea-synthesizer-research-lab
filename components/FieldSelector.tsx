
import React, { useState } from 'react';
import { ACADEMIC_FIELDS } from '../constants';
import { Plus, X, Search } from 'lucide-react';

interface FieldSelectorProps {
  selectedFields: string[];
  onChange: (fields: string[]) => void;
}

const FieldSelector: React.FC<FieldSelectorProps> = ({ selectedFields, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customField, setCustomField] = useState('');

  const toggleField = (fieldName: string) => {
    if (selectedFields.includes(fieldName)) {
      onChange(selectedFields.filter(f => f !== fieldName));
    } else {
      onChange([...selectedFields, fieldName]);
    }
  };

  const addCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (customField.trim() && !selectedFields.includes(customField.trim())) {
      onChange([...selectedFields, customField.trim()]);
      setCustomField('');
    }
  };

  const filteredPresets = ACADEMIC_FIELDS.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 min-h-[48px] p-3 border border-slate-200 rounded-xl bg-white/50">
        {selectedFields.length === 0 && (
          <span className="text-slate-400 text-sm py-1">Select fields below or add your own...</span>
        )}
        {selectedFields.map(field => (
          <span 
            key={field} 
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 animate-in fade-in zoom-in duration-200"
          >
            {field}
            <button 
              onClick={() => toggleField(field)}
              className="hover:text-indigo-900 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter preset fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 scrollbar-thin">
            {filteredPresets.map(field => (
              <button
                key={field.name}
                onClick={() => toggleField(field.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedFields.includes(field.name)
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
              >
                {field.icon}
                {field.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={addCustomField} className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Add Custom Field</label>
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="e.g. Quantum Archaeology"
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
              className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button 
              type="submit"
              className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldSelector;
