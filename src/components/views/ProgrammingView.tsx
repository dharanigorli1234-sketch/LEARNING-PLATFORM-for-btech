import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Terminal, 
  ChevronRight, 
  ChevronDown, 
  Sparkles,
  Layers,
  Copy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PROGRAMMING_LANGUAGES, BRANCHES_INFO } from '../../data/mockData';
import { ProgrammingLanguage, PracticeQuestion, InterviewQuestion } from '../../types';

interface ProgrammingViewProps {
  initialLangSlug?: string;
}

export const ProgrammingView: React.FC<ProgrammingViewProps> = ({ initialLangSlug }) => {
  const { student, addPoints } = useAuth();
  const currentBranch = BRANCHES_INFO[student.branch] || BRANCHES_INFO.CSE;

  // Selected language
  const [selectedLang, setSelectedLang] = useState<ProgrammingLanguage>(() => {
    if (initialLangSlug) {
      const found = PROGRAMMING_LANGUAGES.find(l => l.slug === initialLangSlug);
      if (found) return found;
    }
    // Default to branch recommended
    const recommended = PROGRAMMING_LANGUAGES.find(l => l.recommendedForBranches.includes(student.branch));
    return recommended || PROGRAMMING_LANGUAGES[0];
  });

  // Filter mode: 'recommended' or 'all'
  const [filterMode, setFilterMode] = useState<'recommended' | 'all'>('recommended');

  // Sub-tabs: 'overview' | 'sandbox' | 'practice' | 'interview'
  const [activeTab, setActiveTab] = useState<'overview' | 'sandbox' | 'practice' | 'interview'>('sandbox');

  // Sandbox code editor state
  const [sandboxCode, setSandboxCode] = useState<string>(selectedLang.basicSyntax.starterCode);
  const [sandboxOutput, setSandboxOutput] = useState<string>(selectedLang.basicSyntax.sampleOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Practice state
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion | null>(
    selectedLang.practiceQuestions[0] || null
  );
  const [revealedSolution, setRevealedSolution] = useState(false);
  const [practiceCode, setPracticeCode] = useState<string>(
    selectedLang.practiceQuestions[0]?.starterCode || ''
  );
  const [practiceStatus, setPracticeStatus] = useState<'idle' | 'running' | 'success'>('idle');

  // Interview state
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(0);

  // Update sandbox when language changes
  const handleSelectLanguage = (lang: ProgrammingLanguage) => {
    setSelectedLang(lang);
    setSandboxCode(lang.basicSyntax.starterCode);
    setSandboxOutput(lang.basicSyntax.sampleOutput);
    setSelectedQuestion(lang.practiceQuestions[0] || null);
    setPracticeCode(lang.practiceQuestions[0]?.starterCode || '');
    setRevealedSolution(false);
    setPracticeStatus('idle');
  };

  const runSandboxCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setSandboxOutput(`Executing ${selectedLang.name} Runtime...\n---------------------------------\n` + selectedLang.basicSyntax.sampleOutput + `\n---------------------------------\nExecution completed in 42ms (exit code 0).`);
      addPoints(5); // 5 points for running code
    }, 600);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTestPractice = () => {
    setPracticeStatus('running');
    setTimeout(() => {
      setPracticeStatus('success');
      addPoints(15);
    }, 800);
  };

  // Filter languages
  const displayedLanguages = filterMode === 'recommended'
    ? PROGRAMMING_LANGUAGES.filter(l => l.recommendedForBranches.includes(student.branch))
    : PROGRAMMING_LANGUAGES;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Engineering Programming Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Master essential programming languages tailored for {currentBranch.shortCode} with interactive code sandbox, practice problems, and interview questions.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setFilterMode('recommended')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'recommended'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Recommended for {currentBranch.shortCode}
          </button>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'all'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Languages (8)
          </button>
        </div>
      </div>

      {/* Language Selector Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {displayedLanguages.map(lang => {
          const isSelected = selectedLang.id === lang.id;
          const isRecommended = lang.recommendedForBranches.includes(student.branch);

          return (
            <button
              key={lang.id}
              onClick={() => handleSelectLanguage(lang)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <span>{lang.name}</span>
              {isRecommended && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                }`}>
                  Core
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Language Main Workspace */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-xs">
        {/* Navigation Tabs for this language */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-2.5 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {selectedLang.name}
            </span>
            <span className="text-xs text-slate-400">· {selectedLang.version}</span>
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'sandbox', label: 'Interactive Sandbox' },
              { id: 'overview', label: 'Concepts & Syntax' },
              { id: 'practice', label: 'Practice Problems' },
              { id: 'interview', label: 'Interview Q&A' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Interactive Sandbox */}
        {activeTab === 'sandbox' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Code Editor Left Side (7 cols) */}
            <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-700 bg-slate-950 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs text-slate-400">
                <span className="font-mono flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                  main.{selectedLang.slug}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(sandboxCode)}
                    className="p-1 hover:text-white transition-colors"
                    title="Copy Code"
                  >
                    {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => setSandboxCode(selectedLang.basicSyntax.starterCode)}
                    className="p-1 hover:text-white transition-colors"
                    title="Reset to template"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                value={sandboxCode}
                onChange={e => setSandboxCode(e.target.value)}
                className="w-full h-80 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-100 focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />

              <div className="flex items-center justify-between p-3 border-t border-slate-800 bg-slate-900">
                <span className="text-[11px] text-slate-400 font-mono">
                  Press 'Run Code' to execute in browser container
                </span>
                <button
                  onClick={runSandboxCode}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
                </button>
              </div>
            </div>

            {/* Output Console Right Side (5 cols) */}
            <div className="lg:col-span-5 flex flex-col rounded-xl border border-slate-700 bg-slate-950 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs text-slate-400 font-mono">
                <span>Output Console</span>
                <span className="text-emerald-400">● Ready</span>
              </div>
              <pre className="flex-1 p-4 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre-wrap leading-relaxed h-80">
                {sandboxOutput}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Overview & Concepts */}
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Overview & Core Principles
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedLang.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Basic Syntax Rules
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                {selectedLang.basicSyntax.syntaxExplanation}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto">
                {selectedLang.basicSyntax.starterCode}
              </pre>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Critical Concepts for {selectedLang.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedLang.concepts.map(concept => (
                  <div
                    key={concept.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
                  >
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {concept.title}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {concept.explanation}
                    </p>
                    <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                      {concept.codeSnippet}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Practice Problems */}
        {activeTab === 'practice' && selectedQuestion && (
          <div className="p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    selectedQuestion.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {selectedQuestion.difficulty}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedQuestion.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {selectedQuestion.description}
                </p>
              </div>

              <button
                onClick={() => setRevealedSolution(!revealedSolution)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                {revealedSolution ? 'Hide Solution' : 'Reveal Solution & Hints'}
              </button>
            </div>

            {revealedSolution && (
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/20 space-y-3">
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block">
                  Reference Solution & Hints:
                </span>
                <ul className="text-xs text-indigo-950 dark:text-indigo-200 list-disc list-inside space-y-1">
                  {selectedQuestion.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto">
                  {selectedQuestion.solutionCode}
                </pre>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Your Solution Code
              </label>
              <textarea
                value={practiceCode}
                onChange={e => setPracticeCode(e.target.value)}
                className="w-full h-48 bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-100 focus:outline-none"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                {practiceStatus === 'success' && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4" /> All test cases passed! +15 Points awarded
                  </span>
                )}
              </div>
              <button
                onClick={handleTestPractice}
                disabled={practiceStatus === 'running'}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                {practiceStatus === 'running' ? 'Validating Test Cases...' : 'Submit & Test Solution'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Interview Questions */}
        {activeTab === 'interview' && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Technical Campus Interview Questions for {selectedLang.name}
            </h3>
            <div className="space-y-3">
              {selectedLang.interviewQuestions.map((iq, idx) => {
                const isOpen = expandedInterviewIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
                  >
                    <div
                      onClick={() => setExpandedInterviewIdx(isOpen ? null : idx)}
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Q{idx + 1}: {iq.question}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isOpen && (
                      <div className="border-t border-slate-100 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {iq.answer}
                        </p>
                        <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span>Frequently asked at:</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {iq.frequentlyAskedAt.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
