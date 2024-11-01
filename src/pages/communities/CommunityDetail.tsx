import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comment/CommentSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CommunityDetail = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

  const handleShare = () => {
    toast({
      title: "共有リンクをコピーしました",
    });
  };

  if (!id) {
    navigate("/communities");
    return null;
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
            <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                コミュニティ名
              </span>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                コミュニティに参加
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Users className="w-5 h-5" />
              <span>0メンバー</span>
            </div>
            <p className="text-gray-600 mb-6">
              コミュニティの説明がここに表示されます。
            </p>
            
            <div className="space-y-6">
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