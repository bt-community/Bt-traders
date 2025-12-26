import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Ensure this matches your backend port (usually 8080)
const API_BASE = "https://bt-community-production.up.railway.app/api/v1";


const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSignup, setIsSignup] = useState(
    searchParams.get("mode") === "signup"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    setIsSignup(searchParams.get("mode") === "signup");
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

  const endpoint = isSignup
     ? "/auth/register"
     : "/auth/login";


    // Map frontend fields to backend Entity fields
    const payload = isSignup
      ? {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.mobile, // Maps to User.java phoneNumber
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      console.log("Attempting to connect to:", `${API_BASE}${endpoint}`);

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (isSignup) {
          toast({
            title: "Success!",
            description: "Account created. Please login.",
          });
          setIsSignup(false); // Switch to login view
        } else {
          const token = await res.text();
          localStorage.setItem("token", token.trim());
          toast({
            title: "Welcome back!",
            description: "Logged in successfully.",
          });
          navigate("/");
        }
      } else {
        // Handle specific backend errors (like 403 or 500)
        const errorMsg = await res.text();
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: errorMsg || "Invalid credentials or User exists.",
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Server unreachable. Is the backend running?",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(145_80%_42%_/_0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(30_100%_50%_/_0.05)_0%,_transparent_50%)]" />

      <div className="w-full max-w-md relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/20 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/10">
              <img
                src="Btlogo.jpg"
                alt="B.Tech Traders Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              BT  <span className="text-primary">Traders</span>
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground">
              {isSignup
                ? "Join our trading community today"
                : "Sign in to access your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="pl-10 bg-secondary/50 border-border/50 h-12"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="pl-10 bg-secondary/50 border-border/50 h-12"
              />
            </div>

            {isSignup && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  required
                  className="pl-10 bg-secondary/50 border-border/50 h-12"
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="pl-10 pr-10 bg-secondary/50 border-border/50 h-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {!isSignup && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Sign In"}
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              to={isSignup ? "/auth" : "/auth?mode=signup"}
              className="text-primary hover:underline font-medium"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Auth;