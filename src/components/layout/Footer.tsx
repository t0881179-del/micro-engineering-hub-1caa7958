import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-industrial-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Micro Engineering" className="h-12 w-auto brightness-0 invert" />
              <div>
                <h3 className="text-xl font-bold">Micro Engineering</h3>
                <p className="text-sm text-muted-foreground">Precision Manufacturing</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for precision manufacturing solutions. Delivering excellence in CNC machining, tooling, and custom fabrication since establishment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Services", path: "/services" },
                { name: "Solutions", path: "/solutions" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                "CNC Machining",
                "VMC Machining",
                "Stamping",
                "Fabrication",
                "Prototype Parts",
                "Tube Bending",
                "Custom Assembly",
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919999999999" className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">+91 99999 99999</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@microengineering.in" className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">info@microengineering.in</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Industrial Area, <br />
                    City, State - 000000
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Micro Engineering. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
