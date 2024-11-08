import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import CreatePost from "@/components/post/CreatePost";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const { toast } = useToast();
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
    toast({
      title: likedPosts.includes(postId) ? "いいねを取り消しました" : "「いいね」しました",
    });
  };

  const handleShare = () => {
    toast({
      title: "共有リンクをコピーしました",
    });
  };

  const toggleComments = (postId: number) => {
    setActiveCommentSection(activeCommentSection === postId ? null : postId);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CreatePost />
      </motion.div>

      <div className="space-y-4">
        {[1, 2, 3].map((post) => (
          <motion.div
            key={post}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: post * 0.1 }}
          >
            <Card className="w-full transform transition-all duration-200 hover:shadow-lg">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex-1 sm:flex-none transition-colors duration-200 ${
                          likedPosts.includes(post) ? "text-primary" : ""
                        }`}
                        onClick={() => handleLike(post)}
                      >
                        <Heart
                          className={`w-4 h-4 mr-2 ${
                            likedPosts.includes(post) ? "fill-current" : ""
                          }`}
                        />
                        <span>123</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => toggleComments(post)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span>45</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        <span>共有</span>
                      </Button>
                    </div>
                    <AnimatePresence>
                      {activeCommentSection === post && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CommentSection postId={post.toString()} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;