import React, { useState, useEffect } from "react";
import { DollarSign, Percent, Coffee, Settings, Send, CheckCircle, Smartphone, Mail, Sparkles, User, FileText, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PricingPlan, Inquiry } from "../types";

interface ClientEstimatorProps {
  plans: PricingPlan[];
  onInquirySubmit: (inquiry: Inquiry) => void;
}

export default function ClientEstimator({ plans, onInquirySubmit }: ClientEstimatorProps) {
  // Active estimation state
  const [selectedPlanId, setSelectedPlanId] = useState<string>("standard");
  const [extraPages, setExtraPages] = useState<number>(0);
  const [needsCustomBackend, setNeedsCustomBackend] = useState<boolean>(false);
  const [needsExtendedSEO, setNeedsExtendedSEO] = useState<boolean>(false);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [superFastDelivery, setSuperFastDelivery] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Calculated pricing
  const [basePrice, setBasePrice] = useState<number>(3000000);
  const [totalCost, setTotalCost] = useState<number>(3000000);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<string>("1–2 minggu");

  // Sync state with package configurations
  useEffect(() => {
    const selectedPlan = plans.find((p) => p.id === selectedPlanId);
    if (!selectedPlan) return;

    // Use minimum price as base calculation
    const baseVal = selectedPlan.priceMin;
    setBasePrice(baseVal);

    // Dynamic cost additions
    let calculated = baseVal;
    calculated += extraPages * 250000;
    if (needsCustomBackend && selectedPlanId !== "pro") {
      calculated += 1500000; // custom backend addon
    }
    if (needsExtendedSEO) {
      calculated += 350000; // SEO addon
    }
    if (superFastDelivery) {
      calculated += 500000; // Express option
    }

    // Apply student discount
    let discount = 0;
    if (isStudent) {
      discount = calculated * 0.15;
      calculated = calculated - discount;
    }

    setDiscountAmount(discount);
    setTotalCost(calculated);

    // Update estimated time
    let tf = selectedPlan.duration;
    if (superFastDelivery) {
      tf = selectedPlanId === "starter" ? "3–4 hari" : "1 minggu";
    }
    setTimeframe(tf);
  }, [selectedPlanId, extraPages, needsCustomBackend, needsExtendedSEO, isStudent, superFastDelivery, plans]);

  // Handle plan changes
  const selectPlanHandler = (planId: string) => {
    setSelectedPlanId(planId);
    setExtraPages(0);
    // Reset specific plan flags
    if (planId === "pro") {
      setNeedsCustomBackend(true);
    } else {
      setNeedsCustomBackend(false);
    }
  };

  // Format IDR helper
  const formatCost = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const selectedPlan = plans.find((p) => p.id === selectedPlanId);
    
    const newInquiry: Inquiry = {
      id: "inq_" + Date.now(),
      name,
      email,
      phone: phone || "-",
      packageName: selectedPlan ? selectedPlan.name : "Custom",
      studentStatus: isStudent,
      details: additionalDetails || "No additional requirements specified.",
      estimatedCost: totalCost,
      submittedAt: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onInquirySubmit(newInquiry);
    setIsSubmitted(true);
  };

  // Generate brief templates for communication
  const buildDescriptionText = () => {
    const selectedPlan = plans.find((p) => p.id === selectedPlanId);
    return `Halo Mas Renaldi, saya tertarik dengan jasa pembuatan website Anda.
Berikut draf pesanan saya:

- Jasa: Pembuatan Website
- Paket: ${selectedPlan?.name} (${formatCost(basePrice)})
- Halaman Tambahan: ${extraPages} halaman
- Custom Backend: ${needsCustomBackend ? "Ya" : "Tidak"}
- SEO Lanjutan: ${needsExtendedSEO ? "Ya" : "Tidak"}
- Estimasi Kilat: ${superFastDelivery ? "Ya" : "Tidak"}
- Diskon Mahasiswa (KTM): ${isStudent ? "Ya (Diskon 15%)" : "Tidak"}

-- Detail Pemesan --
- Nama: ${name || "Pengunjung Web"}
- Email: ${email || "-"}
- Kontak WA: ${phone || "-"}
- Catatan Tambahan: ${additionalDetails || "-"}

Total estimasi biaya: ${formatCost(totalCost)}
Estimasi pengerjaan: ${timeframe}`;
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(buildDescriptionText());
    window.open(`https://wa.me/6289515341260?text=${text}`, "_blank");
  };

  const handleEmailRedirect = () => {
    const subject = encodeURIComponent("Inquiry Website Proyek - penaldi.dev");
    const body = encodeURIComponent(buildDescriptionText());
    window.open(`mailto:renaldizaki7@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAdditionalDetails("");
    setIsSubmitted(false);
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8 overflow-hidden">
      {/* Configuration Section */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            1. Pilih Paket &amp; Spesifikasi
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPlanHandler(p.id)}
                className={`flex flex-col items-center justify-between p-4 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                  selectedPlanId === p.id
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold ring-2 ring-indigo-500/20"
                    : "border-zinc-800 bg-[#121214] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-semibold opacity-85">{p.name}</span>
                <span className="text-sm font-black mt-1 font-display">
                  {p.id === "starter" ? "Rp 1 jt" : p.id === "standard" ? "Rp 3 jt" : "Rp 6 jt"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Options sliders & addons */}
        <div className="space-y-4 p-5 rounded-xl border border-zinc-800 bg-[#121214]/60">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-zinc-350">
                Jumlah Halaman Tambahan (+{formatCost(250000)}/hlm)
              </label>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                {extraPages} halaman
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={extraPages}
              onChange={(e) => setExtraPages(parseInt(e.target.value))}
              className="w-full text-indigo-500 accent-indigo-500 cursor-pointer bg-zinc-800 h-1.5 rounded-lg"
            />
          </div>

          <div className="h-[1px] bg-zinc-800/80 my-3" />

          {/* Add-on toggles */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide block">Fitur Pendukung</span>
            
            {/* Custom Backend (Only relevant/selectable for non-Pro templates since Pro already includes full backends) */}
            {selectedPlanId !== "pro" ? (
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={needsCustomBackend}
                  onChange={(e) => setNeedsCustomBackend(e.target.checked)}
                  className="mt-1 rounded border-zinc-700 bg-[#0A0A0B] text-indigo-500 focus:ring-indigo-500"
                />
                <div>
                  <div className="text-sm font-bold text-zinc-305 group-hover:text-indigo-400 transition-colors">
                    Integrasi Admin Panel &amp; Custom Backend (+{formatCost(1500000)})
                  </div>
                  <p className="text-xs text-zinc-450">
                    Menambahkan database terpisah, panel administrasi Filament, &amp; API secure.
                  </p>
                </div>
              </label>
            ) : (
              <div className="flex items-start gap-3 text-emerald-400">
                <Check className="w-4 h-4 shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold">Custom Backend Terintegrasi (PRO)</div>
                  <p className="text-xs text-zinc-450">Included in Pro stage with full Filament administrative controls.</p>
                </div>
              </div>
            )}

            {/* SEO Optimization */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={needsExtendedSEO}
                onChange={(e) => setNeedsExtendedSEO(e.target.checked)}
                className="mt-1 rounded border-zinc-700 bg-[#0A0A0B] text-indigo-500 focus:ring-indigo-500"
              />
              <div>
                <div className="text-sm font-bold text-zinc-305 group-hover:text-indigo-400 transition-colors">
                  SEO Lanjutan &amp; Integrasi Crawling (+{formatCost(350000)})
                </div>
                <p className="text-xs text-zinc-450">
                  Desain meta tags terstruktur, sitemaps generator, dan audit Google Lighthouse.
                </p>
              </div>
            </label>

            {/* Express service */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={superFastDelivery}
                onChange={(e) => setSuperFastDelivery(e.target.checked)}
                className="mt-1 rounded border-zinc-700 bg-[#0A0A0B] text-indigo-500 focus:ring-indigo-500"
              />
              <div>
                <div className="text-sm font-bold text-zinc-305 group-hover:text-indigo-400 transition-colors">
                  Pengerjaan Kilat (+{formatCost(500000)})
                </div>
                <p className="text-xs text-zinc-450">
                  Prioritas pengerjaan ekstra cepat. Pangkas waktu pengerjaan hingga 40%.
                </p>
              </div>
            </label>

            <div className="h-[1px] bg-zinc-800/80 my-3" />

            {/* Student Discount Toggle active KTM proof 15% discount */}
            <div className="relative p-3.5 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 overflow-hidden">
              <div className="absolute right-2 top-2 text-emerald-500 opacity-10">
                <Percent className="w-16 h-16" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="mt-1 rounded border-emerald-500/45 text-emerald-450 focus:ring-emerald-500 bg-zinc-900"
                />
                <div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    Aktifkan Diskon Mahasiswa (15% OFF)
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <p className="text-xs text-emerald-500/80">
                    Sertakan bukti KTM (Kartu Tanda Mahasiswa) aktif saat kelanjutan proyek.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Summary and Contact Submission Section */}
      <div className="lg:col-span-2 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Coffee className="w-4 h-4 text-indigo-400" />
            2. Estimasi &amp; Pengisian Data
          </h4>

          <div className="p-6 rounded-2xl bg-[#121214] border border-zinc-800 mb-6 space-y-4">
            <div className="flex justify-between items-center text-sm text-zinc-400">
              <span>Dasar Paket:</span>
              <span className="font-mono text-zinc-200">{formatCost(basePrice)}</span>
            </div>

            {extraPages > 0 && (
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Halaman Tambahan ({extraPages}x):</span>
                <span className="font-mono text-indigo-400">+{formatCost(extraPages * 250000)}</span>
              </div>
            )}

            {needsCustomBackend && selectedPlanId !== "pro" && (
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Custom Backend Addon:</span>
                <span className="font-mono text-indigo-400">+{formatCost(1500000)}</span>
              </div>
            )}

            {needsExtendedSEO && (
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>SEO audit &amp; set:</span>
                <span className="font-mono text-indigo-400">+{formatCost(350000)}</span>
              </div>
            )}

            {superFastDelivery && (
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Prioritas Kilat:</span>
                <span className="font-mono text-indigo-400">+{formatCost(500000)}</span>
              </div>
            )}

            {isStudent && discountAmount > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/10">
                <span className="flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  Mahasiswa (15% OFF):
                </span>
                <span className="font-mono">-{formatCost(discountAmount)}</span>
              </div>
            )}

            <div className="h-[1px] bg-zinc-800 my-5" />

            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs text-zinc-400 block uppercase font-bold">Total Estimasi</span>
                <span className="text-xs text-zinc-500 font-normal">⏱ {timeframe}</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight font-display text-right">
                {formatCost(totalCost)}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="estimator-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-[#0A0A0B] text-zinc-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="Alamat Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-[#0A0A0B] text-zinc-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Smartphone className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="tel"
                  placeholder="Nomor WA (contoh: 089515341260)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-[#0A0A0B] text-zinc-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                <textarea
                  placeholder="Detail tambahan (fitur khusus, contoh website referensi, dll)"
                  rows={2}
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-[#0A0A0B] text-zinc-100 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex sm:flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Kirim &amp; Logs Ke List Layar
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="estimator-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div>
                <h5 className="font-bold text-zinc-100">Estimasi Tercatat!</h5>
                <p className="text-xs text-zinc-400 mt-1">
                  Draf pengerjaan Anda telah disimpan di tab **Inquiry Monitor** di bawah ini.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Smartphone className="w-4 h-4" />
                  Kirim via WhatsApp
                </button>

                <button
                  onClick={handleEmailRedirect}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                >
                  <Mail className="w-4 h-4" />
                  Kirim via Email
                </button>
              </div>

              <button
                onClick={resetForm}
                className="text-xs text-zinc-450 hover:text-zinc-200 underline mt-2 block mx-auto cursor-pointer"
              >
                Buat Perhitungan Baru
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
