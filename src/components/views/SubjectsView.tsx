import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  FileText, 
  HelpCircle, 
  FileCheck2, 
  Clock, 
  Filter, 
  Search,
  Layers,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALL_SUBJECTS, BRANCHES_INFO } from '../../data/mockData';
import { Subject, Topic, NavigationTab, Semester } from '../../types';

interface SubjectsViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  initialSubjectId?: string;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({ onNavigate, initialSubjectId }) => {
  const { student, isTopicCompleted, toggleCompleteTopic } = useAuth();
  const branchInfo = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(initialSubjectId || null);

  // Filter subjects for current branch
  const branchSubjects = ALL_SUBJECTS.filter(s => s.branchId === student.branch);

  const filteredSubjects = branchSubjects.filter(sub => {
    if (selectedSemester !== 'all' && sub.semester !== selectedSemester) return false;
    if (selectedCategory !== 'all' && sub.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        sub.name.toLowerCase().includes(q) ||
        sub.code.toLowerCase().includes(q) ||
        sub.topics.some(t => t.title.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Curriculum & Subjects
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official curriculum for <span className="font-semibold text-slate-700 dark:text-slate-200">{branchInfo.name}</span> ({branchInfo.shortCode})
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search syllabus & topics..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs: Semester filter & Category filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Semester:
          </span>
          <button
            onClick={() => setSelectedSemester('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedSemester === 'all'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
            }`}
          >
            All Semesters
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedSemester === sem
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
              }`}
            >
              Sem {sem} {student.semester === sem && '(Current)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {['all', 'Core', 'Elective'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Types' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Grid & Detailed Expansion */}
      {filteredSubjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <BookOpen className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No subjects found for this selection
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try switching the semester filter to "All Semesters" or clear the search query.
          </p>
          <button
            onClick={() => { setSelectedSemester('all'); setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 rounded-lg text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubjects.map(subject => {
            const isExpanded = expandedSubjectId === subject.id;
            const completedTopics = subject.topics.filter(t => isTopicCompleted(t.id)).length;
            const completionPercent = subject.topics.length > 0 
              ? Math.round((completedTopics / subject.topics.length) * 100) 
              : 0;

            return (
              <div
                key={subject.id}
                className="rounded-2xl border border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
              >
                {/* Subject Header Row */}
                <div 
                  onClick={() => setExpandedSubjectId(isExpanded ? null : subject.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {subject.code}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Year {subject.year} (Semester {subject.semester})
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {subject.credits} Credits ({subject.category})
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {subject.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl line-clamp-1">
                      {subject.description}
                    </p>
                  </div>

                  {/* Progress & Toggle indicator */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                        {completedTopics}/{subject.topics.length} topics
                      </span>
                      <div className="w-28 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400 transition-all"
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Syllabus & Topics */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/60 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Syllabus Units & Topics ({subject.topics.length})
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigate('notes', { subjectId: subject.id })}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          View Subject Notes
                        </button>
                        <button
                          onClick={() => onNavigate('papers', { subjectId: subject.id })}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <FileCheck2 className="h-3.5 w-3.5" />
                          Previous Papers
                        </button>
                        <button
                          onClick={() => onNavigate('ask_doubt', { subjectId: subject.id, subjectName: subject.name })}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <HelpCircle className="h-3.5 w-3.5" />
                          Ask Doubt
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {subject.topics.map((topic: Topic) => {
                        const isDone = isTopicCompleted(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                              isDone
                                ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                                : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-800/80'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleCompleteTopic(topic.id)}
                                title={isDone ? 'Mark as incomplete' : 'Mark as mastered (+20 pts)'}
                                className="mt-0.5"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <Circle className="h-5 w-5 text-slate-300 hover:text-indigo-600 dark:text-slate-600" />
                                )}
                              </button>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[11px] font-bold text-slate-500">
                                    Unit {topic.unit}
                                  </span>
                                  <span className="text-slate-300">·</span>
                                  <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                                    {topic.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                  {topic.summary}
                                </p>
                                {topic.keyFormulas && topic.keyFormulas.length > 0 && (
                                  <div className="mt-1.5 flex flex-wrap gap-2 text-[11px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/60 p-1.5 rounded-md">
                                    <span className="font-sans font-semibold text-slate-500 dark:text-slate-400">Formula:</span>
                                    {topic.keyFormulas.join('  ·  ')}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0 sm:self-center pl-8 sm:pl-0">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              <span>{topic.durationMins}m read</span>
                              <span className="text-slate-300">·</span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{topic.difficulty}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
