import { Target, Shield, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Expert Analysis",
    description:
      "Our team of experienced traders provides accurate market analysis and trading signals backed by years of expertise.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Learn professional risk management strategies to protect your capital and maximize returns consistently.",
  },
  {
    icon: Lightbulb,
    title: "Education First",
    description:
      "We believe in empowering traders with knowledge. Get access to comprehensive courses and learning materials.",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join a thriving community of traders who share insights, strategies, and support each other's growth.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(30_100%_50%_/_0.05)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                About Us
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
              Empowering Traders to{" "}
              <span className="text-gradient-primary">
                Achieve Excellence
              </span>
            </h2>

            <p className="text-sm md:text-lg text-muted-foreground mb-5 max-w-xl mx-auto lg:mx-0">
              BT Traders is a premier trading community dedicated to helping
              individuals master the financial markets. With over 5 years of
              experience and a proven track record, we've helped thousands of
              traders transform their financial futures.
            </p>

            <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Our mission is simple: provide high-quality education, accurate
              trading signals, and a supportive community that helps traders at
              every level succeed.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="font-display font-bold text-2xl md:text-3xl text-primary">
                  50K+
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Traders Trained
                </p>
              </div>

              <div>
                <p className="font-display font-bold text-2xl md:text-3xl text-primary">
                  5+
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>

              <div>
                <p className="font-display font-bold text-2xl md:text-3xl text-primary">
                  92%
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-5 md:p-6 rounded-2xl card-hover text-center sm:text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>

                <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-2">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
