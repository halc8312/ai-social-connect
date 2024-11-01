import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const Communities = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const communities = [
    {
      id: 1,
      name: "ChatGPT Users",
      members: 1234,
      description: "ChatGPTを使用した開発やプロジェクトについて議論するコミュニティ",
      joined: false,
    },
    {
      id: 2,
      name: "Stable Diffusion",
      members: 856,
      description: "画像生成AIの活用方法や最新情報を共有するグループ",
      joined: true,
    },
    {
      id: 3,
      name: "AI開発者コミュニティ",
      members: 567,
      description: "AIモデルの開発や実装について情報交換する場",
      joined: false,
    },
  ];

  const handleJoinCommunity = (communityId: number) => {
    toast({
      title: "コミュニティに参加しました",
      description: "メンバーとして活動を開始できます",
    });
    navigate(`/communities/${communityId}`);
  };

  const handleCreateCommunity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name.trim() || !description.trim()) {
      toast({
        title: "入力エラー",
        description: "コミュニティ名と説明を入力してください",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "コミュニティを作成しました",
      description: "新しいコミュニティの管理者になりました",
    });
    navigate(`/communities/${Date.now()}`);
  };

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
              <form onSubmit={handleCreateCommunity} className="space-y-4">
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
                  <Button type="submit">作成する</Button>
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
        {communities
          .filter((community) =>
            community.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((community) => (
            <Card key={community.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-xl sm:text-2xl">{community.name}</span>
                  <Button
                    onClick={() => handleJoinCommunity(community.id)}
                    variant={community.joined ? "outline" : "default"}
                    className="w-full sm:w-auto"
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
          ))}
      </div>
    </div>
  );
};

export default Communities;