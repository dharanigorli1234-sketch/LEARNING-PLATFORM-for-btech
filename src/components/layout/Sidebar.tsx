import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  FileText,
  HelpCircle,
  MessageSquare,
  FileCheck2,
  Video,
  FlaskConical,
  BarChart2,
  Bookmark,
  User,
  GraduationCap,
  X
} from 'lucide-react';
import { NavigationTab } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { BRANCHES_INFO } from '../../data/mockData';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenBranchSwitcher: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onOpenBranchSwitcher
}) => {
  const { student } = useAuth();
  const branchInfo = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  const NAV_ITEMS: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'programming', label: 'Programming', icon: Code2 },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'ask_doubt', label: 'Ask a Doubt', icon: HelpCircle },
    { id: 'discussions', label: 'Doubt Discussions', icon: MessageSquare },
    { id: 'papers', label: 'Previous Papers', icon: FileCheck2 },
    { id: 'resources', label: 'Learning Resources', icon: Video },
    { id: 'projects', label: 'Projects', icon: FlaskConical },
    { id: 'progress', label: 'My Progress', icon: BarChart2 },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    if (isOpenMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-45 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header on Mobile */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              StudySphere
            </span>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Branch Profile Card */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-750 dark:border-slate-700/60 dark:bg-slate-800/50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Your Curriculum
              </span>
              <button
                onClick={onOpenBranchSwitcher}
                className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
              >
                Change
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {branchInfo.shortCode}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Year {student.year} · Sem {student.semester}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
                {item.id === 'bookmarks' && student.bookmarkedItemIds.length > 0 && (
                  <span className="ml-auto text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500">
                    {student.bookmarkedItemIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer info */}
        <div className="border-t border-slate-200 p-3.5 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="truncate">
            <span className="block font-semibold text-slate-700 dark:text-slate-300 truncate">
              {student.college}
            </span>
            <span className="text-[10px] text-slate-400">Roll: {student.rollNumber}</span>
          </div>
        </div>
      </aside>
    </>
  );
};
