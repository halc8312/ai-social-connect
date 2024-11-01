import { createClient } from '@supabase/supabase-js';
import type { Community, CommunityMember } from '@/types/supabase';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const createCommunity = async (
  name: string,
  description: string,
  userId: string,
  topics: string[]
): Promise<Community | null> => {
  const { data, error } = await supabase
    .from('communities')
    .insert({
      name,
      description,
      created_by: userId,
      topics,
      members_count: 1
    })
    .select()
    .single();

  if (error) throw error;

  // コミュニティ作成者を自動的にメンバーとして追加
  await supabase.from('community_members').insert({
    community_id: data.id,
    user_id: userId,
    role: 'admin'
  });

  return data;
};

export const getCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from('communities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getCommunityById = async (id: string): Promise<Community | null> => {
  const { data, error } = await supabase
    .from('communities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const joinCommunity = async (
  communityId: string,
  userId: string
): Promise<void> => {
  const { error } = await supabase.from('community_members').insert({
    community_id: communityId,
    user_id: userId,
    role: 'member'
  });

  if (error) throw error;

  // メンバー数を更新
  await supabase.rpc('increment_members_count', {
    community_id: communityId
  });
};

export const leaveCommunity = async (
  communityId: string,
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('community_members')
    .delete()
    .match({ community_id: communityId, user_id: userId });

  if (error) throw error;

  // メンバー数を更新
  await supabase.rpc('decrement_members_count', {
    community_id: communityId
  });
};

export const isCommunityMember = async (
  communityId: string,
  userId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('community_members')
    .select('id')
    .match({ community_id: communityId, user_id: userId })
    .single();

  if (error) return false;
  return !!data;
};