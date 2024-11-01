import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle } from "lucide-react";

const Projects = () => {
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">AIプロジェクト</h1>
        <Button className="w-full sm:w-auto">プロジェクトを投稿</Button>
      </div>

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
          <Card key={index} className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm whitespace-nowrap"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>{project.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>{project.comments}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;