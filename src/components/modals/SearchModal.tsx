import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Code2, FileText, HelpCircle, FileCheck2, FlaskConical, ArrowRight } from 'lucide-react';
import { ALL_SUBJECTS, ALL_NOTES, PROGRAMMING_LANGUAGES, INITIAL_DOUBTS, PREVIOUS_PAPERS, PROJECT_IDEAS } from '../../data/mockData';
import { NavigationTab } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab, payload?: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search through all categories
  const matchedSubjects = q
    ? ALL_SUBJECTS.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    : [];

  const matchedNotes = q
    ? ALL_NOTES.filter(n => n.title.toLowerCase().includes(q) || n.subjectName.toLowerCase().includes(q) || n.tags.some(t => t.toLowerCase().includes(q)))
    : [];

  const matchedLangs = q
    ? PROGRAMMING_LANGUAGES.filter(p => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    : [];

  const matchedDoubts = q
    ? INITIAL_DOUBTS.filter(d => d.title.toLowerCase().includes(q) || d.question.toLowerCase().includes(q) || d.subjectName.toLowerCase().includes(q))
    : [];

  const matchedPapers = q
    ? PREVIOUS_PAPERS.filter(p => p.subjectName.toLowerCase().includes(q) || p.examType.toLowerCase().includes(q))
    : [];

  const matchedProjects = q
    ? PROJECT_IDEAS.filter(pr => pr.title.toLowerCase().includes(q) || pr.domain.toLowerCase().includes(q) || pr.techStack.some(t => t.toLowerCase().includes(q)))
    : [];

  const totalResults = matchedSubjects.length + matchedNotes.length + matchedLangs.length + matchedDoubts.length + matchedPapers.length + matchedProjects.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden dark:border-slate-800 dark:bg-slate-900 flex flex-col max-h-[80vh]">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search subjects, notes, code, doubts, papers, projects..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Quick Search across StudySphere</p>
              <p className="mt-1">Type keywords like "DSA", "K-Map", "Python", "Dijkstra", "Thermodynamics", or "Previous Paper"</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching resources found for "{query}". Try checking another term.
            </div>
          ) : (
            <>
              {/* Subjects */}
              {matchedSubjects.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Subjects ({matchedSubjects.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedSubjects.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onClose();
                          onNavigate('subjects', { subjectId: sub.id });
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {sub.name} <span className="font-mono text-slate-400">({sub.code})</span>
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                            {sub.description}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {matchedNotes.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <FileText className="h-3.5 w-3.5 text-blue-500" /> Study Notes ({matchedNotes.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedNotes.map(n => (
                      <button
                        key={n.id}
                        onClick={() => {
                          onClose();
                          onNavigate('notes', { noteId: n.id });
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{n.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {n.subjectName} · {n.author}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Programming */}
              {matchedLangs.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <Code2 className="h-3.5 w-3.5 text-amber-500" /> Programming Languages ({matchedLangs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedLangs.map(l => (
                      <button
                        key={l.id}
                        onClick={() => {
                          onClose();
                          onNavigate('programming', { langSlug: l.slug });
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{l.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                            {l.shortDesc}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Doubts */}
              {matchedDoubts.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <HelpCircle className="h-3.5 w-3.5 text-purple-500" /> Doubt Discussions ({matchedDoubts.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedDoubts.map(d => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onClose();
                          onNavigate('discussions', { doubtId: d.id });
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{d.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {d.subjectName} · {d.answers.length} answers
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous Papers */}
              {matchedPapers.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <FileCheck2 className="h-3.5 w-3.5 text-emerald-500" /> Previous Exam Papers ({matchedPapers.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedPapers.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onNavigate('papers', { paperId: p.id });
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {p.subjectName} · {p.examType}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Year {p.year} (Sem {p.semester}) · {p.academicYear}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <FlaskConical className="h-3.5 w-3.5 text-teal-500" /> Engineering Projects ({matchedProjects.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedProjects.map(pr => (
                      <button
                        key={pr.id}
                        onClick={() => {
                          onClose();
                          onNavigate('projects', { projectId: pr.id });
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{pr.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                            {pr.domain} · {pr.difficulty}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-200 px-4 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
          <span>Navigate using search results</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
