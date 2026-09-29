import React from 'react';
import { X, GraduationCap, Check, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRANCHES_INFO, DEMO_PROFILES } from '../../data/mockData';
import { BranchId, Year, Semester } from '../../types';

interface BranchQuickSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BranchQuickSwitcherModal: React.FC<BranchQuickSwitcherModalProps> = ({
  isOpen,
  onClose
}) => {
  const { student, switchBranch, switchYearSemester, loadDemoProfile } = useAuth();

  if (!isOpen) return null;

  const branches = Object.values(BRANCHES_INFO);

  const handleBranchSelect = (branchId: BranchId) => {
    switchBranch(branchId);
  };

  const handleYearChange = (year: Year) => {
    // Default semester for selected year
    const defaultSem = ((year - 1) * 2 + 1) as Semester;
    switchYearSemester(year, defaultSem);
  };

  const handleSemesterChange = (sem: Semester) => {
    const derivedYear = Math.ceil(sem / 2) as Year;
    switchYearSemester(derivedYear, sem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Customize Branch & Semester
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                StudySphere dynamically re-renders your entire syllabus and subjects based on this selection.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Demo Student Preset Switcher */}
        <div className="mt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Or Load a Sample Student Persona
          </span>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DEMO_PROFILES.map(demo => {
              const isCurrent = student.id === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => {
                    loadDemoProfile(demo.id);
                    onClose();
                  }}
                  className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40 ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800'
                  }`}
                >
                  <img
                    src={demo.avatarUrl}
                    alt={demo.name}
                    className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {demo.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {demo.branch} · Year {demo.year} (Sem {demo.semester})
                    </p>
                  </div>
                  {isCurrent && <UserCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Branch Selector Grid */}
        <div className="mt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Select Engineering Branch
          </span>
          <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {branches.map(b => {
              const isSelected = student.branch === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => handleBranchSelect(b.id)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold">{b.shortCode}</span>
                    <span className="text-[11px] opacity-75 line-clamp-1">{b.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Year and Semester Selection */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Academic Year
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {([1, 2, 3, 4] as Year[]).map(yr => (
                <button
                  key={yr}
                  onClick={() => handleYearChange(yr)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    student.year === yr
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Year {yr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Semester
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {([1, 2, 3, 4, 5, 6, 7, 8] as Semester[]).map(sem => (
                <button
                  key={sem}
                  onClick={() => handleSemesterChange(sem)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    student.semester === sem
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  S{sem}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
          >
            Apply & View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
