import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Award, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Target,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALL_SUBJECTS, BRANCHES_INFO } from '../../data/mockData';
import { NavigationTab } from '../../types';

interface ProgressViewProps {
  onNavigate: (tab: NavigationTab) => void;
  doubtsAskedCount: number;
  doubtsAnsweredCount: number;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  onNavigate,
  doubtsAskedCount,
  doubtsAnsweredCount
}) => {
  const { student, isTopicCompleted, addPoints } = useAuth();
  const currentBranch = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  // Subjects for student's branch
  const branchSubjects = ALL_SUBJECTS.filter(s => s.branchId === student.branch);
  const totalTopicsInBranch = branchSubjects.reduce((acc, s) => acc + s.topics.length, 0);
  const completedTopicsCount = branchSubjects.reduce((acc, s) => {
    return acc + s.topics.filter(t => isTopicCompleted(t.id)).length;
  }, 0);

  const completedSubjectsCount = branchSubjects.filter(s => 
    s.topics.length > 0 && s.topics.every(t => isTopicCompleted(t.id))
  ).length;

  const progressPercentage = totalTopicsInBranch > 0
    ? Math.round((completedTopicsCount / totalTopicsInBranch) * 100)
    : 35;

  // 7-day streak activity simulation
  const [streakDaysArray, setStreakDaysArray] = useState([
    { day: 'Mon', active: true, mins: 45 },
    { day: 'Tue', active: true, mins: 60 },
    { day: 'Wed', active: true, mins: 30 },
    { day: 'Thu', active: true, mins: 80 },
    { day: 'Fri', active: true, mins: 55 },
    { day: 'Sat', active: true, mins: 90 },
    { day: 'Sun (Today)', active: true, mins: 40 }
  ]);

  const [claimedDailyBonus, setClaimedDailyBonus] = useState(false);

  const handleClaimDailyBonus = () => {
    if (!claimedDailyBonus) {
      addPoints(50);
      setClaimedDailyBonus(true);
    }
  };

  // Badges system
  const BADGES = [
    {
      id: 'b1',
      title: 'Active Streaker',
      desc: 'Maintained a 7+ day continuous study streak',
      icon: Flame,
      unlocked: student.streakDays >= 7,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200'
    },
    {
      id: 'b2',
      title: 'Peer Problem Solver',
      desc: 'Participated in campus doubt resolutions',
      icon: HelpCircle,
      unlocked: doubtsAnsweredCount > 0 || student.points > 500,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200'
    },
    {
      id: 'b3',
      title: 'Core Syllabus Master',
      desc: 'Completed 3+ core syllabus topics in current branch',
      icon: BookOpen,
      unlocked: completedTopicsCount >= 3,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200'
    },
    {
      id: 'b4',
      title: 'Engineering Scholar',
      desc: 'Earned 800+ StudySphere academic points',
      icon: Award,
      unlocked: student.points >= 800,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            My Academic Learning Progress
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time tracking of syllabus mastery, active streaks, and community doubt contributions.
          </p>
        </div>

        <button
          onClick={handleClaimDailyBonus}
          disabled={claimedDailyBonus}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            claimedDailyBonus
              ? 'bg-slate-100 text-slate-400 dark:bg-slate-800'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs hover:from-amber-600 hover:to-orange-600'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>{claimedDailyBonus ? 'Daily Check-in Claimed (+50 pts)' : 'Check-in Today (+50 pts)'}</span>
        </button>
      </div>

      {/* 4 Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Syllabus Progress */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Overall Progress</span>
            <Target className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
              {progressPercentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">of semester syllabus</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-700" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Card 2: Topics Completed */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Topics Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
              {completedTopicsCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              / {totalTopicsInBranch} topics
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {completedSubjectsCount} full subjects completed
          </p>
        </div>

        {/* Card 3: Learning Streak */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Learning Streak</span>
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              {student.streakDays}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">consecutive days</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Top 5% among {currentBranch.shortCode} peers
          </p>
        </div>

        {/* Card 4: StudySphere Points */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Study Points</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">
              {student.points}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">pts</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Level 4 Engineering Scholar
          </p>
        </div>
      </div>

      {/* 2-Column: Weekly Activity Chart + Subject Mastery Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols): Weekly Study Streak Tracker */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-500" />
              Weekly Study Activity
            </h3>
            <span className="text-xs text-slate-400">Last 7 Days</span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {streakDaysArray.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-end p-1 justify-center">
                  <div
                    className="w-full rounded-lg bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
                    style={{ height: `${Math.min(100, (item.mins / 90) * 100)}%` }}
                    title={`${item.mins} minutes studied`}
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 text-center">
                  {item.day.slice(0, 3)}
                </span>
                <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                  {item.mins}m
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Study Time: <strong className="text-slate-900 dark:text-white">6.7 Hours</strong></span>
            <span>Target: 8h/week</span>
          </div>
        </div>

        {/* Right Column (6 cols): Subject-by-Subject Progress */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              Subject Completion Breakdown
            </h3>
            <button
              onClick={() => onNavigate('subjects')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3.5 pt-1">
            {branchSubjects.map(sub => {
              const done = sub.topics.filter(t => isTopicCompleted(t.id)).length;
              const pct = sub.topics.length > 0 ? Math.round((done / sub.topics.length) * 100) : 0;

              return (
                <div key={sub.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                      {sub.name} <span className="font-mono text-slate-400">({sub.code})</span>
                    </span>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      {done}/{sub.topics.length} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Campus Community Activity (Doubts stats) & Achievement Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Doubt Contributions */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            Campus Doubt Stats
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs text-slate-600 dark:text-slate-300">Doubts Asked</span>
              <span className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                {doubtsAskedCount}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs text-slate-600 dark:text-slate-300">Doubts Answered</span>
              <span className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                {doubtsAnsweredCount}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs text-slate-600 dark:text-slate-300">Helpful Upvotes Received</span>
              <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 tabular-nums">
                +42
              </span>
            </div>
          </div>
        </div>

        {/* Unlocked Badges */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-500" />
            Earned Achievement Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {BADGES.map(badge => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                    badge.unlocked
                      ? badge.color
                      : 'border-slate-200 bg-slate-50/50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 opacity-60'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-2xs shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {badge.title} {badge.unlocked ? '✓' : '(Locked)'}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
