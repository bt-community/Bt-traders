import {
  FileCheck,
  ShieldAlert,
  UserCheck,
  Scale,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "User Eligibility",
      content:
        "By using BT Traders, you confirm that you are at least 18 years of age and have the legal capacity to enter into this agreement.",
    },
    {
      icon: FileCheck,
      title: "Service Usage",
      content:
        "Our signals and educational content are for personal use only. Commercial redistribution of our data is strictly prohibited.",
    },
    {
      icon: ShieldAlert,
      title: "Account Responsibility",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content:
        "BT Traders is not liable for any financial losses incurred while using our tools or following our market analysis.",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 md:py-24">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(145_80%_42%_/_0.05)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <FileCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Legal Agreement
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold">
            Terms of <span className="text-gradient-primary">Service</span>
          </h1>
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-5 md:space-y-6 mb-12">
          {sections.map((item, index) => (
            <div
              key={index}
              className="glass-card border border-white/5 rounded-2xl
                         p-5 sm:p-6 md:p-8
                         flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                <item.icon className="w-6 h-6 text-primary" />
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
                         gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
