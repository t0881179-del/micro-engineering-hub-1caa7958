import { Link, useLocation } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Solutions", path: "/solutions" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar - hidden on mobile */}
      <div className="bg-primary text-primary-foreground py-1.5 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919999999999" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 99999 99999</span>
            </a>
            <a href="mailto:info@microengineering.in" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span>info@microengineering.in</span>
            </a>
          </div>
          <div className="text-primary-foreground/80">
            Precision Manufacturing Excellence
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom py-2 md:py-3">
        <div className="flex items-center justify-center lg:justify-between">
          {/* Logo - centered on mobile, left on desktop */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img src={logo} alt="Micro Engineering Logo" className="h-8 md:h-10 w-auto" />
            <div>
              <h1 className="text-sm md:text-lg font-bold text-foreground leading-tight">Micro Engineering</h1>
              <p className="text-[9px] md:text-xs text-muted-foreground">Precision Manufacturing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="cta" size="sm">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

        </div>

        {/* Mobile Navigation - below logo */}
        <div className="flex lg:hidden items-center justify-center mt-2 pt-2 border-t border-border">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground hover:text-foreground border-border hover:border-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
