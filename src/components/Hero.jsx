import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // ✅ Safe localStorage check
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  // ✅ Safer scroll logic
  const scrollToPlans = () => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Professional Logic for Join Community Button
  const handleJoinCommunity = () => {
    if (isLoggedIn) {
      scrollToPlans();
    } else {
      navigate("/auth");
    }
  };

  // --- REUSABLE COMPONENT: The Gold Card ---
  // We extract this so we can show it on Mobile (stacked) AND Desktop (side) without code duplication
  const TradingCard = () => (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-primary/20 rounded-3xl blur-3xl"
      />

      <div className="relative glass-card p-6 md:p-8 rounded-3xl border-yellow-500/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              XAU / USD (Spot Gold)
            </p>
            <p className="font-display font-bold text-3xl text-foreground">
              $2,154.60
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-600">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">+1.45%</span>
          </div>
        </div>

        <svg className="w-full h-32" viewBox="0 0 300 100">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EAB308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q30,70 60,75 T120,50 T180,60 T240,30 T300,20 V100 H0 Z"
            fill="url(#goldGradient)"
          />
          <path
            d="M0,80 Q30,70 60,75 T120,50 T180,60 T240,30 T300,20"
            fill="none"
            stroke="#EAB308"
            strokeWidth="3"
            className="chart-line-animate"
          />
        </svg>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { name: "Gold (MCX)", value: "$2,658.10", change: "+0.34%" },
            { name: "Silver (XAG)", value: "$31.24", change: "+2.10%" },
          ].map((item) => (
            <div
              key={item.name}
              className="p-3 rounded-xl bg-secondary/50 border border-white/5"
            >
              <p className="text-xs text-muted-foreground font-medium">
                {item.name}
              </p>
              <p className="font-semibold text-foreground">{item.value}</p>
              <p className="text-xs text-yellow-500">{item.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>
            Market: <span className="text-primary">Open</span>
          </span>
          <span>Vol: 1.2M oz</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      // Added extra top padding for Mobile (pt-32) to clear the Navbar
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-20 pb-12 lg:pb-0"
    >
      {/* Background Elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(145_80%_42%_/_0.1)_0%,_transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(30_100%_50%_/_0.05)_0%,_transparent_50%)]"
      />

      {/* Animated Chart Line */}
      <svg
        aria-hidden="true"
        className="absolute right-0 top-1/4 w-1/2 h-1/2 opacity-20"
        viewBox="0 0 400 200"
      >
        <path
          d="M0,150 Q50,120 100,130 T200,80 T300,50 T400,20"
          fill="none"
          stroke="hsl(145 80% 42%)"
          strokeWidth="3"
          className="chart-line-animate"
        />
      </svg>

      {/* Floating Elements */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-20 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Join 50,000+ Traders
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up stagger-1">
              YOUR PATH TO{" "}
              <span className="text-gradient-primary">FINANCIAL</span>{" "}
              <span className="text-gradient-accent">SUCCESS</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-2">
              Master the art of trading with expert guidance, real-time signals,
              and a community of successful traders. Transform your financial
              future today.
            </p>

            {/* BUTTONS: Responsive sizing and padding */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-slide-up stagger-3 px-4 sm:px-0">
              <Button
                variant="hero"
                className="w-full sm:w-auto h-11 px-6 text-sm md:h-12 md:px-8 md:text-base lg:h-14 lg:px-10 lg:text-lg"
                onClick={scrollToPlans}
              >
                Get Started
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>

              <Button
                variant="hero-outline"
                className="w-full sm:w-auto h-11 px-6 text-sm md:h-12 md:px-8 md:text-base lg:h-14 lg:px-10 lg:text-lg"
                onClick={handleJoinCommunity}
              >
                Join Community
              </Button>
            </div>

            {/* --- MOBILE ONLY: Gold Card (Hidden on Desktop) --- */}
            <div className="block lg:hidden mt-12 animate-fade-in">
              <TradingCard />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 animate-slide-up stagger-4">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start text-primary mb-1">
                  <Users className="w-5 h-5" />
                  <span className="font-display font-bold text-2xl">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Traders</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start text-primary mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-display font-bold text-2xl">92%</span>
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start text-primary mb-1">
                  <Award className="w-5 h-5" />
                  <span className="font-display font-bold text-2xl">5+</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Years of Expertise
                </p>
              </div>
            </div>
          </div>

          {/* --- DESKTOP ONLY: Gold Card (Original Layout) --- */}
          {/* This preserves your exact Dashboard view */}
          <div className="relative hidden lg:block animate-fade-in">
            <TradingCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
