import { useLocation, Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      
      {/* Floating Contact Button - Mobile Only, Hidden on Contact Page */}
      {!isContactPage && (
        <Link
          to="/contact"
          className="fixed bottom-4 right-4 z-50 md:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Contact Us"
        >
          <Phone className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
};

export default Layout;
