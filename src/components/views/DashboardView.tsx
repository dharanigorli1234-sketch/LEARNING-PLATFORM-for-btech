import React from 'react';
import { 
  BookOpen, 
  Code2, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  SlidersHorizontal,
  FileCheck2,
  Clock,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALL_SUBJECTS, BRANCHES_INFO, PROGRAMMING_LANGUAGES, INITIAL_DOUBTS, PREVIOUS_PAPERS } from '../../data/mockData';
import { NavigationTab, Subject } from '../../types';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  onOpenBranchSwitcher: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenBranchSwitcher
}) => {
  const { student, isTopicCompleted } = useAuth();
  const branchInfo = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  // Filter subjects for the student's branch (or matching semester)
  const branchSubjects = ALL_SUBJECTS.filter(s => s.branchId === student.branch);
  const currentSemesterSubjects = branchSubjects.filter(s => s.semester === student.semester);
  const subjectsToDisplay = currentSemesterSubjects.length > 0 ? currentSemesterSubjects : branchSubjects;

  // Recommended programming languages for this branch
  const recommendedLangs = PROGRAMMING_LANGUAGES.filter(l => 
    l.recommendedForBranches.includes(student.branch)
  );

  // Doubts related to this branch
  const relevantDoubts = INITIAL_DOUBTS.filter(d => d.branchId === student.branch);
  const doubtsToDisplay = relevantDoubts.length > 0 ? relevantDoubts : INITIAL_DOUBTS;

  // Relevant previous papers
  const branchPapers = PREVIOUS_PAPERS.filter(p => p.branchId === student.branch);

  // Calculate student overall progress percentage
  const totalBranchTopics = subjectsToDisplay.reduce((acc, s) => acc + s.topics.length, 0);
  const completedCount = subjectsToDisplay.reduce((acc, s) => {
    return acc + s.topics.filter(t => isTopicCompleted(t.id)).length;
  }, 0);
  const progressPercent = totalBranchTopics > 0 ? Math.round((completedCount / totalBranchTopics) * 100) : 40;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Personalized Welcome Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-sm dark:border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-indigo-300">{branchInfo.name}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300">Year {student.year} (Semester {student.semester})</span>
              <span className="text-slate-400">·</span>
              <button 
                onClick={onOpenBranchSwitcher}
                className="text-xs text-indigo-300 hover:text-white underline underline-offset-2 flex items-center gap-1"
              >
                <SlidersHorizontal className="h-3 w-3" />
                Switch branch
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {student.name}!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your personalized curriculum is configured for {branchInfo.shortCode}. Access your semester subjects, lecture notes, branch-tailored coding labs, and exam papers.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('ask_doubt')}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                Ask a Doubt
              </button>
              <button
                onClick={() => onNavigate('notes')}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-xs"
              >
                <FileText className="h-4 w-4" />
                Browse Notes
              </button>
              <button
                onClick={() => onNavigate('programming')}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-xs"
              >
                <Code2 className="h-4 w-4" />
                Practice Coding
              </button>
            </div>
          </div>

          {/* Quick Metrics Card on right */}
          <div className="grid grid-cols-2 gap-3 min-w-[260px] bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">Weekly Streak</span>
              <div className="mt-1 flex items-center gap-1.5 text-lg font-bold text-amber-400">
                <Flame className="h-5 w-5 fill-amber-400" />
                <span className="tabular-nums">{student.streakDays} Days</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">Study Points</span>
              <div className="mt-1 flex items-center gap-1.5 text-lg font-bold text-indigo-300">
                <Sparkles className="h-5 w-5" />
                <span className="tabular-nums">{student.points}</span>
              </div>
            </div>
            <div className="col-span-2 pt-2 border-t border-white/10">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Semester Progress</span>
                <span className="font-mono text-indigo-300">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section: My Branch Subjects */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Core Subjects for {branchInfo.shortCode}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curated for Semester {student.semester} syllabus
            </p>
          </div>
          <button
            onClick={() => onNavigate('subjects')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
          >
            <span>View All Subjects</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectsToDisplay.map((subj: Subject) => {
            const completedInSubj = subj.topics.filter(t => isTopicCompleted(t.id)).length;
            const pct = subj.topics.length > 0 ? Math.round((completedInSubj / subj.topics.length) * 100) : 0;

            return (
              <div
                key={subj.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-600 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {subj.code}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {subj.credits} Credits · {subj.category}
                    </span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {subj.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {subj.description}
                  </p>

                  {/* Topics summary list */}
                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Key Topics ({subj.topics.length})
                    </span>
                    {subj.topics.slice(0, 2).map(t => {
                      const done = isTopicCompleted(t.id);
                      return (
                        <div key={t.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${done ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : 'text-slate-300 dark:text-slate-600'}`} />
                          <span className="truncate">{t.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 text-[11px]">Topic Completion</span>
                    <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                      {completedInSubj}/{subj.topics.length} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                    <div 
                      className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate('notes', { subjectId: subj.id })}
                      className="flex-1 py-1.5 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      Study Notes
                    </button>
                    <button
                      onClick={() => onNavigate('subjects', { subjectId: subj.id })}
                      className="flex-1 py-1.5 rounded-lg bg-indigo-50 text-center text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-colors"
                    >
                      Syllabus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two-Column Grid: Priority Programming for Branch + Doubts & Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Recommended Programming Languages */}
        <section className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Recommended Languages for {branchInfo.shortCode}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Industry-relevant programming stacks for your branch
              </p>
            </div>
            <button
              onClick={() => onNavigate('programming')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
            >
              <span>Explore All (8)</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedLangs.slice(0, 4).map(lang => (
              <div
                key={lang.id}
                onClick={() => onNavigate('programming', { langSlug: lang.slug })}
                className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {lang.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{lang.version}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {lang.shortDesc}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Open Sandbox & Q&A</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column (5 cols): Trending Doubts & Campus Q&A */}
        <section className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Doubt Discussions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recent campus questions & verified answers
              </p>
            </div>
            <button
              onClick={() => onNavigate('discussions')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {doubtsToDisplay.slice(0, 3).map(doubt => (
              <div
                key={doubt.id}
                onClick={() => onNavigate('discussions', { doubtId: doubt.id })}
                className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-3.5 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{doubt.subjectName}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {doubt.isResolved ? '✓ Solved' : 'Open'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 line-clamp-2">
                  {doubt.title}
                </h4>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{doubt.studentName} ({doubt.studentBranch})</span>
                  <span>{doubt.answers.length} answers · {doubt.upvotes} upvotes</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Exam Prep & Previous Question Papers banner */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Exam Preparation: Previous Question Papers
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access university question papers, midterm sets, and verified model answer keys for {branchInfo.shortCode}.
            </p>
          </div>
          <button
            onClick={() => onNavigate('papers')}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
          >
            <span>Browse {branchPapers.length} Question Papers</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
