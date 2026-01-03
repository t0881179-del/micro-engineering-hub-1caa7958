import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Cog, Shield, Award, Clock, Car, Heart, Cpu, Zap, Settings } from "lucide-react";
import heroImage from "@/assets/hero-manufacturing.png";
import iconCnc from "@/assets/icon-cnc.png";
import iconVmc from "@/assets/icon-vmc.png";
import iconStamping from "@/assets/icon-stamping.png";
import iconPrototype from "@/assets/icon-prototype.png";
import iconMachinery from "@/assets/icon-machinery.png";

const industries = [
  { name: "Automotive", subtitle: "High-performance components", icon: Car, customIcon: null },
  { name: "Medical", subtitle: "Surgical instruments", icon: Heart, customIcon: null },
  { name: "Electronics", subtitle: "Precision connectors", icon: Cpu, customIcon: null },
  { name: "Defense", subtitle: "Military-grade parts", icon: Shield, customIcon: null },
  { name: "Energy", subtitle: "Power generation components", icon: Zap, customIcon: null },
  { name: "Industrial", subtitle: "Manufacturing equipment", icon: Settings, customIcon: null },
  { name: "Machinery", subtitle: "Heavy equipment parts", icon: null, customIcon: iconMachinery },
];

const capabilities = [
  {
    title: "CNC Machining",
    description: "High-precision CNC turning and milling for complex geometries",
    icon: iconCnc,
  },
  {
    title: "VMC Machining",
    description: "Vertical machining centers for accurate multi-axis operations",
    icon: iconVmc,
  },
  {
    title: "Stamping, Tube Bending & Metal Fabrication",
    description: "Sheet metal stamping, tube bending and custom fabrication solutions",
    icon: iconStamping,
  },
  {
    title: "Prototype Parts",
    description: "Rapid prototyping with no minimum order quantity",
    icon: iconPrototype,
  },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative z-10 container-custom py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Precision Manufacturing Excellence
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Your trusted partner for high-quality CNC machining, VMC operations, stamping, and custom fabrication. 
              We deliver prototype to production with <strong>no minimum order quantity</strong>.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" variant="cta" className="text-base">
                <Link to="/contact">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 text-white border-white/20 hover:bg-white/20 text-base">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div>
                <span className="font-bold text-2xl block text-white">25+</span>
                <span className="text-white/80">Years Experience</span>
              </div>
              <div>
                <span className="font-bold text-2xl block text-white">1500+</span>
                <span className="text-white/80">Projects Completed</span>
              </div>
              <div>
                <span className="font-bold text-2xl block text-white">No MOQ</span>
                <span className="text-white/80">Minimum Order</span>
              </div>
            </div>
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
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-muted rounded-xl p-6 text-center card-hover border border-border/60 shadow-sm w-[calc(50%-12px)] md:w-[calc(25%-18px)]"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  {industry.customIcon ? (
                    <img src={industry.customIcon} alt={industry.name} className="h-8 w-8 object-contain" />
                  ) : industry.icon ? (
                    <industry.icon className="h-7 w-7 text-primary" />
                  ) : null}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                <p className="text-sm text-muted-foreground">{industry.subtitle}</p>
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
                className="bg-card rounded-lg p-6 card-hover border border-border group text-center"
              >
                <div className="h-24 w-24 mb-5 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={capability.icon} 
                    alt={capability.title} 
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
                <p className="text-muted-foreground text-sm">{capability.description}</p>
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
                    <CheckCircle className="h-5 w-5 text-cta mt-0.5 flex-shrink-0" />
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
                  <item.icon className="h-10 w-10 text-cta mx-auto mb-3" />
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
            <Button asChild size="lg" variant="cta" className="text-base">
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
