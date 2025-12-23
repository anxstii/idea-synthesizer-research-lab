
import React, { useState } from 'react';
import { Dna, ArrowRight, Sparkles, Layout, BookMarked, Zap, Globe, Shield, X, Loader2 } from 'lucide-react';

interface LandingPageProps {
  onAuth: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleAuth = () => {
    setIsAuthenticating(true);
    // Simulate OAuth delay
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowAuthModal(false);
      onAuth();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-x-hidden">
      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => !isAuthenticating && setShowAuthModal(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 space-y-8 animate-in zoom-in-95 duration-300">
            {!isAuthenticating && (
              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-2">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Welcome to IdeaSynthesizer</h2>
              <p className="text-slate-500 text-sm">Sign in to access your interdisciplinary lab.</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleGoogleAuth}
                disabled={isAuthenticating}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] ${isAuthenticating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-semibold">
              By continuing, you agree to the Laboratory's <br />
              <a href="#" className="underline hover:text-indigo-600">Terms of Service</a> and <a href="#" className="underline hover:text-indigo-600">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Idea<span className="text-indigo-600">Synthesizer</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAuthModal(true)}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-100/30 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-purple-100/40 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-indigo-100 text-indigo-700 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-3 h-3" />
            The Future of Interdisciplinary Research
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Bridge the Silos of <br />
            <span className="italic text-indigo-600">Human Knowledge</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            IdeaSynthesizer uses advanced AI to algorithmically cross-pollinate disparate academic fields, surfacing rigorous and novel research paths.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <button 
              onClick={() => setShowAuthModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-200"
            >
              Start Your Synthesis
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              View Methodology
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-200/60">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-serif text-slate-900">A Laboratory for the Curious Mind</h2>
          <p className="text-slate-500">Rigorous tools designed for scholars, visionaries, and polymaths.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-amber-500" />,
              title: "Conceptual Synthesis",
              desc: "Deep-level reasoning powered by Gemini AI that integrates terminology and methodologies from up to 10 disparate fields."
            },
            {
              icon: <Layout className="w-6 h-6 text-indigo-500" />,
              title: "Structural Frameworks",
              desc: "Apply intellectual lenses like Game Theory, Systems Thinking, or Post-Humanism to ground speculative ideas in established logic."
            },
            {
              icon: <BookMarked className="w-6 h-6 text-emerald-500" />,
              title: "Research Persistence",
              desc: "A dedicated Lab Journal to track your intellectual evolution, upload resources, and record hypotheses."
            },
            {
              icon: <Globe className="w-6 h-6 text-blue-500" />,
              title: "Global Context",
              desc: "Search grounding ensures your research ideas are aware of current events and modern academic trends."
            },
            {
              icon: <Shield className="w-6 h-6 text-purple-500" />,
              title: "Academic Rigor",
              desc: "Generate core questions, significance assessments, and detailed methodologies for every synthesized path."
            },
            {
              icon: <Sparkles className="w-6 h-6 text-pink-500" />,
              title: "Radical Exploration",
              desc: "Control creativity levels to generate everything from grounded peer-review ready paths to boundary-pushing speculative theories."
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/10 blur-[100px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-serif text-white leading-tight">Ready to discover your next <br /> breakthrough?</h2>
            <p className="text-slate-400">Join 10,000+ researchers using AI to navigate the frontiers of interdisciplinary inquiry.</p>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Dna className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-slate-900">IdeaSynthesizer</span>
        </div>
        <p className="text-sm text-slate-500">Empowering cross-disciplinary discovery since 2024.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
