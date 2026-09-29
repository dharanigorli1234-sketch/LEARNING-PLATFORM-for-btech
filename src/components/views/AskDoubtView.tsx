import React, { useState } from 'react';
import { 
  HelpCircle, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  Code2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALL_SUBJECTS, BRANCHES_INFO } from '../../data/mockData';
import { BranchId, NavigationTab, Doubt } from '../../types';

interface AskDoubtViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  onPostDoubt: (doubt: Doubt) => void;
  initialSubjectId?: string;
  initialTopic?: string;
}

export const AskDoubtView: React.FC<AskDoubtViewProps> = ({
  onNavigate,
  onPostDoubt,
  initialSubjectId,
  initialTopic
}) => {
  const { student, addPoints } = useAuth();
  const currentBranch = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  // Form states
  const branchSubjects = ALL_SUBJECTS.filter(s => s.branchId === student.branch);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || branchSubjects[0]?.id || ''
  );
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(initialTopic || '');
  const [question, setQuestion] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string>('Exams, Homework, Concept');
  const [submitted, setSubmitted] = useState(false);

  // Get selected subject
  const currentSubject = ALL_SUBJECTS.find(s => s.id === selectedSubjectId);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !question.trim()) return;

    const newDoubt: Doubt = {
      id: 'doubt-' + Date.now(),
      title,
      question,
      subjectId: selectedSubjectId,
      subjectName: currentSubject ? currentSubject.name : 'General Engineering',
      topic: topic || 'General Concept',
      branchId: student.branch,
      studentId: student.id,
      studentName: student.name,
      studentBranch: student.branch,
      studentCollege: student.college,
      studentAvatar: student.avatarUrl,
      createdAt: 'Just now',
      upvotes: 1,
      imageUrl: imagePreview || undefined,
      codeSnippet: codeSnippet.trim() ? codeSnippet : undefined,
      isResolved: false,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      answers: []
    };

    onPostDoubt(newDoubt);
    addPoints(10); // Reward for asking active doubt
    setSubmitted(true);

    setTimeout(() => {
      onNavigate('discussions', { doubtId: newDoubt.id });
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Ask a Doubt
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Post your question to professors, TAs, and peer engineers in {currentBranch.shortCode}. Add equations, diagrams, and code snippets.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/20 space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
            <Check className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Doubt Successfully Posted!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            You earned +10 StudySphere points! Redirecting you to the live discussion thread...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          {/* Subject & Topic Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Engineering Subject *
              </label>
              <select
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {branchSubjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Specific Topic / Unit
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Master Theorem or K-Map grouping"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Question Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Doubt Title (Clear & Specific) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Why does Dijkstra's algorithm fail when negative edge weights are present?"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Question Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Question Body *
            </label>
            <textarea
              required
              rows={4}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Describe what you tried, where you are getting stuck, and any textbook theorem or question number..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Optional Code Snippet */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5" />
              Code Snippet / Circuit Netlist (Optional)
            </label>
            <textarea
              rows={3}
              value={codeSnippet}
              onChange={e => setCodeSnippet(e.target.value)}
              placeholder="// Paste snippet, truth table or pseudo-code here..."
              className="w-full rounded-xl border border-slate-200 bg-slate-950 font-mono text-xs text-slate-100 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Image Upload attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Diagram / Textbook Photo Upload (Optional)
            </label>
            
            {imagePreview ? (
              <div className="relative inline-block mt-1">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="max-h-48 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-2 -right-2 rounded-full bg-rose-600 p-1 text-white hover:bg-rose-700 shadow-sm"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-500 cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40">
                <ImageIcon className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to upload screenshot or formula diagram
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, SVG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="e.g. Algorithms, Semester Exam, Midterm"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              Earn +10 points when you post an academic doubt
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
            >
              <span>Post Question</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
