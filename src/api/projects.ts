import { 
  Project, 
  ApiResponse, 
  ProjectsResponse,
  LikeProjectResponse 
} from "@/types";
import { handleApiError } from "@/utils/errorHandling";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const fetchProjects = async (): Promise<ApiResponse<ProjectsResponse>> => {
  try {
    const response = await fetch(`${BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error(
        response.status === 404 
          ? 'プロジェクトが見つかりませんでした' 
          : 'プロジェクトの取得に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    handleApiError(error, 'プロジェクトの取得中にエラーが発生しました');
  }
};

export const fetchProjectById = async (id: string): Promise<ApiResponse<Project>> => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error(
        response.status === 404 
          ? '指定されたプロジェクトが見つかりませんでした' 
          : 'プロジェクトの取得に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    handleApiError(error, 'プロジェクトの取得中にエラーが発生しました');
  }
};

export const likeProject = async (projectId: string): Promise<LikeProjectResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${projectId}/like`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(
        response.status === 404 
          ? 'プロジェクトが見つかりませんでした' 
          : 'いいねの更新に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    return handleApiError(error, 'いいねの更新中にエラーが発生しました');
  }
};

export const createProject = async (data: Omit<Project, "id" | "userId" | "likes" | "comments" | "createdAt">): Promise<ApiResponse<Project>> => {
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        response.status === 400 
          ? '入力内容に誤りがあります' 
          : 'プロジェクトの作成に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    handleApiError(error, 'プロジェクトの作成中にエラーが発生しました');
  }
};
