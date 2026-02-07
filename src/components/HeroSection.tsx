import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden noise-overlay">
      {/* Shader background - keep exactly as-is */}
      <div className="absolute inset-0 z-0 min-h-full w-full">
        <ShaderAnimation className="absolute inset-0 h-full w-full min-h-[100vh]" />
      </div>
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/50 to-background/90 pointer-events-none" />
      {/* Background grid */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-40" />

      {/* Content with scroll-linked animation; background stays behind */}
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-5xl md:text-6xl lg:text-7xl hero-headline mb-6 animate-fade-in">
                Supercharge your{" "}
                <span className="hero-headline-accent">productivity</span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                A fast desktop client that brings pull requests, reviews, and
                deployments into one clean workspace.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <Button variant="hero" size="lg">
                  Get started
                </Button>
                <Button variant="heroOutline" size="lg">
                  Learn more
                </Button>
              </div>
            </>
          }
        >
          <img
            src={dashboardMockup}
            alt="Blake dashboard showing pull request analytics, merge rates, and repository metrics"
            className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export default HeroSection;
