import { useEffect, useRef } from "react";

/* ─── Wireframe Rotating Cube ─────────────────────────── */
export const WireframeCube = ({
    size = 120,
    className = "",
    speed = 18,
}: {
    size?: number;
    className?: string;
    speed?: number;
}) => (
    <div
        className={`pointer-events-none select-none ${className}`}
        style={{ width: size, height: size, perspective: size * 3 }}
    >
        <div
            style={{
                width: size,
                height: size,
                position: "relative",
                transformStyle: "preserve-3d",
                animation: `cube-spin ${speed}s linear infinite`,
            }}
        >
            {[
                { transform: `translateZ(${size / 2}px)` },
                { transform: `translateZ(-${size / 2}px) rotateY(180deg)` },
                { transform: `translateY(-${size / 2}px) rotateX(90deg)` },
                { transform: `translateY(${size / 2}px) rotateX(-90deg)` },
                { transform: `translateX(${size / 2}px) rotateY(90deg)` },
                { transform: `translateX(-${size / 2}px) rotateY(-90deg)` },
            ].map((face, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: size,
                        height: size,
                        border: "1px solid rgba(254,61,0,0.22)",
                        background: "rgba(254,61,0,0.012)",
                        transform: face.transform,
                    }}
                />
            ))}
        </div>
        <style>{`@keyframes cube-spin{from{transform:rotateX(20deg) rotateY(0deg)}to{transform:rotateX(20deg) rotateY(360deg)}}`}</style>
    </div>
);

/* ─── Orbit Ring ──────────────────────────────────────── */
export const OrbitRing = ({
    size = 160,
    className = "",
}: {
    size?: number;
    className?: string;
}) => (
    <div className={`pointer-events-none select-none ${className}`} style={{ width: size, height: size }}>
        <div
            style={{
                width: size, height: size,
                borderRadius: "50%",
                border: "1.5px solid rgba(254,61,0,0.18)",
                boxShadow: "0 0 30px rgba(254,61,0,0.06) inset",
                animation: "ring-spin 14s linear infinite",
                position: "relative",
            }}
        >
            <div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#FE3D00", boxShadow: "0 0 10px rgba(254,61,0,0.9)" }} />
            <div style={{ position: "absolute", inset: size * 0.15, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
        </div>
        <style>{`@keyframes ring-spin{from{transform:rotateX(70deg) rotateZ(0deg)}to{transform:rotateX(70deg) rotateZ(360deg)}}`}</style>
    </div>
);

/* ─── Floating Grid Plane ─────────────────────────────── */
export const GridPlane = ({ className = "" }: { className?: string }) => (
    <div className={`pointer-events-none select-none ${className}`} style={{ width: 320, height: 320, perspective: 500 }}>
        <div style={{
            width: "100%", height: "100%",
            transform: "rotateX(60deg) rotateZ(15deg)",
            animation: "grid-float 8s ease-in-out infinite",
            backgroundImage: "linear-gradient(rgba(254,61,0,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(254,61,0,0.1) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center,black 30%,transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center,black 30%,transparent 75%)",
        }} />
        <style>{`@keyframes grid-float{0%,100%{transform:rotateX(60deg) rotateZ(15deg) translateY(0)}50%{transform:rotateX(60deg) rotateZ(15deg) translateY(-12px)}}`}</style>
    </div>
);

/* ─── Helix Dots (canvas animated) ───────────────────── */
export const HelixDots = ({ className = "" }: { className?: string }) => {
    const cvRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const cv = cvRef.current; if (!cv) return;
        const ctx = cv.getContext("2d"); if (!ctx) return;
        const W = cv.width, H = cv.height;
        let f = 0, raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < 20; i++) {
                const t = (i / 20) * Math.PI * 4 + f * 0.025;
                const y = (i / 20) * H;
                const x1 = W / 2 + Math.sin(t) * (W * 0.32);
                const x2 = W / 2 + Math.sin(t + Math.PI) * (W * 0.32);
                const a = 0.15 + 0.3 * Math.abs(Math.sin(t));
                ctx.beginPath(); ctx.arc(x1, y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(254,61,0,${a})`; ctx.fill();
                ctx.beginPath(); ctx.arc(x2, y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${a * 0.35})`; ctx.fill();
                if (i % 3 === 0) {
                    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
                    ctx.strokeStyle = `rgba(254,61,0,${a * 0.25})`; ctx.lineWidth = 0.8; ctx.stroke();
                }
            }
            f++; raf = requestAnimationFrame(draw);
        };
        draw(); return () => cancelAnimationFrame(raf);
    }, []);
    return <canvas ref={cvRef} width={80} height={320} className={`pointer-events-none select-none ${className}`} />;
};

/* ─── Particle Field (canvas) ─────────────────────────── */
export const ParticleField = ({
    count = 55,
    className = "",
    width = 400,
    height = 400,
}: {
    count?: number;
    className?: string;
    width?: number;
    height?: number;
}) => {
    const cvRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const cv = cvRef.current; if (!cv) return;
        const ctx = cv.getContext("2d"); if (!ctx) return;
        const W = cv.width, H = cv.height;
        const pts = Array.from({ length: count }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.8 + 0.5,
        }));
        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254,61,0,0.45)"; ctx.fill();
            });
            // connect nearby
            for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 90) {
                    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(254,61,0,${0.12 * (1 - d / 90)})`; ctx.lineWidth = 0.6; ctx.stroke();
                }
            }
            raf = requestAnimationFrame(draw);
        };
        draw(); return () => cancelAnimationFrame(raf);
    }, [count]);
    return <canvas ref={cvRef} width={width} height={height} className={`pointer-events-none select-none ${className}`} />;
};

/* ─── Icosahedron (rotating wireframe sphere) ─────────── */
export const WireframeSphere = ({
    size = 130,
    className = "",
}: {
    size?: number;
    className?: string;
}) => {
    // Approximate with stacked rings
    const rings = 7;
    return (
        <div className={`pointer-events-none select-none ${className}`} style={{ width: size, height: size, position: "relative" }}>
            {Array.from({ length: rings }).map((_, i) => {
                const ry = ((i / (rings - 1)) * 180 - 90);
                const scale = Math.cos((ry / 180) * Math.PI);
                const top = (i / (rings - 1)) * 100;
                return (
                    <div key={i} style={{
                        position: "absolute",
                        left: "50%", top: `${top}%`,
                        transform: "translateX(-50%) translateY(-50%)",
                        width: size * scale,
                        height: size * 0.06,
                        borderRadius: "50%",
                        border: "1px solid rgba(254,61,0,0.18)",
                        animation: `sphere-spin ${14 + i * 1.5}s linear infinite`,
                    }} />
                );
            })}
            {/* vertical meridians */}
            {[0, 45, 90, 135].map((deg, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: "50%", top: "50%",
                    transform: `translateX(-50%) translateY(-50%) rotateY(${deg}deg)`,
                    width: size, height: size,
                    borderRadius: "50%",
                    border: "1px solid rgba(254,61,0,0.12)",
                    animation: `sphere-spin ${20 + i * 2}s linear infinite`,
                }} />
            ))}
            <style>{`@keyframes sphere-spin{from{transform:translateX(-50%) translateY(-50%) rotateY(0deg)}to{transform:translateX(-50%) translateY(-50%) rotateY(360deg)}}`}</style>
        </div>
    );
};

/* ─── Neural Network Nodes (canvas) ──────────────────── */
export const NeuralNet = ({
    className = "",
    width = 260,
    height = 260,
}: {
    className?: string;
    width?: number;
    height?: number;
}) => {
    const cvRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const cv = cvRef.current; if (!cv) return;
        const ctx = cv.getContext("2d"); if (!ctx) return;
        const W = cv.width, H = cv.height;
        // 3 layers: 3 → 4 → 3
        const layers = [[3, 3], [4, 4], [3, 3]].map(([n], _, __) => n);
        const getNodes = () => layers.map((n, li) => {
            const x = (W / (layers.length + 1)) * (li + 1);
            return Array.from({ length: n }, (_, ni) => ({
                x, y: (H / (n + 1)) * (ni + 1),
                pulse: Math.random() * Math.PI * 2,
            }));
        });
        const nodes = getNodes();
        let f = 0, raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            // edges
            for (let l = 0; l < nodes.length - 1; l++) {
                nodes[l].forEach(a => {
                    nodes[l + 1].forEach(b => {
                        const pulse = 0.5 + 0.5 * Math.sin(f * 0.04 + a.pulse + b.pulse);
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(254,61,0,${0.06 + pulse * 0.1})`; ctx.lineWidth = 0.8; ctx.stroke();
                    });
                });
            }
            // nodes
            nodes.forEach(layer => layer.forEach(n => {
                const pulse = 0.5 + 0.5 * Math.sin(f * 0.05 + n.pulse);
                ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(254,61,0,${0.4 + pulse * 0.5})`; ctx.fill();
                ctx.beginPath(); ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(254,61,0,${0.05 + pulse * 0.08})`; ctx.fill();
            }));
            f++; raf = requestAnimationFrame(draw);
        };
        draw(); return () => cancelAnimationFrame(raf);
    }, []);
    return <canvas ref={cvRef} width={width} height={height} className={`pointer-events-none select-none ${className}`} />;
};
