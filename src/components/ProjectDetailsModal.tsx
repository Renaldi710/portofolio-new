import { Project } from "../types";
import { X, Github, ExternalLink, Settings, Sparkles, Terminal, Shield, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  // Mock architectural descriptions for the developer case study
  const getArchitectureDetails = (id: string) => {
    switch (id) {
      case "devcheck":
        return {
          overview: "Klien pembuat environment ini menggunakan Rust (Tauri core) untuk memanggil thread system shell secara langsung, mendownload resource biner secara asinkron lewat backend Rust, dan mengekstrak path biner ke sistem variabel lingkungan Windows/Linux secara otomatis tanpa intervensi manual klien.",
          techs: ["Tauri v2 Core", "Rust System Modules", "TypeScript", "Vite Engine", "Async Fetch Crate"],
          impact: "Memangkas waktu setup awal environment Laravel dari 45 menit menjadi kurang dari 3 menit untuk siswa baru.",
          categoryIcon: <Cpu className="w-5 h-5 text-indigo-500" />
        };
      case "laravellp":
        return {
          overview: "Landing page berbasis arsitektur MVC (Model-View-Controller) klasik dari PHP Laravel. Mengandalkan Blade templates berkemampuan cache tinggi, optimalisasi static assets, dan formulir pengaduan responsif.",
          techs: ["PHP Core", "Laravel Routing", "Blade Components", "Bootstrap 5", "Web Analytics Integrasi"],
          impact: "Mencapai performa visual 98/100 pada uji lab Google Lighthouse.",
          categoryIcon: <Settings className="w-5 h-5 text-blue-500" />
        };
      case "inventaris":
        return {
          overview: "Sistem aplikasi manajemen aset pergudangan real-time yang memanfaatkan Filament v3 / Livewire framework. Dilengkapi sistem penguncian baris basis data (row locking), persetujuan bertingkat (multi-approval workflows), dan basis data SQLite yang tangguh.",
          techs: ["Laravel 13", "Filament Administrative Framework", "Livewire Core", "SQLite", "RBAC Policies"],
          impact: "Mengurangi selisih stok hingga 99.4% pada uji coba operasional inventaris yayasan.",
          categoryIcon: <Shield className="w-5 h-5 text-violet-500" />
        };
      case "velora":
        return {
          overview: "Full-Stack Agency dashboard dengan total 21 REST API endpoints aman di bawah token Sanctum auth. Menghubungkan client database logistik dengan frontend. Seluruh endpoint lolos uji analisis penetrasi port (Penetration tested) menggunakan Burp Suite v2025.",
          techs: ["Laravel Web Services", "Sanctum Guard", "Docker Containerization", "Postgres Engine", "Burp Suite Standard API Audits"],
          impact: "Mengamankan lalu lintas transaksi logistik bernilai puluhan juta rupiah dari eksploitasi SQLi.",
          categoryIcon: <Terminal className="w-5 h-5 text-emerald-500" />
        };
      default:
        return {
          overview: "Sebuah aplikasi web inovatif berkemampuan performa tinggi yang dibuat klien dengan standar industri terkini, berstruktur clean code, dan berfokus pada skalabilitas maksimum.",
          techs: project.tags,
          impact: "Meningkatkan kepuasan pengaduan klien secara signifikan.",
          categoryIcon: <Sparkles className="w-5 h-5 text-amber-500" />
        };
    }
  };

  const caseStudy = getArchitectureDetails(project.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        layoutId={`project-container-${project.id}`}
        className="relative w-full max-w-2xl bg-[#121214] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl z-10 max-h-[90vh] flex flex-col"
      >
        {/* Banner with gradient overlay */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 flex items-center px-8 text-white">
          <div className="absolute right-4 top-4 z-20">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-black bg-white/20 px-2.5 py-1 rounded-full">
              Case Study
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1 animate-fade-in font-display">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content inside */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* Overview Section */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-2">
              {caseStudy.categoryIcon}
              Gambaran Umum &amp; Arsitektur
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed bg-[#0A0A0B]/85 p-4 rounded-2xl border border-zinc-800/80">
              {caseStudy.overview}
            </p>
          </div>

          {/* Tech stack tags */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
              Spesifikasi Teknologi Yang Digunakan
            </h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techs.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-bold font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Impact section */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-zinc-450 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Dampak Proyek (Results &amp; Impact)
            </h4>
            <p className="text-sm font-bold text-indigo-400">
              {caseStudy.impact}
            </p>
          </div>

          {/* Core metadata details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div>
              <span className="text-[11px] text-zinc-500 block uppercase font-bold">Category</span>
              <span className="text-xs font-bold text-zinc-300 mt-0.5 block">{project.category}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-500 block uppercase font-bold">Status</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live &bull; Fully Completed
              </span>
            </div>
          </div>
        </div>

        {/* Modal footer with action buttons */}
        <div className="p-4 sm:p-6 bg-zinc-950/40 border-t border-zinc-800 flex items-center justify-end gap-3 rounded-b-3xl">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-bold border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-all"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Live App
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Close Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}
