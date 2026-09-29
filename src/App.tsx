import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { SearchModal } from './components/modals/SearchModal';
import { BranchQuickSwitcherModal } from './components/modals/BranchQuickSwitcherModal';
import { AuthModal } from './components/modals/AuthModal';

import { DashboardView } from './components/views/DashboardView';
import { SubjectsView } from './components/views/SubjectsView';
import { NotesView } from './components/views/NotesView';
import { ProgrammingView } from './components/views/ProgrammingView';
import { AskDoubtView } from './components/views/AskDoubtView';
import { DoubtDiscussionsView } from './components/views/DoubtDiscussionsView';
import { PreviousPapersView } from './components/views/PreviousPapersView';
import { LearningResourcesView } from './components/views/LearningResourcesView';
import { ProjectsView } from './components/views/ProjectsView';
import { ProgressView } from './components/views/ProgressView';
import { BookmarksView } from './components/views/BookmarksView';
import { ProfileView } from './components/views/ProfileView';
import { N8nChatWidget } from './components/chat/N8nChatWidget';

import { NavigationTab, Doubt, DoubtAnswer } from './types';
import { INITIAL_DOUBTS } from './data/mockData';
import { Menu } from 'lucide-react';

const MainPortal: React.FC = () => {
  const { student, addPoints } = useAuth();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [navPayload, setNavPayload] = useState<any>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBranchSwitcherOpen, setIsBranchSwitcherOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dynamic Doubts state
  const [doubts, setDoubts] = useState<Doubt[]>(() => {
    try {
      const saved = localStorage.getItem('studysphere_doubts_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DOUBTS;
  });

  const saveDoubts = (updated: Doubt[]) => {
    setDoubts(updated);
    try {
      localStorage.setItem('studysphere_doubts_v1', JSON.stringify(updated));
    } catch {}
  };

  const handleNavigate = (tab: NavigationTab, payload?: any) => {
    setActiveTab(tab);
    setNavPayload(payload || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostDoubt = (newDoubt: Doubt) => {
    const updated = [newDoubt, ...doubts];
    saveDoubts(updated);
  };

  const handleUpvoteDoubt = (doubtId: string) => {
    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        const isUp = d.userVoted === 'up';
        return {
          ...d,
          upvotes: isUp ? d.upvotes - 1 : d.upvotes + 1,
          userVoted: isUp ? undefined : ('up' as const)
        };
      }
      return d;
    });
    saveDoubts(updated);
  };

  const handleDownvoteDoubt = (doubtId: string) => {
    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        const isDown = d.userVoted === 'down';
        return {
          ...d,
          upvotes: isDown ? d.upvotes + 1 : Math.max(0, d.upvotes - 1),
          userVoted: isDown ? undefined : ('down' as const)
        };
      }
      return d;
    });
    saveDoubts(updated);
  };

  const handleAddAnswer = (doubtId: string, answerText: string) => {
    const newAnswer: DoubtAnswer = {
      id: 'ans-' + Date.now(),
      doubtId,
      authorId: student.id,
      authorName: student.name,
      authorRole: 'Student',
      authorBranch: student.branch,
      authorAvatar: student.avatarUrl,
      answerText,
      createdAt: 'Just now',
      upvotes: 0,
      isBestAnswer: false
    };

    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          answers: [...d.answers, newAnswer]
        };
      }
      return d;
    });

    saveDoubts(updated);
    addPoints(25); // +25 points for answering doubts
  };

  const handleUpvoteAnswer = (doubtId: string, answerId: string) => {
    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          answers: d.answers.map(a => {
            if (a.id === answerId) {
              const isUp = a.userVoted === 'up';
              return {
                ...a,
                upvotes: isUp ? a.upvotes - 1 : a.upvotes + 1,
                userVoted: isUp ? undefined : ('up' as const)
              };
            }
            return a;
          })
        };
      }
      return d;
    });
    saveDoubts(updated);
  };

  const handleMarkBestAnswer = (doubtId: string, answerId: string) => {
    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          isResolved: true,
          answers: d.answers.map(a => ({
            ...a,
            isBestAnswer: a.id === answerId
          }))
        };
      }
      return d;
    });
    saveDoubts(updated);
  };

  // Calculate doubts asked/answered by current user
  const doubtsAskedCount = doubts.filter(d => d.studentId === student.id).length;
  const doubtsAnsweredCount = doubts.reduce((acc, d) => {
    return acc + d.answers.filter(a => a.authorId === student.id).length;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBranchSwitcher={() => setIsBranchSwitcherOpen(true)}
        onNavigateProfile={() => handleNavigate('profile')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Body with Sidebar & Content */}
      <div className="flex flex-1 relative">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={tab => handleNavigate(tab)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenBranchSwitcher={() => setIsBranchSwitcherOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* Mobile hamburger menu toggle */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <span className="text-xs font-bold text-slate-500">
              {activeTab.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigate={handleNavigate}
              onOpenBranchSwitcher={() => setIsBranchSwitcherOpen(true)}
            />
          )}

          {activeTab === 'subjects' && (
            <SubjectsView
              onNavigate={handleNavigate}
              initialSubjectId={navPayload?.subjectId}
            />
          )}

          {activeTab === 'notes' && (
            <NotesView
              onNavigate={handleNavigate}
              initialSubjectId={navPayload?.subjectId}
              initialNoteId={navPayload?.noteId}
            />
          )}

          {activeTab === 'programming' && (
            <ProgrammingView
              initialLangSlug={navPayload?.langSlug}
            />
          )}

          {activeTab === 'ask_doubt' && (
            <AskDoubtView
              onNavigate={handleNavigate}
              onPostDoubt={handlePostDoubt}
              initialSubjectId={navPayload?.subjectId}
              initialTopic={navPayload?.topic}
            />
          )}

          {activeTab === 'discussions' && (
            <DoubtDiscussionsView
              doubts={doubts}
              onUpvoteDoubt={handleUpvoteDoubt}
              onDownvoteDoubt={handleDownvoteDoubt}
              onAddAnswer={handleAddAnswer}
              onUpvoteAnswer={handleUpvoteAnswer}
              onMarkBestAnswer={handleMarkBestAnswer}
              onNavigate={handleNavigate}
              initialDoubtId={navPayload?.doubtId}
            />
          )}

          {activeTab === 'papers' && (
            <PreviousPapersView
              onNavigate={handleNavigate}
              initialSubjectId={navPayload?.subjectId}
              initialPaperId={navPayload?.paperId}
            />
          )}

          {activeTab === 'resources' && (
            <LearningResourcesView
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              onNavigate={handleNavigate}
              initialProjectId={navPayload?.projectId}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView
              onNavigate={handleNavigate}
              doubtsAskedCount={doubtsAskedCount}
              doubtsAnsweredCount={doubtsAnsweredCount}
            />
          )}

          {activeTab === 'bookmarks' && (
            <BookmarksView
              onNavigate={handleNavigate}
              doubts={doubts}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              onOpenBranchSwitcher={() => setIsBranchSwitcherOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <BranchQuickSwitcherModal
        isOpen={isBranchSwitcherOpen}
        onClose={() => setIsBranchSwitcherOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* n8n AI Chatbox */}
      <N8nChatWidget />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainPortal />
    </AuthProvider>
  );
}
