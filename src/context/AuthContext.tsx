import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchId, Year, Semester, StudentProfile } from '../types';
import { DEMO_PROFILES } from '../data/mockData';

interface AuthContextType {
  student: StudentProfile;
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  login: (email: string) => boolean;
  register: (data: {
    name: string;
    email: string;
    college: string;
    branch: BranchId;
    year: Year;
    semester: Semester;
  }) => void;
  logout: () => void;
  switchBranch: (branch: BranchId) => void;
  switchYearSemester: (year: Year, semester: Semester) => void;
  loadDemoProfile: (profileId: string) => void;
  toggleBookmark: (itemId: string) => void;
  isBookmarked: (itemId: string) => boolean;
  toggleCompleteTopic: (topicId: string, subjectId?: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  addPoints: (points: number, reason?: string) => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;
}

const STORAGE_KEY_STUDENT = 'studysphere_student_profile_v1';
const STORAGE_KEY_THEME = 'studysphere_theme_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEMO_PROFILES[0]; // Default to Aarav (CSE 3rd Year)
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {}
  }, [theme]);

  // Save student profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
    } catch {}
  }, [student]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = (email: string) => {
    const matched = DEMO_PROFILES.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setStudent(matched);
      setIsLoggedIn(true);
      return true;
    }
    // Generic login with entered email
    setStudent(prev => ({
      ...prev,
      email: email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
    setIsLoggedIn(true);
    return true;
  };

  const register = (data: {
    name: string;
    email: string;
    college: string;
    branch: BranchId;
    year: Year;
    semester: Semester;
  }) => {
    const newStudent: StudentProfile = {
      id: 'student-' + Date.now(),
      name: data.name,
      email: data.email,
      college: data.college,
      branch: data.branch,
      year: data.year,
      semester: data.semester,
      rollNumber: `24${data.branch.slice(0, 2).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name)}`,
      points: 100, // Welcome bonus
      streakDays: 1,
      completedTopicIds: [],
      completedSubjectIds: [],
      bookmarkedItemIds: [],
      joinedDate: 'Just now'
    };
    setStudent(newStudent);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const switchBranch = (newBranch: BranchId) => {
    setStudent(prev => ({
      ...prev,
      branch: newBranch
    }));
  };

  const switchYearSemester = (newYear: Year, newSemester: Semester) => {
    setStudent(prev => ({
      ...prev,
      year: newYear,
      semester: newSemester
    }));
  };

  const loadDemoProfile = (profileId: string) => {
    const found = DEMO_PROFILES.find(p => p.id === profileId);
    if (found) {
      setStudent(found);
      setIsLoggedIn(true);
    }
  };

  const toggleBookmark = (itemId: string) => {
    setStudent(prev => {
      const exists = prev.bookmarkedItemIds.includes(itemId);
      const updated = exists
        ? prev.bookmarkedItemIds.filter(id => id !== itemId)
        : [...prev.bookmarkedItemIds, itemId];
      return {
        ...prev,
        bookmarkedItemIds: updated,
        points: exists ? prev.points : prev.points + 5 // +5 points for saving study material
      };
    });
  };

  const isBookmarked = (itemId: string) => {
    return student.bookmarkedItemIds.includes(itemId);
  };

  const toggleCompleteTopic = (topicId: string) => {
    setStudent(prev => {
      const exists = prev.completedTopicIds.includes(topicId);
      const updated = exists
        ? prev.completedTopicIds.filter(id => id !== topicId)
        : [...prev.completedTopicIds, topicId];
      return {
        ...prev,
        completedTopicIds: updated,
        points: exists ? prev.points - 20 : prev.points + 20 // 20 points per completed topic
      };
    });
  };

  const isTopicCompleted = (topicId: string) => {
    return student.completedTopicIds.includes(topicId);
  };

  const addPoints = (points: number) => {
    setStudent(prev => ({
      ...prev,
      points: Math.max(0, prev.points + points)
    }));
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setStudent(prev => ({
      ...prev,
      ...updated
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isLoggedIn,
        theme,
        toggleTheme,
        login,
        register,
        logout,
        switchBranch,
        switchYearSemester,
        loadDemoProfile,
        toggleBookmark,
        isBookmarked,
        toggleCompleteTopic,
        isTopicCompleted,
        addPoints,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
