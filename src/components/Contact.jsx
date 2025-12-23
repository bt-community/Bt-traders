import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const myEmail = "Avanishmauraya83@gmail.com";
    const subject = encodeURIComponent(
      `Trading Inquiry from ${formData.name}`
    );

    const body = encodeURIComponent(
      `Hello Avanish,\n\nYou have received a new message from your website contact form:\n\n` +
        `Name: ${formData.name}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `--- End of Message ---`
    );

    const mailtoLink = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;

      setIsSubmitting(false);

      toast({
        title: "Opening Email Client",
        description: "Please click 'Send' in your mail app to finish.",
      });

      setFormData({ name: "", message: "" });
    }, 800);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "Avanishmauraya83@gmail.com",
      href: "mailto:Avanishmauraya83@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "8112817217",
      href: "tel:8112817217",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Gorakhpur (UP)",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30_100%_50%_/_0.03)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-5 mx-auto">
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Get In Touch
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Contact <span className="text-gradient-accent">Us</span>
          </h2>

          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll get back
            to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {item.title}
                      </p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                <p>Monday – Friday: 24×7</p>
                <p>Saturday – Sunday: 10:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-secondary/50 border-border/50"
              />

              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                className="bg-secondary/50 border-border/50"
              />

              <Button
                type="submit"
                variant="accent"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Redirecting..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
