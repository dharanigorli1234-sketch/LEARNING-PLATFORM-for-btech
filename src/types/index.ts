export type BranchId = 
  | 'CSE'
  | 'ECE'
  | 'EEE'
  | 'Mechanical'
  | 'Civil'
  | 'IT'
  | 'AI_ML'
  | 'AI_DS'
  | 'Other';

export interface BranchInfo {
  id: BranchId;
  name: string;
  shortCode: string;
  description: string;
  iconName: string;
  primaryColors: string;
  accentBadge: string;
}

export type Year = 1 | 2 | 3 | 4;
export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: BranchId;
  year: Year;
  semester: Semester;
  rollNumber: string;
  avatarUrl: string;
  points: number;
  streakDays: number;
  completedTopicIds: string[];
  completedSubjectIds: string[];
  bookmarkedItemIds: string[];
  joinedDate: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  unit: number;
  title: string;
  summary: string;
  durationMins: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyFormulas?: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  branchId: BranchId;
  year: Year;
  semester: Semester;
  category: 'Core' | 'Elective' | 'Lab' | 'Foundation';
  credits: number;
  description: string;
  iconName: string;
  topics: Topic[];
}

export interface Note {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicTitle: string;
  branchId: BranchId;
  year: Year;
  semester: Semester;
  title: string;
  author: string;
  authorCollege: string;
  uploadedDate: string;
  readTime: string;
  downloadsCount: number;
  tags: string[];
  summary: string;
  contentMarkdown: string;
  keyPoints: string[];
}

export interface ProgrammingConcept {
  id: string;
  title: string;
  explanation: string;
  codeSnippet: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputFormat?: string;
  outputFormat?: string;
  starterCode: string;
  solutionCode: string;
  expectedOutput: string;
  hints: string[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  frequentlyAskedAt: string[];
}

export interface ProgrammingLanguage {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
  recommendedForBranches: BranchId[];
  color: string;
  version: string;
  overview: string;
  basicSyntax: {
    syntaxExplanation: string;
    starterCode: string;
    sampleOutput: string;
  };
  concepts: ProgrammingConcept[];
  practiceQuestions: PracticeQuestion[];
  interviewQuestions: InterviewQuestion[];
}

export interface DoubtAnswer {
  id: string;
  doubtId: string;
  authorId: string;
  authorName: string;
  authorRole: 'Student' | 'Peer Mentor' | 'Teaching Assistant' | 'Faculty';
  authorBranch: BranchId;
  authorAvatar: string;
  answerText: string;
  codeSnippet?: string;
  createdAt: string;
  upvotes: number;
  userVoted?: 'up' | 'down';
  isBestAnswer: boolean;
}

export interface Doubt {
  id: string;
  title: string;
  question: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  branchId: BranchId;
  studentId: string;
  studentName: string;
  studentBranch: BranchId;
  studentCollege: string;
  studentAvatar: string;
  createdAt: string;
  upvotes: number;
  userVoted?: 'up' | 'down';
  imageUrl?: string;
  codeSnippet?: string;
  isResolved: boolean;
  tags: string[];
  answers: DoubtAnswer[];
}

export interface PreviousPaperQuestion {
  section: string;
  questionNumber: string;
  questionText: string;
  marks: number;
  topic: string;
}

export interface PreviousPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  branchId: BranchId;
  year: Year;
  semester: Semester;
  examType: 'Mid-Term 1' | 'Mid-Term 2' | 'End-Semester University Exam' | 'Supplementary';
  academicYear: string;
  universityName: string;
  durationHours: number;
  totalMarks: number;
  questions: PreviousPaperQuestion[];
  solutionAvailable: boolean;
  downloadCount: number;
}

export interface ProjectIdea {
  id: string;
  title: string;
  branchId: BranchId;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  domain: string;
  summary: string;
  techStack: string[];
  hardwareRequired?: string[];
  keyFeatures: string[];
  learningOutcomes: string[];
  estimatedWeeks: number;
  architectureNotes: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'Video Lecture' | 'Interactive Sandbox' | 'Cheatsheet' | 'Documentation';
  subjectId: string;
  subjectName: string;
  branchId: BranchId;
  instructor: string;
  platform: string;
  durationOrPages: string;
  url: string;
  rating: number;
  description: string;
}

export type NavigationTab = 
  | 'dashboard'
  | 'subjects'
  | 'programming'
  | 'notes'
  | 'ask_doubt'
  | 'discussions'
  | 'papers'
  | 'resources'
  | 'projects'
  | 'progress'
  | 'bookmarks'
  | 'profile';
