import React, { useState } from 'react';
import { 
  Video, 
  Search, 
  ExternalLink, 
  Star, 
  BookOpen, 
  Clock, 
  Filter,
  MonitorPlay,
  FileText,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LEARNING_RESOURCES, BRANCHES_INFO } from '../../data/mockData';
import { LearningResource, BranchId, NavigationTab } from '../../types';

interface LearningResourcesViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
}

export const LearningResourcesView: React.FC<LearningResourcesViewProps> = ({ onNavigate }) => {
  const { student } = useAuth();
  const branchInfo = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = LEARNING_RESOURCES.filter(res => {
    if (filterType !== 'all' && res.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.platform.toLowerCase().includes(q) ||
        res.subjectName.toLowerCase().includes(q) ||
        res.instructor.toLowerCase().includes(q)
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
            <Video className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Curated Learning Resources & Video Lectures
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Top university video series (MIT OpenCourseWare, NPTEL, Stanford), cheatsheets, and interactive visualizers.
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
              placeholder="Search lectures & platforms..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['all', 'Video Lecture', 'Documentation', 'Interactive Sandbox', 'Cheatsheet'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterType === type
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
            }`}
          >
            {type === 'all' ? 'All Formats' : type}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map(res => (
          <div
            key={res.id}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {res.platform}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {res.rating}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                {res.title}
              </h3>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                {res.description}
              </p>

              <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Instructor:</span>
                  <span className="font-medium truncate max-w-[170px]">{res.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Subject:</span>
                  <span className="font-medium truncate max-w-[170px]">{res.subjectName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Length:</span>
                  <span className="font-medium">{res.durationOrPages}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900 text-xs font-semibold transition-colors"
              >
                <span>Launch Lecture Platform</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
