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
  ownerId: string;
  tags?: string[];
  imageUrl?: string;
  memberCount: {
    total: number;
    active: number;
  };
  settings?: {
    isPrivate: boolean;
    requiresApproval: boolean;
    allowExternalLinks: boolean;
  };
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
}
