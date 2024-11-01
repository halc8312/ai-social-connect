import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/api/projects";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "プロジェクトを作成しました",
        description: "プロジェクト一覧に反映されるまで少々お待ちください",
      });
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createMutation.mutate({
      title,
      description,
      aiTools: [], // TODO: AIツールの選択機能を実装
      images: [], // TODO: 画像アップロード機能を実装
    });
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
          disabled={createMutation.isPending || !title.trim() || !description.trim()}
        >
          {createMutation.isPending ? "作成中..." : "作成する"}
        </Button>
      </div>
    </form>
  );
};

export default CreateProject;