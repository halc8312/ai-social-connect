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

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  aiTools?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

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
  status?: 'draft' | 'published';
  githubUrl?: string;
  demoUrl?: string;
}

// API Request/Response types
export interface CreateCommunityRequest {
  name: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
}

export interface UpdateCommunityRequest {
  name?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  aiTools: string[];
  images?: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  aiTools?: string[];
  images?: string[];
  githubUrl?: string;
  demoUrl?: string;
  status?: 'draft' | 'published';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CommunitiesResponse extends PaginatedResponse<Community> {}
export interface ProjectsResponse extends PaginatedResponse<Project> {}

export interface JoinCommunityResponse {
  success: boolean;
  message: string;
  communityId: number;
}

export interface LikeProjectResponse {
  success: boolean;
  message: string;
  projectId: string;
  likes: number;
}