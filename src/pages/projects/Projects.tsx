import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle } from "lucide-react";
import CreateProject from "@/components/project/CreateProject";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, likeProject } from "@/api/projects";
import { Skeleton } from "@/components/ui/skeleton";

const Projects = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const likeMutation = useMutation({
    mutationFn: likeProject,
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setLikedProjects(prev => 
        prev.includes(projectId) 
          ? prev.filter(id => id !== projectId)
          : [...prev, projectId]
      );
      toast({
        title: likedProjects.includes(projectId) ? "いいねを取り消しました" : "「いいね」しました",
      });
    },
  });

  const toggleComments = (projectId: number) => {
    setActiveCommentSection(activeCommentSection === projectId ? null : projectId);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">エラーが発生しました。もう一度お試しください。</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <motion.h1
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          AIプロジェクト
        </motion.h1>
        <Button
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? "一覧に戻る" : "プロジェクトを投稿"}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {showCreate ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CreateProject />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="プロジェクトを検索..."
                  className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-primary/50 transition-colors rounded-full"
                />
              </div>
            </div>

            <div className="grid gap-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="h-8 w-3/4" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))
              ) : projects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  プロジェクトが見つかりませんでした
                </div>
              ) : (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="w-full transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white/50 backdrop-blur-sm border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.aiTools.map((tool, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm whitespace-nowrap backdrop-blur-sm"
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`flex-1 sm:flex-none transition-all duration-200 rounded-full ${
                              likedProjects.includes(project.id) 
                                ? "text-primary bg-primary/10" 
                                : "hover:bg-primary/5"
                            }`}
                            onClick={() => likeMutation.mutate(project.id)}
                            disabled={likeMutation.isPending}
                          >
                            <Heart
                              className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                                likedProjects.includes(project.id) 
                                  ? "fill-current scale-110" 
                                  : "scale-100"
                              }`}
                            />
                            <span>{project.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
                            onClick={() => toggleComments(Number(project.id))}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            <span>{project.comments}</span>
                          </Button>
                        </div>
                        <AnimatePresence>
                          {activeCommentSection === Number(project.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-4"
                            >
                              <CommentSection projectId={project.id} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;