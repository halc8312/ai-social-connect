import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, MessageCircle, Layout, LogOut, Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Close drawer when switching to desktop view
  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  const NavigationContent = () => (
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
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {isDesktop ? (
        <aside className="fixed left-0 top-0 h-full w-64 border-r bg-card p-4">
          <NavigationContent />
        </aside>
      ) : (
        <>
          {/* Mobile Header */}
          <header className="fixed top-0 left-0 right-0 h-16 border-b bg-card px-4 flex items-center justify-between z-50">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4">
                  <NavigationContent />
                </div>
              </DrawerContent>
            </Drawer>
            <Link to="/" className="text-xl font-bold text-primary">
              AI Social
            </Link>
            <div className="w-10" /> {/* Spacer for layout balance */}
          </header>
        </>
      )}

      {/* Main content */}
      <main className={`${isDesktop ? "ml-64" : "mt-16"} p-8`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;