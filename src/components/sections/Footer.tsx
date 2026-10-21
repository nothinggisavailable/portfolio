import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10 relative">
      <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">
              Soham<span className="text-[#FE3D00]">.</span>
            </h2>
            <p className="text-xs text-white/40 font-mono">AI Data Engineer · Full Stack Dev</p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/nothinggisavailable", icon: <Github size={18} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/sohamorivkar", icon: <Linkedin size={18} />, label: "LinkedIn" },
              { href: "mailto:sohamorivkar@gmail.com", icon: <Mail size={18} />, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/5 hover:border-[#FE3D00]/30 hover:bg-[#FE3D00]/5 transition-all text-[#FE3D00]"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <div>© {currentYear} Soham Orivkar. All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-5">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#portfolio", label: "Portfolio" },
              { href: "#skills", label: "Skills" },
              { href: "#experience", label: "Experience" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[#FE3D00] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
