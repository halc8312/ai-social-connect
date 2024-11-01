import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "@/components/comment/CommentSection";
import { Project } from "@/types";
import { useProjectStore } from "@/stores/projectStore";
import { memo } from "react";

interface ProjectCardProps {
  project: Project;
  isPending?: boolean;
}

const ProjectCard = memo(({ project, isPending }: ProjectCardProps) => {
  const { likedProjects, activeCommentSection, toggleLike, toggleComments } = useProjectStore();
  const isLiked = likedProjects.includes(project.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
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
                isLiked ? "text-primary bg-primary/10" : "hover:bg-primary/5"
              }`}
              onClick={() => toggleLike(project.id)}
              disabled={isPending}
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
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;