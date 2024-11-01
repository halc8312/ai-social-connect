import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle } from "lucide-react";
import CreateProject from "@/components/project/CreateProject";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const { toast } = useToast();

  const handleLike = (projectId: number) => {
    if (likedProjects.includes(projectId)) {
      setLikedProjects(likedProjects.filter(id => id !== projectId));
    } else {
      setLikedProjects([...likedProjects, projectId]);
    }
    toast({
      title: likedProjects.includes(projectId) ? "いいねを取り消しました" : "「いいね」しました",
    });
  };

  const toggleComments = (projectId: number) => {
    setActiveCommentSection(activeCommentSection === projectId ? null : projectId);
  };

  const projects = [
    {
      title: "AI画像生成アプリ",
      description: "Stable Diffusionを使用して、テキストから画像を生成するWebアプリケーション",
      tools: ["Stable Diffusion", "React", "Python"],
      likes: 234,
      comments: 45,
    },
    {
      title: "AIチャットボット",
      description: "ChatGPTを活用したカスタマーサポート用チャットボット",
      tools: ["ChatGPT", "Node.js", "Next.js"],
      likes: 189,
      comments: 32,
    },
    {
      title: "音声認識アシスタント",
      description: "Whisperを使用したリアルタイム音声認識と応答生成システム",
      tools: ["Whisper", "Python", "React"],
      likes: 156,
      comments: 28,
    },
  ];

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
          className="text-2xl sm:text-3xl font-bold"
        >
          AIプロジェクト
        </motion.h1>
        <Button
          className="w-full sm:w-auto"
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="プロジェクトを検索..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="w-full transform transition-all duration-200 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tools.map((tool, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm whitespace-nowrap"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex-1 sm:flex-none transition-colors duration-200 ${
                            likedProjects.includes(index) ? "text-primary" : ""
                          }`}
                          onClick={() => handleLike(index)}
                        >
                          <Heart
                            className={`w-4 h-4 mr-2 ${
                              likedProjects.includes(index) ? "fill-current" : ""
                            }`}
                          />
                          <span>{project.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 sm:flex-none"
                          onClick={() => toggleComments(index)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span>{project.comments}</span>
                        </Button>
                      </div>
                      <AnimatePresence>
                        {activeCommentSection === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CommentSection projectId={index.toString()} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;