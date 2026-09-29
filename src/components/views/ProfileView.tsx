import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Building2, 
  Mail, 
  Calendar, 
  Sparkles, 
  Flame, 
  Award, 
  Check, 
  Download, 
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRANCHES_INFO } from '../../data/mockData';

interface ProfileViewProps {
  onOpenBranchSwitcher: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenBranchSwitcher }) => {
  const { student, updateProfile } = useAuth();
  const currentBranch = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [college, setCollege] = useState(student.college);
  const [rollNumber, setRollNumber] = useState(student.rollNumber);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      college,
      rollNumber
    });
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Student Academic Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your engineering credentials, enrolled department, and study analytics.
        </p>
      </div>

      {saveToast && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="h-20 w-20 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-slate-100 shadow-sm"
            />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {student.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {currentBranch.shortCode}
                </span>
                <span>·</span>
                <span>Year {student.year} (Semester {student.semester})</span>
                <span>·</span>
                <span>Roll: {student.rollNumber}</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {student.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button
              onClick={onOpenBranchSwitcher}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Change Branch</span>
            </button>
          </div>
        </div>

        {/* Edit Form or Read-only Grid */}
        {isEditing ? (
          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  University Roll Number
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={e => setRollNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
              >
                Save Profile Updates
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[11px] text-slate-400 block">Enrolled Branch</span>
              <span className="font-bold text-xs text-slate-900 dark:text-white mt-0.5 block">
                {currentBranch.name}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[11px] text-slate-400 block">Year & Semester</span>
              <span className="font-bold text-xs text-slate-900 dark:text-white mt-0.5 block">
                Year {student.year}, Sem {student.semester}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[11px] text-slate-400 block">Study Points</span>
              <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                {student.points} Points
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[11px] text-slate-400 block">Active Streak</span>
              <span className="font-bold text-xs text-amber-600 dark:text-amber-400 mt-0.5 block">
                {student.streakDays} Consecutive Days
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Curriculum Details & Security Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current Branch Specialization
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {currentBranch.description}
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBranchSwitcher}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Switch branch or semester anytime →
            </button>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Account Status & Security
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Verified institutional student account
          </p>
          <p className="text-[11px] text-slate-400">
            Registered with: {student.email}
          </p>
        </div>
      </div>
    </div>
  );
};
