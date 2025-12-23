
import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  FlaskConical, 
  ArrowRight, 
  Settings2, 
  RefreshCw, 
  AlertCircle,
  Loader2,
  User as UserIcon,
  Layout,
  BookMarked
} from 'lucide-react';
import FieldSelector from './components/FieldSelector';
import IdeaCard from './components/IdeaCard';
import Profile from './components/Profile';
import LabJournal from './components/LabJournal';
import Frameworks from './components/Frameworks';
import LandingPage from './components/LandingPage';
import { GenerationParams, ResearchIdea, CreativityLevel, UserProfile, Bookmark, Framework } from './types';
import { CREATIVITY_MODES } from './constants';
import { generateResearchIdeas } from './services/geminiService';
import { StorageService } from './services/storageService';

type View = 'lab' | 'journal' | 'frameworks' | 'profile';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });
  const [activeView, setActiveView] = useState<View>('lab');
  const [fields, setFields] = useState<string[]>([]);
  const [count, setCount] = useState(3);
  const [creativity, setCreativity] = useState<CreativityLevel>('balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<ResearchIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Persistent States
  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(StorageService.getBookmarks());
  const [frameworks, setFrameworks] = useState<Framework[]>(StorageService.getFrameworks());

  useEffect(() => StorageService.saveProfile(profile), [profile]);
  useEffect(() => StorageService.saveBookmarks(bookmarks), [bookmarks]);
  useEffect(() => StorageService.saveFrameworks(frameworks), [frameworks]);

  const handleAuth = () => {
    setIsAuthenticated(true);
    localStorage.setItem('is_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('is_authenticated');
  };

  const handleGenerate = async () => {
    if (fields.length < 2) {
      setError("Please select at least two fields to synthesize.");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setIdeas([]);

    try {
      const activeFws = frameworks.filter(f => f.active).map(f => f.name);
      const result = await generateResearchIdeas({
        fields_of_interest: fields,
        idea_count: count,
        creativity_level: creativity,
        activeFrameworks: activeFws
      });
      setIdeas(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleBookmark = (idea: ResearchIdea) => {
    const existing = bookmarks.find(b => b.id === idea.id);
    if (existing) {
      setBookmarks(bookmarks.filter(b => b.id !== idea.id));
    } else {
      const newBookmark: Bookmark = {
        ...idea,
        notes: '',
        resources: []
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  if (!isAuthenticated) {
    return <LandingPage onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-100 selection:text-indigo-900 animate-in fade-in duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setActiveView('lab')} className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Idea<span className="text-indigo-600">Synthesizer</span>
            </h1>
          </button>
          
          <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
            <button 
              onClick={() => setActiveView('journal')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${activeView === 'journal' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              <BookMarked className="w-4 h-4" />
              <span className="hidden md:inline">Lab Journal</span>
            </button>
            <button 
              onClick={() => setActiveView('frameworks')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${activeView === 'frameworks' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              <Layout className="w-4 h-4" />
              <span className="hidden md:inline">Frameworks</span>
            </button>
            <button 
              onClick={() => setActiveView('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${activeView === 'profile' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-white">
                {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : <UserIcon className="w-3 h-3" />}
              </div>
              <span className="hidden md:inline">{profile.username}</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-12 space-y-12">
        {activeView === 'lab' && (
          <>
            {/* Intro Section */}
            <section className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-widest uppercase">
                <FlaskConical className="w-3 h-3" />
                Interdisciplinary Synthesis Engine
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
                Synthesize the <span className="italic">Future</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Break academic silos by algorithmically cross-pollinating your areas of interest. 
              </p>
            </section>

            {/* Configuration Section */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-indigo-500" />
                    Laboratory Parameters
                  </h3>
                  {frameworks.some(f => f.active) && (
                    <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-1 rounded">
                      {frameworks.filter(f => f.active).length} FRAMEWORKS ACTIVE
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Fields of Inquiry</label>
                  <FieldSelector selectedFields={fields} onChange={setFields} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Creativity Intensity</label>
                    <div className="grid grid-cols-1 gap-2">
                      {CREATIVITY_MODES.map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setCreativity(mode.id as CreativityLevel)}
                          className={`flex flex-col items-start p-3 rounded-xl border transition-all text-left ${
                            creativity === mode.id
                              ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/10'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className={`text-sm font-bold ${creativity === mode.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                            {mode.label}
                          </span>
                          <span className="text-xs text-slate-500">{mode.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Output Volume</label>
                    <div className="flex items-center gap-4 pt-2">
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="flex-1 accent-indigo-600"
                      />
                      <span className="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-xl font-bold text-lg">
                        {count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col items-center gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || fields.length < 2}
                  className={`w-full md:w-auto px-12 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    isGenerating || fields.length < 2
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] shadow-xl shadow-indigo-200'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Synthesizing...
                    </>
                  ) : (
                    <>
                      Generate Research Ideas
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
              </div>
            </section>

            {/* Results Section */}
            {isGenerating && (
              <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                <h4 className="text-lg font-serif text-slate-800">Blending Conceptual Frameworks</h4>
              </div>
            )}

            {ideas.length > 0 && (
              <div className="space-y-8 pt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif text-slate-900">Synthesis Results</h3>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  {ideas.map((idea, idx) => (
                    <IdeaCard 
                      key={idea.id} 
                      idea={idea} 
                      index={idx} 
                      isBookmarked={bookmarks.some(b => b.id === idea.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeView === 'journal' && <LabJournal bookmarks={bookmarks} onUpdate={setBookmarks} />}
        {activeView === 'frameworks' && <Frameworks frameworks={frameworks} onUpdate={setFrameworks} />}
        {activeView === 'profile' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
               <h2 className="text-3xl font-serif text-slate-900">Your Researcher Profile</h2>
               <button onClick={handleLogout} className="text-xs font-bold text-red-500 hover:underline">Sign Out</button>
            </div>
            <Profile profile={profile} onUpdate={setProfile} />
          </div>
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="mt-20 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Dna className="w-4 h-4" />
            <span className="text-sm font-bold text-slate-600">IdeaSynthesizer v2.0</span>
          </div>
          <p className="text-xs text-slate-400">© 2024 Advanced Research Synthesis Group.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
