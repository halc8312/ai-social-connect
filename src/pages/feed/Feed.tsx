import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import CreatePost from "@/components/post/CreatePost";
import { useToast } from "@/hooks/use-toast";

const Feed = () => {
  const { toast } = useToast();

  const handleLike = () => {
    toast({
      title: "「いいね」しました",
    });
  };

  const handleShare = () => {
    toast({
      title: "共有リンクをコピーしました",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <CreatePost />

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
                      <div className="font-semibold">ユーザー名</div>
                      <div className="text-sm text-gray-500">2時間前</div>
                    </div>
                  </div>
                  <p className="mb-4 break-words">
                    ChatGPTを使って面白いプロジェクトを作成しました！
                    #AI #ChatGPT #開発
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none" onClick={handleLike}>
                      <Heart className="w-4 h-4 mr-2" />
                      <span>123</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>45</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      <span>共有</span>
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