import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Lightbulb, Target, Wrench, Zap } from "lucide-react";
import customImage from "@/assets/custom-solutions.png";
import cncImage from "@/assets/cnc-machining.png";
import precisionImage from "@/assets/precision-components.png";

const solutions = [
  {
    icon: Lightbulb,
    title: "Design-to-Manufacturing",
    description: "Complete support from concept to finished product. Our engineering team works with you to optimize designs for manufacturability.",
    benefits: [
      "Design for Manufacturing (DFM) analysis",
      "Material selection guidance",
      "Cost optimization suggestions",
      "Prototype validation",
    ],
    image: customImage,
  },
  {
    icon: Wrench,
    title: "Custom Tooling Solutions",
    description: "In-house tooling development for specialized manufacturing requirements. Jigs, fixtures, and custom dies for your specific needs.",
    benefits: [
      "Custom jig and fixture design",
      "Progressive die development",
      "Gauges and inspection tools",
      "Tool maintenance support",
    ],
    image: cncImage,
  },
];

const industries = [
  {
    name: "Automotive",
    description: "Precision components for OEMs and tier suppliers - engine parts, transmission components, chassis elements.",
  },
  {
    name: "Aerospace",
    description: "High-precision parts meeting stringent aerospace standards for structural and functional components.",
  },
  {
    name: "Medical Devices",
    description: "Biocompatible materials and cleanroom-compatible manufacturing for medical equipment and instruments.",
  },
  {
    name: "Electronics",
    description: "Precision enclosures, heat sinks, connectors, and mechanical components for electronic devices.",
  },
  {
    name: "Industrial Equipment",
    description: "Robust components for machinery, automation equipment, and industrial applications.",
  },
  {
    name: "Defense",
    description: "Secure manufacturing of defense-grade components with strict quality and confidentiality.",
  },
];

const SolutionsPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-industrial-dark py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Solutions</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Custom manufacturing solutions designed for your specific industry and application requirements.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tailored Manufacturing Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't just manufacture parts - we provide complete solutions that address your unique challenges.
            </p>
          </div>

          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <solution.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>
                  <ul className="space-y-3 mb-6">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/contact">
                      Discuss Your Requirements <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Industry-Specific Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep expertise across multiple industries with specialized solutions for each sector.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-card rounded-lg p-6 card-hover border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">{industry.name}</h3>
                <p className="text-muted-foreground text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <section className="section-padding bg-industrial-dark text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Partnership Approach</h2>
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              We believe in building long-term partnerships rather than transactional relationships. 
              When you work with Micro Engineering, you get a dedicated team committed to your success.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Understanding", desc: "We take time to understand your business and requirements" },
                { title: "Collaboration", desc: "Work together to find the best manufacturing solutions" },
                { title: "Support", desc: "Continuous support from prototype to production and beyond" },
              ].map((item, index) => (
                <div key={index} className="bg-primary-foreground/10 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-primary-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Let's Build Your Solution
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Every challenge is unique. Share yours with us and let's create a customized manufacturing solution together.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">
              Start the Conversation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
