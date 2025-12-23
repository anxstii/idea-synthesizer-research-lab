
import React from 'react';
import { 
  Atom, 
  Brain, 
  Palette, 
  History, 
  Cpu, 
  Globe, 
  Music, 
  Microscope, 
  BookOpen, 
  Scale, 
  CloudSun, 
  HeartPulse 
} from 'lucide-react';

export const ACADEMIC_FIELDS = [
  { name: 'Artificial Intelligence', icon: <Cpu className="w-4 h-4" /> },
  { name: 'Neuroscience', icon: <Brain className="w-4 h-4" /> },
  { name: 'Art History', icon: <Palette className="w-4 h-4" /> },
  { name: 'Theoretical Physics', icon: <Atom className="w-4 h-4" /> },
  { name: 'Anthropology', icon: <History className="w-4 h-4" /> },
  { name: 'Environmental Science', icon: <CloudSun className="w-4 h-4" /> },
  { name: 'Philosophy', icon: <BookOpen className="w-4 h-4" /> },
  { name: 'Molecular Biology', icon: <Microscope className="w-4 h-4" /> },
  { name: 'Sociology', icon: <Globe className="w-4 h-4" /> },
  { name: 'Jurisprudence', icon: <Scale className="w-4 h-4" /> },
  { name: 'Ethnomusicology', icon: <Music className="w-4 h-4" /> },
  { name: 'Public Health', icon: <HeartPulse className="w-4 h-4" /> },
];

export const CREATIVITY_MODES = [
  { id: 'conservative', label: 'Conservative', description: 'Grounded & Peer-Review Ready' },
  { id: 'balanced', label: 'Balanced', description: 'Mainstream with a Twist' },
  { id: 'radical', label: 'Radical', description: 'Speculative & Boundary-Pushing' },
];
