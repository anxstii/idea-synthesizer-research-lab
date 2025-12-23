
import React from 'react';
import { ResearchIdea } from '../types';
import { Sparkles, HelpCircle, BookOpen, Microscope, Share2, Bookmark, BookmarkCheck } from 'lucide-react';

interface IdeaCardProps {
  idea: ResearchIdea;
  index: number;
  isBookmarked?: boolean;
  onToggleBookmark?: (idea: ResearchIdea) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index, isBookmarked, onToggleBookmark }) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-[0.2em] uppercase">
              <Sparkles className="w-3 h-3" />
              Idea #{index + 1}
            </div>
            <h3 className="text-2xl font-serif text-slate-900 group-hover:text-indigo-700 transition-colors">{idea.title}</h3>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onToggleBookmark?.(idea)}
              className={`p-2 rounded-full transition-all ${isBookmarked ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-indigo-600" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-300 italic text-slate-700 leading-relaxed">
            <HelpCircle className="w-4 h-4 inline mr-2 mb-1 text-slate-400" />
            &ldquo;{idea.core_question}&rdquo;
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Concept Overview
            </h4>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              {idea.concept_overview}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Significance
            </h4>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              {idea.why_it_matters}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Microscope className="w-4 h-4 text-emerald-500" />
                Proposed Methodologies
              </h4>
              <ul className="space-y-2">
                {idea.possible_methods.map((method, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                    {method}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800">Interconnected Disciplines</h4>
              <div className="flex flex-wrap gap-1.5">
                {idea.related_disciplines.map((disc, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium uppercase tracking-wider">
                    {disc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
