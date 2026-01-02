import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import precisionImage from "@/assets/precision-components.png";
import cncImage from "@/assets/cnc-machining.png";
import customImage from "@/assets/custom-solutions.png";
import galleryImage from "@/assets/gallery-parts.png";

const productCategories = [
  {
    title: "CNC Machined Components",
    description: "High-precision CNC turned and milled parts for various applications. Tight tolerances, superior finish, and consistent quality.",
    image: cncImage,
    features: ["Tolerance: ±0.01mm", "Various materials", "Complex geometries", "High volume capable"],
  },
  {
    title: "Precision Metal Parts",
    description: "Precision-engineered metal components for automotive, aerospace, and industrial applications.",
    image: precisionImage,
    features: ["Stainless steel", "Aluminum alloys", "Brass & Copper", "Tool steels"],
  },
  {
    title: "Stamped Components",
    description: "Sheet metal stamping for high-volume production of brackets, clips, housings, and enclosures.",
    image: customImage,
    features: ["Progressive dies", "Deep drawing", "Forming & bending", "High volume"],
  },
  {
    title: "Custom Fabrications",
    description: "Custom fabricated assemblies combining multiple manufacturing processes for complete solutions.",
    image: galleryImage,
    features: ["Welded assemblies", "Sheet metal work", "Tube fabrication", "Complete assemblies"],
  },
  {
    title: "Prototype Parts",
    description: "Rapid prototyping services for design validation and testing. No minimum order quantity.",
    image: cncImage,
    features: ["No MOQ", "Quick turnaround", "Design support", "Material flexibility"],
  },
  {
    title: "Tube Bent Components",
    description: "Precision tube bending for automotive exhaust, furniture frames, and industrial applications.",
    image: customImage,
    features: ["Multi-axis bending", "Various diameters", "End forming", "Assembly ready"],
  },
];

const ProductsPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-industrial-dark py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Products</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Precision-engineered components and custom manufacturing solutions for diverse industries.
          </p>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Manufacture</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              From single prototypes to large production runs, we deliver precision components that meet 
              your exact specifications. No minimum order quantity - we're here to support your needs at any scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product, index) => (
              <div key={index} className="group bg-card rounded-lg overflow-hidden card-hover border border-border">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-primary hover:text-primary-light font-medium text-sm"
                  >
                    Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Materials We Work With</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expertise across a wide range of metals and materials for your specific requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Stainless Steel",
              "Mild Steel",
              "Aluminum",
              "Brass",
              "Copper",
              "Bronze",
              "Tool Steel",
              "Titanium",
              "Inconel",
              "Plastics",
              "Delrin",
              "Nylon",
            ].map((material, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                <span className="text-sm font-medium text-foreground">{material}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No MOQ Banner */}
      <section className="section-padding bg-accent">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            No Minimum Order Quantity
          </h2>
          <p className="text-accent-foreground/90 max-w-2xl mx-auto mb-8">
            Whether you need a single prototype or thousands of parts, we've got you covered. 
            Start with just one piece and scale up as needed.
          </p>
          <Button asChild size="lg" className="bg-industrial-dark text-primary-foreground hover:bg-industrial-dark/90">
            <Link to="/contact">Get Your Quote Today</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-industrial-dark">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need Custom Products?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Don't see exactly what you're looking for? We specialize in custom manufacturing. 
            Share your requirements and we'll make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Send Inquiry</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
