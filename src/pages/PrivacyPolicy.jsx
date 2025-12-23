import { Shield, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "December 2025";

  const policies = [
    {
      icon: Shield,
      title: "Data Protection",
      description:
        "We implement industry-standard security measures to ensure your trading data and personal information are encrypted and secure.",
    },
    {
      icon: Eye,
      title: "Data Usage",
      description:
        "We only collect information necessary to provide our trading services. We never sell your personal data to third parties.",
    },
    {
      icon: Lock,
      title: "Account Security",
      description:
        "Your login credentials are encrypted. We recommend using two-factor authentication (2FA) for maximum account protection.",
    },
    {
      icon: FileText,
      title: "Cookies",
      description:
        "We use cookies to improve your browsing experience and remember your dashboard preferences.",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 md:py-24">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(145_80%_42%_/_0.05)_0%,_transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(30_100%_50%_/_0.03)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        {/* Header — centered like logo */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Trust & Safety
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Privacy <span className="text-gradient-primary">Policy</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            At BT Traders, your privacy is our top priority. This policy explains
            how we handle your data.
          </p>
        </div>

        {/* Policy Cards — MOBILE CENTERED */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12 md:mb-16">
          {policies.map((item, index) => (
            <div
              key={index}
              className="
                glass-card border border-white/5 rounded-2xl
                p-5 sm:p-6 md:p-8
                hover:border-primary/20 transition-colors
                text-center sm:text-center md:text-left
              "
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 mx-auto md:mx-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto glass-card border border-white/10 bg-secondary/20 rounded-2xl p-5 sm:p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground text-center md:text-left">
            Important Information
          </h2>

          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed text-center md:text-left">
            <p>
              By using our platform, you agree to the collection and use of
              information in accordance with this policy. We may update our
              Privacy Policy from time to time. Any changes will be posted on
              this page.
            </p>
            <p>
              If you have any questions about this Privacy Policy, you can
              contact us at:
              <span className="text-primary ml-1">
                Avanishmauraya83@gmail.com
              </span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground italic">
              Last Updated: {lastUpdated}
            </p>

            <Link to="/">
              <Button
                variant="ghost"
                className="h-9 px-5 text-sm gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
