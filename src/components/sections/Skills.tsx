import { useRef, useState, useEffect } from "react";
import { OrbitRing, NeuralNet, ParticleField } from "@/components/ui/ThreeDBg";

const categories = [
  {
    num: "01",
    name: "AI & Agentic Systems",
    accent: "#FE3D00",
    tags: ["RAG", "LLMs", "LangGraph", "MCP", "ChromaDB", "Embeddings", "Vector DBs", "BM25"],
    pct: 92,
  },
  {
    num: "02",
    name: "Backend Development",
    accent: "#3b82f6",
    tags: ["Node.js", "Express.js", "Python", "FastAPI", "Flask", "REST APIs"],
    pct: 88,
  },
  {
    num: "03",
    name: "Web & Frontend",
    accent: "#22d3ee",
    tags: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
    pct: 84,
  },
  {
    num: "04",
    name: "Databases & Storage",
    accent: "#22c55e",
    tags: ["MongoDB", "MySQL", "SQLite", "ChromaDB", "Vector Search"],
    pct: 85,
  },
  {
    num: "05",
    name: "Core CS & Languages",
    accent: "#a855f7",
    tags: ["Data Structures", "OOP", "DBMS", "OS", "Computer Networks", "Java", "Python", "C"],
    pct: 90,
  },
  {
    num: "06",
    name: "Tools & Platforms",
    accent: "#eab308",
    tags: ["Git", "GitHub", "VS Code", "Postman", "Linux"],
    pct: 86,
  },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [animBars, setAnimBars] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const barsTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!barsTriggerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimBars(true); obs.unobserve(e.target); } },
      { threshold: 0.2 }
    );
    obs.observe(barsTriggerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* noise */}
      <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />

      {/* 3D decorations */}
      <ParticleField
        width={400} height={400}
        className="absolute top-0 right-0 opacity-25 z-0"
      />
      <OrbitRing
        size={120}
        className="absolute bottom-16 left-6 opacity-50 z-0"
      />
      <NeuralNet
        width={240} height={240}
        className="absolute bottom-20 right-16 opacity-40 z-0"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* — heading — */}
        <div className="mb-12">
          <div className="section-number">(04)</div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Skills<span className="text-white/20">_</span>&amp;<span className="text-white/20">_</span>Expertise
          </h2>
        </div>

        {/* — Editorial list — */}
        <div className="mb-20">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`
                group border-t border-white/8 py-5 md:py-6
                grid grid-cols-[40px_1fr] md:grid-cols-[56px_2fr_3fr_64px] gap-4 items-center
                transition-all duration-400
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                ${hoveredIdx !== null && hoveredIdx !== i ? "opacity-30" : ""}
              `}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {/* number */}
              <span
                className="text-xs font-mono transition-colors duration-300"
                style={{ color: hoveredIdx === i ? cat.accent : "rgba(255,255,255,0.2)" }}
              >
                {cat.num}
              </span>

              {/* name */}
              <h3
                className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight transition-colors duration-300"
                style={{ color: hoveredIdx === i ? cat.accent : "white" }}
              >
                {cat.name}
              </h3>

              {/* tags — desktop only */}
              <div className="hidden md:flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full border transition-all duration-300"
                    style={{
                      color: hoveredIdx === i ? cat.accent : "rgba(255,255,255,0.35)",
                      borderColor: hoveredIdx === i ? `${cat.accent}35` : "rgba(255,255,255,0.08)",
                      background: hoveredIdx === i ? `${cat.accent}10` : "transparent",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* percentage */}
              <span
                className="hidden md:block text-right text-sm font-mono transition-all duration-300"
                style={{ color: hoveredIdx === i ? cat.accent : "rgba(255,255,255,0.2)" }}
              >
                {cat.pct}%
              </span>
            </div>
          ))}

          {/* bottom border */}
          <div className="border-t border-white/8" />
        </div>

        {/* — Proficiency bars — */}
        <div
          ref={barsTriggerRef}
          className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <p className="text-xs font-mono text-white/25 uppercase tracking-[0.25em] mb-8">
            Proficiency overview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7">
            {categories.map((cat, i) => (
              <div key={cat.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/50 font-mono">{cat.name.split(" ")[0]}</span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: `${cat.accent}80` }}
                  >
                    {cat.pct}%
                  </span>
                </div>
                <div className="relative h-px bg-white/8">
                  <div
                    className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                    style={{
                      width: animBars ? `${cat.pct}%` : "0%",
                      background: cat.accent,
                      transitionDelay: `${i * 100}ms`,
                      boxShadow: animBars ? `0 0 8px ${cat.accent}` : "none",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
