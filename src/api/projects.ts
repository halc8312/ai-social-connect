import { Project } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  return response.json();
};

export const createProject = async (data: Omit<Project, "id" | "userId" | "likes" | "comments" | "createdAt">): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
};

export const likeProject = async (projectId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/like`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to like project');
  }
};