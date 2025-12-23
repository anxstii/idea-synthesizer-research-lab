
import { UserProfile, Bookmark, Framework } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'is_profile',
  BOOKMARKS: 'is_bookmarks',
  FRAMEWORKS: 'is_frameworks'
};

export const StorageService = {
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : { username: 'Researcher', avatar: '', interests: [] };
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
  getBookmarks: (): Bookmark[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  },
  saveBookmarks: (bookmarks: Bookmark[]) => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  },
  getFrameworks: (): Framework[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FRAMEWORKS);
    return data ? JSON.parse(data) : [
      { id: '1', name: 'Game Theory', description: 'Analyze interactions as strategic games.', active: false },
      { id: '2', name: 'Systems Thinking', description: 'Focus on interconnected feedback loops.', active: false },
      { id: '3', name: 'Post-Humanism', description: 'Decenter the human perspective in analysis.', active: false }
    ];
  },
  saveFrameworks: (frameworks: Framework[]) => {
    localStorage.setItem(STORAGE_KEYS.FRAMEWORKS, JSON.stringify(frameworks));
  }
};
