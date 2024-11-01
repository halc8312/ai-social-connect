import { Community } from "@/types";

const BASE_URL = "http://localhost:3001/api";

export const fetchCommunities = async (): Promise<Community[]> => {
  const response = await fetch(`${BASE_URL}/communities`);
  if (!response.ok) {
    throw new Error('Failed to fetch communities');
  }
  return response.json();
};

export const fetchCommunityById = async (id: string): Promise<Community> => {
  const response = await fetch(`${BASE_URL}/communities/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch community');
  }
  return response.json();
};

export const createCommunity = async (data: Omit<Community, "id" | "members" | "joined">): Promise<Community> => {
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

export const joinCommunity = async (communityId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/communities/${communityId}/join`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to join community');
  }
};