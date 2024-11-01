import { 
  Community, 
  CreateCommunityRequest, 
  UpdateCommunityRequest, 
  CommunitiesResponse, 
  ApiResponse,
  JoinCommunityResponse 
} from "@/types";
import { handleApiError } from "@/utils/errorHandling";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const fetchCommunities = async (): Promise<ApiResponse<CommunitiesResponse>> => {
  try {
    const response = await fetch(`${BASE_URL}/communities`);
    if (!response.ok) {
      throw new Error(
        response.status === 404 
          ? 'コミュニティが見つかりませんでした' 
          : 'コミュニティの取得に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    return handleApiError(error, 'コミュニティの取得中にエラーが発生しました');
  }
};

export const fetchCommunityById = async (id: string): Promise<ApiResponse<Community>> => {
  try {
    const response = await fetch(`${BASE_URL}/communities/${id}`);
    if (!response.ok) {
      throw new Error(
        response.status === 404 
          ? '指定されたコミュニティが見つかりませんでした' 
          : 'コミュニティの取得に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    return handleApiError(error, 'コミュニティの取得中にエラーが発生しました');
  }
};

export const createCommunity = async (data: CreateCommunityRequest): Promise<ApiResponse<Community>> => {
  try {
    const response = await fetch(`${BASE_URL}/communities`, {
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
          : 'コミュニティの作成に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    return handleApiError(error, 'コミュニティの作成中にエラーが発生しました');
  }
};

export const joinCommunity = async (communityId: number): Promise<JoinCommunityResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/communities/${communityId}/join`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(
        response.status === 404 
          ? 'コミュニティが見つかりませんでした' 
          : 'コミュニティへの参加に失敗しました'
      );
    }
    return response.json();
  } catch (error) {
    return handleApiError(error, 'コミュニティへの参加中にエラーが発生しました');
  }
};