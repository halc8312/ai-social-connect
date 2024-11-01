import { Community } from "./index";

export interface CommunityResponse {
  data: Community;
  status: "success" | "error";
  message?: string;
}

export interface CommunitiesResponse {
  data: Community[];
  status: "success" | "error";
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface CreateCommunityRequest {
  name: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  settings?: Community["settings"];
}

export interface UpdateCommunityRequest extends Partial<CreateCommunityRequest> {
  id: number;
}

export interface JoinCommunityResponse {
  status: "success" | "error";
  message?: string;
  communityId: number;
  joined: boolean;
}