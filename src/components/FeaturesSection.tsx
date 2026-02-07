"use client";

import { Users, Shield, BarChart3, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BackgroundPaperShaders } from "@/components/ui/background-paper-shaders";

const features = [
  {
    icon: Users,
    title: "Teamwork",
    description:
      "Help your team ship together with shared queues, mentions, and inline discussions that stay in context.",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Guard your code with built-in secrets scanning, role-based access, and automatic audit logs.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track cycle time, review throughput, and bottlenecks so you can improve delivery week over week.",
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Eliminate repetitive tasks with smart automation for testing, deployments, and integrations.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      {/* Paper shader background */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaperShaders
          className="h-full w-full"
          color1="#0f1114"
          color2="#1a2e2a"
          showRing={false}
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-background/70 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="hero-headline max-w-lg text-4xl md:text-5xl">
            Everything your team needs{" "}
            <span className="hero-headline-accent">in one place</span>
          </h2>

          <p className="max-w-sm text-muted-foreground lg:text-right">
            Streamline collaboration, keep your work secure, and gain insights to
            deliver better results, faster.
          </p>
        </div>

        {/* Features Grid with GlowingEffect */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="min-h-[14rem] opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="relative h-full rounded-[1.25rem] border border-border p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    variant="primary"
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                      <div className="feature-icon mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="hero-headline text-lg font-semibold leading-tight text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
