import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/50 hover:text-[#FE3D00] hover:border-[#FE3D00]/30 hover:bg-[#FE3D00]/5 transition-all duration-300 ${visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
        >
            <ArrowUp size={16} />
        </button>
    );
};

export default BackToTop;
