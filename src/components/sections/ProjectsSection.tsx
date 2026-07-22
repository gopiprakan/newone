import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Sparkles, Search, Eye } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ProjectsSectionProps {
  onSelectProject: (p: Project) => void;
}

/**
 * PERFORMANCE OPTIMIZED PROJECTS SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents unnecessary component re-renders.
 * 2. useMemo filtering: Memoizes search and category filtering logic to prevent CPU layout overhead during user input.
 * 3. Image Optimization: Lazy loading, async decoding & explicit pixel dimensions for smooth image paints.
 */
export const ProjectsSection: React.FC<ProjectsSectionProps> = React.memo(({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => ['All', 'AI & ML', '3D Web & Canvas', 'Full-Stack', 'Web3 & Cloud'], []);

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.techStack.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            FEATURED <span className="text-gradient-google">PROJECTS</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Production-ready AI architectures, interactive web platforms, and automated software solutions.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    audioController.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                    isActive
                      ? 'bg-[#4285F4] text-white font-bold shadow-google-blue'
                      : 'bg-[#2d2e31] border border-[#3c4043] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#4285F4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="w-full pl-10 pr-4 py-2 bg-[#2d2e31] border border-[#3c4043] rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#4285F4]"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl border border-[#3c4043] overflow-hidden flex flex-col group relative"
            >
              {/* Image Container with Zoom & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-[#202124]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-transparent to-transparent opacity-90" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#202124]/90 backdrop-blur-md border border-[#3c4043] text-[#8ab4f8] text-[10px] font-mono">
                    {proj.category}
                  </span>
                </div>

                {/* View Detail Quick Trigger Overlay */}
                <button
                  onClick={() => {
                    audioController.playClick();
                    onSelectProject(proj);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                >
                  <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4285F4] hover:bg-[#3367d6] text-white font-bold text-xs shadow-google-blue">
                    <Eye className="w-4 h-4" />
                    <span>View Case Study & Specs</span>
                  </span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-[#e8eaed] group-hover:text-[#8ab4f8] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#202124] border border-[#3c4043] text-[10px] font-mono text-[#8ab4f8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-[#3c4043] flex items-center justify-between">
                  <button
                    onClick={() => {
                      audioController.playClick();
                      onSelectProject(proj);
                    }}
                    className="text-xs font-mono text-[#4285F4] hover:text-[#8ab4f8] font-semibold flex items-center gap-1"
                  >
                    <span>Full Case Study</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#FBBC04]" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#202124] border border-[#3c4043] text-slate-400 hover:text-slate-100 hover:border-slate-600 transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/20 transition-all shadow-google-blue"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
