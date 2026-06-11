import { Project } from "../types";
import { ExternalLink, Github, ChevronRight, Bookmark } from "lucide-react";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  key?: string;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <motion.article 
      layoutId={`project-container-${project.id}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#121214] p-6 sm:p-8 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-zinc-700 cursor-pointer overflow-hidden"
      onClick={() => onOpenDetails(project)}
    >
      {/* Dynamic colorful border indicator */}
      <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-indigo-500 via-violet-500 to-pink-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-[11px] font-bold text-indigo-400 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
          <Bookmark className="w-4 h-4 text-zinc-650 group-hover:text-indigo-400 transition-colors" />
        </div>

        <h3 className="text-xl font-bold font-display text-zinc-100 group-hover:text-indigo-450 transition-colors mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 rounded bg-zinc-900/80 text-[10px] text-zinc-500 font-mono"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
          <span className="inline-flex items-center gap-1 text-sm font-bold text-indigo-400 group-hover:underline">
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-zinc-800/80 text-zinc-500 hover:text-zinc-200 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-zinc-800/80 text-zinc-500 hover:text-zinc-200 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4.5 h-4.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
