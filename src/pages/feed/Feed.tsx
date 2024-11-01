import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { MessageCircle, Heart, Share2 } from "lucide-react";

// 仮のユーザーデータ
const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date(),
};

const Feed = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 投稿作成カード */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <Input
                placeholder="AIツールについて共有しよう..."
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button>投稿する</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 投稿フィード */}
      <div className="space-y-4">
        {[1, 2, 3].map((post) => (
          <Card key={post}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  U
                </div>
                <div className="flex-1">
                  <div className="font-semibold">User Name</div>
                  <div className="text-sm text-gray-500 mb-2">2時間前</div>
                  <p className="mb-4">
                    ChatGPTを使って面白いプロジェクトを作成しました！
                    #AI #ChatGPT #開発
                  </p>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      123
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      45
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      共有
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feed;