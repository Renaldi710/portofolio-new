import { Inquiry } from "../types";
import { FolderGit2, Trash2, Calendar, ClipboardCheck, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InquiryMonitorProps {
  inquiries: Inquiry[];
  onDeleteInquiry: (id: string) => void;
}

export default function InquiryMonitor({ inquiries, onDeleteInquiry }: InquiryMonitorProps) {
  const formatCost = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-100 flex items-center gap-2">
            <ClipboardCheck className="w-5.5 h-5.5 text-indigo-450" />
            Inquiry Monitor &amp; Brief Tracker
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Pantau status proposal proyek Anda yang tercatat di cache local browser Anda.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-805 text-xs font-mono font-bold text-zinc-300 self-start">
          {inquiries.length} Terdaftar
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {inquiries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center text-zinc-500 space-y-3"
          >
            <FolderGit2 className="w-12 h-12 stroke-1" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Belum Ada Brief Proyek</p>
              <p className="text-xs max-w-sm text-zinc-450">
                Gunakan kustomisasi opsi kalkulator di atas, lalu kirim draf untuk memantau status pengerjaan simulasi di sini!
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Klien &amp; ID Proyek</th>
                  <th className="py-3 px-4">Paket Dipilih</th>
                  <th className="py-3 px-4">KTM Aktif?</th>
                  <th className="py-3 px-4">Estimasi Biaya</th>
                  <th className="py-3 px-4">Status Review</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {inquiries.map((inq) => (
                  <motion.tr
                     key={inq.id}
                     layout
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, x: -30 }}
                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
                     className="hover:bg-zinc-900/40 text-zinc-300"
                  >
                    <td className="py-4 px-4 font-normal">
                      <div>
                        <span className="font-bold text-zinc-100 text-sm block">{inq.name}</span>
                        <span className="text-xs text-zinc-455 block truncate max-w-sm">{inq.email}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{inq.submittedAt}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded bg-[#0A0A0B] border border-zinc-800 text-xs font-mono text-zinc-300 font-bold">
                        {inq.packageName}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {inq.studentStatus ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                          <Sparkles className="w-3 h-3" />
                          Diskon 15%
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold font-mono text-sm text-indigo-400">
                        {formatCost(inq.estimatedCost)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/10">
                        <AlertCircle className="w-3 h-3" />
                        Awaiting Admin WhatsApp confirmation
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-450 hover:text-white transition-all cursor-pointer inline-flex items-center"
                        title="Delete inquiry tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
