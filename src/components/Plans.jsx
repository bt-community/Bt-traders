import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "https://bt-community-production.up.railway.app/api/v1";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const plans = [
  {
    name: "1 Month",
    price: "1699",
    displayPrice: "₹1,699",
    savings: "Save ₹0",
    duration: "month",
    features: [
      "Premium Telegram Access",
      "Daily Trading Signals",
      "Market Analysis",
      "Community Support",
    ],
  },
  {
    name: "3 Months",
    price: "3999",
    displayPrice: "₹3,999",
    duration: "3 months",
    savings: "Save ₹998",
    features: [
      "Everything in 1 Month",
      "Weekly Live Sessions",
      "Priority Support",
      "Exclusive Strategies",
    ],
  },
  {
    name: "6 Months",
    price: "8499",
    displayPrice: "₹8,499",
    duration: "6 months",
    savings: "Save ₹1,995",
    features: [
      "Everything in 3 Months",
      "1-on-1 Mentorship",
      "Advanced Chart Analysis",
      "Exclusive Strategies",
    ],
    popular: true,
  },
  {
    name: "12 Months",
    price: "14999",
    displayPrice: "₹14,999",
    duration: "year",
    savings: "Save ₹5,989",
    features: [
      "Everything in 9 Months",
      "Lifetime Resource Access",
      "Quarterly 1-on-1 Calls",
      "Market Analysis Course",
    ],
    best: true,
  },
];

const Plans = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayment = async (planName, planPrice) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to subscribe.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Payment SDK failed to load.",
      });
      return;
    }

    

    try {
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ amount: planPrice }),
      });

      const orderText = await res.text();
      const order = JSON.parse(orderText);


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "BT Traders Premium",
        description: `${planName} Subscription`,
        order_id: order.id,
        handler: async (response) => {
          const vRes = await fetch(`${API_BASE}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeader() },
            body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
        }),

          });

          if (vRes.ok) {
            toast({ title: "Payment Successful!" });
            navigate("/payment-success", {
              state: { planName, amount: planPrice },
            });
          }
        },
        theme: { color: "#10b981" },
      };

      new window.Razorpay(options).open();
    } catch {
      toast({
        variant: "destructive",
        title: "Payment Error",
      });
    }
  };

  return (
    <section id="plans" className="py-16 md:py-24 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(145_80%_42%_/_0.05)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-5 mx-auto">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Premium Plans
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Choose Your{" "}
            <span className="text-gradient-primary">Trading Journey</span>
          </h2>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`
                relative rounded-2xl flex flex-col
                bg-background/80 backdrop-blur
                border border-border/60 lg:border-border
                p-4 sm:p-5 md:p-6
                transition-all duration-300
                hover:scale-[1.02]
                ${plan.popular ? "lg:ring-2 lg:ring-primary/20" : ""}
                ${plan.best ? "lg:ring-2 lg:ring-accent/20" : ""}
              `}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Badges */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              {plan.best && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Best Value
                </div>
              )}

              {/* Pricing */}
              <div className="text-center mb-4">
                <h3 className="font-display font-semibold text-base md:text-lg mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display font-bold text-2xl md:text-3xl">
                    {plan.displayPrice}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /{plan.duration}
                  </span>
                </div>
                <p className="text-primary text-xs md:text-sm font-medium mt-1">
                  {plan.savings}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular || plan.best ? "accent" : "outline"}
                className="w-full h-10 md:h-11 font-bold"
                onClick={() => handlePayment(plan.name, Number(plan.price))}

              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
