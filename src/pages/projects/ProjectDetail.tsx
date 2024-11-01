import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, User, Calendar, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { motion } from "framer-motion";
import { useState } from "react";

const ProjectDetail = () => {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "いいねを取り消しました" : "「いいね」しました",
    });
  };

  const handleShare = () => {
    toast({
      title: "共有リンクをコピーしました",
    });
  };

  const projectData = {
    title: "AI画像生成アプリ",
    creator: "山田太郎",
    date: "2024年3月15日",
    description: "Stable Diffusionを使用して、テキストから画像を生成するWebアプリケーションです。直感的なUIで、誰でも簡単にAIアートを作成できます。",
    longDescription: "このプロジェクトは、最新のAI技術を活用して、ユーザーが簡単に創造的な画像を生成できるプラットフォームを提供することを目指しています。特徴的な機能として、プロンプトの補助機能、画像の履歴管理、コミュニティでの共有機能などがあります。",
    tools: ["Stable Diffusion", "React", "Python", "FastAPI"],
    projectUrl: "https://example.com/project",
    likes: 234,
    comments: 45
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
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {projectData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{projectData.creator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{projectData.date}</span>
              </div>
              {projectData.projectUrl && (
                <a
                  href={projectData.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>プロジェクトを見る</span>
                </a>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-4">{projectData.description}</p>
                <p className="text-gray-600">{projectData.longDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">使用技術</h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm backdrop-blur-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 sm:flex-none transition-all duration-200 rounded-full ${
                    isLiked ? "text-primary bg-primary/10" : "hover:bg-primary/5"
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                      isLiked ? "fill-current scale-110" : "scale-100"
                    }`}
                  />
                  <span>{projectData.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>{projectData.comments}</span>
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
                  <CommentSection projectId="1" />
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;