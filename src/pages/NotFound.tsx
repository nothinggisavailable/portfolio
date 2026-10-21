
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="noise-bg absolute inset-0 pointer-events-none z-0"></div>
      
      <div className="relative z-10 text-center max-w-lg">
        <h1 className="text-8xl md:text-9xl font-black">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white/70">Page Not Found</h2>
        <p className="text-white/50 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <Button className="group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
