import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Enquiry Sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <section className="bg-industrial-dark py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Get in touch for quotes, inquiries, or to discuss your manufacturing requirements.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us an Enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <Input type="email" placeholder="Email *" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  <Input placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <Textarea placeholder="Your Message / Requirements *" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                <p className="text-sm text-muted-foreground italic">* Fields are required</p>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", content: "+91 99999 99999", href: "tel:+919999999999" },
                  { icon: Mail, title: "Email", content: "info@microengineering.in", href: "mailto:info@microengineering.in" },
                  { icon: MapPin, title: "Address", content: "Industrial Area, City, State - 000000" },
                  { icon: Clock, title: "Business Hours", content: "Mon - Sat: 9:00 AM - 6:00 PM" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                    <item.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-primary">{item.content}</a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
