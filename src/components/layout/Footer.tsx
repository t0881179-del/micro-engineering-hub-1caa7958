import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-industrial-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Company Info */}
          <div className="space-y-2 col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Micro Engineering" className="h-10 w-auto brightness-0 invert" />
              <div>
                <h3 className="text-lg font-bold">Micro Engineering</h3>
                <p className="text-sm text-muted-foreground">Precision Manufacturing</p>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your trusted partner for precision manufacturing solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
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
                    className="text-muted-foreground hover:text-accent transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Our Services</h4>
            <ul className="space-y-1">
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
                  <span className="text-muted-foreground text-xs">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Contact Us</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="tel:+919999999999" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">+91 99999 99999</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@microengineering.in" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">info@microengineering.in</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">Industrial Area, City, State - 000000</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="container-custom py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Micro Engineering. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-accent transition-colors">
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
