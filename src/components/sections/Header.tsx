import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <header
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between gap-8 px-6 py-3 rounded-2xl border ${isScrolled
            ? "bg-black/60 backdrop-blur-xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-4xl"
            : "bg-transparent border-transparent w-full max-w-6xl"
          }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-black tracking-tighter text-white group flex items-center"
        >
          <span className="transition-transform group-hover:-translate-y-0.5">S</span>
          <span className="transition-transform group-hover:translate-y-0.5">O</span>
          <span className="text-[#FE3D00] ml-px animate-pulse">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center bg-white/5 rounded-xl border border-white/5 p-1 transition-all duration-300">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden group ${isActive ? "text-white" : "text-white/40 hover:text-white"
                  }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-[#FE3D00] opacity-10 transition-opacity" />
                )}
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FE3D00] shadow-[0_0_8px_#FE3D00]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-white/10 hover:bg-[#FE3D00] transition-all px-5 py-2.5 rounded-xl border border-white/10 group overflow-hidden relative"
          >
            <span className="relative z-10">Hire Me</span>
            <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-1 hover:text-[#FE3D00] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 right-0 mt-3 p-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl transition-all duration-300 origin-top ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
        >
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-xl font-bold uppercase tracking-widest text-[10px]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#FE3D00] border border-[#FE3D00]/30 hover:bg-[#FE3D00]/10 transition-all px-4 py-3 rounded-xl"
            >
              Hire Me
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;