import { TestimonialsSection as TestimonialsMarquee } from "@/components/ui/testimonials-with-marquee";

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "Blake has transformed how we handle pull requests. The speed and clarity of our review process is unmatched.",
    href: "https://twitter.com/emmaai",
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "We've cut our deployment cycle time by 60% since bringing PRs, reviews, and deployments into one workspace.",
    href: "https://twitter.com/davidtech",
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "Finally, a desktop client that actually understands how dev teams work. Everything stays in context.",
  },
];

const TestimonialsSection = () => {
  return (
    <TestimonialsMarquee
      title="Trusted by developers worldwide"
      description="Join thousands of teams who ship faster with pull requests, reviews, and deployments in one clean workspace."
      testimonials={testimonials}
    />
  );
};

export default TestimonialsSection;
