import { Users, Shield, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Teamwork",
    description: "Help your team ship together with shared queues, mentions, and inline discussions that stay in context.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Guard your code with built-in secrets scanning, role-based access, and automatic audit logs.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track cycle time, review throughput, and bottlenecks so you can improve delivery week over week.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Eliminate repetitive tasks with smart automation for testing, deployments, and integrations.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl hero-headline max-w-lg">
            Everything your team needs{" "}
            <span className="hero-headline-accent">in one place</span>
          </h2>
          
          <p className="text-muted-foreground max-w-sm lg:text-right">
            Streamline collaboration, keep your work secure, and gain insights to deliver better results, faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 hover-lift opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="feature-icon mb-5">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
