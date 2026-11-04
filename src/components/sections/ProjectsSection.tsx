import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Eye, Search, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ProjectsSectionProps {
  onSelectProject: (proj: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = React.memo(({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return ['All', ...new Set(PORTFOLIO_DATA.projects.map((p) => p.category))];
  }, []);

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            FEATURED <span className="text-gradient-google">PROJECTS</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
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
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF5722] text-white font-bold border border-[#FF5722] shadow-sm'
                      : 'bg-white border border-[#E9E5DE] text-[#111820]/70 hover:border-[#FF5722] hover:text-[#FF5722]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#FF5722] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#E9E5DE] rounded-xl text-xs text-[#111820] placeholder:text-[#111820]/40 focus:outline-none focus:border-[#FF5722] shadow-sm"
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
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-[#E9E5DE] shadow-card hover:shadow-card-hover overflow-hidden flex flex-col group relative transition-all duration-300"
            >
              {/* Image Container with Zoom & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-[#F7F5F1]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111820]/70 via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E9E5DE] text-[#FF5722] text-[10px] font-mono font-semibold shadow-sm">
                    {proj.category}
                  </span>
                </div>

                {/* View Detail Quick Trigger Overlay */}
                <button
                  onClick={() => {
                    audioController.playClick();
                    onSelectProject(proj);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#111820]/50 backdrop-blur-sm transition-opacity duration-300"
                >
                  <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs shadow-sm">
                    <Eye className="w-4 h-4" />
                    <span>View Case Study & Specs</span>
                  </span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-[#111820] group-hover:text-[#FF5722] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#111820]/75 leading-relaxed font-sans line-clamp-2">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#F7F5F1] border border-[#E9E5DE] text-[10px] font-mono text-[#111820]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-[#E9E5DE] flex items-center justify-between">
                  <button
                    onClick={() => {
                      audioController.playClick();
                      onSelectProject(proj);
                    }}
                    className="text-xs font-mono text-[#FF5722] hover:text-[#FF8A50] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Full Case Study</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF8A50]" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820]/70 hover:text-[#FF5722] hover:border-[#FF5722]/40 transition-all shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] hover:bg-[#FF5722]/20 transition-all shadow-sm"
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
