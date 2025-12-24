import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, ArrowLeft, CreditCard, User, Mail, Phone, Shield, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get the Telegram Link from Environment Variables
  // Note: If using Create React App, use process.env.REACT_APP_TELEGRAM_LINK instead
  const telegramLink = import.meta.env.VITE_TELEGRAM_LINK;

  const plan = searchParams.get("plan") || "1 Month";
  const price = searchParams.get("price") || "₹999";

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    telegramUsername: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(145_80%_42%_/_0.1)_0%,_transparent_50%)]" />

        <div className="w-full max-w-md relative z-10 text-center">
          <div className="glass-card p-8 rounded-2xl">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your {plan} subscription is now active.
            </p>

            {/* Telegram Link - Loaded from Env */}
            <div className="bg-secondary/50 rounded-xl p-6 mb-6">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-semibold text-foreground mb-2">Join Our Premium Channel</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Click the button below to join our exclusive Telegram channel
              </p>
              
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="accent" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Telegram Channel
                </Button>
              </a>
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              A confirmation email has been sent to {formData.email}
            </p>

            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(145_80%_42%_/_0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(30_100%_50%_/_0.05)_0%,_transparent_50%)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="glass-card p-6 rounded-2xl h-fit">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Order Summary
            </h2>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{plan} Plan</h3>
                <p className="text-sm text-muted-foreground">Premium Telegram Access</p>
              </div>
              <p className="font-display font-bold text-xl text-foreground">{price}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST 18%)</span>
                <span className="text-foreground">Included</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-border/50">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-display font-bold text-2xl text-primary">{price}</span>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 mt-6 p-3 rounded-lg bg-primary/10 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Secured by Razorpay</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Your Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="pl-10 bg-secondary/50 border-border/50 h-12"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pl-10 bg-secondary/50 border-border/50 h-12"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  className="pl-10 bg-secondary/50 border-border/50 h-12"
                />
              </div>

              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Telegram Username (optional)"
                  value={formData.telegramUsername}
                  onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                  className="pl-10 bg-secondary/50 border-border/50 h-12"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay {price}
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our Terms of Service and acknowledge our Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;