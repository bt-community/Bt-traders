import { Link } from "react-router-dom";
import {
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Community", path: "/#plans" },
    { name: "About", path: "/#about" },
    { name: "Reviews", path: "/#reviews" },
    { name: "Contact", path: "/#contact" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/b.tech_traders?igsh=bDNqYjZzYjF4YXQ4&utm_source=qr",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@b.techtraderss?si=5dRmKiQFTA-1MMjl",
      label: "YouTube",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/avnish-kushwaha-b50434259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/CA-Avnish-k/100085196029111/",
      label: "Facebook",
    },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="container-custom py-12 md:py-16">
        {/* Top Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <Link
              to="/"
              className="flex items-center justify-center lg:justify-start gap-3 group mb-4"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/10">
                <img
                  src="Btlogo.jpg"
                  alt="B.Tech Traders Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-display font-bold text-xl text-foreground">
                BT <span className="text-primary">Traders</span>
              </span>
            </Link>

            <p className="text-muted-foreground max-w-md mx-auto lg:mx-0 mb-6 text-sm md:text-base">
              Empowering traders with expert guidance, real-time signals, and a
              supportive community. Join us on your path to financial success.
            </p>

            <div className="flex justify-center lg:justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 md:w-10 md:h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.path.startsWith("/#") ? (
                    <button
                      onClick={() => handleNavClick(link.path)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center lg:text-left">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row gap-4 justify-between items-center text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} B.Tech Traders. All rights reserved.
          </p>

          <p className="text-[11px] md:text-xs text-muted-foreground max-w-xl leading-relaxed">
            Trading involves risk. Past performance is not indicative of future
            results. Please trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
