import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";

const Communities = () => {
  const communities = [
    {
      name: "ChatGPT Users",
      members: 1234,
      description: "ChatGPTを使用した開発やプロジェクトについて議論するコミュニティ",
    },
    {
      name: "Stable Diffusion",
      members: 856,
      description: "画像生成AIの活用方法や最新情報を共有するグループ",
    },
    {
      name: "AI開発者コミュニティ",
      members: 567,
      description: "AIモデルの開発や実装について情報交換する場",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">コミュニティを探す</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="コミュニティを検索..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {communities.map((community, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{community.name}</span>
                <Button>参加する</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{community.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {community.members}メンバー
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Communities;