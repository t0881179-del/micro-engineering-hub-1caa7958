import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Target, Clock, Shield, Factory, Cog } from "lucide-react";
import aboutImage from "@/assets/about-facility.png";

const milestones = [
  { year: "Established", title: "Company Founded", description: "Started with a vision to deliver precision manufacturing" },
  { year: "Growth", title: "Expanded Operations", description: "Added CNC and VMC capabilities" },
  { year: "Quality", title: "ISO Certification", description: "Achieved quality management standards" },
  { year: "Today", title: "Industry Leader", description: "Trusted partner for precision manufacturing" },
];

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest quality standards in every component we manufacture.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your success is our priority. We work closely with clients to exceed expectations.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Accuracy down to microns. Our advanced machinery ensures exact specifications.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We understand the importance of deadlines and consistently deliver on time.",
  },
];

const capabilities = [
  "CNC Turning & Milling",
  "VMC Operations",
  "Stamping & Press Work",
  "Sheet Metal Fabrication",
  "Tube Bending & Forming",
  "Custom Assembly",
  "Quality Inspection",
];

const AboutPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-industrial-dark py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About Us</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Your trusted partner in precision manufacturing with decades of experience delivering excellence.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Micro Engineering was founded with a singular vision: to provide world-class precision 
                manufacturing services that help businesses bring their ideas to life. Over the years, 
                we have grown from a small workshop to a fully-equipped manufacturing facility.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our journey has been defined by continuous investment in technology, talent, and processes. 
                Today, we serve clients across multiple industries, from automotive and aerospace to 
                medical devices and electronics.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                What sets us apart is our commitment to quality and our unique ability to handle both 
                <strong> prototype parts with no minimum order quantity</strong> and large-scale production 
                runs with equal expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/gallery">View Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Micro Engineering Facility"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Micro Engineering.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-card rounded-lg p-6 text-center card-hover border border-border">
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Manufacturing Capabilities
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our state-of-the-art facility is equipped with the latest CNC machines, VMC machines, 
                stamping presses and precision tooling to handle a wide range of manufacturing requirements. 
                From simple components to complex assemblies, we have the capability to deliver.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
                <Factory className="h-10 w-10 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">5000+</div>
                <div className="text-sm text-primary-foreground/80">Sq.ft Facility</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Cog className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">20+</div>
                <div className="text-sm text-muted-foreground">Machines</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Skilled Workers</div>
              </div>
              <div className="bg-accent text-accent-foreground rounded-lg p-6 text-center">
                <Shield className="h-10 w-10 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm">Quality Assured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-industrial-dark text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Key milestones in our path to becoming a trusted manufacturing partner.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                  <div className="text-accent font-mono font-bold mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-sm text-primary-foreground/70">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-accent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Partner With Us
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join the growing list of companies that trust Micro Engineering for their precision manufacturing needs.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
