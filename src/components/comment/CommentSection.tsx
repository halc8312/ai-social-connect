import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface CommentSectionProps {
  postId?: string;
  projectId?: string;
}

const CommentSection = ({ postId, projectId }: CommentSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      // MVP段階では実際のAPI呼び出しは実装せず、成功トーストのみ表示
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "コメントを投稿しました",
      });
      setComment("");
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "もう一度お試しください",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="space-y-4 mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="コメントを入力..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !comment.trim()}>
            投稿する
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {[1, 2].map((commentId) => (
          <Card key={commentId} className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">ユーザー名</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    とても興味深い投稿ですね！
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">1時間前</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;