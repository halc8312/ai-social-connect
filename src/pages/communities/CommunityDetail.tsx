import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { motion } from "framer-motion";
import { useState } from "react";

const CommunityDetail = () => {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);

  const handleShare = () => {
    toast({
      title: "共有リンクをコピーしました",
    });
  };

  const communityData = {
    name: "ChatGPT Users",
    members: 1234,
    description: "ChatGPTを使用した開発やプロジェクトについて議論するコミュニティです。最新の活用方法や、効果的なプロンプトの共有、APIを使用した開発のTipsなど、幅広い話題について情報交換しています。",
    topics: ["ChatGPT", "AI開発", "プロンプトエンジニアリング", "APIインテグレーション"],
    recentActivities: [
      "新しいメンバー5名が参加しました",
      "「効果的なプロンプト設計」についての議論が活発です",
      "次回のオンラインミートアップが予定されています"
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="bg-white/50 backdrop-blur-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {communityData.name}
              </span>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                コミュニティに参加
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Users className="w-5 h-5" />
              <span>{communityData.members}メンバー</span>
            </div>
            <p className="text-gray-600 mb-6">{communityData.description}</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">トピック</h3>
                <div className="flex flex-wrap gap-2">
                  {communityData.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm backdrop-blur-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">最近の活動</h3>
                <div className="space-y-2">
                  {communityData.recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-600"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>ディスカッション</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <span>共有</span>
                </Button>
              </div>

              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CommentSection />
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CommunityDetail;