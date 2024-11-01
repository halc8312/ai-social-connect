interface ProjectToolsProps {
  tools: string[];
}

const ProjectTools = ({ tools }: ProjectToolsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">使用技術</h3>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm backdrop-blur-sm"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectTools;