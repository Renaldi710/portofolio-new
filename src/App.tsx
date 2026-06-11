import { useState, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Laptop, 
  Code, 
  Terminal, 
  Sparkles, 
  Calculator, 
  MapPin, 
  Coffee, 
  Bookmark, 
  ChevronRight,
  ExternalLink,
  Smartphone,
  CheckCircle,
  FileSpreadsheet,
  Globe,
  Database,
  Briefcase,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, Service, PricingPlan, Inquiry } from "./types";
import ProjectCard from "./components/ProjectCard";
import ServiceCard from "./components/ServiceCard";
import ClientEstimator from "./components/ClientEstimator";
import InquiryMonitor from "./components/InquiryMonitor";
import ProjectDetailsModal from "./components/ProjectDetailsModal";

// Seed Project Data
const SEED_PROJECTS: Project[] = [
  {
    id: "devcheck",
    title: "DevCheck (Environment Installer)",
    description: "A desktop installer application built with Tauri v2 that auto-detects and installs developer prerequisites including PHP, Composer, MySQL, and Node.js on Windows & Linux systems.",
    tags: ["Tauri", "Rust", "TypeScript", "Node.js"],
    category: "Desktop",
    githubUrl: "https://github.com/Renaldi710/dev-env-installer",
    featured: true
  },
  {
    id: "laravellp",
    title: "Laravel Dynamic Landing Page",
    description: "MVC-driven high-performance presentation landing page illustrating clean Laravel routing configurations, Blade components encapsulation, and native Bootstrap 5 grid styling.",
    tags: ["Laravel", "PHP", "Blade", "HTML/CSS"],
    category: "Frontend",
    githubUrl: "https://github.com/Renaldi710/my-lp",
    featured: false
  },
  {
    id: "inventaris",
    title: "InventarisApp (Warehouse System)",
    description: "Full-scale offline-tolerant warehouse and inventory manager. Built with Laravel 13 & Filament Admin v5. Implements granular RBAC (role-based access controls) and multi-tier manager approvals over SQLite.",
    tags: ["Laravel 13", "Filament 5", "Livewire", "SQLite", "Tailwind v4"],
    category: "Backend",
    featured: true
  },
  {
    id: "velora",
    title: "VeloraTech Corporate Dashboard",
    description: "High-security core backend control system powering 21 REST API endpoints. Configured via Laravel Sanctum authentication. Containerized with Docker and audited against security threats via Burp Suite.",
    tags: ["Laravel Master", "Sanctum Auth", "Docker Core", "REST API", "Database Postgres"],
    category: "Backend",
    featured: true
  }
];

// Seed Services Data
const SEED_SERVICES: Service[] = [
  {
    id: "srv_web",
    title: "Web Development",
    description: "Custom websites, high-speed landing cards, & responsive full-stack applications leveraging modern Laravel ecosystems & modular React rendering pipelines that load fast.",
    icon: "laptop"
  },
  {
    id: "srv_api",
    title: "API & Backend Services",
    description: "Restful API design, database schemas orchestration (MySQL, PostgreSQL, SQLite), granular authorization policies, and microservices in pure Laravel, Python or Golang.",
    icon: "code"
  },
  {
    id: "srv_devops",
    title: "DevOps & Infrastructure",
    description: "Docker environment packaging, continuous integration & delivery setups (CI/CD), secure Linux system administration (Debian/Ubuntu/Fedora 44), and cloud container releases.",
    icon: "terminal"
  }
];

// Seed Plans Data
const SEED_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Layer",
    priceMin: 1000000,
    priceMax: 1500000,
    duration: "1 minggu",
    color: "from-blue-600 to-indigo-500",
    features: [
      "Landing page 1 halaman responsif",
      "Desain mobile-friendly & SEO Dasar",
      "Formulir kontak WhatsApp / Email",
      "Deployment ke hosting client gratis"
    ]
  },
  {
    id: "standard",
    name: "Standard Tier",
    priceMin: 3000000,
    priceMax: 4000000,
    duration: "1–2 minggu",
    isPopular: true,
    color: "from-violet-600 to-fuchsia-500",
    features: [
      "Profil perusahaan (hingga 5 halaman)",
      "Desain UI/UX eksklusif khusus",
      "Sistem CMS mandiri mudah kelola",
      "Optimasi SEO Google & Sertifikasi SSL",
      "Dukungan revisi hingga 3 kali"
    ]
  },
  {
    id: "pro",
    name: "Professional Engine",
    priceMin: 6000000,
    priceMax: 8000000,
    duration: "2 minggu",
    color: "from-amber-500 to-orange-600",
    features: [
      "Arsitektur server Laravel custom penuh",
      "CMS Administrasi Filament v3 + RBAC",
      "Containerization Docker & Deploy VPS",
      "Keamanan REST API endpoints audit",
      "Premium priority maintenance support"
    ]
  }
];

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("theme");
      if (cached) return cached === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Category Filtering
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Selection states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Inquiries persist state
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("developer_inquiries");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Mobile menu control
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Stats Counters
  const [internshipStats, setInternshipStats] = useState<number>(0);
  const [projectsStats, setProjectsStats] = useState<number>(0);
  const [languagesStats, setLanguagesStats] = useState<number>(0);
  const [githubStats, setGithubStats] = useState<number>(0);

  // Animate counters on load
  useEffect(() => {
    const limits = { intern: 6, projects: 5 + inquiries.length, lang: 7, repos: 12 };
    
    const interval = setInterval(() => {
      setInternshipStats((prev) => (prev < limits.intern ? prev + 1 : prev));
      setProjectsStats((prev) => (prev < limits.projects ? prev + 1 : prev));
      setLanguagesStats((prev) => (prev < limits.lang ? prev + 1 : prev));
      setGithubStats((prev) => (prev < limits.repos ? prev + 1 : prev));
    }, 60);

    return () => clearInterval(interval);
  }, [inquiries.length]);

  // Sync theme to root DOM (Strict Elegant Dark Theme)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Save inquiries to localStorage
  const handleAddInquiry = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("developer_inquiries", JSON.stringify(updated));
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem("developer_inquiries", JSON.stringify(updated));
  };

  // Categories list based on projects
  const categories = ["All", "Backend", "Frontend", "Desktop"];

  const filteredProjects = activeCategory === "All"
    ? SEED_PROJECTS
    : SEED_PROJECTS.filter((p) => p.category === activeCategory);

  const formatCost = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-300 transition-colors duration-350 font-sans relative antialiased selection:bg-indigo-500 selection:text-white noise">
      
      {/* Header bar */}
      <nav className="fixed top-4 left-4 right-4 z-50 max-w-6xl mx-auto" role="navigation" aria-label="Main navigation">
        <div className="nav-blur bg-[#0F0F11]/90 border border-zinc-800 rounded-2xl px-6 py-3 flex items-center justify-between transition-all shadow-xl shadow-black/40">
          {/* Logo */}
          <a href="#" className="font-display text-lg font-black tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-550 to-violet-550 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white text-sm font-black">R</span>
            </span>
            <span className="text-zinc-100 font-bold hover:text-white transition-colors">
              renaldi.dev
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => scrollToSection("work")} className="text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer">
              Work
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToSection("skills")} className="text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer">
              Stack
            </button>
            <button onClick={() => scrollToSection("calculator")} className="text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-indigo-450" />
              Estimator
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Elegant Dark Tag */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-[#121214] text-[10px] font-mono font-bold text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>ELEGANT DARK</span>
            </div>

            {/* CTA action */}
            <button 
              onClick={() => scrollToSection("calculator")} 
              className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
            >
              Hire Me
            </button>

            {/* Mobile menu gate */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden p-2 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 text-zinc-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#0F0F11] border-l border-zinc-800 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <span className="font-display font-bold text-zinc-100">Navigasi Alamat</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-1.5 rounded-lg hover:bg-zinc-800 cursor-pointer"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>

                <div className="flex flex-col gap-4 py-8">
                  <button onClick={() => { scrollToSection("services"); setIsMobileMenuOpen(false); }} className="text-left py-2 font-bold hover:text-indigo-400 transition-colors text-zinc-300 text-lg cursor-pointer">
                    Services
                  </button>
                  <button onClick={() => { scrollToSection("work"); setIsMobileMenuOpen(false); }} className="text-left py-2 font-bold hover:text-indigo-400 transition-colors text-zinc-300 text-lg cursor-pointer">
                    Selected Works
                  </button>
                  <button onClick={() => { scrollToSection("about"); setIsMobileMenuOpen(false); }} className="text-left py-2 font-bold hover:text-indigo-400 transition-colors text-zinc-300 text-lg cursor-pointer">
                    About Developer
                  </button>
                  <button onClick={() => { scrollToSection("skills"); setIsMobileMenuOpen(false); }} className="text-left py-2 font-bold hover:text-indigo-400 transition-colors text-zinc-300 text-lg cursor-pointer">
                    Tech Stack Option
                  </button>
                  <button onClick={() => { scrollToSection("calculator"); setIsMobileMenuOpen(false); }} className="text-left py-2 font-bold hover:text-indigo-400 transition-colors text-zinc-300 text-lg cursor-pointer">
                    Project Cost Estimator
                  </button>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => { scrollToSection("calculator"); setIsMobileMenuOpen(false); }} 
                  className="w-full text-center py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-xl shadow-indigo-500/15 cursor-pointer"
                >
                  Hubungi Kerja Sama
                </button>
                <div className="text-center text-[10px] text-zinc-500 mt-4">
                  Malang, Indonesia &bull; Renaldi Dev Portfolio
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Introduction Text Block */}
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-zinc-800 bg-[#121214] text-zinc-400 mb-4 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Jasa Freelance Aktif
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-black font-display tracking-[-0.03em] leading-[0.94] text-zinc-100">
                  I build things <br />
                  <span className="gradient-text">for the web.</span>
                </h1>

                <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                  Full-stack developer &amp; DevOps dari Malang, Indonesia. Saya membantu bisnis merancang sistem web tangguh — mulai dari backend Laravel yang tangkas hingga deployment pipa container Docker.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => scrollToSection("work")}
                    className="px-6.5 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-zinc-950/10"
                  >
                    See My Work
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => scrollToSection("calculator")}
                    className="px-6.5 py-3.5 border-2 border-zinc-800 text-zinc-400 hover:bg-zinc-900 font-extrabold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all"
                  >
                    Kalkulator Biaya
                  </button>
                </div>

                {/* Micro tech indicators */}
                <div className="flex items-center gap-5 pt-4 text-xs text-zinc-500">
                  <div className="flex -space-x-1.5">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">PHP</div>
                    <div className="w-8 h-8 rounded-full bg-violet-500 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">LAR</div>
                    <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">DOK</div>
                    <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">FIL</div>
                  </div>
                  <span>
                    Fokus pada <strong className="text-zinc-300">5+ Bahasa Pemograman</strong> &amp; <strong className="text-zinc-300">Keamanan API</strong>
                  </span>
                </div>
              </div>

              {/* Showcase profile badge circle matching the HTML design context */}
              <div className="hidden lg:flex justify-center relative">
                <div className="relative">
                  {/* Glowing background circles */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-2xl animate-pulse" />
                  
                  {/* Main Avatar Card Frame */}
                  <div className="relative w-76 h-76 sm:w-80 sm:h-80 rounded-full border-4 border-zinc-800 bg-[#121214] shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* SVG Vector Developer Placeholder inside instead of broken image load */}
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                      <rect width="200" height="200" fill="#0A0A0C"/>
                      <circle cx="100" cy="100" r="120" fill="url(#paint0_linear)" opacity="0.15"/>
                      <circle cx="100" cy="85" r="32" fill="#6366F1"/>
                      <path d="M40 162C40 125.548 70.8359 110 100 110C129.164 110 160 125.548 160 162V175H40V162Z" fill="#4F46E5"/>
                      <path d="M75 125L90 140L125 105" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="paint0_linear" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#6366F1"/>
                          <stop offset="1" stopColor="#EC4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Dark gradient shadow inside */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Absolute Available target */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0F0F11] px-5.5 py-3 rounded-2xl shadow-xl border border-zinc-800 flex items-center gap-2.5 whitespace-nowrap">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tech horizontal marquee */}
        <section className="py-6 border-y border-zinc-800 bg-[#121214]/30 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          
          <div className="text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
            Core Technologies Stack
          </div>

          <div className="flex select-none overflow-hidden gap-8">
            <div className="flex items-center shrink-0 min-w-full gap-8 animate-marquee-loop">
              {["PHP", "Laravel", "Python", "Golang", "Kotlin", "Docker", "Linux (Fedora)", "MySQL", "PostgreSQL", "Rust", "TypeScript", "Filament v3", "Blade CSS"].map((tech, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 bg-[#121214] border border-zinc-800 rounded-xl text-xs font-bold text-zinc-350 shadow-sm"
                >
                  {tech}
                </div>
              ))}
            </div>
            {/* Duplication for seamless slide marquee */}
            <div className="flex items-center shrink-0 min-w-full gap-8 aria-hidden:true animate-marquee-loop">
              {["PHP", "Laravel", "Python", "Golang", "Kotlin", "Docker", "Linux (Fedora)", "MySQL", "PostgreSQL", "Rust", "TypeScript", "Filament v3", "Blade CSS"].map((tech, idx) => (
                <div 
                  key={`dup-${idx}`}
                  className="px-4 py-2 bg-[#121214] border border-zinc-800 rounded-xl text-xs font-bold text-zinc-350 shadow-sm"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .animate-marquee-loop {
              animation: marquee-move 28s linear infinite;
            }
            @keyframes marquee-move {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
          `}</style>
        </section>

        {/* Services Showcase */}
        <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-2xs uppercase tracking-widest font-black bg-indigo-500/10 text-indigo-400">
                What I Offer
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-zinc-100">
                Services &amp; Layanan Jasa
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                Siap membantu Anda membangun digital product berkelanjutan, tangguh, serta terdokumentasi rapi.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {SEED_SERVICES.map((srv) => (
                <ServiceCard key={srv.id} service={srv} />
              ))}
            </div>
          </div>
        </section>

        {/* Selected Portfolio / Works */}
        <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/20 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-2xs uppercase tracking-widest font-black bg-indigo-500/10 text-indigo-400">
                Portofolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-zinc-100">
                Selected Work
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base">
                Proyek nyata yang dikembangkan dengan fokus penuh pada struktur clean code &amp; performa tinggi.
              </p>
            </div>

            {/* Visual filtering tab tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-zinc-100 text-zinc-950 shadow-md font-bold"
                      : "bg-[#121214] hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {filteredProjects.map((proj) => (
                <ProjectCard 
                  key={proj.id} 
                  project={proj} 
                  onOpenDetails={(p) => setSelectedProject(p)} 
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <a 
                href="https://github.com/Renaldi710" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold text-zinc-500 hover:text-indigo-455 transition-colors"
              >
                Lihat repositori lainnya di GitHub
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

        {/* About & Stats section */}
        <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                         {/* Picture frame on Desktop, showing Malang context */}
              <div className="flex justify-center order-last lg:order-first relative">
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl blur-xl opacity-20 animate-pulse" />
                  
                  {/* Decorative Malang outline / Map grid or badge */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800 bg-[#121214] text-white p-8 space-y-4 max-w-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <MapPin className="w-4 h-4 text-rose-500 animate-bounce" />
                        <span>Malang, Indonesia</span>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        Informatics Student
                      </span>
                      <h4 className="text-xl font-black font-display text-zinc-100">
                        Renaldi
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                        "Active Linux enthusiast running Fedora 44 workstation daily. Focuses on terminal efficiency and automations with shell and Rust."
                      </p>
                    </div>

                    <div className="h-[1px] bg-zinc-800" />

                    {/* Fun miniature terminal mock */}
                    <div className="bg-black/50 rounded-xl p-3 text-[10px] font-mono text-zinc-300 space-y-1">
                      <div className="text-[rgb(235,100,50)] flex items-center gap-1">
                        <span>$</span>
                        <span className="text-zinc-100">neofetch --os</span>
                      </div>
                      <div className="text-zinc-400">OS: Fedora Linux Workstation 44</div>
                      <div className="text-zinc-400">Shell: zsh 5.9 (omz theme)</div>
                      <div className="text-zinc-400">Main IDE: VS Code + NeoVim Keybinds</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text profile */}
              <div className="space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full text-2xs uppercase tracking-widest font-black bg-indigo-500/10 text-indigo-400">
                  About Developer
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-zinc-100">
                  A bit about me
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <p>
                    Saya adalah mahasiswa Teknik Informatika yang berbasis di <strong className="text-zinc-200">Malang, Indonesia</strong>. Saya pernah menyelesaikan magang intensif sebagai DevOps &amp; Linux System Administrator, memperoleh pemahaman mendalam tentang siklus rilis dan audit deployment server.
                  </p>
                  <p>
                    Kini, saya giat menggeluti dunia freelance, membantu klien meluncurkan draf website Laravel handal dengan antarmuka administrasi Filament yang rapi. Saya mematuhi standar clean code dan ketepatan estimasi pengerjaan.
                  </p>
                  <p>
                    Apabila tidak sedang di depan editor, saya biasanya berkontribusi di komunitas open-source lokal, menata dotfiles workstation Linux saya, atau berlatih merancang interface desktop menggunakan Tauri serta Rust.
                  </p>
                </div>

                {/* Grid metrics counters */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-4">
                  <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-3 sm:p-4 text-center cursor-default hover:border-indigo-500 hover:shadow-lg transition-all animate-pulse-slow">
                    <span className="text-xl sm:text-2xl font-black font-display text-indigo-400 block">
                      {internshipStats}+
                    </span>
                    <span className="text-[9px] uppercase tracking-wide font-extrabold text-zinc-500 block leading-tight mt-1">
                      Bulan Magang
                    </span>
                  </div>
                  <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-3 sm:p-4 text-center cursor-default hover:border-indigo-500 hover:shadow-lg transition-all">
                    <span className="text-xl sm:text-2xl font-black font-display text-purple-400 block">
                      {projectsStats}+
                    </span>
                    <span className="text-[9px] uppercase tracking-wide font-extrabold text-zinc-500 block leading-tight mt-1">
                      Aplikasi Rilis
                    </span>
                  </div>
                  <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-3 sm:p-4 text-center cursor-default hover:border-indigo-500 hover:shadow-lg transition-all">
                    <span className="text-xl sm:text-2xl font-black font-display text-pink-400 block">
                      {languagesStats}+
                    </span>
                    <span className="text-[9px] uppercase tracking-wide font-extrabold text-zinc-500 block leading-tight mt-1">
                      Kuasai Bahasa
                    </span>
                  </div>
                  <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-3 sm:p-4 text-center cursor-default hover:border-indigo-500 hover:shadow-lg transition-all">
                    <span className="text-xl sm:text-2xl font-black font-display text-amber-500 block">
                      {githubStats}+
                    </span>
                    <span className="text-[9px] uppercase tracking-wide font-extrabold text-zinc-500 block leading-tight mt-1">
                      Repositori
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a 
                    href="https://linkedin.com/in/renaldi-zaki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-850 bg-[#121214] hover:bg-zinc-900 text-xs font-bold text-zinc-300 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-indigo-400" />
                    LinkedIn Profile
                  </a>
                  <a 
                    href="mailto:renaldizaki7@gmail.com"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-850 bg-[#121214] hover:bg-zinc-900 text-xs font-bold text-zinc-300 transition-all"
                  >
                    <Mail className="w-4 h-4 text-pink-450" />
                    Hubungi Email
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Stack categorisation view */}
        <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-2xs uppercase tracking-widest font-black bg-indigo-500/10 text-indigo-400">
                Tech Stack
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-display text-zinc-100">
                Rangkuman Stack Harian
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Teknologi yang saya gunakan secara profesional untuk mengembangkan aplikasi web.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Group 1 */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Backend Frameworks &amp; DBMS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Laravel (PHP)
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      MySQL &amp; PostgreSQL
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      SQLite Engine
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Golang &amp; Python (Backend API)
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Infrastructures &amp; Cloud DevOps
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Docker Container
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Linux Sysadmin (Ubuntu/Deb/Fedora workstation)
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      CI/CD pipelines &bull; Git versioning
                    </span>
                  </div>
                </div>
              </div>

              {/* Group 2 */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Frontend Interactive Options
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      HTML5 &bull; CSS3 &bull; Blade Templates
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Vue / React SPA Integrasi
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Tailwind CSS (V4)
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Filament Panel &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Filament Administrative Panels Specialist
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Tauri desktop shell apps (Rust core)
                    </span>
                    <span className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-xs font-bold shadow-sm text-zinc-300">
                      Burp Suite Penetration APIs Audit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Interactive Cost Estimator Slider Calculator */}
        <section id="calculator" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0A0B] border-t border-zinc-900">
          <div className="max-w-6xl mx-auto space-y-16">
            
            <div className="text-center space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-2xs uppercase tracking-widest font-black bg-indigo-500/10 text-indigo-400">
                Calculator Cost Estimator
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-zinc-100">
                Harga Jasa &amp; Kalkulator Proyek
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                Rancang spesifikasi website Anda sendiri secara bebas. Lihat estimasi biaya riil serta estimasi penyerahan proyek secara instan.
              </p>
            </div>

            {/* Static Pricing Reference Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {SEED_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-2xl border bg-[#121214] p-8 shadow-sm hover:shadow-xl transition-all duration-300 ${
                    plan.isPopular 
                      ? "border-indigo-550 ring-2 ring-indigo-500/15 scale-102" 
                      : "border-zinc-800"
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-[10px] font-black text-white uppercase tracking-wider block">
                      Popular Tier
                    </span>
                  )}

                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-zinc-500">
                      Spesifikasi Dasar
                    </span>
                    <h3 className="text-xl font-bold font-display text-zinc-100 mt-1">
                      {plan.name}
                    </h3>
                    
                    <div className="mt-4">
                      <span className="text-3xl font-black text-zinc-150 font-display">
                        {formatCost(plan.priceMin)}
                      </span>
                      <span className="text-xs text-zinc-450 block mt-1">
                        hingga {formatCost(plan.priceMax)}
                      </span>
                    </div>

                    <div className="h-[1px] bg-zinc-800/80 my-5" />

                    <ul className="space-y-3">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between text-2xs font-bold text-zinc-500 uppercase">
                    <span>Pengerjaan:</span>
                    <span className="text-zinc-200 font-mono">{plan.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-zinc-500 border-t border-zinc-800 pt-8">
              🎓 Diskon 15% untuk seluruh mahasiswa aktif dengan menyertakan foto draf KTM Anda. Konsultasi rancangan awal gratis.
            </div>

            {/* Live Interactive Scoper Simulator */}
            <div className="border border-zinc-800 p-6 sm:p-10 rounded-3xl bg-[#0F0F11] shadow-2xl relative">
              <span className="absolute right-6 top-6 opacity-5 -z-1 pointer-events-none">
                <Calculator className="w-48 h-48" />
              </span>
              <ClientEstimator 
                plans={SEED_PLANS} 
                onInquirySubmit={handleAddInquiry} 
              />
            </div>

            {/* Display Active Inquiries locally persistent Tracker */}
            <div className="pt-6">
              <InquiryMonitor 
                inquiries={inquiries} 
                onDeleteInquiry={handleDeleteInquiry} 
              />
            </div>

          </div>
        </section>

        {/* Contact direct credentials info */}
        <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0F0F11]/60 border-t border-zinc-900 text-zinc-300 transition-all relative">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 right-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl"></div>
            <div className="absolute top-40 left-10 w-85 h-85 rounded-full bg-pink-500/5 blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-2xs uppercase tracking-widest font-black bg-indigo-500/10 text-indigo-455">
                Hubungi Pengembang
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-zinc-100">
                Let's work together.
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Butuh pengembang yang andal merespons kebutuhan klien tanpa birokrasi berbelit? Kirimkan brief, dan mari kita wujudkan bersama website proyektor terbaik Anda!
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
              
              <a 
                href="mailto:renaldizaki7@gmail.com" 
                className="flex flex-col items-center p-5 rounded-2xl bg-[#121214] hover:bg-[#151518]/90 border border-zinc-800 transition-all cursor-pointer group"
              >
                <Mail className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform mb-3" />
                <span className="text-xs text-zinc-500 block font-semibold mb-1">Kirim Email</span>
                <span className="text-xs font-bold text-zinc-200 font-mono break-all leading-tight">renaldizaki7@gmail.com</span>
              </a>

              <a 
                href="https://wa.me/6289515341260" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-5 rounded-2xl bg-[#121214] hover:bg-[#151518]/90 border border-zinc-800 transition-all cursor-pointer group"
              >
                <Smartphone className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform mb-3" />
                <span className="text-xs text-zinc-500 block font-semibold mb-1">WhatsApp Fast Response</span>
                <span className="text-xs font-bold text-zinc-200 font-mono leading-tight">089515341260</span>
              </a>

              <a 
                href="https://github.com/Renaldi710" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-5 rounded-2xl bg-[#121214] hover:bg-[#151518]/90 border border-zinc-800 transition-all cursor-pointer group"
              >
                <Github className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform mb-3" />
                <span className="text-xs text-zinc-500 block font-semibold mb-1">GitHub Repos</span>
                <span className="text-xs font-bold text-zinc-200 font-mono leading-tight">@Renaldi710</span>
              </a>

              <a 
                href="https://linkedin.com/in/renaldi-zaki" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-5 rounded-2xl bg-[#121214] hover:bg-[#151518]/90 border border-zinc-800 transition-all cursor-pointer group"
              >
                <Linkedin className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform mb-3" />
                <span className="text-xs text-zinc-500 block font-semibold mb-1">LinkedIn Career</span>
                <span className="text-xs font-bold text-zinc-200 font-mono leading-tight">Renaldi Zaki</span>
              </a>

            </div>

            <div className="pt-8 text-center text-xs text-zinc-500">
              Malang, Jawa Timur, Indonesia &bull; Tersedia Untuk Proyek Remote atau On-Site area Malang.
            </div>

          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#0A0A0B] transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Renaldi. All Rights Reserved. Built with React 19 &amp; Tailwind CSS v4.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Renaldi710" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-indigo-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/renaldi-zaki" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-indigo-400 transition-colors">LinkedIn</a>
            <a href="mailto:renaldizaki7@gmail.com" className="text-xs text-zinc-500 hover:text-indigo-400 transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {/* Project details modal gate */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
