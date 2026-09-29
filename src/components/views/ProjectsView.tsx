import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  Filter, 
  ExternalLink, 
  Github, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Bookmark, 
  X,
  Sparkles,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PROJECT_IDEAS, BRANCHES_INFO } from '../../data/mockData';
import { BranchId, ProjectIdea, NavigationTab } from '../../types';

interface ProjectsViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  initialProjectId?: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate, initialProjectId }) => {
  const { student, isBookmarked, toggleBookmark } = useAuth();

  const [filterBranch, setFilterBranch] = useState<BranchId>(student.branch);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Project Detail Modal
  const [activeProject, setActiveProject] = useState<ProjectIdea | null>(() => {
    if (initialProjectId) {
      return PROJECT_IDEAS.find(p => p.id === initialProjectId) || null;
    }
    return null;
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const filteredProjects = PROJECT_IDEAS.filter(proj => {
    if (filterBranch !== 'Other' && proj.branchId !== filterBranch) return false;
    if (filterDifficulty !== 'all' && proj.difficulty !== filterDifficulty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        proj.title.toLowerCase().includes(q) ||
        proj.domain.toLowerCase().includes(q) ||
        proj.summary.toLowerCase().includes(q) ||
        proj.techStack.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Engineering Projects & Capstone Ideas
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Industry-grade mini projects and final-year capstone ideas categorized by branch and difficulty.
          </p>
        </div>

        {/* Global search */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search projects & stacks..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Branch Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {Object.values(BRANCHES_INFO).map(b => (
            <button
              key={b.id}
              onClick={() => setFilterBranch(b.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterBranch === b.id
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
              }`}
            >
              {b.shortCode}
            </button>
          ))}
        </div>

        {/* Difficulty Segmented Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                filterDifficulty === diff
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {diff === 'all' ? 'All Difficulties' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <FlaskConical className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No projects found for {filterBranch} in this category
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try switching branches or difficulty filters.
          </p>
          <button
            onClick={() => { setFilterBranch('CSE'); setFilterDifficulty('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 rounded-lg text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(proj => {
            const bookmarked = isBookmarked(proj.id);
            return (
              <div
                key={proj.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {proj.domain}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      proj.difficulty === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : proj.difficulty === 'Intermediate'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {proj.difficulty}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveProject(proj)}
                    className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 cursor-pointer transition-colors line-clamp-2"
                  >
                    {proj.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                    {proj.summary}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.techStack.map(stack => (
                      <span
                        key={stack}
                        className="text-[10px] font-mono text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Est. {proj.estimatedWeeks} Weeks
                    </span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {proj.branchId} Capstone
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveProject(proj)}
                      className="flex-1 py-1.5 rounded-lg bg-teal-600 text-center text-xs font-semibold text-white hover:bg-teal-700 transition-colors shadow-2xs"
                    >
                      Project Blueprint
                    </button>
                    <button
                      onClick={() => toggleBookmark(proj.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        bookmarked
                          ? 'border-teal-600 bg-teal-50 text-teal-600 dark:bg-teal-950'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-teal-600' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Blueprint Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[92vh] flex flex-col">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-semibold mb-1">
                  <span>{activeProject.domain}</span>
                  <span>·</span>
                  <span>{activeProject.difficulty} Level</span>
                  <span>·</span>
                  <span>{activeProject.estimatedWeeks} Weeks Timeline</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-5 space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Executive Summary
                </h4>
                <p>{activeProject.summary}</p>
              </div>

              {/* Hardware / Software Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-teal-600" /> Software Stack
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map(t => (
                      <span key={t} className="text-xs font-mono bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {activeProject.hardwareRequired && (
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-amber-600" /> Hardware Components
                    </h5>
                    <ul className="text-xs list-disc list-inside space-y-1">
                      {activeProject.hardwareRequired.map(h => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Architecture Blueprint Notes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  System Architecture & Implementation Plan
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-teal-300">
                  {activeProject.architectureNotes}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {activeProject.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Learning Outcomes
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {activeProject.learningOutcomes.map((l, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">
                Template repository & documentation starter included
              </span>
              <button
                onClick={() => {
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-semibold hover:opacity-90"
              >
                <Github className="h-4 w-4" />
                <span>{copiedLink ? 'Repository Link Copied!' : 'Clone Starter Template'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
