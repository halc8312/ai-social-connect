import { 
  Community, 
  CreateCommunityRequest, 
  UpdateCommunityRequest, 
  CommunitiesResponse, 
  ApiResponse,
  JoinCommunityResponse 
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const fetchCommunities = async (): Promise<ApiResponse<CommunitiesResponse>> => {
  const response = await fetch(`${BASE_URL}/communities`);
  if (!response.ok) {
    throw new Error('Failed to fetch communities');
  }
  return response.json();
};

export const fetchCommunityById = async (id: string): Promise<ApiResponse<Community>> => {
  const response = await fetch(`${BASE_URL}/communities/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch community');
  }
  return response.json();
};

export const createCommunity = async (data: CreateCommunityRequest): Promise<ApiResponse<Community>> => {
  const response = await fetch(`${BASE_URL}/communities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create community');
  }
  return response.json();
};

export const joinCommunity = async (communityId: number): Promise<JoinCommunityResponse> => {
  const response = await fetch(`${BASE_URL}/communities/${communityId}/join`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to join community');
  }
  return response.json();
};

export const updateCommunity = async (
  id: number, 
  data: UpdateCommunityRequest
): Promise<ApiResponse<Community>> => {
  const response = await fetch(`${BASE_URL}/communities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update community');
  }
  return response.json();
};