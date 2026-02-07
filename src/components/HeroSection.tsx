import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden noise-overlay">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      <div className="section-container relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl hero-headline mb-6 animate-fade-in">
            Supercharge your{" "}
            <span className="hero-headline-accent">productivity</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A fast desktop client that brings pull requests, reviews, and deployments into one clean workspace.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="lg">
              Get started
            </Button>
            <Button variant="heroOutline" size="lg">
              Learn more
            </Button>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="relative glass-card rounded-xl overflow-hidden shadow-elegant mx-auto max-w-5xl">
            <img
              src={dashboardMockup}
              alt="GET Click dashboard showing pull request analytics, merge rates, and repository metrics"
              className="w-full h-auto"
              loading="lazy"
            />
            {/* Overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Decorative glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-primary/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
