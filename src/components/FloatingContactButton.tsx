import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";

const FloatingContactButton = () => {
  const location = useLocation();
  
  // Don't show on contact page
  if (location.pathname === "/contact") {
    return null;
  }

  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 z-50 md:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all active:scale-95"
      aria-label="Contact Us"
    >
      <Phone className="h-5 w-5" />
    </Link>
  );
};

export default FloatingContactButton;