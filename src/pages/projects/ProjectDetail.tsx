import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, User, Calendar, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "@/api/projects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProjectById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <Alert variant="destructive">
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>
            プロジェクトの読み込み中にエラーが発生しました。
            ページを更新するか、しばらく時間をおいて再度お試しください。
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <Alert>
          <AlertTitle>プロジェクトが見つかりません</AlertTitle>
          <AlertDescription>
            指定されたプロジェクトは存在しないか、削除された可能性があります。
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
              {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{project.creator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{project.date}</span>
              </div>
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
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
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-gray-600">{project.longDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">使用技術</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
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
                  onClick={() => {
                    setIsLiked(!isLiked);
                    toast({
                      title: isLiked ? "いいねを取り消しました" : "「いいね」しました",
                    });
                  }}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                      isLiked ? "fill-current scale-110" : "scale-100"
                    }`}
                  />
                  <span>{project.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>{project.comments}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
                  onClick={() => {
                    toast({
                      title: "共有リンクをコピーしました",
                    });
                  }}
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
                  <CommentSection projectId={project.id} />
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
