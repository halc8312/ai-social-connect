import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { MessageCircle, Heart, Share2, Menu } from "lucide-react";

const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date(),
};

const Feed = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* 投稿作成カード */}
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <Input
                placeholder="AIツールについて共有しよう..."
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button className="w-full sm:w-auto">投稿する</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 投稿フィード */}
      <div className="space-y-4">
        {[1, 2, 3].map((post) => (
          <Card key={post} className="w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="sm:hidden w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      U
                    </div>
                    <div>
                      <div className="font-semibold">User Name</div>
                      <div className="text-sm text-gray-500">2時間前</div>
                    </div>
                  </div>
                  <p className="mb-4 break-words">
                    ChatGPTを使って面白いプロジェクトを作成しました！
                    #AI #ChatGPT #開発
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <Heart className="w-4 h-4 mr-2" />
                      <span className="sm:inline">123</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span className="sm:inline">45</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <Share2 className="w-4 h-4 mr-2" />
                      <span className="sm:inline">共有</span>
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