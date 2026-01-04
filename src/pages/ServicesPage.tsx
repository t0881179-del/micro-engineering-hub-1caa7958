import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Wrench, Sparkles, Lightbulb } from "lucide-react";
import customImage from "@/assets/custom-solutions.png";
import iconCnc from "@/assets/icon-cnc.png";
import iconVmc from "@/assets/icon-vmc.png";
import iconStamping from "@/assets/icon-stamping.png";
import iconFabrication from "@/assets/icon-fabrication.png";
import iconBending from "@/assets/icon-bending.png";

const services = [
  {
    customIcon: iconCnc,
    title: "CNC Machining",
    description: "Precision CNC turning and milling services for complex components with tight tolerances. Multi-axis capabilities for intricate geometries.",
    features: [
      "3, 4, and 5-axis machining",
      "Tolerance up to ±0.01mm",
      "Batch sizes from 1 to 10,000+",
      "Complex geometry capability",
    ],
  },
  {
    customIcon: iconVmc,
    title: "VMC Machining",
    description: "Vertical Machining Center operations for precision milling, drilling, and tapping. Ideal for prismatic parts and mold components.",
    features: [
      "High-speed machining",
      "Multi-operation capability",
      "Precision surface finish",
      "Large part capacity",
    ],
  },
  {
    customIcon: iconStamping,
    title: "Stamping",
    description: "Sheet metal stamping services for high-volume production. Progressive die stamping, deep drawing, and forming operations.",
    features: [
      "Progressive die stamping",
      "Deep drawing",
      "Forming and bending",
      "High-volume production",
    ],
  },
  {
    customIcon: iconFabrication,
    title: "Fabrication",
    description: "Custom metal fabrication including cutting, bending, welding, and assembly. Complete solutions from raw material to finished product.",
    features: [
      "Laser/plasma cutting",
      "Press brake bending",
      "TIG/MIG welding",
      "Surface finishing",
    ],
  },
  {
    customIcon: iconBending,
    title: "Tube Bending",
    description: "Precision tube bending and forming for automotive, furniture, and industrial applications. CNC tube bending for consistent results.",
    features: [
      "CNC tube bending",
      "Multi-radius bending",
      "End forming",
      "Mandrel bending",
    ],
  },
  {
    isAssembly: true,
    title: "Assembly Services",
    description: "Complete assembly services including mechanical assembly, sub-assembly, and testing. Kitting and packaging solutions available.",
    features: [
      "Mechanical assembly",
      "Quality testing",
      "Kitting services",
      "Packaging solutions",
    ],
  },
];

const processSteps = [
  { step: "01", title: "Inquiry", description: "Share your requirements and drawings" },
  { step: "02", title: "Quotation", description: "Receive detailed pricing and timeline" },
  { step: "03", title: "Production", description: "Manufacturing with quality checks" },
  { step: "04", title: "Delivery", description: "On-time delivery to your location" },
];

const ServicesPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-industrial-dark py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Comprehensive manufacturing services from prototyping to production with no minimum order quantity.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Manufacturing Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end manufacturing solutions with state-of-the-art equipment and experienced craftsmen.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card rounded-lg p-6 card-hover border border-border text-center">
                <div className="h-28 w-28 mb-4 mx-auto flex items-center justify-center">
                  {service.isAssembly ? (
                    <div className="relative">
                      <Wrench className="h-20 w-20 text-[#0d1b2a]" />
                      <Sparkles className="h-6 w-6 text-[#0d1b2a] absolute -top-2 -right-2" />
                    </div>
                  ) : service.customIcon ? (
                    <img src={service.customIcon} alt={service.title} className="h-full w-full object-contain" />
                  ) : null}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototype Services */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Prototype Development</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand that innovation starts with prototypes. Our rapid prototyping services 
              help you validate designs quickly without the burden of minimum order quantities.
            </p>
          </div>
          <div className="bg-card rounded-lg p-8 card-hover border border-border max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                "No minimum order quantity - order even single pieces",
                "Quick turnaround for urgent requirements",
                "Design feedback and optimization support",
                "Same quality as production parts",
                "Cost-effective prototype iterations",
                "Seamless transition to production",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">
                  Request Prototype Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent process from inquiry to delivery.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-industrial-dark text-primary-foreground">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={customImage}
                alt="Additional Services"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Additional Services
              </h2>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Beyond core manufacturing, we offer a range of value-added services to deliver complete solutions for your requirements, through our trusted partners.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Heat Treatment",
                  "Surface Coating",
                  "Anodizing",
                  "Powder Coating",
                  "Electroplating",
                  "Passivation",
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-primary-foreground/90">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Share your requirements with us and receive a detailed quote within 24 hours.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">
              Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
