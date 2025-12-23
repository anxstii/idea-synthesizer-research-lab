
export type CreativityLevel = 'conservative' | 'balanced' | 'radical';

export interface ResearchIdea {
  id: string;
  title: string;
  core_question: string;
  concept_overview: string;
  why_it_matters: string;
  possible_methods: string[];
  related_disciplines: string[];
  timestamp: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'link' | 'file';
  url: string;
}

export interface Bookmark extends ResearchIdea {
  notes: string;
  resources: Resource[];
}

export interface UserProfile {
  username: string;
  avatar: string;
  interests: string[];
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface GenerationParams {
  fields_of_interest: string[];
  idea_count: number;
  creativity_level: CreativityLevel;
  activeFrameworks?: string[];
}
