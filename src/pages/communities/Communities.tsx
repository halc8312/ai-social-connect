import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// モックデータ
const mockCommunities = [
  {
    id: 1,
    name: "AI開発者コミュニティ",
    description: "AIの開発や応用について議論し、知識を共有するコミュニティです。",
    members: 150,
    joined: false
  },
  {
    id: 2,
    name: "機械学習研究会",
    description: "最新の機械学習技術について学び合い、実践的なプロジェクトを進めるグループです。",
    members: 85,
    joined: true
  },
  {
    id: 3,
    name: "自然言語処理の集い",
    description: "自然言語処理に関する技術や応用事例について情報交換を行うコミュニティです。",
    members: 120,
    joined: false
  }
];

const Communities = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // モックデータを使用するように変更
  const { data: communities = mockCommunities, isLoading, error } = useQuery({
    queryKey: ['communities'],
    queryFn: () => Promise.resolve(mockCommunities),
  });

  // モック用の参加処理
  const joinMutation = useMutation({
    mutationFn: async (communityId: number) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // 擬似的な遅延
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      toast({
        title: "コミュニティに参加しました",
      });
    },
  });

  const handleJoinCommunity = async (communityId: number) => {
    await joinMutation.mutateAsync(communityId);
    navigate(`/communities/${communityId}`);
  };

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">コミュニティを探す</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">新規作成</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しいコミュニティを作成</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="コミュニティ名"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    name="description"
                    placeholder="コミュニティの説明"
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    作成する
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="コミュニティを検索..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-8 w-3/4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : filteredCommunities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            コミュニティが見つかりませんでした
          </div>
        ) : (
          filteredCommunities.map((community) => (
            <Card key={community.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-xl sm:text-2xl">{community.name}</span>
                  <Button
                    onClick={() => handleJoinCommunity(community.id)}
                    variant={community.joined ? "outline" : "default"}
                    className="w-full sm:w-auto"
                    disabled={joinMutation.isPending}
                  >
                    {community.joined ? "参加中" : "参加する"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {community.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{community.members}メンバー</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Communities;