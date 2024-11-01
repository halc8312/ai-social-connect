import { create } from 'zustand';
import { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  likedProjects: string[];
  activeCommentSection: string | null;
  setProjects: (projects: Project[]) => void;
  toggleLike: (projectId: string) => void;
  toggleComments: (projectId: string) => void;
  updateProjectLikes: (projectId: string, likes: number) => void;
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
  updateProjectLikes: (projectId, likes) =>
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === projectId ? { ...project, likes } : project
      )
    })),
}));