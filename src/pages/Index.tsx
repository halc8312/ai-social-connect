import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Connect with AI Enthusiasts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join a community of innovators, creators, and AI enthusiasts. Share your experiences,
            showcase your projects, and learn from others.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/signup")}
              className="button-primary text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/explore")}
              variant="outline"
              className="text-lg px-8 py-3"
            >
              Explore
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Connect"
            description="Find and connect with other AI enthusiasts and professionals"
            icon="🤝"
          />
          <FeatureCard
            title="Share"
            description="Share your AI projects, experiences, and learnings"
            icon="💡"
          />
          <FeatureCard
            title="Grow"
            description="Learn from others and grow your AI expertise"
            icon="📈"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md card-hover">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;