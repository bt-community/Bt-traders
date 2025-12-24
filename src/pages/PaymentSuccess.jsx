import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, TrendingUp, Shield } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  // Get plan details passed from Plans.jsx, or default to generic
  const { planName, amount } = location.state || { planName: "Premium", amount: "" };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
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
            Thank you for your purchase. Your <b>{planName}</b> subscription is now active.
          </p>

          {/* Telegram Link Section */}
          <div className="bg-secondary/50 rounded-xl p-6 mb-6 border border-primary/20">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-semibold text-foreground mb-2">Join Our Premium Channel</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to join our exclusive Telegram channel.
            </p>
            <a
              href="https://tg://join?invite=P4lIOoikako2Yjdl" // REPLACE with your actual link
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="accent" className="w-full font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Telegram Channel
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6 p-3 rounded-lg bg-primary/10 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Secured by Razorpay</span>
          </div>

          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;