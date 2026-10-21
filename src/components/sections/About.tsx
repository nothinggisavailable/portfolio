import { useState, useEffect, useRef } from "react";
import { ParticleField, WireframeCube } from "@/components/ui/ThreeDBg";

const stats = [
  { label: "Degree", value: "B.Tech CSE" },
  { label: "Current Role", value: "AI Data Engineer" },
  { label: "Internship", value: "ProductSquads" },
  { label: "Focus Area", value: "RAG & Agents" },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#FE3D00]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D decorations */}
      <ParticleField className="absolute top-10 right-0 opacity-20 z-0" width={400} height={400} />
      <WireframeCube className="absolute bottom-10 left-10 opacity-30 z-0" size={80} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="mb-12">
          <div className="section-number opacity-50">(02)</div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
          >
            About<span className="text-white/20">_</span>Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — bio */}
          <div>
            <div className="space-y-6 mb-12">
              <p
                className={`text-lg text-white/80 leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                  }`}
              >
                I'm a{" "}
                <span className="text-white font-semibold">
                  Computer Science Engineering
                </span>{" "}
                undergraduate at Parul University with extensive experience in{" "}
                <span className="text-[#FE3D00]">AI systems</span> and{" "}
                <span className="text-white font-semibold">full-stack development</span>.
              </p>

              <p
                className={`text-lg text-white/70 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                  }`}
              >
                Currently working as an{" "}
                <span className="text-[#FE3D00] font-semibold">
                  AI Data Engineer Intern at ProductSquads
                </span>
                , gaining hands-on expertise in{" "}
                <span className="text-white font-medium">Retrieval-Augmented Generation (RAG)</span>,{" "}
                <span className="text-white font-medium">agentic workflows (LangGraph &amp; MCP)</span>, and LLM-based production applications.
              </p>

              <p
                className={`text-lg text-white/70 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                  }`}
              >
                I bring solid grounding in{" "}
                <span className="text-[#FE3D00]">data structures, REST APIs, and database architecture</span>
                , striving to engineer scalable, low-latency AI solutions that solve real-world problems.
              </p>
            </div>

            {/* Highlights */}
            <div
              className={`space-y-3 transition-all duration-700 delay-400 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                }`}
            >
              {[
                "Production RAG pipelines with vector databases & semantic retrieval",
                "Agentic workflows with LangGraph & Model Context Protocol (MCP)",
                "Full-stack development using Node.js, Express, React & FastAPI",
                "Robust understanding of Data Structures, DBMS & Operating Systems",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="text-[#FE3D00] mt-1 shrink-0">→</span>
                  <span className="text-white/60 text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — cards */}
          <div className="flex flex-col gap-6">
            {/* Stats row */}
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                }`}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="neo-blur rounded-xl p-5 border border-white/5 hover:border-[#FE3D00]/20 transition-colors group"
                >
                  <p className="text-xs text-white/40 font-mono mb-1 uppercase tracking-wider">
                    {s.label}
                  </p>
                  <p className="text-lg font-bold text-white group-hover:text-[#FE3D00] transition-colors">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Core Technologies */}
            <div
              className={`neo-blur rounded-xl p-6 border border-white/5 transition-all duration-700 delay-600 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                }`}
            >
              <h4 className="text-sm font-mono text-white/40 uppercase tracking-wider mb-4">
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "RAG Pipelines", color: "bg-[#FE3D00]/10 border-[#FE3D00]/20 text-[#FE3D00]" },
                  { name: "LangGraph", color: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
                  { name: "MCP", color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" },
                  { name: "ChromaDB", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
                  { name: "Python", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
                  { name: "FastAPI", color: "bg-teal-500/10 border-teal-500/20 text-teal-400" },
                  { name: "Node.js", color: "bg-green-600/10 border-green-600/20 text-green-500" },
                  { name: "Express.js", color: "bg-white/5 border-white/10 text-white/70" },
                  { name: "React.js", color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" },
                  { name: "MongoDB", color: "bg-green-500/10 border-green-500/20 text-green-400" },
                  { name: "MySQL", color: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
                  { name: "Java", color: "bg-red-500/10 border-red-500/20 text-red-400" },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium ${tech.color} transition-all hover:scale-105`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Education + Experience */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                }`}
            >
              <div className="neo-blur rounded-xl p-5 border border-white/5">
                <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Education</p>
                <p className="text-sm font-semibold text-white">B.Tech — CSE</p>
                <p className="text-xs text-white/50 mt-1">Parul University (2023 – Present)</p>
              </div>
              <div className="neo-blur rounded-xl p-5 border border-white/5">
                <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Experience</p>
                <p className="text-sm font-semibold text-white">AI Data Engineer Intern</p>
                <p className="text-xs text-[#FE3D00]/80 mt-1">ProductSquads, Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
