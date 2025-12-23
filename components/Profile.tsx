
import React, { useRef, useState } from 'react';
import { UserProfile } from '../types';
import { Camera, User, Tag, Plus, X, Check } from 'lucide-react';

interface ProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !profile.interests.includes(trimmed)) {
      onUpdate({ ...profile, interests: [...profile.interests, trimmed] });
      setNewInterest('');
      setIsAddingInterest(false);
    }
  };

  const removeInterest = (interest: string) => {
    onUpdate({ ...profile, interests: profile.interests.filter(i => i !== interest) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addInterest();
    } else if (e.key === 'Escape') {
      setIsAddingInterest(false);
      setNewInterest('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-10">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 bg-slate-100 flex items-center justify-center">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-slate-300" />
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all scale-90 group-hover:scale-100"
            title="Update profile picture"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
          />
        </div>
        <div className="text-center">
          <input
            type="text"
            value={profile.username}
            onChange={(e) => onUpdate({ ...profile, username: e.target.value })}
            className="text-2xl font-bold text-slate-900 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none text-center px-4"
          />
          <p className="text-slate-500 text-sm mt-1">Interdisciplinary Visionary</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Tag className="w-3 h-3" />
          Core Domains of Expertise
        </label>
        <div className="flex flex-wrap gap-2 items-center">
          {profile.interests.map(i => (
            <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-2 animate-in fade-in zoom-in duration-200">
              {i}
              <button 
                onClick={() => removeInterest(i)}
                className="hover:text-indigo-900 transition-colors"
                title={`Remove ${i}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          
          {isAddingInterest ? (
            <div className="flex items-center gap-1 bg-white border border-indigo-500 rounded-full px-2 py-1 animate-in slide-in-from-left-2 duration-200">
              <input
                autoFocus
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type domain..."
                className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none w-24 px-1"
              />
              <button 
                onClick={addInterest}
                className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Check className="w-3 h-3" />
              </button>
              <button 
                onClick={() => {
                  setIsAddingInterest(false);
                  setNewInterest('');
                }}
                className="p-1 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAddingInterest(true)}
              className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-400 rounded-full text-xs font-bold hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Domain
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
