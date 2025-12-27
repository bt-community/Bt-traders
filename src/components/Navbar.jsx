import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "https://bt-community-production.up.railway.app/api/v1";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState(null);
const [showSubInfo, setShowSubInfo] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const navLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Community", id: "plans", path: "/#plans" },
    { name: "About", id: "about", path: "/#about" },
    { name: "Reviews", id: "reviews", path: "/#reviews" },
    { name: "Contact", id: "contact", path: "/#contact" },
  ];
  

  // ScrollSpy Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const sections = navLinks.map((link) => link.id);
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= 300) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch(`${API_BASE}/subscription/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.ok ? res.json() : null)
    .then(setSubscription)
    .catch(() => {});
  }, []);;
  

  const handleNavClick = (id, path) => {
    setIsOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/");
      setActiveSection("home");
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      } else {
        navigate(path);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({ title: "Logged Out", description: "See you next time!" });
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/20 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/10">
              <img
                src="Btlogo.jpg"
                alt="B.Tech Traders Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl leading-none text-foreground">
                BT <span className="text-primary">Traders</span>
              </span>
              {/* Removed the BT Traders tagline and replaced with a descriptive one, or you can delete this span entirely */}
              {/* <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-1">
                Official Channel
              </span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id, link.path)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

         {/* Desktop Auth Buttons (Restored) */}
<div className="hidden md:flex items-center gap-3 relative">
  {subscription?.active && (
    <div className="relative">
      <button
        onClick={() => setShowSubInfo(!showSubInfo)}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Active
      </button>

   {showSubInfo && (
  <div className="absolute right-0 top-14 w-64 rounded-xl bg-card border border-border p-4 shadow-2xl z-50 animate-fade-in">
    <div className="space-y-3">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">
          {subscription.plan}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Started:</span>{" "}
          {new Date(subscription.startDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Expires:</span>{" "}
          {new Date(subscription.endDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      
      <button
        onClick={() => window.open("https://t.me/+P4lIOoikako2Yjdl", "_blank")}
        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
        Join Telegram Channel
      </button>
    </div>
  </div>
)}
    </div>
  )}

  {isLoggedIn ? (
    <Button
      variant="destructive"
      size="default"
      onClick={handleLogout}
      className="gap-2"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  ) : (
    <>
      <Link to="/auth">
        <Button variant="ghost">Sign In</Button>
      </Link>
      <Link to="/auth?mode=signup">
        <Button variant="accent">Sign Up</Button>
      </Link>
    </>
  )}
</div>
        

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id, link.path)}
                  className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="flex gap-3 mt-4 pt-4 border-t border-border/50 px-2">
                {isLoggedIn ? (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth?mode=signup" className="flex-1">
                      <Button variant="accent" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
