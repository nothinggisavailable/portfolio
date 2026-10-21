import { useRef, useState, useEffect } from "react";
import { Mail, Github, Linkedin, ArrowRight, Send, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMAILJS_CONFIG, DISCORD_WEBHOOK_URL } from "@/constants";
import { WireframeCube } from "@/components/ui/ThreeDBg";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const socialLinks = [
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: "sohamorivkar@gmail.com",
    href: "mailto:sohamorivkar@gmail.com",
    accent: "#FE3D00",
  },
  {
    icon: <Phone size={16} />,
    label: "Phone",
    value: "+91 8668264701",
    href: "tel:+918668264701",
    accent: "#22c55e",
  },
  {
    icon: <Github size={16} />,
    label: "GitHub",
    value: "github.com/nothinggisavailable",
    href: "https://github.com/nothinggisavailable",
    accent: "#ffffff",
  },
  {
    icon: <Linkedin size={16} />,
    label: "LinkedIn",
    value: "sohamorivkar",
    href: "https://www.linkedin.com/in/sohamorivkar",
    accent: "#0ea5e9",
  },
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    if (EMAILJS_CONFIG.publicKey) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL.trim() !== "") {
        const payload = {
          username: "Portfolio Bot",
          avatar_url: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
          embeds: [
            {
              title: "📬 New Message from Portfolio!",
              color: 16661760, // #FE3D00 in decimal
              fields: [
                {
                  name: "👤 Sender Name",
                  value: data.name,
                  inline: true,
                },
                {
                  name: "📧 Email",
                  value: data.email,
                  inline: true,
                },
                {
                  name: "💬 Message",
                  value: data.message,
                },
              ],
              footer: {
                text: "Soham Orivkar Portfolio • Direct Notification",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        };

        const res = await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success("Message sent! I'll get back to you soon.");
          reset();
          return;
        } else {
          throw new Error(`Discord Webhook failed with status ${res.status}`);
        }
      }

      // If Discord Webhook is not yet configured, fallback to direct email client
      const subject = encodeURIComponent(`Contact from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:sohamorivkar@gmail.com?subject=${subject}&body=${body}`;
      toast.info("Opening your email client to send the message.");
      reset();
    } catch (err) {
      console.error("Submission error:", err);
      const subject = encodeURIComponent(`Contact from ${data.name} (Direct Fallback)`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:sohamorivkar@gmail.com?subject=${subject}&body=${body}`;
      toast.error("Could not send automated ping. Opening your email app...");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0 noise-bg pointer-events-none" />
      {/* Glows */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FE3D00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#FE3D00]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D cube decoration */}
      <WireframeCube size={90} className="absolute top-12 left-8 opacity-35 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="mb-10">
          <div className="section-number">(06)</div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Get<span className="text-white/20">_</span>In<span className="text-white/20">_</span>Touch
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* ── LEFT INFO (2 cols) ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Big CTA text */}
            <div className="neo-blur rounded-2xl border border-white/5 p-7 hover:border-[#FE3D00]/15 transition-colors">
              <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mb-4">
                Let's build<br />
                <span className="text-[#FE3D00]">something</span><br />
                great together.
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                Open to internships, freelance projects, and interesting collaborations.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs text-green-400/80 font-mono">Available now</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group neo-blur rounded-xl border border-white/5 hover:border-white/10 p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      background: `${link.accent}12`,
                      borderColor: `${link.accent}25`,
                      color: link.accent,
                    }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">{link.label}</p>
                    <p className="text-xs text-white/60 group-hover:text-white truncate transition-colors">{link.value}</p>
                  </div>
                  <ArrowRight
                    size={13}
                    className="text-white/20 group-hover:text-[#FE3D00] group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: FORM (3 cols) ── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="neo-blur rounded-2xl border border-white/5 p-8 flex flex-col gap-5 h-full"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FE3D00]" style={{ boxShadow: "0 0 6px rgba(254,61,0,0.7)" }} />
                <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Send a message</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 font-mono uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    autoComplete="off"
                    {...register("name")}
                    className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FE3D00] focus:ring-1 focus:ring-[#FE3D00]/60 focus:bg-black/80 transition-colors"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40 font-mono uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="off"
                    {...register("email")}
                    className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FE3D00] focus:ring-1 focus:ring-[#FE3D00]/60 focus:bg-black/80 transition-colors"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs text-white/40 font-mono uppercase tracking-wider">Message</label>
                <textarea
                  placeholder="Hi Soham, I'd like to discuss..."
                  rows={7}
                  autoComplete="off"
                  {...register("message")}
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FE3D00] focus:ring-1 focus:ring-[#FE3D00]/60 focus:bg-black/80 transition-colors resize-none"
                />
                {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FE3D00] hover:bg-[#FE3D00]/90 text-white border-none group py-3 text-sm font-semibold tracking-wide transition-all"
                style={{ boxShadow: "0 0 20px rgba(254,61,0,0.25)" }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
