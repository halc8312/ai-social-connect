import { CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectHeaderProps {
  title: string;
}

const ProjectHeader = ({ title }: ProjectHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </CardTitle>
    </CardHeader>
  );
};

export default ProjectHeader;