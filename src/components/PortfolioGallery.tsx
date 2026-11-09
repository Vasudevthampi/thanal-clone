import React, { useState } from 'react';
import { ProjectItem } from '../utils/brandMedia';
import { MapPin, Maximize2, X, PlusCircle, ArrowUpRight, Compass, Sprout, Layers } from 'lucide-react';

interface PortfolioGalleryProps {
  projects: ProjectItem[];
  onOpenAssetModal: () => void;
  onSelectProjectForInquiry: (projectTitle: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  onOpenAssetModal,
  onSelectProjectForInquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'villas' | 'courtyards' | 'terraces'>('all');
  const [inspectingProject, setInspectingProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400 mb-3">
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>Built Realities</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 dark:text-stone-100 text-balance">
              Living Sanctuaries Engineered to Weather with Grace
            </h2>
          </div>

          {/* Interactive filter tabs (functional buttons with click handlers) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 self-start md:self-auto">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'villas', label: 'Villas & Grounds' },
              { id: 'courtyards', label: 'Courtyards' },
              { id: 'terraces', label: 'Terraces & Sky' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-forest-900 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-forest-700/60 hover:shadow-xl"
            >
              {/* Media Card with Zoom Trigger */}
              <div
                className="relative aspect-4/3 overflow-hidden bg-stone-200 cursor-pointer"
                onClick={() => setInspectingProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Quick inspect button */}
                <div className="absolute top-4 right-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs text-stone-900 dark:text-stone-100 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Location & category overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.area}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Card Bottom Specs */}
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Clean unboxed metadata for Materials & Palette */}
                <div className="space-y-1.5 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Botanical Palette:</span>
                    <span className="truncate">{project.plantPalette.slice(0, 3).join(' · ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Hardscape:</span>
                    <span className="truncate">{project.materials.slice(0, 2).join(' · ')}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setInspectingProject(project)}
                    className="text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:text-forest-950 flex items-center gap-1"
                  >
                    <span>View Blueprint Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectProjectForInquiry(project.title)}
                    className="text-xs text-stone-500 hover:text-forest-900 transition-colors"
                  >
                    Request Similar Design &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User photo upload invite banner */}
        <div className="mt-12 p-6 sm:p-8 bg-stone-100 dark:bg-stone-900/60 border border-dashed border-stone-300 dark:border-stone-700 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-forest-950 dark:text-stone-100 flex items-center gap-2 justify-center sm:justify-start">
              <span>Have a landscape project to showcase?</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Upload your own high-resolution landscape photos and logo directly to preview how they look in this portfolio.
            </p>
          </div>
          <button
            onClick={onOpenAssetModal}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 transition-colors rounded-xl shadow-xs shrink-0 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Upload Company Photos</span>
          </button>
        </div>

      </div>

      {/* Project Blueprint Modal */}
      {inspectingProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-xs overflow-y-auto"
          onClick={() => setInspectingProject(null)}
        >
          <div
            className="relative w-full max-w-4xl my-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-16/9 bg-stone-950">
              <img
                src={inspectingProject.image}
                alt={inspectingProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setInspectingProject(null)}
                aria-label="Close project blueprint"
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                  {inspectingProject.categoryLabel}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {inspectingProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-stone-100 dark:border-stone-800 text-xs">
                <div>
                  <span className="text-stone-400 uppercase tracking-wider block">Location</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{inspectingProject.location}</span>
                </div>
                <div>
                  <span className="text-stone-400 uppercase tracking-wider block">Footprint Area</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{inspectingProject.area}</span>
                </div>
                <div>
                  <span className="text-stone-400 uppercase tracking-wider block">Duration</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{inspectingProject.duration}</span>
                </div>
                <div>
                  <span className="text-stone-400 uppercase tracking-wider block">Soil &amp; Irrigation</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Automated Smart Drip</span>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-forest-950 dark:text-stone-100 mb-2">
                  Architectural Narrative
                </h4>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {inspectingProject.description}
                </p>
              </div>

              {/* Plantings and Materials grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
                <div>
                  <h5 className="font-semibold text-forest-900 dark:text-stone-200 mb-2 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-forest-700" />
                    <span>Botanical Sourcing (Acclimatized)</span>
                  </h5>
                  <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                    {inspectingProject.plantPalette.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-700 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-forest-900 dark:text-stone-200 mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-forest-700" />
                    <span>Civil &amp; Hardscaping Palette</span>
                  </h5>
                  <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                    {inspectingProject.materials.map((m, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-earth-amber shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() => setInspectingProject(null)}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-800"
                >
                  Back to Portfolio
                </button>
                <button
                  onClick={() => {
                    const title = inspectingProject.title;
                    setInspectingProject(null);
                    onSelectProjectForInquiry(title);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-xs"
                >
                  Request Consultation for Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
