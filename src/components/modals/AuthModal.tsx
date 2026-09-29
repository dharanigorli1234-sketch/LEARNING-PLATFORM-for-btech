import React, { useState } from 'react';
import { X, GraduationCap, ArrowRight, ShieldCheck, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BranchId, Year, Semester } from '../../types';
import { BRANCHES_INFO, DEMO_PROFILES } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login'
}) => {
  const { login, register, loadDemoProfile } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('Delhi Technological University (DTU)');
  const [branch, setBranch] = useState<BranchId>('CSE');
  const [year, setYear] = useState<Year>(3);
  const [semester, setSemester] = useState<Semester>(5);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email.trim()) {
        setErrorMsg('Please enter your college email address');
        return;
      }
      login(email);
      onClose();
    } else {
      if (!name.trim() || !email.trim()) {
        setErrorMsg('Please complete all required fields');
        return;
      }
      register({
        name,
        email,
        college,
        branch,
        year,
        semester
      });
      onClose();
    }
  };

  const handleSelectDemo = (demoId: string) => {
    loadDemoProfile(demoId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              S
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {mode === 'login' ? 'Welcome Back to StudySphere' : 'Create Student Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Single unified platform across all engineering branches.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="mt-4 flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            Register
          </button>
        </div>

        {/* Instant Demo Presets for quick evaluation */}
        <div className="mt-4 p-3 rounded-xl border border-indigo-100 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block mb-2">
            1-Click Demo Login (Fast Evaluation)
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {DEMO_PROFILES.map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => handleSelectDemo(d.id)}
                className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200/70 bg-white text-left text-xs hover:border-indigo-400 hover:shadow-xs dark:border-slate-700 dark:bg-slate-800 transition-all"
              >
                <img src={d.avatarUrl} alt={d.name} className="h-6 w-6 rounded-full" />
                <div className="min-w-0 flex-1 truncate">
                  <span className="font-semibold text-slate-900 dark:text-white block truncate">{d.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{d.branch} · Yr {d.year}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              College Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. student@college.ac.in"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / University Name
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  placeholder="e.g. Delhi Technological University"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Engineering Branch *
                </label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value as BranchId)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {Object.values(BRANCHES_INFO).map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.shortCode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year
                  </label>
                  <select
                    value={year}
                    onChange={e => {
                      const yr = parseInt(e.target.value) as Year;
                      setYear(yr);
                      setSemester(((yr - 1) * 2 + 1) as Semester);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={1}>1st Year (Fresher)</option>
                    <option value={2}>2nd Year (Sophomore)</option>
                    <option value={3}>3rd Year (Junior)</option>
                    <option value={4}>4th Year (Senior)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={e => setSemester(parseInt(e.target.value) as Semester)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={1}>Semester 1</option>
                    <option value={2}>Semester 2</option>
                    <option value={3}>Semester 3</option>
                    <option value={4}>Semester 4</option>
                    <option value={5}>Semester 5</option>
                    <option value={6}>Semester 6</option>
                    <option value={7}>Semester 7</option>
                    <option value={8}>Semester 8</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
          >
            <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Complete Registration'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-400 dark:border-slate-800 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Encrypted student portal session</span>
        </div>
      </div>
    </div>
  );
};
