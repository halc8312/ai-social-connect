import { User, Calendar, Link as LinkIcon } from "lucide-react";

interface ProjectMetadataProps {
  userId: string;
  createdAt: Date;
  demoUrl?: string;
}

const ProjectMetadata = ({ userId, createdAt, demoUrl }: ProjectMetadataProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-6">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5" />
        <span>{userId}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <LinkIcon className="w-5 h-5" />
          <span>プロジェクトを見る</span>
        </a>
      )}
    </div>
  );
};

export default ProjectMetadata;