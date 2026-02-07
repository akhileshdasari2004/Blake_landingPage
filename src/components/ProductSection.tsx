"use client";

import { GitBranch, Plug, Users, BarChart3, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const gridItems = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <GitBranch className="h-4 w-4 text-primary" />,
    title: "Repository indicator optimizations",
    description:
      "Instantly see which repos need attention with smart status indicators and automated health checks.",
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <Plug className="h-4 w-4 text-primary" />,
    title: "Seamless integrations",
    description:
      "Connect with GitHub, GitLab, Bitbucket, and your favorite CI/CD tools in minutes.",
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Users className="h-4 w-4 text-primary" />,
    title: "Real-time collaboration",
    description:
      "Comment, review, and approve pull requests with your team—all in sync, all in context.",
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <BarChart3 className="h-4 w-4 text-primary" />,
    title: "Analytics that drive delivery",
    description:
      "Track cycle time, review throughput, and bottlenecks so you can improve delivery week over week.",
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <Zap className="h-4 w-4 text-primary" />,
    title: "Automation that scales",
    description:
      "Eliminate repetitive tasks with smart automation for testing, deployments, and integrations.",
  },
];

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
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
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="hero-headline pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] text-muted-foreground md:text-base md:leading-[1.375rem]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const ProductSection = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="hero-headline mb-4 text-4xl md:text-5xl">
            We build a service that removes friction from{" "}
            <span className="hero-headline-accent">code to cloud</span>
          </h2>
          <p className="text-xl leading-relaxed text-muted-foreground">
            —so your team can focus on shipping innovation.
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {gridItems.map((item) => (
            <GridItem
              key={item.title}
              area={item.area}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductSection;
