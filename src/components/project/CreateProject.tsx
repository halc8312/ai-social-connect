import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus } from "lucide-react";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      // MVP段階では実際のAPI呼び出しは実装せず、成功トーストのみ表示
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "プロジェクトを作成しました",
        description: "プロジェクト一覧に反映されるまで少々お待ちください",
      });
      setTitle("");
      setDescription("");
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
      <Input
        placeholder="プロジェクトタイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="プロジェクトの説明..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[120px]"
      />
      <div className="flex justify-between items-center">
        <Button type="button" variant="ghost" size="icon">
          <ImagePlus className="h-5 w-5" />
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !title.trim() || !description.trim()}
        >
          作成する
        </Button>
      </div>
    </form>
  );
};

export default CreateProject;