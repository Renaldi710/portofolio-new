import { Service } from "../types";
import { Laptop, Code, Terminal, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  service: Service;
  key?: string;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Map string icon name to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "laptop":
        return <Laptop className="w-7 h-7 text-indigo-400" />;
      case "code":
        return <Code className="w-7 h-7 text-indigo-400" />;
      case "terminal":
        return <Terminal className="w-7 h-7 text-indigo-400" />;
      default:
        return <HelpCircle className="w-7 h-7 text-zinc-500" />;
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case "laptop":
        return "bg-indigo-500/10 border border-indigo-500/10";
      case "code":
        return "bg-indigo-500/10 border border-indigo-500/10";
      case "terminal":
        return "bg-indigo-500/10 border border-indigo-500/10";
      default:
        return "bg-zinc-800/60 border border-zinc-700/50";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border border-zinc-800 bg-[#121214] p-8 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-zinc-750 transition-all duration-300"
    >
      {/* Top interactive line-gradient on hover */}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

      <div className={`w-14 h-14 rounded-2xl ${getIconBg(service.icon)} flex items-center justify-center mb-6`}>
        {getIcon(service.icon)}
      </div>

      <h3 className="text-xl font-bold font-display text-zinc-100 mb-3">
        {service.title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}
