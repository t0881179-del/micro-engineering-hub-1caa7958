import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import galleryImage from "@/assets/gallery-parts.png";
import cncImage from "@/assets/cnc-machining.png";
import precisionImage from "@/assets/precision-components.png";
import customImage from "@/assets/custom-solutions.png";

const galleryItems = [
  { image: galleryImage, title: "Precision Parts", category: "CNC" },
  { image: cncImage, title: "CNC Machining", category: "CNC" },
  { image: precisionImage, title: "Metal Components", category: "Fabrication" },
  { image: customImage, title: "Custom Solutions", category: "Custom" },
  { image: galleryImage, title: "Assembly Work", category: "Assembly" },
  { image: cncImage, title: "VMC Operations", category: "CNC" },
  { image: precisionImage, title: "Stamped Parts", category: "Stamping" },
  { image: customImage, title: "Tube Bending", category: "Fabrication" },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <section className="bg-industrial-dark py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Gallery</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Explore our portfolio of precision manufacturing projects and capabilities.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-industrial-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white"><X className="h-8 w-8" /></button>
          <img src={selectedImage} alt="Gallery" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}

      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Like What You See?</h2>
          <p className="text-primary-foreground/80 mb-8">Let us create precision components for your project.</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
