import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  FileCheck2, 
  FlaskConical, 
  BookOpen 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ALL_NOTES, INITIAL_DOUBTS, PREVIOUS_PAPERS, PROJECT_IDEAS } from '../../data/mockData';
import { NavigationTab, Doubt } from '../../types';

interface BookmarksViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  doubts: Doubt[];
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onNavigate, doubts }) => {
  const { student, toggleBookmark } = useAuth();

  const savedNotes = ALL_NOTES.filter(n => student.bookmarkedItemIds.includes(n.id));
  const savedDoubts = doubts.filter(d => student.bookmarkedItemIds.includes(d.id));
  const savedPapers = PREVIOUS_PAPERS.filter(p => student.bookmarkedItemIds.includes(p.id));
  const savedProjects = PROJECT_IDEAS.filter(pr => student.bookmarkedItemIds.includes(pr.id));

  const totalSaved = savedNotes.length + savedDoubts.length + savedPapers.length + savedProjects.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
          Saved Bookmarks & Study Library
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quickly access your pinned lecture notes, exam papers, doubt threads, and project architectures.
        </p>
      </div>

      {totalSaved === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <Bookmark className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No bookmarks saved yet
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Click the bookmark icon on any note, previous paper, doubt, or project to save it here for fast revision.
          </p>
          <button
            onClick={() => onNavigate('notes')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
          >
            Explore Study Notes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Saved Notes Section */}
          {savedNotes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" /> Pinned Study Notes ({savedNotes.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedNotes.map(n => (
                  <div
                    key={n.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        {n.subjectName}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {n.summary}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onNavigate('notes', { noteId: n.id })}
                        className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <span>Open Note</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(n.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Doubts Section */}
          {savedDoubts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" /> Bookmarked Doubt Discussions ({savedDoubts.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedDoubts.map(d => (
                  <div
                    key={d.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        {d.subjectName}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {d.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {d.question}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onNavigate('discussions', { doubtId: d.id })}
                        className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <span>View Discussion</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(d.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Previous Papers Section */}
          {savedPapers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-emerald-500" /> Pinned Exam Papers ({savedPapers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedPapers.map(p => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {p.examType} · {p.academicYear}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                        {p.subjectName}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Year {p.year} (Sem {p.semester}) · {p.universityName}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onNavigate('papers', { paperId: p.id })}
                        className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <span>View Questions</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Projects Section */}
          {savedProjects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-teal-500" /> Saved Project Ideas ({savedProjects.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedProjects.map(pr => (
                  <div
                    key={pr.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                        {pr.domain} · {pr.difficulty}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {pr.title}
                      </h4>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onNavigate('projects', { projectId: pr.id })}
                        className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <span>View Blueprint</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(pr.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
