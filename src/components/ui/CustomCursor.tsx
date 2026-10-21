import { useEffect, useRef } from "react";

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on non-touch devices
        if (window.matchMedia("(hover: none)").matches) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let rafId: number;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
                dotRef.current.style.opacity = "1";
            }
            if (ringRef.current) {
                ringRef.current.style.opacity = "1";
            }
        };

        const onMouseLeave = () => {
            if (dotRef.current) dotRef.current.style.opacity = "0";
            if (ringRef.current) ringRef.current.style.opacity = "0";
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            ringX = lerp(ringX, mouseX, 0.1);
            ringY = lerp(ringY, mouseY, 0.1);
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        const onMouseDown = () => {
            if (dotRef.current) dotRef.current.style.transform += " scale(0.6)";
            if (ringRef.current) ringRef.current.style.width = "50px";
            if (ringRef.current) ringRef.current.style.height = "50px";
        };
        const onMouseUp = () => {
            if (ringRef.current) {
                ringRef.current.style.width = "36px";
                ringRef.current.style.height = "36px";
            }
        };

        // Scale ring on hoverable elements
        const onEnterInteractive = () => {
            if (ringRef.current) {
                ringRef.current.style.width = "52px";
                ringRef.current.style.height = "52px";
                ringRef.current.style.borderColor = "#FE3D00";
                ringRef.current.style.opacity = "0.7";
            }
        };
        const onLeaveInteractive = () => {
            if (ringRef.current) {
                ringRef.current.style.width = "36px";
                ringRef.current.style.height = "36px";
                ringRef.current.style.borderColor = "rgba(255,255,255,0.3)";
                ringRef.current.style.opacity = "1";
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        rafId = requestAnimationFrame(animate);

        const interactives = document.querySelectorAll("a, button, [role='button']");
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", onEnterInteractive);
            el.addEventListener("mouseleave", onLeaveInteractive);
        });

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", onEnterInteractive);
                el.removeEventListener("mouseleave", onLeaveInteractive);
            });
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
                style={{ willChange: "transform" }}
            >
                <div className="w-2 h-2 rounded-full bg-[#FE3D00]" />
            </div>
            {/* Ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-[opacity,width,height,border-color] duration-200"
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    willChange: "transform",
                }}
            />
        </>
    );
};

export default CustomCursor;
