import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, likeProject } from "@/api/projects";
import CreateProject from "@/components/project/CreateProject";
import ProjectList from "@/components/project/ProjectList";
import ProjectSearch from "@/components/project/ProjectSearch";

const Projects = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <ProjectSearch onSearch={setSearchQuery} />
            </div>

            <div className="grid gap-6">
              <ProjectList
                projects={filteredProjects}
                isLoading={isLoading}
                likedProjects={likedProjects}
                activeCommentSection={activeCommentSection}
                onLike={(projectId) => likeMutation.mutate(projectId)}
                toggleComments={toggleComments}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;