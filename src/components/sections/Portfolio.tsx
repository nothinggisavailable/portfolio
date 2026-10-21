import { useState, useEffect, useRef } from "react";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GridPlane, WireframeSphere } from "@/components/ui/ThreeDBg";
import { SITE_CONFIG } from "@/constants";

const projects = [
  {
    id: 1,
    number: "01",
    title: "🏛️ University Policy AI Assistant",
    description:
      "Hybrid RAG System combining ChromaDB dense vector search, BM25 keyword retrieval, and cross-encoder re-ranking. Features Graph-RAG using knowledge graphs for contextual reasoning, profile-aware caching with SQLite for ultra-low latency, and OCR-based scanned document ingestion.",
    technologies: ["Python", "FastAPI", "ChromaDB", "BM25", "Graph-RAG", "Cross-Encoder", "SQLite", "OCR"],
    image: "/policy-ai-thumbnail.jpg",
    accentColor: "#FE3D00",
    bgClass: "bg-gradient-to-br from-[#FE3D00]/15 to-[#FE3D00]/5",
    github: "https://github.com/nothinggisavailable",
    demo: "#",
  },
  {
    id: 2,
    number: "02",
    title: "⚡ Finexy — Multi-Agent AI Financial Advisory",
    description:
      "Autonomous Multi-Agent AI system with specialized agents for reasoning, planning, and evaluation orchestrated with LangGraph and Model Context Protocol (MCP). Implements dynamic tool execution, hybrid vector-graph retrieval, loan eligibility calculation, and bank comparison.",
    technologies: ["Python", "LangGraph", "MCP", "Hybrid Retrieval", "Vector DB", "FastAPI", "FinTech"],
    image: "/finexy-thumbnail.jpg",
    accentColor: "#22c55e",
    bgClass: "bg-gradient-to-br from-green-900/20 to-green-600/10",
    github: "https://github.com/nothinggisavailable",
    demo: "#",
  },
  {
    id: 3,
    number: "03",
    title: "🌐 Dev Connect — Developer Platform",
    description:
      "Full-stack Developer Networking & Collaboration Platform designed for engineers to connect, share profiles, and discover projects. Features secure JWT user authentication, dynamic community feeds, connection requests, and interactive REST APIs.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Tailwind CSS"],
    image: "/devconnect-thumbnail.jpg",
    accentColor: "#06b6d4",
    bgClass: "bg-gradient-to-br from-cyan-900/20 to-blue-600/10",
    github: "https://github.com/nothinggisavailable",
    demo: "#",
  },
];

const Portfolio = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            if (id) setVisibleProjects((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    projectRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => projectRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#FE3D00]/4 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D background decorations */}
      <GridPlane className="absolute top-1/4 left-0 opacity-20 z-0" />
      <WireframeSphere className="absolute bottom-1/4 right-0 opacity-15 z-0" size={200} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="mb-12">
          <div className="section-number">(03)</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter">
            Featured<span className="text-white/20">_</span>Projects
          </h2>
          <p className="text-white/40 mt-4 max-w-md text-sm">
            A selection of projects I've built — spanning AI/ML, full-stack web, and data analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[idx] = el)}
              data-id={project.id}
              className={`transition-all duration-700 ease-out ${visibleProjects.includes(project.id)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <Card
                className={`${project.bgClass} border border-white/5 overflow-hidden h-full group hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-2xl`}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Image area */}
                  <div className="relative overflow-hidden" style={{ paddingBottom: "62%" }}>
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(to bottom, transparent 30%, black 100%), linear-gradient(135deg, ${project.accentColor}15, transparent 60%)`,
                          opacity: 0.8,
                        }}
                      />
                    </div>
                    {/* Project number badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="text-xs font-mono px-2 py-1 rounded border"
                        style={{
                          color: project.accentColor,
                          borderColor: `${project.accentColor}30`,
                          background: `${project.accentColor}10`,
                        }}
                      >
                        {project.number}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-5 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs py-0.5 px-2 rounded-full bg-white/5 text-white/50 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-5 pt-4 border-t border-white/5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors group/link"
                        aria-label="GitHub"
                      >
                        <Github
                          size={15}
                          style={{ color: project.accentColor }}
                          className="group-hover/link:scale-110 transition-transform"
                        />
                        <span>Source Code</span>
                      </a>
                      {project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors group/link"
                          aria-label="Live Demo"
                        >
                          <ExternalLink
                            size={15}
                            style={{ color: project.accentColor }}
                            className="group-hover/link:scale-110 transition-transform"
                          />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-full px-6 py-3 transition-all hover:bg-white/5"
          >
            <Github size={16} className="text-[#FE3D00]" />
            <span>View all projects on GitHub</span>
            <ArrowRight
              size={14}
              className="text-[#FE3D00] group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
