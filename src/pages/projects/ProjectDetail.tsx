import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "@/api/projects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectMetadata from "@/components/project/ProjectMetadata";
import ProjectTools from "@/components/project/ProjectTools";
import ProjectActions from "@/components/project/ProjectActions";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProjectById(id!),
    enabled: !!id,
  });

  const project = response?.data;

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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="bg-white/50 backdrop-blur-sm border-gray-200">
          <ProjectHeader title={project.title} />
          <CardContent>
            <ProjectMetadata
              userId={project.userId}
              createdAt={project.createdAt}
              demoUrl={project.demoUrl}
            />

            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>

              <ProjectTools tools={project.aiTools} />

              <ProjectActions
                projectId={project.id}
                likes={project.likes}
                comments={project.comments}
                isLiked={isLiked}
                showComments={showComments}
                onLikeClick={handleLike}
                onCommentClick={() => setShowComments(!showComments)}
                onShareClick={handleShare}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;