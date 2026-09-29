import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Bookmark, 
  Clock, 
  User, 
  Share2, 
  CheckCircle2, 
  X,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALL_NOTES, ALL_SUBJECTS, BRANCHES_INFO } from '../../data/mockData';
import { BranchId, Year, Semester, Note, NavigationTab } from '../../types';

interface NotesViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  initialSubjectId?: string;
  initialNoteId?: string;
}

export const NotesView: React.FC<NotesViewProps> = ({ 
  onNavigate, 
  initialSubjectId, 
  initialNoteId 
}) => {
  const { student, isBookmarked, toggleBookmark, isTopicCompleted, toggleCompleteTopic } = useAuth();

  // Filters state
  const [filterBranch, setFilterBranch] = useState<BranchId>(student.branch);
  const [filterYear, setFilterYear] = useState<Year | 'all'>('all');
  const [filterSemester, setFilterSemester] = useState<Semester | 'all'>('all');
  const [filterSubjectId, setFilterSubjectId] = useState<string>(initialSubjectId || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Note Modal Reader
  const [activeNote, setActiveNote] = useState<Note | null>(() => {
    if (initialNoteId) {
      return ALL_NOTES.find(n => n.id === initialNoteId) || null;
    }
    return null;
  });

  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  // Available subjects based on branch
  const availableSubjects = ALL_SUBJECTS.filter(s => s.branchId === filterBranch);

  // Filter notes
  const filteredNotes = ALL_NOTES.filter(note => {
    if (note.branchId !== filterBranch) return false;
    if (filterYear !== 'all' && note.year !== filterYear) return false;
    if (filterSemester !== 'all' && note.semester !== filterSemester) return false;
    if (filterSubjectId !== 'all' && note.subjectId !== filterSubjectId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(q) ||
        note.subjectName.toLowerCase().includes(q) ||
        note.summary.toLowerCase().includes(q) ||
        note.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleDownload = (noteTitle: string) => {
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Engineering Study Notes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Faculty-reviewed study guides, formulas, and lecture summaries organized by branch and topic.
          </p>
        </div>

        {/* Global search */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notes & formulas..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <Filter className="h-3.5 w-3.5" /> Filter Notes Catalog
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Branch Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Branch
            </label>
            <select
              value={filterBranch}
              onChange={e => {
                setFilterBranch(e.target.value as BranchId);
                setFilterSubjectId('all');
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {Object.values(BRANCHES_INFO).map(b => (
                <option key={b.id} value={b.id}>
                  {b.shortCode} - {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Year
            </label>
            <select
              value={filterYear}
              onChange={e => setFilterYear(e.target.value === 'all' ? 'all' : (parseInt(e.target.value) as Year))}
              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Years</option>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Semester
            </label>
            <select
              value={filterSemester}
              onChange={e => setFilterSemester(e.target.value === 'all' ? 'all' : (parseInt(e.target.value) as Semester))}
              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Subject
            </label>
            <select
              value={filterSubjectId}
              onChange={e => setFilterSubjectId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Subjects ({availableSubjects.length})</option>
              {availableSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Note PDF generated and downloaded to your device!</span>
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <FileText className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No notes match your filter criteria
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try resetting branch or semester filters to explore notes from all engineering branches.
          </p>
          <button
            onClick={() => {
              setFilterBranch('CSE');
              setFilterYear('all');
              setFilterSemester('all');
              setFilterSubjectId('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-lg text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => {
            const bookmarked = isBookmarked(note.id);
            const done = isTopicCompleted(note.topicId);

            return (
              <div
                key={note.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {note.subjectName}
                    </span>
                    <span>Year {note.year} · Sem {note.semester}</span>
                  </div>

                  <h3 
                    onClick={() => setActiveNote(note)}
                    className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors line-clamp-2"
                  >
                    {note.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                    {note.summary}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {note.author} ({note.authorCollege})
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {note.readTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveNote(note)}
                      className="flex-1 py-1.5 rounded-lg bg-indigo-600 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                    >
                      Read Study Note
                    </button>
                    <button
                      onClick={() => toggleBookmark(note.id)}
                      title={bookmarked ? 'Remove bookmark' : 'Bookmark note'}
                      className={`p-2 rounded-lg border transition-colors ${
                        bookmarked
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-500'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDownload(note.title)}
                      title="Download PDF"
                      className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Note Modal Reader */}
      {activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                  <span>{activeNote.subjectName}</span>
                  <span>·</span>
                  <span>Topic: {activeNote.topicTitle}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeNote.title}
                </h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>By {activeNote.author} ({activeNote.authorCollege})</span>
                  <span>·</span>
                  <span>{activeNote.readTime}</span>
                  <span>·</span>
                  <span>{activeNote.downloadsCount} downloads</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleBookmark(activeNote.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    isBookmarked(activeNote.id)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950'
                      : 'border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked(activeNote.id) ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                </button>
                <button
                  onClick={() => handleDownload(activeNote.title)}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  title="Download Note PDF"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveNote(null)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Note Reader Body */}
            <div className="flex-1 overflow-y-auto py-5 space-y-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {/* Key Highlights Card */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-2">
                  Key Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-indigo-950 dark:text-indigo-200 list-disc list-inside">
                  {activeNote.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Formatted Content */}
              <div className="whitespace-pre-line font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeNote.contentMarkdown}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleCompleteTopic(activeNote.topicId);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isTopicCompleted(activeNote.topicId)
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isTopicCompleted(activeNote.topicId) ? 'Topic Completed (+20 pts)' : 'Mark Topic as Completed'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveNote(null);
                  onNavigate('ask_doubt', { subjectId: activeNote.subjectId, topic: activeNote.topicTitle });
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                Have questions? Ask a Doubt about this note →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
