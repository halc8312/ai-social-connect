import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import CommentSection from "@/components/comment/CommentSection";

interface ProjectActionsProps {
  projectId: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  showComments: boolean;
  onLikeClick: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
}

const ProjectActions = ({
  projectId,
  likes,
  comments,
  isLiked,
  showComments,
  onLikeClick,
  onCommentClick,
  onShareClick,
}: ProjectActionsProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 sm:flex-none transition-all duration-200 rounded-full ${
            isLiked ? "text-primary bg-primary/10" : "hover:bg-primary/5"
          }`}
          onClick={onLikeClick}
        >
          <Heart
            className={`w-4 h-4 mr-2 transition-transform duration-200 ${
              isLiked ? "fill-current scale-110" : "scale-100"
            }`}
          />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
          onClick={onCommentClick}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          <span>{comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 sm:flex-none rounded-full hover:bg-primary/5"
          onClick={onShareClick}
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
          <CommentSection projectId={projectId} />
        </motion.div>
      )}
    </>
  );
};

export default ProjectActions;