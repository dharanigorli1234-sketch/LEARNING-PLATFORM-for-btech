import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Search, 
  Filter, 
  Send, 
  HelpCircle,
  Award,
  ChevronDown,
  Sparkles,
  User,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Doubt, DoubtAnswer, NavigationTab } from '../../types';
import { ALL_SUBJECTS, BRANCHES_INFO } from '../../data/mockData';

interface DoubtDiscussionsViewProps {
  doubts: Doubt[];
  onUpvoteDoubt: (doubtId: string) => void;
  onDownvoteDoubt: (doubtId: string) => void;
  onAddAnswer: (doubtId: string, answerText: string) => void;
  onUpvoteAnswer: (doubtId: string, answerId: string) => void;
  onMarkBestAnswer: (doubtId: string, answerId: string) => void;
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  initialDoubtId?: string;
}

export const DoubtDiscussionsView: React.FC<DoubtDiscussionsViewProps> = ({
  doubts,
  onUpvoteDoubt,
  onDownvoteDoubt,
  onAddAnswer,
  onUpvoteAnswer,
  onMarkBestAnswer,
  onNavigate,
  initialDoubtId
}) => {
  const { student, isBookmarked, toggleBookmark } = useAuth();
  const branchInfo = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  // Selected doubt for full thread display
  const [selectedDoubtId, setSelectedDoubtId] = useState<string>(
    initialDoubtId || (doubts[0]?.id ?? '')
  );

  // Filter mode: 'all' | 'unresolved' | 'solved' | 'my_doubts'
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'solved' | 'my_doubts'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Answer compose field
  const [newAnswerText, setNewAnswerText] = useState('');

  // Filter doubts list
  const filteredDoubts = doubts.filter(d => {
    if (statusFilter === 'solved' && !d.isResolved) return false;
    if (statusFilter === 'unresolved' && d.isResolved) return false;
    if (statusFilter === 'my_doubts' && d.studentId !== student.id) return false;
    if (subjectFilter !== 'all' && d.subjectId !== subjectFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.question.toLowerCase().includes(q) ||
        d.subjectName.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const activeDoubt = doubts.find(d => d.id === selectedDoubtId) || filteredDoubts[0] || null;

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDoubt || !newAnswerText.trim()) return;

    onAddAnswer(activeDoubt.id, newAnswerText);
    setNewAnswerText('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Doubt Discussions & Campus Q&A
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Collaborative peer learning, verified faculty answers, and academic problem solving.
          </p>
        </div>

        <button
          onClick={() => onNavigate('ask_doubt')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors self-start sm:self-auto"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Ask New Doubt</span>
        </button>
      </div>

      {/* Main 2-Column Discussion Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): List of Doubts & Filters */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search & Filter pills */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search discussions & questions..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'unresolved', label: 'Open' },
                { id: 'solved', label: 'Solved' },
                { id: 'my_doubts', label: 'My Doubts' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id as any)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    statusFilter === f.id
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Doubt Cards List */}
          <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
            {filteredDoubts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400 dark:border-slate-800">
                No discussions match this filter.
              </div>
            ) : (
              filteredDoubts.map(doubt => {
                const isSelected = activeDoubt?.id === doubt.id;
                const bookmarked = isBookmarked(doubt.id);

                return (
                  <div
                    key={doubt.id}
                    onClick={() => setSelectedDoubtId(doubt.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 dark:border-indigo-500 dark:bg-indigo-950/30 ring-1 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {doubt.subjectName}
                      </span>
                      <span className={doubt.isResolved ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}>
                        {doubt.isResolved ? '✓ Solved' : 'Open'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      {doubt.title}
                    </h4>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {doubt.question}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <img src={doubt.studentAvatar} alt="" className="h-4 w-4 rounded-full" />
                        <span>{doubt.studentName} ({doubt.studentBranch})</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span>▲ {doubt.upvotes}</span>
                        <span>💬 {doubt.answers.length}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Full Discussion Thread & Answers */}
        <div className="lg:col-span-7">
          {activeDoubt ? (
            <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-xs">
              {/* Question Header & Body */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {activeDoubt.subjectName}
                      </span>
                      <span>·</span>
                      <span>Topic: {activeDoubt.topic}</span>
                      <span>·</span>
                      <span>{activeDoubt.createdAt}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {activeDoubt.title}
                    </h2>
                  </div>

                  {/* Bookmark Doubt */}
                  <button
                    onClick={() => toggleBookmark(activeDoubt.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isBookmarked(activeDoubt.id)
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-500'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700'
                    }`}
                    title="Bookmark this doubt"
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked(activeDoubt.id) ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                  </button>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <img
                    src={activeDoubt.studentAvatar}
                    alt=""
                    className="h-7 w-7 rounded-full border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {activeDoubt.studentName}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {activeDoubt.studentCollege} ({activeDoubt.studentBranch})
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {activeDoubt.question}
                </div>

                {/* Attached Code Snippet if any */}
                {activeDoubt.codeSnippet && (
                  <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto">
                    {activeDoubt.codeSnippet}
                  </pre>
                )}

                {/* Attached Image if any */}
                {activeDoubt.imageUrl && (
                  <div className="rounded-xl border border-slate-200 overflow-hidden dark:border-slate-700 max-w-md">
                    <img src={activeDoubt.imageUrl} alt="Attached question reference" className="w-full object-cover" />
                  </div>
                )}

                {/* Voting & Metadata Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpvoteDoubt(activeDoubt.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        activeDoubt.userVoted === 'up'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{activeDoubt.upvotes} Upvotes</span>
                    </button>
                    <button
                      onClick={() => onDownvoteDoubt(activeDoubt.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700"
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {activeDoubt.tags.map(t => (
                      <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Answers Feed */}
              <div className="p-6 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Answers & Solutions ({activeDoubt.answers.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">Verified peer answers</span>
                </div>

                {activeDoubt.answers.length === 0 ? (
                  <div className="p-6 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500 dark:border-slate-800">
                    No answers yet. Be the first student to answer and earn +25 points!
                  </div>
                ) : (
                  activeDoubt.answers.map(ans => (
                    <div
                      key={ans.id}
                      className={`p-4 rounded-xl border transition-all space-y-3 ${
                        ans.isBestAnswer
                          ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20 ring-1 ring-emerald-500/20'
                          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img src={ans.authorAvatar} alt="" className="h-7 w-7 rounded-full" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {ans.authorName}
                              </span>
                              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded">
                                {ans.authorRole}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">{ans.createdAt}</span>
                          </div>
                        </div>

                        {ans.isBestAnswer ? (
                          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                            <Award className="h-3.5 w-3.5" />
                            <span>Best Answer</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onMarkBestAnswer(activeDoubt.id, ans.id)}
                            className="text-[11px] text-slate-400 hover:text-emerald-600 flex items-center gap-1"
                            title="Mark this as the best answer"
                          >
                            <Award className="h-3 w-3" />
                            <span>Mark Best</span>
                          </button>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                        {ans.answerText}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <button
                          onClick={() => onUpvoteAnswer(activeDoubt.id, ans.id)}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400"
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span className="font-mono text-xs">{ans.upvotes} helpful</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* Reply / Answer Composer */}
                <form onSubmit={handlePostAnswer} className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Post Your Answer
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newAnswerText}
                    onChange={e => setNewAnswerText(e.target.value)}
                    placeholder="Provide a clear step-by-step mathematical explanation, formula derivation, or algorithmic reasoning..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">
                      Answering doubts awards +25 points towards peer mentor status
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Answer</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 p-12 text-center text-slate-400 dark:border-slate-800">
              Select a question to view full discussion.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
