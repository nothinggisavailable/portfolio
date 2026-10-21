import { useRef, useState, useEffect } from "react";
import { WireframeCube, WireframeSphere, GridPlane } from "@/components/ui/ThreeDBg";

const workItems = [
    {
        role: "AI Data Engineer Intern",
        org: "ProductSquads · Hyderabad, India",
        period: "2024 — Present",
        type: "Work",
        accent: "#FE3D00",
        current: true,
        desc: "Building AI-powered systems using RAG pipelines and LLM-based architectures. Designing and implementing agentic workflows for intelligent automation, integrating vector databases and embeddings for semantic search and contextual retrieval, and developing backend APIs to support AI-driven applications.",
        tags: ["RAG", "LLMs", "LangGraph", "MCP", "ChromaDB", "FastAPI", "Python"],
    },
];

const education = {
    degree: "B.Tech — Computer Science Engineering",
    school: "Parul University · Vadodara, Gujarat",
    period: "September 2023 — Present",
    gpa: "B.Tech Undergrad",
    desc: "Rigorous coursework in Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Programming alongside AI systems specialization.",
    tags: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks", "OOP"],
};

const certifications = [
    "AI Fundamentals — IBM SkillsBuild & Cisco Networking Academy",
    "AWS Academy Cloud Foundations",
    "Computer Networks & Internet Protocol (Elite) — NPTEL, IIT Kharagpur",
    "Generative AI — PW SkillsBuild & Microsoft",
];

const Experience = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredWork, setHoveredWork] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.unobserve(e.target); } },
            { threshold: 0.08 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative py-20 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #040404 0%, #000 100%)" }}
        >
            <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />

            {/* 3D decorations */}
            <WireframeCube size={100} className="absolute top-10 right-16 opacity-40 z-0" speed={22} />
            <WireframeSphere size={160} className="absolute bottom-20 right-0 opacity-20 z-0" />
            <GridPlane className="absolute -bottom-20 left-0 opacity-20 z-0" />

            <div className="container mx-auto px-4 relative z-10">
                {/* heading */}
                <div className="mb-12">
                    <div className="section-number">(05)</div>
                    <h2
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        Experience<span className="text-white/20">_</span>&amp;<span className="text-white/20">_</span>Education
                    </h2>
                </div>

                {/* ═══ WORK — full-width rows ═══ */}
                <div className="mb-20">
                    <p className="text-xs font-mono text-white/25 uppercase tracking-[0.25em] mb-6">
                        Work experience
                    </p>

                    {workItems.map((item, i) => (
                        <div
                            key={item.role}
                            onMouseEnter={() => setHoveredWork(i)}
                            onMouseLeave={() => setHoveredWork(null)}
                            className={`
                border-t border-white/8 group relative overflow-hidden
                transition-all duration-500 ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
                            style={{ transitionDelay: `${i * 120}ms` }}
                        >
                            {/* hover fill */}
                            <div
                                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 0% 50%, ${item.accent}06, transparent 70%)`,
                                    opacity: hoveredWork === i ? 1 : 0,
                                }}
                            />
                            {/* left accent line */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-[2.5px] transition-all duration-500"
                                style={{
                                    background: item.accent,
                                    opacity: hoveredWork === i ? 1 : 0,
                                    transform: hoveredWork === i ? "scaleY(1)" : "scaleY(0)",
                                }}
                            />

                            <div className="py-7 pl-6 relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-8 items-start">
                                {/* Left: role + desc + tags */}
                                <div>
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <h3
                                            className="text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors duration-300"
                                            style={{ color: hoveredWork === i ? item.accent : "white" }}
                                        >
                                            {item.role}
                                        </h3>
                                        {item.current && (
                                            <span
                                                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                                                style={{ color: item.accent, borderColor: `${item.accent}40`, background: `${item.accent}10` }}
                                            >
                                                CURRENT
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-white/40 mb-3 font-mono">{item.org}</p>
                                    <p className="text-sm text-white/55 leading-relaxed max-w-2xl mb-4 transition-colors duration-300">
                                        {item.desc}
                                    </p>
                                    <div
                                        className="flex flex-wrap gap-1.5 transition-all duration-500"
                                        style={{ opacity: hoveredWork === i ? 1 : 0.8 }}
                                    >
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2.5 py-1 rounded-full border transition-all duration-300"
                                                style={{
                                                    color: hoveredWork === i ? item.accent : "rgba(255,255,255,0.4)",
                                                    borderColor: hoveredWork === i ? `${item.accent}35` : "rgba(255,255,255,0.1)",
                                                    background: hoveredWork === i ? `${item.accent}08` : "transparent",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: period */}
                                <div className="text-left md:text-right shrink-0">
                                    <span className="text-xs font-mono text-white/30 tracking-widest">{item.period}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-white/8" />
                </div>

                {/* ═══ EDUCATION — full-width row ═══ */}
                <div className="mb-20">
                    <p className="text-xs font-mono text-white/25 uppercase tracking-[0.25em] mb-6">
                        Education
                    </p>

                    <div className="border-t border-white/8">
                        <div
                            className={`py-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1 text-blue-400">
                                    {education.degree}
                                </h3>
                                <p className="text-sm text-white/40 mb-3 font-mono">{education.school}</p>
                                <p className="text-sm text-white/50 leading-relaxed max-w-2xl mb-4">
                                    {education.desc}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {education.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400/70"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="shrink-0 text-left md:text-right">
                                <span className="text-xs font-mono text-white/30 tracking-widest">{education.period}</span>
                                <p className="text-xs text-blue-400/50 font-mono mt-1">{education.gpa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/8" />
                </div>

                {/* ═══ CURRENTLY LEARNING ═══ */}
                <div
                    className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <p className="text-xs font-mono text-white/25 uppercase tracking-[0.25em] mb-8">
                        Certifications &amp; Credentials
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {certifications.map((item, i) => (
                            <div
                                key={item}
                                className="group flex items-center gap-2.5 py-2.5 px-4 rounded-full border border-white/8 hover:border-[#FE3D00]/30 transition-all duration-300 hover:bg-[#FE3D00]/5"
                                style={{ transitionDelay: `${i * 60}ms` }}
                            >
                                <div
                                    className="w-1.5 h-1.5 rounded-full bg-[#FE3D00] shrink-0"
                                    style={{ boxShadow: "0 0 6px rgba(254,61,0,0.6)" }}
                                />
                                <span className="text-sm text-white/55 group-hover:text-white/80 transition-colors font-medium">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
