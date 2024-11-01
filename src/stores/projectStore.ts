import { create } from 'zustand';
import { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  likedProjects: string[];
  activeCommentSection: number | null;
  setProjects: (projects: Project[]) => void;
  toggleLike: (projectId: string) => void;
  toggleComments: (projectId: number | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  likedProjects: [],
  activeCommentSection: null,
  setProjects: (projects) => set({ projects }),
  toggleLike: (projectId) =>
    set((state) => ({
      likedProjects: state.likedProjects.includes(projectId)
        ? state.likedProjects.filter(id => id !== projectId)
        : [...state.likedProjects, projectId]
    })),
  toggleComments: (projectId) =>
    set((state) => ({
      activeCommentSection: state.activeCommentSection === projectId ? null : projectId
    })),
}));