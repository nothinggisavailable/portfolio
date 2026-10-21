// Application constants

export const SITE_CONFIG = {
  name: "Soham Orivkar",
  title: "AI Data Engineer & Full Stack Developer",
  description:
    "AI Data Engineer Intern specializing in RAG architectures, Agentic workflows with LangGraph & MCP, and scalable full-stack applications.",
  email: "sohamorivkar@gmail.com",
  github: "https://github.com/nothinggisavailable",
  linkedin: "https://www.linkedin.com/in/sohamorivkar",
} as const;

export const NAVIGATION_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_dkwymtd",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_ixqhqzj",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "l-cebVhssjDBIrFfo",
} as const;

export const DISCORD_WEBHOOK_URL =
  import.meta.env.VITE_DISCORD_WEBHOOK_URL ||
  "https://discord.com/api/webhooks/1562424371484696608/v8puxmmP830Kk0bKuqb4vN013Z4QRm_MDNqsan42-muCh4HvlbO1pqhWHVGx3HR1tGVx";
