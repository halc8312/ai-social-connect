import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, MessageCircle, Layout, LogOut } from "lucide-react";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r bg-card p-4">
        <div className="flex flex-col h-full">
          <Link to="/" className="text-2xl font-bold text-primary mb-8">
            AI Social
          </Link>
          
          <nav className="space-y-2">
            <Link to="/feed">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Feed
              </Button>
            </Link>
            <Link to="/communities">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Communities
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost" className="w-full justify-start">
                <Layout className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
          </nav>

          <div className="mt-auto">
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;