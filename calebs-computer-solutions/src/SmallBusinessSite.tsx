import React, { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ShieldCheck,
  Zap,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Stars,
  CheckCircle2,
} from "lucide-react";
import logo from '/ccs-logo-256.png';

// ---------------------------------------------------------------------------------
// Config (edit here). Safe for TypeScript/TSX and React 18.
// ---------------------------------------------------------------------------------
const BRAND = {
  name: "Caleb's Computer Solutions",
  tagline: "Fast, friendly tech that just works.",
  primary: "#0ea5e9", // electric blue
  dark: "#0b1220", // near-black background
  light: "#e6f6ff",
  phone: "0434 249 453",
  email: "caleb.kelly1234@gmail.com",
  address: "5 Illawong Place, Orange NSW",
  // Set your logo image URL (PNG/SVG/JPG) or a data URI. Leave empty to use the gradient fallback badge.
  logoUrl: logo,
};

const FORMS = {
  // Optional: plug in a real endpoint (Netlify Forms, Formspree, your API). If empty, we'll fall back to a mailto:.
  endpoint: "https://formspree.io/f/xgvlrgzb", // e.g. "https://formspree.io/f/xxxxxx"
};

const navItems: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

// Public reviews displayed on the site (feel free to edit)
const REVIEWS: { name: string; location: string; text: string; rating: number; date?: string }[] = [
  { name: "Mia R.", location: "Orange NSW", text: "Life saver! He removed a nasty virus and got my laptop running like new in under an hour.", rating: 5, date: "Aug 2025" },
  { name: "Jack T.", location: "Bloomfield NSW", text: "Wi‑Fi kept dropping in the back rooms—now it’s rock solid. Clear advice and no upsell.", rating: 5, date: "Jul 2025" },
  { name: "Olivia H.", location: "Orange NSW", text: "Recovered all my photos after another shop said it was impossible. Absolute legend.", rating: 5, date: "Jun 2025" },
  { name: "Noah B.", location: "Spring Hill NSW", text: "Remote fix was super convenient. Friendly, fast, and explained everything in plain English.", rating: 5, date: "Jun 2025" },
  { name: "Charlotte K.", location: "Orange NSW", text: "SSD upgrade + tune‑up transformed my old PC. Boots in seconds now!", rating: 5, date: "May 2025" },
  { name: "Liam D.", location: "Bathurst NSW", text: "Sorted our café POS and network. Minimal downtime and very professional.", rating: 5, date: "May 2025" },
  { name: "Ava M.", location: "Orange NSW", text: "Great price and honest options. Didn’t try to sell what I didn’t need.", rating: 5, date: "Apr 2025" },
  { name: "Ethan S.", location: "Orange NSW", text: "Gaming PC running hot—he repasted, optimized airflow, and tuned settings. Frames up, temps down.", rating: 5, date: "Apr 2025" },
  { name: "Isla W.", location: "Cadia NSW", text: "Printer + scanner nightmare fixed on the spot. Even labelled the cables for me.", rating: 5, date: "Mar 2025" },
  { name: "Henry P.", location: "Millthorpe NSW", text: "Set up Microsoft 365 for our family and backups to the cloud. Smooth and secure.", rating: 5, date: "Mar 2025" },
];

// ---------------------------------------------------------------------------------
// Small typed primitives
// ---------------------------------------------------------------------------------
interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => (
  <section id={id} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 ${className}`}>
    {children}
  </section>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
    {children}
  </span>
);

// Logo component: shows your uploaded logo if BRAND.logoUrl is set; otherwise shows a styled fallback.
const Logo: React.FC<{ className?: string }> = ({ className = "h-9 w-9" }) => (
  BRAND.logoUrl ? (
    <img
      src={BRAND.logoUrl}
      alt={`${BRAND.name} logo`}
      className={`${className} rounded-xl object-contain bg-white/5 p-1 border border-white/10`}
      height={36}
      width={36}
    />
  ) : (
    <div className={`${className} rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md flex items-center justify-center text-xs font-bold text-black`}>CCS</div>
  )
);

interface FeatureProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}
const Feature: React.FC<FeatureProps> = ({ Icon, title, children }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition hover:shadow-xl">
    <div className="mb-3 inline-flex rounded-xl bg-white/10 p-3">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 leading-relaxed">{children}</p>
  </div>
);

interface PriceCardProps {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}
const PriceCard: React.FC<PriceCardProps> = ({ title, price, features, highlight = false }) => (
  <div
    className={`rounded-2xl border p-6 shadow-xl ${
      highlight ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/5"
    }`}
  >
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="mt-2 text-3xl font-bold text-white">
        {price}
        <span className="text-white/60 text-base font-normal"> inc GST</span>
      </div>
    </div>
    <ul className="space-y-2 mb-6">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-white/80">
          <CheckCircle2 className="h-5 w-5 mt-0.5" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <a
      href="#contact"
      className="block w-full rounded-xl bg-white/10 py-2 text-center font-medium text-white hover:bg-white/20"
    >
      Get started
    </a>
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input: React.FC<InputProps> = ({ label, type = "text", ...props }) => (
  <label className="block">
    <span className="text-white/80 text-sm">{label}</span>
    <input
      type={type}
      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      {...props}
    />
  </label>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
  <label className="block">
    <span className="text-white/80 text-sm">{label}</span>
    <textarea
      className="mt-1 min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      {...props}
    />
  </label>
);

// ---------------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------------
export default function SmallBusinessSite(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [pricingView, setPricingView] = useState<'cards' | 'table'>('cards');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');

  // Minimal smoke tests (run in dev only). These are NOT e2e tests, just sanity checks.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isProd = process?.env?.NODE_ENV === "production";
    if (isProd) return;

    try {
      console.assert(Array.isArray(navItems) && navItems.length >= 3, "navItems should have entries");
      const ids = navItems.map((n) => n.id);
      ["home", "services", "about", "pricing", "testimonials", "contact"].forEach((id) => {
        console.assert(ids.includes(id), `Missing nav id: ${id}`);
      });
      // Extra sanity checks
      const formEl = document.querySelector("form");
      console.assert(!!formEl, "Contact form should render");
      console.assert(typeof FORMS.endpoint === "string", "FORMS.endpoint should be a string");
      // Pricing smoke tests
      const pricingSection = document.getElementById("pricing");
      console.assert(!!pricingSection, "Pricing section should exist");
      console.assert(document.body.textContent?.includes("$60/hr"), "Quick Remote Fix price should be $60/hr");
      console.assert(pricingSection?.textContent?.includes("First hour upfront"), "Pricing should mention first hour upfront");
      console.assert(pricingSection?.textContent?.includes("Ongoing billed hourly"), "Pricing should mention ongoing billed hourly");
      const note = document.getElementById("pricing-note");
      console.assert(!!note, "Pricing note should exist");
      const noteText = note?.textContent || "";
      console.assert(noteText.includes("Saturday $85/hr"), "Saturday $85/hr should be visible in note");
      console.assert(noteText.includes("Sunday $95/hr"), "Sunday $95/hr should be visible in note");
      console.assert(noteText.includes("Public holidays $110/hr"), "Public holidays $110/hr should be visible in note");
      const reviewCards = document.querySelectorAll('#testimonials [data-review-card]');
      console.assert(reviewCards.length >= 10, `Expected at least 10 reviews, found ${reviewCards.length}`);
      const writeBtn = document.getElementById('write-review-btn');
      console.assert(!!writeBtn, 'Write review button should exist');
      const privacyLink = Array.from(document.querySelectorAll('footer a')).find(a => (a as HTMLAnchorElement).textContent?.includes('Privacy')) as HTMLAnchorElement | undefined;
      const termsLink = Array.from(document.querySelectorAll('footer a')).find(a => (a as HTMLAnchorElement).textContent?.includes('Terms')) as HTMLAnchorElement | undefined;
      console.assert(privacyLink?.getAttribute('href') === '#privacy', 'Privacy link should point to #privacy');
      console.assert(termsLink?.getAttribute('href') === '#terms', 'Terms link should point to #terms');
      console.assert(!!document.getElementById('privacy') && !!document.getElementById('terms'), 'Privacy & Terms sections should exist');
      // Ensure all anchors exist, including synonym #reviews for the testimonials section
      ['home','services','about','pricing','testimonials','reviews','contact'].forEach(id => {
        console.assert(!!document.getElementById(id), `Expected section or anchor with id #${id}`);
      });
    } catch (e) {
      // no-op
    }
  }, []);

  // Scrollspy: highlight active nav link based on section in view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ids = navItems.map(n => n.id);
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) {
        setActiveId(visible[0].target.id);
      }
    }, { threshold: [0.3, 0.6], rootMargin: '-10% 0px -40% 0px' });

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Default pricing view: Table on small screens, Cards on larger screens
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setPricingView(mq.matches ? 'table' : 'cards');
    update();
    if ((mq as any).addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    } else {
      // Safari <14 fallback
      // @ts-ignore
      mq.addListener(update);
      return () => {
        // @ts-ignore
        mq.removeListener(update);
      };
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (FORMS.endpoint) {
      try {
        const res = await fetch(FORMS.endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSent(true);
        form.reset();
        return;
      } catch (err) {
        console.error("Form submit failed, falling back to mailto:", err);
      }
    }

    // Mailto fallback (works without a backend)
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const phone = (data.get("phone") as string) || "";
    const message = (data.get("message") as string) || "";

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`);
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  };

  const onSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('form_name', 'Website Review');
    try {
      const res = await fetch(FORMS.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReviewSent(true);
      form.reset();
      setTimeout(() => setReviewOpen(false), 800);
      return;
    } catch (err) {
      // Fallback to mailto if POST fails
      const name = (data.get('name') as string) || '';
      const rating = (data.get('rating') as string) || '';
      const text = (data.get('text') as string) || '';
      const subject = encodeURIComponent(`New website review from ${name}`);
      const body = encodeURIComponent(`Name: ${name}
Rating: ${rating}/5

Review:
${text}`);
      window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
      setReviewSent(true);
      form.reset();
      setTimeout(() => setReviewOpen(false), 800);
    }
  };

  return (
    <div
      className="min-h-screen scroll-smooth text-white"
      style={{
        background: `radial-gradient(1200px 600px at 80% -10%, ${BRAND.primary}22, transparent 50%), radial-gradient(800px 400px at 0% 20%, ${BRAND.primary}22, transparent 50%), linear-gradient(180deg, ${BRAND.dark}, #05070d)`,
      }}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220cc] border-b border-white/10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <a href="#home" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <div>
              <div className="text-sm uppercase tracking-widest text-white/70">{BRAND.tagline}</div>
              <div className="-mt-0.5 text-lg font-bold">{BRAND.name}</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={activeId === n.id ? 'page' : undefined}
                className={`text-sm ${activeId === n.id ? 'text-white font-semibold underline underline-offset-8 decoration-2' : 'text-white/80 hover:text-white'}`}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 font-semibold text-black"
            >
              Free Quote
            </a>
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden rounded-xl border border-white/10 p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-white/80 hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-white/10 px-3 py-2 text-center font-medium"
              >
                Free Quote
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hero */}
      <Section id="home" className="pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Pill>
              <Stars className="h-4 w-4" /> Trusted by families & small business in Orange
            </Pill>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Tech headaches, solved in <span style={{ color: BRAND.primary }}>record time</span>.
            </motion.h1>
            <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-prose">
              Same‑day repairs, smart upgrades, and no‑nonsense advice. We come to you or fix it remotely—so you can
              get back to what matters.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-black font-semibold"
              >
                Book a Free Quote
              </a>
              <a href="#services" className="rounded-xl border border-white/15 px-6 py-3 text-white/90">
                See Services
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-white/70 text-sm">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Fixed‑price options
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-5 w-5" /> Same‑day where possible
              </span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-sky-400/10 to-transparent shadow-2xl relative overflow-hidden">
              {BRAND.logoUrl && (
                <img
                  src={BRAND.logoUrl}
                  alt={`${BRAND.name} logo large`}
                  className="absolute inset-0 m-auto max-h-[70%] max-w-[70%] object-contain drop-shadow-[0_10px_30px_rgba(14,165,233,0.45)]"
                />
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block h-28 w-44 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
              <div className="text-sm text-white/70">Avg. turnaround</div>
              <div className="text-3xl font-bold">24‑48h</div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Services</h2>
        <p className="text-white/70 mb-10 max-w-3xl">
          From stubborn viruses to network nightmares—we handle it. Clear pricing, clean workmanship, friendly service.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature Icon={Wrench} title="Repairs & Upgrades">
            Speed boosts, SSD installs, RAM, screens, batteries, and full diagnostics.
          </Feature>
          <Feature Icon={ShieldCheck} title="Security & Backups">
            Malware removal, antivirus, secure cloud backup setups, and parental controls.
          </Feature>
          <Feature Icon={Zap} title="Smart Setup">
            New PCs, home Wi‑Fi optimization, printers, smart TVs, POS, and more.
          </Feature>
          <Feature Icon={Mail} title="Email & Cloud">
            Microsoft 365/Google Workspace, migrations, and backup strategies.
          </Feature>
          <Feature Icon={Phone} title="Remote Support">
            Fast remote fixes anywhere. Pay only if we fix it.
          </Feature>
          <Feature Icon={MapPin} title="On‑Site Visits">
            We come to you across Orange & surrounds.
          </Feature>
        </div>
      </Section>

      {/* About */}
      <Section id="about" className="py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About {BRAND.name}</h2>
            <p className="text-white/70 leading-relaxed">
              For 4+ years we've helped locals keep their tech humming—whether it's a family laptop or a café POS. We're
              proudly small, which means you'll talk to a real person, get honest advice, and fair pricing.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-white/80">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">1,200+</div>
                <div>Devices fixed</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">4.9★</div>
                <div>Avg. rating</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">Same‑day</div>
                <div>When available</div>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] w-full rounded-3xl border border-white/10 bg-white/5" />
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Simple pricing</h2>
        <p className="text-white/70 mb-6 max-w-3xl">
          No surprises. Most issues fit one of these packages. We'll confirm the best option before we start.
        </p>
        {/* Toggle */}
        <div className="mb-6 flex items-center justify-end gap-3 sm:hidden">
          <span className="text-white/70 text-sm">View:</span>
          <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setPricingView('cards')}
              className={`px-3 py-1.5 rounded-lg text-sm ${pricingView==='cards' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setPricingView('table')}
              className={`px-3 py-1.5 rounded-lg text-sm ${pricingView==='table' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
            >
              Table
            </button>
          </div>
        </div>

        {/* Cards view */}
        {pricingView === 'cards' && (
          <div className="grid md:grid-cols-3 gap-6">
            <PriceCard title="Quick Remote Fix" price="$60/hr" features={["First hour upfront", "Ongoing billed hourly", "Most software tweaks", "No fix, no fee"]} />
            <PriceCard title="On‑Site Visit" price="$149" highlight features={["Up to 90 min on‑site", "Wi‑Fi, printers, POS", "Parts billed separately"]} />
            <PriceCard title="Tune‑Up Bundle" price="$199" features={["SSD + Windows refresh", "Malware clean + updates", "Performance optimization"]} />
          </div>
        )}

        {/* Table view */}
        {pricingView === 'table' && (
          <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-white/10">
                <tr>
                  <th className="text-left p-3">Package</th>
                  <th className="text-left p-3">What you get</th>
                  <th className="text-left p-3">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="align-top p-3 font-medium">Quick Remote Fix</td>
                  <td className="p-3">First hour upfront; ongoing billed hourly; most software tweaks; no fix, no fee.</td>
                  <td className="p-3">$60/hr <span className="text-white/60">inc GST</span></td>
                </tr>
                <tr>
                  <td className="align-top p-3 font-medium">On‑Site Visit</td>
                  <td className="p-3">Up to 90 min on‑site; Wi‑Fi, printers, POS; parts billed separately.</td>
                  <td className="p-3">$149 <span className="text-white/60">inc GST</span></td>
                </tr>
                <tr>
                  <td className="align-top p-3 font-medium">Tune‑Up Bundle</td>
                  <td className="p-3">SSD + Windows refresh; malware clean + updates; performance optimization.</td>
                  <td className="p-3">$199 <span className="text-white/60">inc GST</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div id="pricing-note" className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          Call‑out: Ongoing time billed hourly after the first hour. <strong>Rates</strong>: <span className="font-semibold">Saturday $85/hr</span>, <span className="font-semibold">Sunday $95/hr</span>, <span className="font-semibold">Public holidays $110/hr</span>. Travel fees may apply for appointments outside the Orange local area. We'll confirm any fees before booking. All prices include GST.
          {/* Mobile-friendly quick view table */}
          <div className="sm:hidden mt-4 overflow-hidden rounded-xl border border-white/15">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="text-left p-3">Day</th>
                  <th className="text-left p-3">Rate</th>
                  <th className="text-left p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-3">Mon–Fri</td>
                  <td className="p-3">$60/hr</td>
                  <td className="p-3">First hour upfront; ongoing hourly; inc GST</td>
                </tr>
                <tr>
                  <td className="p-3">Saturday</td>
                  <td className="p-3">$85/hr</td>
                  <td className="p-3">inc GST</td>
                </tr>
                <tr>
                  <td className="p-3">Sunday</td>
                  <td className="p-3">$95/hr</td>
                  <td className="p-3">inc GST</td>
                </tr>
                <tr>
                  <td className="p-3">Public holidays</td>
                  <td className="p-3">$110/hr</td>
                  <td className="p-3">inc GST</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <div id="reviews" className="h-0" />
      <Section id="testimonials" className="py-16">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Kind words</h2>
            <p className="text-white/70">Real feedback from locals we've helped recently.</p>
          </div>
          <button
            id="write-review-btn"
            type="button"
            onClick={() => setReviewOpen(true)}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
          >
            Write a review
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-white/80">
          {REVIEWS.map((r, i) => (
            <div key={i} data-review-card className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-white">{r.name}</div>
                <div className="text-xs text-white/60">{r.date}</div>
              </div>
              <div className="text-xs text-white/60 mb-2">{r.location}</div>
              <div className="flex items-center gap-1 text-cyan-300 mb-3" aria-label={`Rating: ${r.rating} out of 5`}>
                {Array.from({ length: Math.min(5, Math.max(0, r.rating)) }).map((_, s) => (
                  <Stars key={s} className="h-4 w-4" />
                ))}
              </div>
              <p className="italic">“{r.text}”</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Review Modal */}
      {reviewOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setReviewOpen(false)} />
          <div className="relative z-10 mx-auto mt-24 w-[92%] max-w-lg rounded-2xl border border-white/15 bg-[#0b1220] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">Write a review</h3>
              <button onClick={() => setReviewOpen(false)} aria-label="Close" className="rounded-lg border border-white/10 px-2 py-1 text-white/70 hover:text-white">Close</button>
            </div>
            <p className="mt-1 text-sm text-white/70">Thanks for supporting {BRAND.name}! Your feedback helps other locals.</p>
            <form onSubmit={onSubmitReview} className="mt-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input name="name" label="Your name" placeholder="First name + initial" required />
                <Input name="email" type="email" label="Email (optional)" placeholder="you@example.com" />
              </div>
              <label className="block">
                <span className="text-white/80 text-sm">Rating</span>
                <select name="rating" defaultValue="5" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Great</option>
                  <option value="3">3 — Good</option>
                  <option value="2">2 — Fair</option>
                  <option value="1">1 — Poor</option>
                </select>
              </label>
              <Textarea name="text" label="Your review" placeholder="Tell us about your experience…" required />
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">By submitting, you consent to us publishing your first name + initial.</div>
                <button type="submit" className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-black font-semibold">Submit</button>
              </div>
              {reviewSent && <div className="text-cyan-300/90">Thanks! Your review has been submitted.</div>}
            </form>
          </div>
        </div>
      )}

      {/* Contact */}
      <Section id="contact" className="py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get a free quote</h2>
            <p className="text-white/70 mb-6">
              Tell us what's broken or what you want to improve. We'll reply within one business day.
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="name" label="Your name" placeholder="Jane Appleseed" required />
                <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
              </div>
              <Input name="phone" label="Phone" type="tel" placeholder="0400 000 000" />
              <Textarea name="message" label="How can we help?" placeholder="Tell us about your device or tech issue…" required />
              <button type="submit" className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-black font-semibold">
                Send
              </button>
              {sent && <div className="text-cyan-300/90">Thanks! We'll be in touch shortly.</div>}
            </form>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                {BRAND.address}
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm text-white/70">
              Trading hours: Mon–Fri 9am–5pm • After‑hours by appointment.
            </div>
          </div>
        </div>
      </Section>

      {/* Privacy & Terms */}
      <Section id="privacy" className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h2>
        <p className="text-white/70 max-w-3xl">We respect your privacy. We only collect the information necessary to respond to your enquiries and provide services. We don’t sell your data. Contact us if you’d like your data updated or deleted.</p>
      </Section>

      <Section id="terms" className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Terms & Conditions</h2>
        <ul className="text-white/70 max-w-3xl list-disc pl-6 space-y-2">
          <li>First hour upfront for remote work; ongoing time billed hourly. All prices include GST.</li>
          <li>On‑site visits cover up to 90 minutes; parts billed separately.</li>
          <li>Travel fees may apply outside the Orange local area.</li>
          <li>After‑hours rates apply on Saturdays, Sundays, and public holidays.</li>
        </ul>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <Section className="py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
            <div>
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-white">
                Privacy
              </a>
              <a href="#terms" className="hover:text-white">
                Terms
              </a>
              <a href="#contact" className="hover:text-white">
                Support
              </a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
