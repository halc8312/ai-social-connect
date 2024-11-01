// 基本的なレスポンス型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  status: number;
}

// ページネーション用の型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ユーザー関連の型
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  aiTools?: string[];
  expertise?: string[];
  createdAt: Date;
}

// プロジェクト関連の型
export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  aiTools: string[];
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt?: Date;
  status: 'draft' | 'published';
  githubUrl?: string;
  demoUrl?: string;
}

export type CreateProjectRequest = Omit<Project, 'id' | 'userId' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectRequest = Partial<CreateProjectRequest>;

// コミュニティ関連の型
export interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  joined: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerId?: string;
  tags?: string[];
  imageUrl?: string;
}

export type CreateCommunityRequest = Omit<Community, 'id' | 'members' | 'joined' | 'createdAt' | 'updatedAt'>;
export type UpdateCommunityRequest = Partial<CreateCommunityRequest>;

// レスポンス型
export type CommunitiesResponse = PaginatedResponse<Community>;
export type ProjectsResponse = PaginatedResponse<Project>;

export interface JoinCommunityResponse extends ApiResponse<{ communityId: number }> {
  success: boolean;
}

export interface LikeProjectResponse extends ApiResponse<{ projectId: string; likes: number }> {
  success: boolean;
}