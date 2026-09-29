import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  Award, 
  CheckCircle2, 
  X, 
  ExternalLink,
  BookOpen,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PREVIOUS_PAPERS, ALL_SUBJECTS, BRANCHES_INFO } from '../../data/mockData';
import { BranchId, Year, Semester, PreviousPaper, NavigationTab } from '../../types';

interface PreviousPapersViewProps {
  onNavigate: (tab: NavigationTab, payload?: any) => void;
  initialSubjectId?: string;
  initialPaperId?: string;
}

export const PreviousPapersView: React.FC<PreviousPapersViewProps> = ({
  onNavigate,
  initialSubjectId,
  initialPaperId
}) => {
  const { student, isBookmarked, toggleBookmark } = useAuth();

  const [filterBranch, setFilterBranch] = useState<BranchId>(student.branch);
  const [filterYear, setFilterYear] = useState<Year | 'all'>('all');
  const [filterSemester, setFilterSemester] = useState<Semester | 'all'>('all');
  const [filterExamType, setFilterExamType] = useState<string>('all');
  const [filterSubjectId, setFilterSubjectId] = useState<string>(initialSubjectId || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Paper View Modal
  const [activePaper, setActivePaper] = useState<PreviousPaper | null>(() => {
    if (initialPaperId) {
      return PREVIOUS_PAPERS.find(p => p.id === initialPaperId) || null;
    }
    return null;
  });

  const [downloadToast, setDownloadToast] = useState(false);

  const availableSubjects = ALL_SUBJECTS.filter(s => s.branchId === filterBranch);

  const filteredPapers = PREVIOUS_PAPERS.filter(p => {
    if (p.branchId !== filterBranch) return false;
    if (filterYear !== 'all' && p.year !== filterYear) return false;
    if (filterSemester !== 'all' && p.semester !== filterSemester) return false;
    if (filterExamType !== 'all' && p.examType !== filterExamType) return false;
    if (filterSubjectId !== 'all' && p.subjectId !== filterSubjectId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.subjectName.toLowerCase().includes(q) ||
        p.examType.toLowerCase().includes(q) ||
        p.academicYear.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            Previous Question Papers
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official semester exam papers, midterms, and verified university answer keys filtered by engineering branch.
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
              placeholder="Search exam papers..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <Filter className="h-3.5 w-3.5" /> Filter Papers
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Branch */}
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

          {/* Year */}
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

          {/* Semester */}
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

          {/* Subject */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Subject
            </label>
            <select
              value={filterSubjectId}
              onChange={e => setFilterSubjectId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              Exam Type
            </label>
            <select
              value={filterExamType}
              onChange={e => setFilterExamType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="End-Semester University Exam">End-Semester University</option>
              <option value="Mid-Term 1">Mid-Term 1</option>
              <option value="Mid-Term 2">Mid-Term 2</option>
              <option value="Supplementary">Supplementary Exam</option>
            </select>
          </div>
        </div>
      </div>

      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Question Paper & Answer Key PDF downloaded!</span>
        </div>
      )}

      {/* Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <FileCheck2 className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No question papers found for this selection
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try resetting your filters or selecting "All Semesters".
          </p>
          <button
            onClick={() => {
              setFilterBranch('CSE');
              setFilterYear('all');
              setFilterSemester('all');
              setFilterExamType('all');
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
          {filteredPapers.map(paper => (
            <div
              key={paper.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {paper.examType}
                  </span>
                  <span>{paper.academicYear}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {paper.subjectName}
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {paper.universityName} · Year {paper.year} (Sem {paper.semester})
                </p>

                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold">{paper.durationHours} Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Marks:</span>
                    <span className="font-semibold">{paper.totalMarks} Marks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Solutions:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setActivePaper(paper)}
                  className="flex-1 py-1.5 rounded-lg bg-indigo-600 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                >
                  View Paper & Questions
                </button>
                <button
                  onClick={handleDownload}
                  title="Download PDF"
                  className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Paper Preview Modal */}
      {activePaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[92vh] flex flex-col">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  {activePaper.examType} · {activePaper.academicYear}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {activePaper.subjectName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activePaper.universityName} · Duration: {activePaper.durationHours} Hours · Maximum Marks: {activePaper.totalMarks}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </button>
                <button
                  onClick={() => setActivePaper(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Questions Breakdown List */}
            <div className="flex-1 overflow-y-auto py-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Exam Paper Question Structure & Marking Scheme
              </h3>

              <div className="space-y-3">
                {activePaper.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {q.section} — Question {q.questionNumber}
                      </span>
                      <span className="font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                        [{q.marks} Marks]
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                      {q.questionText}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Topic: <span className="font-medium text-slate-600 dark:text-slate-300">{q.topic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Full model answers and marking key included in download
              </span>
              <button
                onClick={() => onNavigate('ask_doubt', { subjectId: activePaper.subjectId })}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Discuss this paper with peers →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
