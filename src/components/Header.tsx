import { Scissors, Calendar, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Scissors className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">CutCraft</h1>
            <p className="text-sm text-muted-foreground">Premium Barber Shop</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-2">
          <NavLink to="/">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm" 
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book
              </Button>
            )}
          </NavLink>
          
          <NavLink to="/profile">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm" 
                className="gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
            )}
          </NavLink>
          
          <NavLink to="/admin">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm" 
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;