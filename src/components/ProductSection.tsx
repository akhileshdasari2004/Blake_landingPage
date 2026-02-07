import dashboardMockup from "@/assets/dashboard-mockup.png";

const ProductSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl hero-headline mb-4">
            We build a service that removes friction from{" "}
            <span className="hero-headline-accent">code to cloud</span>
          </h2>
        </div>

        {/* Side-by-side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Code/Dashboard Preview */}
          <div className="relative">
            <div className="glass-card rounded-xl overflow-hidden shadow-elegant">
              <img
                src={dashboardMockup}
                alt="Code review interface showing repository analytics and pull request workflow"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-primary/8 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right: Supporting Copy */}
          <div className="lg:pl-8">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              —so your team can focus on shipping innovation.
            </p>
            
            <div className="space-y-6">
              <div className="glass-card rounded-lg p-5 hover-lift">
                <h3 className="font-semibold text-foreground mb-2">Repository indicator optimizations</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly see which repos need attention with smart status indicators and automated health checks.
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-5 hover-lift">
                <h3 className="font-semibold text-foreground mb-2">Seamless integrations</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with GitHub, GitLab, Bitbucket, and your favorite CI/CD tools in minutes.
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-5 hover-lift">
                <h3 className="font-semibold text-foreground mb-2">Real-time collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Comment, review, and approve pull requests with your team—all in sync, all in context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
