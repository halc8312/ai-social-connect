import { create } from 'zustand';
import { Project, LikeProjectResponse } from '@/types';
import { likeProject } from '@/api/projects';

interface ProjectState {
  projects: Project[];
  likedProjects: Set<string>;
  activeCommentSection: string | null;
  isLoading: boolean;
  error: string | null;
  setProjects: (projects: Project[]) => void;
  toggleLike: (projectId: string) => Promise<void>;
  toggleComments: (projectId: string) => void;
  updateProjectLikes: (projectId: string, likes: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  likedProjects: new Set(),
  activeCommentSection: null,
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),

  toggleLike: async (projectId) => {
    try {
      set({ isLoading: true });
      const response = await likeProject(projectId);
      
      if (response.success) {
        set((state) => {
          const newLikedProjects = new Set(state.likedProjects);
          if (newLikedProjects.has(projectId)) {
            newLikedProjects.delete(projectId);
          } else {
            newLikedProjects.add(projectId);
          }
          return { likedProjects: newLikedProjects };
        });
        get().updateProjectLikes(projectId, response.data.likes);
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '操作に失敗しました' });
    } finally {
      set({ isLoading: false });
    }
  },

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

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));