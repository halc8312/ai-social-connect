import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  projects: any[];
  isLoading: boolean;
  likedProjects: string[];
  activeCommentSection: number | null;
  onLike: (projectId: string) => void;
  toggleComments: (projectId: number) => void;
}

const ProjectList = ({
  projects,
  isLoading,
  likedProjects,
  activeCommentSection,
  onLike,
  toggleComments,
}: ProjectListProps) => {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-8 w-3/4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        プロジェクトが見つかりませんでした
      </div>
    );
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isLiked={likedProjects.includes(project.id)}
          onLike={onLike}
          activeCommentSection={activeCommentSection}
          toggleComments={toggleComments}
        />
      ))}
    </>
  );
};

export default ProjectList;