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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">コミュニティを探す</h1>
          <Button className="w-full sm:w-auto">新規作成</Button>
        </div>
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
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xl sm:text-2xl">{community.name}</span>
                <Button className="w-full sm:w-auto">参加する</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{community.description}</p>
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