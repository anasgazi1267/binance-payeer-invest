
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onModeSwitch: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, mode, onModeSwitch, onSuccess }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (mode === "register") {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          toast({
            title: "Missing Information",
            description: "Please fill in all fields",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: "Weak Password",
            description: "Password must be at least 6 characters",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        // Register with Supabase
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.name
        });

        if (error) {
          toast({
            title: "Registration Failed",
            description: error.message,
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Account Created!",
          description: "Your account has been created successfully",
        });
      } else {
        if (!formData.email || !formData.password) {
          toast({
            title: "Missing Information",
            description: "Please enter email and password",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        // Login with Supabase
        const { error } = await signIn(formData.email, formData.password);

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Welcome Back!",
          description: "You have successfully logged in",
        });
      }
      
      onSuccess();
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setIsLoading(false);
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <Label htmlFor="name" className="text-white/80">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-white/80">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/50 hover:text-white/80"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                />
              </div>
            </div>
          )}

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
          >
            {isLoading ? "Please wait..." : (mode === "login" ? "Sign In" : "Create Account")}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-white/20">
          <p className="text-white/70">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            onClick={onModeSwitch}
            className="text-green-400 hover:text-green-300 p-0 h-auto"
          >
            {mode === "login" ? "Sign up here" : "Sign in here"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
