import { useState, useEffect } from "react";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants";
import { WireframeSphere, NeuralNet, ParticleField } from "@/components/ui/ThreeDBg";

const PHOTO_URL =
  "/soham-hero.png";

const ROLES = ["AI / ML Developer", "Python Developer", "Full Stack Dev"];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Desktop ambient glow */}
      <div className="hidden md:block absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] bg-[#FE3D00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 3D background elements */}
      <NeuralNet className="absolute top-[15%] left-[5%] opacity-40 z-0" />
      <ParticleField className="absolute bottom-[20%] right-[10%] opacity-30 z-0" width={500} height={500} />
      <WireframeSphere className="absolute top-[60%] left-[8%] opacity-20 z-0" size={180} />

      {/* Photo — desktop only */}
      <div
        className={`hidden md:block absolute top-0 right-0 w-1/2 h-full z-10 pointer-events-none transition-all duration-700 delay-300 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <img
          src={PHOTO_URL}
          alt={`${SITE_CONFIG.name} — AI/ML Developer`}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto select-none drop-shadow-[0_0_60px_rgba(254,61,0,0.18)]"
          style={{
            height: "96%",
            objectFit: "contain",
            objectPosition: "top center",
            maskImage: "linear-gradient(to bottom, black 55%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 92%)",
          }}
        />

        {/* Floating stat cards */}
        <div
          className={`absolute top-1/4 left-6 flex flex-col gap-3 transition-all duration-700 delay-700 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
        >
          {[
            { label: "Projects", value: "10+" },
            { label: "Technologies", value: "15+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <div>
                <p className="text-xl font-black text-[#FE3D00] leading-none">{stat.value}</p>
                <p className="text-xs font-mono text-white/50 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Status badge */}
        <div className="absolute bottom-28 left-12 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3 pointer-events-auto z-20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE3D00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FE3D00]" />
          </span>
          <span className="text-xs font-mono text-white/70">Open to opportunities</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-20 container mx-auto px-6 h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full pt-10 md:pt-0">
          {/* Left — text */}
          <div className="flex flex-col justify-center -mt-20 md:-mt-32">
            {/* Badge */}
            <div
              className={`mb-4 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#FE3D00]/80 border border-[#FE3D00]/25 px-3 py-1.5 rounded-full">
                Available for hire
              </span>
            </div>

            {/* Name */}
            <h1
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-4 transition-all duration-700 delay-150 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              Soham<span className="text-[#FE3D00]">.</span>
            </h1>

            {/* Typing role */}
            <div
              className={`mb-6 transition-all duration-700 delay-200 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              <p className="text-lg md:text-xl font-mono text-white/60 h-7 flex items-center">
                {displayed}
                <span className="ml-0.5 inline-block w-0.5 h-5 bg-[#FE3D00] animate-pulse" />
              </p>
            </div>

            {/* Mobile photo */}
            <div
              className={`block md:hidden mb-6 transition-all duration-700 delay-200 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              <div className="relative mx-auto w-56 h-64">
                <div className="absolute inset-0 bg-[#FE3D00]/10 rounded-2xl blur-2xl" />
                <img
                  src={PHOTO_URL}
                  alt={SITE_CONFIG.name}
                  className="relative w-full h-full object-contain object-top drop-shadow-[0_0_40px_rgba(254,61,0,0.2)]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 60%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div
              className={`mb-8 transition-all duration-700 delay-250 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              <p className="text-base md:text-lg text-white/55 max-w-md leading-relaxed">
                Building <span className="text-white/85 font-medium">intelligent</span> digital
                experiences through AI, machine learning, and modern web development.
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-350 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              <a href="#portfolio">
                <Button
                  variant="default"
                  className="bg-[#FE3D00] hover:bg-[#FE3D00]/90 text-white border-none group"
                >
                  View Projects
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  className="border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Contact Me
                </Button>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume"
              >
                <Button
                  variant="ghost"
                  className="text-white/50 hover:text-white hover:bg-white/5 transition-all gap-2"
                >
                  <Download size={15} />
                  Resume
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div
              className={`flex items-center gap-5 transition-all duration-700 delay-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              <span className="text-[10px] text-white/30 font-mono tracking-widest">FIND ME ON</span>
              <div className="w-10 h-px bg-white/10" />
              <a
                href="https://github.com/nothinggisavailable"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#FE3D00] transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sohamorivkar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#FE3D00] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Right — empty spacer on desktop (photo is absolute) */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pb-6">
        <div
          className={`transition-all duration-700 delay-700 ease-out ${isLoaded ? "opacity-20" : "opacity-0"
            }`}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[
              "Python", "Java", "ReactJS", "Flask", "Django", "MongoDB", "AI/ML", "NLP", "Pandas", "NumPy", "Gemini 3", "Tavus", "AstraDB", "LangFlow",
              "Python", "Java", "ReactJS", "Flask", "Django", "MongoDB", "AI/ML", "NLP", "Pandas", "NumPy", "Gemini 3", "Tavus", "AstraDB", "LangFlow",
            ].map((tech, i) => {
              const isAccent = ["Python", "Java", "AI/ML", "NLP", "Gemini 3", "Tavus"].includes(tech);
              return (
                <span key={i} className="inline-flex items-center shrink-0">
                  <span
                    className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight ${isAccent ? "text-[#FE3D00]" : "text-white"
                      }`}
                  >
                    {tech}
                  </span>
                  <span className="mx-6 md:mx-8 text-4xl md:text-6xl font-black text-white/20">•</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 transition-all duration-700 delay-900 ease-out ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="w-px h-6 bg-gradient-to-b from-transparent to-white/20" />
        <a
          href="#about"
          className="text-[10px] tracking-[0.25em] text-white/30 hover:text-white/60 transition-colors font-mono"
        >
          SCROLL
        </a>
      </div>
    </section>
  );
};

export default Hero;
