import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    subtitle: "for individual devs",
    price: "$0",
    period: "/month",
    features: [
      "8 GB storage",
      "15 GB monthly transfer",
      "Up to 5 users per namespace",
      "Private repositories",
    ],
    cta: "Start now",
    highlighted: false,
  },
  {
    name: "Pro",
    subtitle: "for small teams",
    price: "$20",
    period: "/month",
    features: [
      "40 GB storage",
      "Advanced CI/CD",
      "Sprint planning & roadmaps",
      "Protected branches",
    ],
    cta: "Start now",
    highlighted: true,
  },
  {
    name: "Premium",
    subtitle: "for large companies",
    price: "$89",
    period: "/month",
    features: [
      "100 GB storage",
      "Security dashboards",
      "Unlimited guest viewers",
      "Container image scanning",
    ],
    cta: "Start now",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative overflow-hidden py-24">
      {/* Sparkles background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="pricing-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          speed={2}
          particleDensity={80}
          particleColor="#7dd3b8"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {/* Soft gradient overlay so cards stay readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background/70 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl hero-headline">
            Choose your{" "}
            <span className="hero-headline-accent">best plan</span>
          </h2>
          
          <p className="text-muted-foreground max-w-sm lg:text-right">
            Fair terms for individuals, teams, and enterprises—pay only for what you use.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 transition-all duration-300 opacity-0 animate-fade-in ${
                plan.highlighted
                  ? "pricing-highlight glass-card border-primary/30"
                  : "glass-card"
              }`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? "pricing" : "pricingOutline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
