import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Factory, Wrench, Cog, Shield, Award, Clock } from "lucide-react";
import heroImage from "@/assets/hero-manufacturing.png";
import cncImage from "@/assets/cnc-machining.png";
import precisionImage from "@/assets/precision-components.png";
import solutionsImage from "@/assets/custom-solutions.png";

const industries = [
  { name: "Automotive", icon: "🚗" },
  { name: "Aerospace", icon: "✈️" },
  { name: "Medical Devices", icon: "🏥" },
  { name: "Electronics", icon: "💻" },
  { name: "Defense", icon: "🛡️" },
  { name: "Energy", icon: "⚡" },
  { name: "Industrial", icon: "🏭" },
  { name: "Consumer Goods", icon: "📦" },
];

const capabilities = [
  {
    title: "CNC Machining",
    description: "High-precision CNC turning and milling for complex geometries",
    icon: Cog,
  },
  {
    title: "VMC Machining",
    description: "Vertical machining centers for accurate multi-axis operations",
    icon: Factory,
  },
  {
    title: "Stamping & Fabrication",
    description: "Sheet metal stamping and custom fabrication solutions",
    icon: Wrench,
  },
  {
    title: "Prototype Parts",
    description: "Rapid prototyping with no minimum order quantity",
    icon: Shield,
  },
];

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "No MOQ", label: "Minimum Order" },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 overlay-gradient" />
        <div className="relative z-10 container-custom py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Precision Manufacturing Excellence
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Your trusted partner for high-quality CNC machining, VMC operations, stamping, and custom fabrication. 
              We deliver prototype to production with <strong>no minimum order quantity</strong>.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base">
                <Link to="/contact">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 text-base">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Industries We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Delivering precision manufacturing solutions across diverse sectors with unwavering quality standards.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 text-center card-hover border border-border"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-semibold text-foreground">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art manufacturing capabilities to meet your most demanding requirements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 card-hover border border-border"
              >
                <capability.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{capability.title}</h3>
                <p className="text-muted-foreground text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products/Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From precision components to complete assemblies, we deliver excellence at every step.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: precisionImage,
                title: "Precision Components",
                description: "High-accuracy machined parts for critical applications across industries.",
                link: "/products",
              },
              {
                image: cncImage,
                title: "Manufacturing Services",
                description: "Complete manufacturing solutions from prototyping to mass production.",
                link: "/services",
              },
              {
                image: solutionsImage,
                title: "Custom Solutions",
                description: "Tailored manufacturing solutions designed for your specific needs.",
                link: "/solutions",
              },
            ].map((item, index) => (
              <div key={index} className="group bg-card rounded-lg overflow-hidden card-hover border border-border">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center text-primary hover:text-primary-light font-medium text-sm"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-industrial-dark text-primary-foreground">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Micro Engineering?</h2>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                With decades of experience in precision manufacturing, we combine traditional craftsmanship 
                with modern technology to deliver exceptional quality every time.
              </p>
              <ul className="space-y-4">
                {[
                  "No minimum order quantity - prototype to production",
                  "State-of-the-art CNC and VMC machinery",
                  "Quality-focused approach with strict tolerances",
                  "Quick turnaround times for urgent requirements",
                  "Experienced team with deep industry knowledge",
                  "Competitive pricing without compromising quality",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Award, title: "Quality Assured", desc: "Rigorous quality control at every step" },
                { icon: Clock, title: "On-Time Delivery", desc: "Meeting deadlines consistently" },
                { icon: Shield, title: "Reliable Partner", desc: "Trusted by leading companies" },
                { icon: Cog, title: "Advanced Tech", desc: "Latest manufacturing equipment" },
              ].map((item, index) => (
                <div key={index} className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                  <item.icon className="h-10 w-10 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-primary-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Get in touch with us today for a free quote. No minimum order quantity - 
            we handle everything from prototypes to large-scale production.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base">
              <Link to="/contact">
                Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-base">
              <Link to="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
