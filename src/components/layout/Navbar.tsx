import React, { useState } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Flame, 
  Sparkles, 
  ChevronDown, 
  SlidersHorizontal,
  LogOut,
  User,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRANCHES_INFO } from '../../data/mockData';
import { BranchId } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBranchSwitcher: () => void;
  onNavigateProfile: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenBranchSwitcher,
  onNavigateProfile,
  onOpenAuth
}) => {
  const { student, isLoggedIn, theme, toggleTheme, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const currentBranch = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      {/* Zone 1: Brand & Mobile Sidebar Toggle trigger */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-sm font-bold text-lg">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            StudySphere
          </span>
        </div>

        {/* Current Branch Pill Indicator / Click to Switch */}
        <button
          onClick={onOpenBranchSwitcher}
          title="Click to change your branch or semester"
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500"
        >
          <GraduationCap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold">{currentBranch.shortCode}</span>
          <span className="text-slate-400 dark:text-slate-500">·</span>
          <span>Yr {student.year} (Sem {student.semester})</span>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </button>
      </div>

      {/* Zone 2: Global Search Bar Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenSearch}
          className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-750 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
            <span className="truncate">Search subjects, notes, code, doubts, papers...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 shadow-2xs dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Gamification Stats, Theme Switcher & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak counter */}
        <div 
          className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60"
          title={`${student.streakDays}-day active learning streak!`}
        >
          <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
          <span className="tabular-nums">{student.streakDays}d</span>
        </div>

        {/* Study Points */}
        <div 
          className="hidden sm:flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
          title={`${student.points} StudySphere points earned!`}
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="tabular-nums">{student.points} pts</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Profile Menu or Login Button */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none"
            >
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 object-cover dark:border-slate-700"
              />
              <span className="hidden lg:block text-xs font-semibold text-slate-800 dark:text-slate-200 text-left max-w-[100px] truncate">
                {student.name.split(' ')[0]}
              </span>
              <ChevronDown className="hidden lg:block h-3 w-3 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white py-2 shadow-xl z-50 dark:border-slate-700 dark:bg-slate-800">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {student.email}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{currentBranch.shortCode}</span>
                      <span>· Year {student.year}, Sem {student.semester}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigateProfile();
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60"
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      View Profile & College
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenBranchSwitcher();
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60"
                    >
                      <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                      Switch Branch / Year
                    </button>
                  </div>

                  <div className="border-t border-slate-100 py-1 dark:border-slate-700/60">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        onOpenAuth();
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
