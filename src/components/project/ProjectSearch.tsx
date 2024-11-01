import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectSearchProps {
  onSearch: (query: string) => void;
}

const ProjectSearch = ({ onSearch }: ProjectSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="プロジェクトを検索..."
        className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-primary/50 transition-colors rounded-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ProjectSearch;