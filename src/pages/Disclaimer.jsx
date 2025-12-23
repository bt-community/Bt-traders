import {
  AlertTriangle,
  TrendingDown,
  Info,
  History,
  UserX,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  const sections = [
    {
      icon: Info,
      title: "Not Financial Advice",
      content:
        "The information provided by BT Traders, including signals, analysis, and educational content, is for informational purposes only. It should not be considered as professional financial or investment advice.",
    },
    {
      icon: ShieldAlert,
      title: "Accuracy of Information",
      content:
        "While we strive for accuracy, BT Traders does not guarantee the completeness or reliability of the information provided. Markets are volatile and unpredictable.",
    },
    {
      icon: UserX,
      title: "Individual Responsibility",
      content:
        "You are solely responsible for your trading decisions. BT Traders and its team members will not be held accountable for any financial losses you may experience.",
    },
    {
      icon: History,
      title: "Past Performance",
      content:
        "Any results shown on this website regarding past trades do not guarantee future performance. Hypothetical results have many inherent limitations.",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 md:py-24">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(38_92%_50%_/_0.05)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        {/* Header — aligned like other legal pages */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">
              Risk Disclosure
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Financial <span className="text-orange-500">Disclaimer</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Please read this risk disclosure carefully before using our services.
            Trading involves significant risk of loss.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5 md:space-y-6 mb-12">
          {/* High Risk Warning */}
          <div className="glass-card rounded-2xl border border-orange-500/20 bg-orange-500/5
                          p-4 sm:p-5 md:p-6
                          flex items-start sm:items-center gap-4">
            <TrendingDown className="w-6 h-6 text-orange-500 shrink-0" />
            <p className="text-xs md:text-sm font-bold text-orange-500 uppercase tracking-wide leading-relaxed">
              High Risk Warning: Trading financial instruments carries a high
              level of risk.
            </p>
          </div>

          {/* Disclaimer Sections */}
          {sections.map((item, index) => (
            <div
              key={index}
              className="glass-card border border-white/5 rounded-2xl
                         p-5 sm:p-6 md:p-8
                         flex flex-col sm:flex-row gap-4 sm:gap-6
                         transition-all hover:border-orange-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                <item.icon className="w-6 h-6 text-orange-500" />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/">
            <Button
              variant="outline"
              className="h-10 px-6 text-sm
                         md:h-11 md:px-8 md:text-base
                         gap-2
                         border-white/10 hover:bg-orange-500/5 hover:text-orange-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
