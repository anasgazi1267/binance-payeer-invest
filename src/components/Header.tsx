
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
  currentUser?: { name: string; email: string };
  onMenuClick?: () => void;
}

export const Header = ({ 
  isAuthenticated = false, 
  onLogin, 
  onRegister, 
  onLogout, 
  currentUser,
  onMenuClick 
}: HeaderProps) => {
  const [balance] = useState(0.00);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="text-white hover:bg-white/10 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Cashjo</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-white hidden sm:block">
                  <span className="text-sm text-white/70">Balance:</span>
                  <span className="ml-2 font-bold text-lg text-green-400">${balance.toFixed(2)}</span>
                </div>
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="border-white/20 text-white hover:bg-white/10 bg-white/5"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/20 rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-white/10">
                        <p className="text-white font-medium">{currentUser?.name || "User"}</p>
                        <p className="text-white/70 text-sm">{currentUser?.email || "user@example.com"}</p>
                      </div>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center px-3 py-2 text-red-400 hover:bg-white/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={onLogin}
                  className="border-white/20 text-white hover:bg-white/10 bg-white/5"
                >
                  Login
                </Button>
                <Button
                  onClick={onRegister}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
