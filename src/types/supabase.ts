export type Community = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  members_count: number;
  topics: string[];
  recent_activities: string[];
};

export type CommunityMember = {
  id: string;
  community_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
};

export type CommunityTopic = {
  id: string;
  community_id: string;
  name: string;
};

export type CommunityActivity = {
  id: string;
  community_id: string;
  content: string;
  created_at: string;
};