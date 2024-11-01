import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus } from "lucide-react";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      // MVP段階では実際のAPI呼び出しは実装せず、成功トーストのみ表示
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "投稿を作成しました",
        description: "フィードに反映されるまで少々お待ちください",
      });
      setContent("");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-lg p-4 shadow-sm">
      <Textarea
        placeholder="AIツールについて共有しよう..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px]"
      />
      <div className="flex justify-between items-center">
        <Button type="button" variant="ghost" size="icon">
          <ImagePlus className="h-5 w-5" />
        </Button>
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          投稿する
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;