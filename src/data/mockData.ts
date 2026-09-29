import {
  BranchId,
  BranchInfo,
  Subject,
  Note,
  ProgrammingLanguage,
  Doubt,
  PreviousPaper,
  ProjectIdea,
  LearningResource,
  StudentProfile
} from '../types';

export const BRANCHES_INFO: Record<BranchId, BranchInfo> = {
  CSE: {
    id: 'CSE',
    name: 'Computer Science & Engineering',
    shortCode: 'CSE',
    description: 'Algorithms, systems software, networks, web stacks, and computing theory.',
    iconName: 'Code',
    primaryColors: 'from-blue-600 to-indigo-600',
    accentBadge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
  },
  ECE: {
    id: 'ECE',
    name: 'Electronics & Communication',
    shortCode: 'ECE',
    description: 'Analog and digital circuits, signals, microprocessors, VLSI, and communication.',
    iconName: 'Cpu',
    primaryColors: 'from-amber-600 to-orange-600',
    accentBadge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
  },
  EEE: {
    id: 'EEE',
    name: 'Electrical & Electronics Engineering',
    shortCode: 'EEE',
    description: 'Power generation, high-voltage machines, control systems, and power electronics.',
    iconName: 'Zap',
    primaryColors: 'from-yellow-600 to-amber-700',
    accentBadge: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300'
  },
  Mechanical: {
    id: 'Mechanical',
    name: 'Mechanical Engineering',
    shortCode: 'MECH',
    description: 'Thermodynamics, fluid mechanics, CAD/CAM, manufacturing, and machine design.',
    iconName: 'Wrench',
    primaryColors: 'from-slate-700 to-zinc-800',
    accentBadge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
  },
  Civil: {
    id: 'Civil',
    name: 'Civil Engineering',
    shortCode: 'CIVIL',
    description: 'Structural mechanics, geotechnical surveying, hydrology, concrete, and transport.',
    iconName: 'Building2',
    primaryColors: 'from-emerald-600 to-teal-700',
    accentBadge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
  },
  IT: {
    id: 'IT',
    name: 'Information Technology',
    shortCode: 'IT',
    description: 'Cloud architectures, distributed systems, web technologies, DevOps, and cyber security.',
    iconName: 'Server',
    primaryColors: 'from-cyan-600 to-blue-700',
    accentBadge: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300'
  },
  AI_ML: {
    id: 'AI_ML',
    name: 'Artificial Intelligence & Machine Learning',
    shortCode: 'AI & ML',
    description: 'Neural networks, computer vision, natural language processing, and deep learning.',
    iconName: 'Brain',
    primaryColors: 'from-purple-600 to-violet-700',
    accentBadge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
  },
  AI_DS: {
    id: 'AI_DS',
    name: 'Artificial Intelligence & Data Science',
    shortCode: 'AI & DS',
    description: 'Statistical modeling, big data pipelines, data mining, and predictive intelligence.',
    iconName: 'BarChart3',
    primaryColors: 'from-rose-600 to-pink-700',
    accentBadge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
  },
  Other: {
    id: 'Other',
    name: 'Other Engineering Streams',
    shortCode: 'ENG',
    description: 'Interdisciplinary sciences, materials engineering, biomedical, and aerospace.',
    iconName: 'Compass',
    primaryColors: 'from-slate-600 to-gray-700',
    accentBadge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
  }
};

export const DEMO_PROFILES: StudentProfile[] = [
  {
    id: 'demo-cse-3',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@nitk.ac.in',
    college: 'National Institute of Technology Karnataka',
    branch: 'CSE',
    year: 3,
    semester: 5,
    rollNumber: '22CS048',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aarav',
    points: 840,
    streakDays: 14,
    completedTopicIds: ['cse-dsa-t1', 'cse-dsa-t2', 'cse-dbms-t1', 'cse-os-t1'],
    completedSubjectIds: ['cse-dsa'],
    bookmarkedItemIds: ['note-cse-1', 'paper-cse-1', 'doubt-1', 'proj-cse-2'],
    joinedDate: 'August 2022'
  },
  {
    id: 'demo-ece-2',
    name: 'Priya Nair',
    email: 'priya.nair@coep.ac.in',
    college: 'College of Engineering Pune',
    branch: 'ECE',
    year: 2,
    semester: 3,
    rollNumber: '23EC102',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Priya',
    points: 620,
    streakDays: 8,
    completedTopicIds: ['ece-de-t1', 'ece-ae-t1'],
    completedSubjectIds: [],
    bookmarkedItemIds: ['note-ece-1', 'paper-ece-1', 'doubt-2'],
    joinedDate: 'August 2023'
  },
  {
    id: 'demo-mech-4',
    name: 'Rohan Patel',
    email: 'rohan.patel@vnit.ac.in',
    college: 'Visvesvaraya National Institute of Technology',
    branch: 'Mechanical',
    year: 4,
    semester: 7,
    rollNumber: '21ME034',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rohan',
    points: 1150,
    streakDays: 21,
    completedTopicIds: ['mech-thermo-t1', 'mech-thermo-t2', 'mech-fm-t1'],
    completedSubjectIds: ['mech-thermo'],
    bookmarkedItemIds: ['note-mech-1', 'proj-mech-2'],
    joinedDate: 'August 2021'
  },
  {
    id: 'demo-aiml-3',
    name: 'Sneha Rao',
    email: 'sneha.rao@iiitb.ac.in',
    college: 'International Institute of Information Technology Bangalore',
    branch: 'AI_ML',
    year: 3,
    semester: 6,
    rollNumber: '22AI019',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sneha',
    points: 980,
    streakDays: 12,
    completedTopicIds: ['aiml-dl-t1', 'aiml-nlp-t1'],
    completedSubjectIds: ['aiml-dl'],
    bookmarkedItemIds: ['note-aiml-1', 'proj-aiml-1'],
    joinedDate: 'August 2022'
  }
];

export const ALL_SUBJECTS: Subject[] = [
  // --- CSE SUBJECTS ---
  {
    id: 'cse-dsa',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    branchId: 'CSE',
    year: 2,
    semester: 3,
    category: 'Core',
    credits: 4,
    description: 'Fundamental linear and non-linear data structures, asymptotic notation, graphs, dynamic programming, and greedy algorithms.',
    iconName: 'Network',
    topics: [
      { id: 'cse-dsa-t1', subjectId: 'cse-dsa', unit: 1, title: 'Asymptotic Analysis & Master Theorem', summary: 'Big-O, Big-Omega, Big-Theta, recursion trees, and Master Theorem cases.', durationMins: 45, difficulty: 'Intermediate', keyFormulas: ['T(n) = aT(n/b) + f(n)', 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2)'] },
      { id: 'cse-dsa-t2', subjectId: 'cse-dsa', unit: 2, title: 'Balanced Trees: AVL & Red-Black', summary: 'Tree rotations, balance factor calculation, search and insert operations in O(log n).', durationMins: 60, difficulty: 'Advanced', keyFormulas: ['Balance Factor = Height(Left) - Height(Right)', 'Max Height <= 1.44 log2(N+2) - 0.328'] },
      { id: 'cse-dsa-t3', subjectId: 'cse-dsa', unit: 3, title: 'Graph Traversals & Shortest Paths', summary: 'BFS, DFS, Dijkstra single-source shortest path, Bellman-Ford, and Prim/Kruskal MST.', durationMins: 75, difficulty: 'Intermediate', keyFormulas: ['Dijkstra: O((V+E) log V)', 'Kruskal with Disjoint Set: O(E log V)'] },
      { id: 'cse-dsa-t4', subjectId: 'cse-dsa', unit: 4, title: 'Dynamic Programming: Tabulation & Memoization', summary: '0/1 Knapsack, Longest Common Subsequence, Matrix Chain Multiplication, and Coin Change.', durationMins: 90, difficulty: 'Advanced', keyFormulas: ['LCS[i][j] = LCS[i-1][j-1]+1 if s1[i]==s2[j]', 'Knapsack dp[w] = max(dp[w], dp[w-wt]+val)'] }
    ]
  },
  {
    id: 'cse-dbms',
    code: 'CS302',
    name: 'Database Management Systems',
    branchId: 'CSE',
    year: 2,
    semester: 4,
    category: 'Core',
    credits: 4,
    description: 'Relational algebra, SQL, Normalization (1NF to BCNF), Transaction ACID properties, concurrency control, and indexing.',
    iconName: 'Database',
    topics: [
      { id: 'cse-dbms-t1', subjectId: 'cse-dbms', unit: 1, title: 'Relational Schema & Functional Dependencies', summary: 'Keys, closure of attribute sets, Armstrong axioms, and lossless join decomposition.', durationMins: 50, difficulty: 'Intermediate', keyFormulas: ['Lossless Join: R1 ∩ R2 -> R1 or R1 ∩ R2 -> R2'] },
      { id: 'cse-dbms-t2', subjectId: 'cse-dbms', unit: 2, title: 'Normal Forms: 3NF vs BCNF', summary: 'Transitive dependencies, anomalous updates, checking BCNF violations with dependency preservation.', durationMins: 60, difficulty: 'Intermediate' },
      { id: 'cse-dbms-t3', subjectId: 'cse-dbms', unit: 3, title: 'ACID Properties & Serializability', summary: 'Conflict serializability, precedence graphs, two-phase locking (2PL), and deadlock prevention.', durationMins: 65, difficulty: 'Advanced' }
    ]
  },
  {
    id: 'cse-os',
    code: 'CS303',
    name: 'Operating Systems',
    branchId: 'CSE',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Process management, CPU scheduling algorithms, synchronization (semaphores, mutex), virtual memory paging, and file systems.',
    iconName: 'Cpu',
    topics: [
      { id: 'cse-os-t1', subjectId: 'cse-os', unit: 1, title: 'CPU Scheduling Algorithms', summary: 'FCFS, SJF, Round Robin, Multi-level feedback queue, turnaround and waiting time math.', durationMins: 55, difficulty: 'Intermediate', keyFormulas: ['Turnaround Time = Completion - Arrival', 'Waiting Time = Turnaround - Burst'] },
      { id: 'cse-os-t2', subjectId: 'cse-os', unit: 2, title: 'Process Synchronization & Deadlocks', summary: 'Critical section problem, Peterson algorithm, Semaphores, Bankers Algorithm safety checks.', durationMins: 70, difficulty: 'Advanced', keyFormulas: ['Need[i][j] = Max[i][j] - Allocation[i][j]'] },
      { id: 'cse-os-t3', subjectId: 'cse-os', unit: 3, title: 'Paging & Virtual Memory Management', summary: 'Page tables, TLB hit ratio math, page replacement policies (FIFO, LRU, Optimal), thrashing.', durationMins: 80, difficulty: 'Intermediate', keyFormulas: ['Effective Memory Access Time = (TLB hit * Hit time) + ((1-hit)*(Hit time + 2*Mem time))'] }
    ]
  },
  {
    id: 'cse-cn',
    code: 'CS304',
    name: 'Computer Networks',
    branchId: 'CSE',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'OSI and TCP/IP models, framing, flow control (Go-Back-N, Selective Repeat), IPv4/IPv6 subnetting, TCP handshake, and DNS.',
    iconName: 'Wifi',
    topics: [
      { id: 'cse-cn-t1', subjectId: 'cse-cn', unit: 1, title: 'Flow Control & Error Detection', summary: 'Sliding window protocols, Go-Back-N, Selective Repeat window sizing, CRC parity calculation.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['Sender Window: GBN = 2^k - 1, SR = 2^(k-1)', 'Efficiency = N / (1 + 2a), where a = Tp / Tt'] },
      { id: 'cse-cn-t2', subjectId: 'cse-cn', unit: 2, title: 'IPv4 Subnetting & CIDR Notation', summary: 'Classless Inter-Domain Routing, subnet mask calculation, network and broadcast address deduction.', durationMins: 70, difficulty: 'Intermediate', keyFormulas: ['Usable Hosts = 2^(32-prefix) - 2'] },
      { id: 'cse-cn-t3', subjectId: 'cse-cn', unit: 3, title: 'TCP Congestion Control & 3-Way Handshake', summary: 'Slow start, Congestion avoidance, Fast retransmit, Fast recovery, TCP Tahoe vs Reno.', durationMins: 65, difficulty: 'Advanced' }
    ]
  },
  {
    id: 'cse-web',
    code: 'CS305',
    name: 'Web Development & Full-Stack Systems',
    branchId: 'CSE',
    year: 3,
    semester: 5,
    category: 'Elective',
    credits: 3,
    description: 'Modern full-stack application development, RESTful APIs, React lifecycle, Node.js asynchronous runtime, and state management.',
    iconName: 'Globe',
    topics: [
      { id: 'cse-web-t1', subjectId: 'cse-web', unit: 1, title: 'Modern JavaScript Engine & Event Loop', summary: 'Call stack, Microtask vs Macrotask queue, Closures, Promises, and Async/Await execution.', durationMins: 50, difficulty: 'Intermediate' },
      { id: 'cse-web-t2', subjectId: 'cse-web', unit: 2, title: 'React Hooks & State Architecture', summary: 'useState, useEffect dependency traps, useMemo, useCallback, Context API, and Virtual DOM reconciler.', durationMins: 60, difficulty: 'Intermediate' }
    ]
  },
  {
    id: 'cse-ai',
    code: 'CS306',
    name: 'Artificial Intelligence & Machine Learning',
    branchId: 'CSE',
    year: 3,
    semester: 6,
    category: 'Core',
    credits: 4,
    description: 'Heuristic search (A*, Minimax), Supervised learning, Gradient descent, Decision trees, and Neural networks.',
    iconName: 'Brain',
    topics: [
      { id: 'cse-ai-t1', subjectId: 'cse-ai', unit: 1, title: 'A* Search & Heuristic Admissibility', summary: 'Evaluation function f(n) = g(n) + h(n), consistency criteria, optimality proofs.', durationMins: 55, difficulty: 'Intermediate', keyFormulas: ['f(n) = g(n) + h(n)', 'h(n) <= h*(n) (Admissible)'] }
    ]
  },

  // --- ECE SUBJECTS ---
  {
    id: 'ece-de',
    code: 'EC201',
    name: 'Digital Electronics',
    branchId: 'ECE',
    year: 2,
    semester: 3,
    category: 'Core',
    credits: 4,
    description: 'Boolean algebra, Karnaugh maps, combinational logic design (encoders, multiplexers), and sequential circuits (flip-flops, counters).',
    iconName: 'Cpu',
    topics: [
      { id: 'ece-de-t1', subjectId: 'ece-de', unit: 1, title: 'K-Map Minimization & SOP/POS', summary: 'Simplifying 3, 4, and 5 variable Boolean functions, prime implicants, and essential prime implicants.', durationMins: 50, difficulty: 'Beginner', keyFormulas: ['2^n group size rule', 'De Morgan: (A+B)\' = A\'·B\''] },
      { id: 'ece-de-t2', subjectId: 'ece-de', unit: 2, title: 'Sequential Circuits: Flip-Flops & FSMs', summary: 'SR, JK, D, T flip-flops, race-around condition, Master-Slave configuration, Mealy vs Moore state machines.', durationMins: 70, difficulty: 'Intermediate', keyFormulas: ['JK Toggle Condition: J=1, K=1', 'Setup Time & Hold Time constraints'] }
    ]
  },
  {
    id: 'ece-ae',
    code: 'EC202',
    name: 'Analog Electronics',
    branchId: 'ECE',
    year: 2,
    semester: 3,
    category: 'Core',
    credits: 4,
    description: 'BJT & MOSFET biasing, small signal AC analysis, multistage amplifiers, frequency response, and operational amplifiers.',
    iconName: 'Activity',
    topics: [
      { id: 'ece-ae-t1', subjectId: 'ece-ae', unit: 1, title: 'BJT Biasing & Small Signal Models', summary: 'Voltage divider bias stability, hybrid-pi model, input/output impedance, and voltage gain.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['Vth = Vcc * (R2 / (R1+R2))', 'Voltage Gain Av = -gm * (Rc || RL)'] },
      { id: 'ece-ae-t2', subjectId: 'ece-ae', unit: 2, title: 'Op-Amp Applications & Active Filters', summary: 'Inverting, non-inverting, differentiator, integrator, Butterworth filter transfer functions.', durationMins: 65, difficulty: 'Intermediate', keyFormulas: ['Inverting Av = -Rf / R1', 'Cutoff fc = 1 / (2*pi*R*C)'] }
    ]
  },
  {
    id: 'ece-signals',
    code: 'EC203',
    name: 'Signals & Systems',
    branchId: 'ECE',
    year: 2,
    semester: 4,
    category: 'Core',
    credits: 4,
    description: 'Continuous and discrete-time signals, LTI systems, convolution integral, Fourier series, Fourier Transform, Laplace, and Z-Transform.',
    iconName: 'Radio',
    topics: [
      { id: 'ece-signals-t1', subjectId: 'ece-signals', unit: 1, title: 'Linear Time-Invariant Systems & Convolution', summary: 'Causality, stability criteria, impulse response, and continuous/discrete convolution.', durationMins: 65, difficulty: 'Intermediate', keyFormulas: ['y(t) = ∫ x(τ)h(t-τ)dτ', 'BIBO Stability: ∫ |h(t)| dt < ∞'] },
      { id: 'ece-signals-t2', subjectId: 'ece-signals', unit: 2, title: 'Fourier & Laplace Transformations', summary: 'Properties of CTFT, Region of Convergence (ROC) in Laplace domain, and system transfer functions.', durationMins: 75, difficulty: 'Advanced', keyFormulas: ['X(jω) = ∫ x(t)e^(-jωt)dt', 'X(s) = ∫ x(t)e^(-st)dt'] }
    ]
  },
  {
    id: 'ece-comm',
    code: 'EC301',
    name: 'Communication Systems',
    branchId: 'ECE',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Amplitude modulation (DSB-SC, SSB), Frequency modulation, sampling theorem, pulse code modulation (PCM), and digital modulation (BPSK, QAM).',
    iconName: 'Wifi',
    topics: [
      { id: 'ece-comm-t1', subjectId: 'ece-comm', unit: 1, title: 'AM & FM Modulation Index & Bandwidth', summary: 'Carson rule, Hilbert transform for SSB, phase lock loops, and superheterodyne receiver architecture.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['Carson Bandwidth: BW = 2*(Δf + fm)', 'AM Power: Pt = Pc*(1 + m^2/2)'] },
      { id: 'ece-comm-t2', subjectId: 'ece-comm', unit: 2, title: 'PCM, Nyquist Rate & Quantization Noise', summary: 'Sampling theorem, aliasing prevention, uniform vs non-uniform quantizers, and signal-to-noise ratio.', durationMins: 70, difficulty: 'Intermediate', keyFormulas: ['Nyquist Rate = 2 * W', 'SNR (PCM) = (6.02 * n + 1.76) dB'] }
    ]
  },
  {
    id: 'ece-vlsi',
    code: 'EC302',
    name: 'VLSI Design',
    branchId: 'ECE',
    year: 3,
    semester: 6,
    category: 'Core',
    credits: 4,
    description: 'CMOS fabrication, inverter DC characteristics, switching speed, layout design rules, Verilog HDL coding, and FPGA synthesis.',
    iconName: 'Layers',
    topics: [
      { id: 'ece-vlsi-t1', subjectId: 'ece-vlsi', unit: 1, title: 'CMOS Inverter Characteristics & Sizing', summary: 'Noise margins, static vs dynamic power dissipation, logical effort, and Elmore delay calculation.', durationMins: 65, difficulty: 'Advanced', keyFormulas: ['P_dynamic = α * C_L * V_DD^2 * f', 'Elmore Delay = ∑ R_i * C_downstream'] }
    ]
  },
  {
    id: 'ece-micro',
    code: 'EC303',
    name: 'Microprocessors & Microcontrollers',
    branchId: 'ECE',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Intel 8086 architecture, ARM Cortex fundamentals, assembly language, memory interfacing, and hardware timer/interrupt programming.',
    iconName: 'Cpu',
    topics: [
      { id: 'ece-micro-t1', subjectId: 'ece-micro', unit: 1, title: '8086 Pipelining & Segmented Addressing', summary: 'Bus Interface Unit (BIU), Execution Unit (EU), 20-bit physical address derivation.', durationMins: 55, difficulty: 'Intermediate', keyFormulas: ['Physical Address = (Segment Register << 4) + Offset'] }
    ]
  },

  // --- EEE SUBJECTS ---
  {
    id: 'eee-circuits',
    code: 'EE201',
    name: 'Electric Circuit Analysis',
    branchId: 'EEE',
    year: 2,
    semester: 3,
    category: 'Core',
    credits: 4,
    description: 'Network theorems (Thevenin, Norton, Superposition, Maximum Power Transfer), transient analysis of RLC circuits, and 3-phase AC networks.',
    iconName: 'Zap',
    topics: [
      { id: 'eee-circuits-t1', subjectId: 'eee-circuits', unit: 1, title: 'Network Theorems in AC & DC', summary: 'Thevenin equivalent voltage and impedance, maximum power transfer condition with complex loads.', durationMins: 55, difficulty: 'Intermediate', keyFormulas: ['Z_load = Z_th*', 'P_max = |V_th|^2 / (4 * R_th)'] }
    ]
  },
  {
    id: 'eee-machines',
    code: 'EE202',
    name: 'Electrical Machines',
    branchId: 'EEE',
    year: 2,
    semester: 4,
    category: 'Core',
    credits: 4,
    description: 'Single-phase & 3-phase transformers, DC motors/generators, synchronous alternators, and 3-phase induction motors.',
    iconName: 'Cpu',
    topics: [
      { id: 'eee-machines-t1', subjectId: 'eee-machines', unit: 1, title: 'Transformers: Efficiency & Voltage Regulation', summary: 'Equivalent circuit parameters from open and short circuit tests, all-day efficiency.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['Regulation = (V_no_load - V_full_load) / V_no_load * 100'] }
    ]
  },
  {
    id: 'eee-power',
    code: 'EE301',
    name: 'Power Systems & Transmission',
    branchId: 'EEE',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Transmission line models (short, medium, long), ABCD parameters, sag-tension calculations, fault analysis, and load flow studies.',
    iconName: 'Radio',
    topics: [
      { id: 'eee-power-t1', subjectId: 'eee-power', unit: 1, title: 'ABCD Parameters & Ferranti Effect', summary: 'Nominal-T and Nominal-Pi transmission line models, voltage regulation, corona phenomenon.', durationMins: 65, difficulty: 'Intermediate', keyFormulas: ['AD - BC = 1', 'Ferranti Effect: V_r > V_s at light load'] }
    ]
  },

  // --- MECHANICAL SUBJECTS ---
  {
    id: 'mech-thermo',
    code: 'ME201',
    name: 'Engineering Thermodynamics',
    branchId: 'Mechanical',
    year: 2,
    semester: 3,
    category: 'Core',
    credits: 4,
    description: 'First & Second laws of thermodynamics, entropy generation, Carnot efficiency, Rankine steam cycle, and Otto/Diesel air standard cycles.',
    iconName: 'Flame',
    topics: [
      { id: 'mech-thermo-t1', subjectId: 'mech-thermo', unit: 1, title: 'First Law for Open & Closed Systems', summary: 'Steady Flow Energy Equation (SFEE) applied to nozzles, turbines, compressors, and heat exchangers.', durationMins: 55, difficulty: 'Intermediate', keyFormulas: ['q - w = Δh + Δke + Δpe', 'Carnot Efficiency η = 1 - (Tc / Th)'] },
      { id: 'mech-thermo-t2', subjectId: 'mech-thermo', unit: 2, title: 'Air Standard Cycles: Otto, Diesel & Dual', summary: 'Compression ratio calculations, thermal efficiency comparisons, and mean effective pressure.', durationMins: 65, difficulty: 'Intermediate', keyFormulas: ['Otto η = 1 - (1 / r^(γ-1))'] }
    ]
  },
  {
    id: 'mech-fm',
    code: 'ME202',
    name: 'Fluid Mechanics & Hydraulics',
    branchId: 'Mechanical',
    year: 2,
    semester: 4,
    category: 'Core',
    credits: 4,
    description: 'Fluid statics, buoyancy, Navier-Stokes, Bernoulli equation, boundary layer theory, pipe friction, and hydraulic turbines (Pelton, Francis).',
    iconName: 'Droplets',
    topics: [
      { id: 'mech-fm-t1', subjectId: 'mech-fm', unit: 1, title: 'Bernoulli Equation & Minor/Major Head Losses', summary: 'Energy equation for incompressible flow, Darcy-Weisbach friction factor, Venturi and orifice meters.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['P/γ + v^2/(2g) + z = Constant', 'Darcy Loss: hf = (4 * f * L * v^2) / (2 * g * D)'] }
    ]
  },
  {
    id: 'mech-som',
    code: 'ME203',
    name: 'Strength of Materials',
    branchId: 'Mechanical',
    year: 2,
    semester: 3,
    category: 'Core',
    credits: 4,
    description: 'Stress-strain tensors, Mohr circle, shear force and bending moment diagrams (SFD/BMD), Euler column buckling, and torsion of shafts.',
    iconName: 'Shield',
    topics: [
      { id: 'mech-som-t1', subjectId: 'mech-som', unit: 1, title: 'Bending Stress & Flexure Formula', summary: 'Neutral axis location, section modulus, pure bending theory in beams of symmetric cross-section.', durationMins: 55, difficulty: 'Intermediate', keyFormulas: ['M / I = σ / y = E / R', 'Section Modulus Z = I / y_max'] }
    ]
  },

  // --- CIVIL SUBJECTS ---
  {
    id: 'civil-struct',
    code: 'CE201',
    name: 'Structural Analysis',
    branchId: 'Civil',
    year: 2,
    semester: 4,
    category: 'Core',
    credits: 4,
    description: 'Static and kinematic indeterminacy, moment distribution method, slope deflection equations, truss analysis, and influence lines.',
    iconName: 'Building2',
    topics: [
      { id: 'civil-struct-t1', subjectId: 'civil-struct', unit: 1, title: 'Moment Distribution Method (Hardy Cross)', summary: 'Stiffness factors, carry-over factors, distribution factors for indeterminate continuous beams.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['Stiffness k = 4EI/L (Far end fixed), 3EI/L (Far end pinned)'] }
    ]
  },
  {
    id: 'civil-geo',
    code: 'CE202',
    name: 'Geotechnical Engineering',
    branchId: 'Civil',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Soil classification, phase relationships, Darcy permeability in soils, Terzaghi 1D consolidation, and bearing capacity.',
    iconName: 'Layers',
    topics: [
      { id: 'civil-geo-t1', subjectId: 'civil-geo', unit: 1, title: 'Soil Phase Relations & Compaction', summary: 'Void ratio, porosity, degree of saturation, moisture-density relationship from standard Proctor test.', durationMins: 50, difficulty: 'Beginner', keyFormulas: ['e = w * G / S', 'Total Density ρ = G * ρw * (1 + w) / (1 + e)'] }
    ]
  },

  // --- IT SUBJECTS ---
  {
    id: 'it-cloud',
    code: 'IT301',
    name: 'Cloud Computing & Distributed Systems',
    branchId: 'IT',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Virtualization, AWS/GCP architecture, serverless microservices, CAP theorem, distributed consensus (Raft/Paxos), and Docker/K8s.',
    iconName: 'Cloud',
    topics: [
      { id: 'it-cloud-t1', subjectId: 'it-cloud', unit: 1, title: 'CAP Theorem & Distributed Data Stores', summary: 'Consistency vs Availability in partitioned systems, eventual consistency, and ACID vs BASE models.', durationMins: 55, difficulty: 'Intermediate' }
    ]
  },
  {
    id: 'it-security',
    code: 'IT302',
    name: 'Information & Network Security',
    branchId: 'IT',
    year: 3,
    semester: 6,
    category: 'Core',
    credits: 4,
    description: 'Cryptography (RSA, AES, Elliptic Curve), SHA hashing, digital certificates, firewall architectures, and penetration testing.',
    iconName: 'Lock',
    topics: [
      { id: 'it-security-t1', subjectId: 'it-security', unit: 1, title: 'Asymmetric Cryptography: RSA Algorithm', summary: 'Euler totient function, modular inverse computation, key generation, and public-key encryption.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['φ(n) = (p-1)*(q-1)', 'e*d ≡ 1 (mod φ(n))', 'Cipher c = m^e mod n'] }
    ]
  },

  // --- AI & ML SUBJECTS ---
  {
    id: 'aiml-dl',
    code: 'AI301',
    name: 'Deep Learning & Neural Architectures',
    branchId: 'AI_ML',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Multi-layer perceptrons, backpropagation mathematics, loss functions, CNN architectures (ResNet), and optimization (Adam).',
    iconName: 'Brain',
    topics: [
      { id: 'aiml-dl-t1', subjectId: 'aiml-dl', unit: 1, title: 'Backpropagation & Gradient Descent Math', summary: 'Chain rule derivations across computational graphs, vanishing/exploding gradients, Xavier initialization.', durationMins: 70, difficulty: 'Advanced', keyFormulas: ['∂L/∂w = ∂L/∂y * ∂y/∂z * ∂z/∂w', 'w = w - η * (m_t / (sqrt(v_t) + ε))'] }
    ]
  },
  {
    id: 'aiml-nlp',
    code: 'AI302',
    name: 'Natural Language Processing & Transformers',
    branchId: 'AI_ML',
    year: 3,
    semester: 6,
    category: 'Core',
    credits: 4,
    description: 'Word embeddings (Word2Vec, GloVe), Recurrent neural networks, Self-Attention mechanism, Transformer architecture, and LLMs.',
    iconName: 'MessageSquare',
    topics: [
      { id: 'aiml-nlp-t1', subjectId: 'aiml-nlp', unit: 1, title: 'Scaled Dot-Product Attention & Multi-Head Transformers', summary: 'Query, Key, Value projection matrices, scaling factor sqrt(dk), and softmax masking.', durationMins: 75, difficulty: 'Advanced', keyFormulas: ['Attention(Q,K,V) = softmax(Q·K^T / sqrt(d_k)) · V'] }
    ]
  },

  // --- AI & DS SUBJECTS ---
  {
    id: 'aids-bigdata',
    code: 'DS301',
    name: 'Big Data Analytics & Spark',
    branchId: 'AI_DS',
    year: 3,
    semester: 5,
    category: 'Core',
    credits: 4,
    description: 'Hadoop ecosystem, HDFS fault tolerance, Apache Spark RDDs and DataFrames, distributed shuffle operations, and stream processing.',
    iconName: 'BarChart3',
    topics: [
      { id: 'aids-bigdata-t1', subjectId: 'aids-bigdata', unit: 1, title: 'Spark RDD Transformations vs Actions', summary: 'Lazy evaluation, lineage graphs, narrow vs wide dependencies, caching strategies.', durationMins: 60, difficulty: 'Intermediate' }
    ]
  },
  {
    id: 'aids-stats',
    code: 'DS302',
    name: 'Statistical Inference & Predictive Modeling',
    branchId: 'AI_DS',
    year: 2,
    semester: 4,
    category: 'Core',
    credits: 4,
    description: 'Hypothesis testing, p-values, ANOVA, Maximum Likelihood Estimation, multivariate linear regression, and logistic regression.',
    iconName: 'TrendingUp',
    topics: [
      { id: 'aids-stats-t1', subjectId: 'aids-stats', unit: 1, title: 'Hypothesis Testing & Confidence Intervals', summary: 'Z-test vs t-test, Type I & Type II error trade-offs, p-value interpretation, and two-tailed rejection.', durationMins: 60, difficulty: 'Intermediate', keyFormulas: ['t = (x̄ - μ) / (s / sqrt(n))', 'CI = x̄ ± z*(s / sqrt(n))'] }
    ]
  }
];

export const ALL_NOTES: Note[] = [
  {
    id: 'note-cse-1',
    subjectId: 'cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    topicId: 'cse-dsa-t1',
    topicTitle: 'Asymptotic Analysis & Master Theorem',
    branchId: 'CSE',
    year: 2,
    semester: 3,
    title: 'Master Theorem Cheatsheet & Recurrence Relations',
    author: 'Prof. K. Venkatesh',
    authorCollege: 'IIT Madras',
    uploadedDate: '2 days ago',
    readTime: '8 min read',
    downloadsCount: 1420,
    tags: ['Algorithms', 'Time Complexity', 'Recursion', 'Master Theorem'],
    summary: 'A definitive study guide to solving divide-and-conquer recurrences with edge cases and proofs.',
    keyPoints: [
      'Identifies the 3 main cases of the Master Theorem: T(n) = aT(n/b) + f(n)',
      'Addresses non-polynomial gap situations where Master Theorem fails (requires Akra-Bazzi)',
      'Complete comparison table of common sorting and graph algorithmic complexities'
    ],
    contentMarkdown: `## 1. Master Theorem Formulation

The Master Theorem provides a cookbook solution in asymptotic terms (using Big-O notation) for recurrence relations of the form:

$$T(n) = a \\cdot T(n/b) + f(n)$$

Where:
- $n$ is the size of the problem.
- $a \\ge 1$ is the number of subproblems in the recursion.
- $b > 1$ is the factor by which the subproblem size is divided.
- $f(n)$ is the cost of the work done outside the recursive calls (dividing and combining).

---

### The Three Master Theorem Cases

We compare $f(n)$ with $n^{\\log_b a}$:

1. **Case 1 (Subproblem cost dominates)**:
   If $f(n) = O(n^{\\log_b a - \\epsilon})$ for some constant $\\epsilon > 0$:
   $$T(n) = \\Theta(n^{\\log_b a})$$

2. **Case 2 (Equal costs across tree levels)**:
   If $f(n) = \\Theta(n^{\\log_b a} \\cdot \\log^k n)$ where $k \\ge 0$:
   $$T(n) = \\Theta(n^{\\log_b a} \\cdot \\log^{k+1} n)$$

3. **Case 3 (Root combination cost dominates)**:
   If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ for some $\\epsilon > 0$, AND the regularity condition holds:
   $$a \\cdot f(n/b) \\le c \\cdot f(n) \\text{ for some } c < 1$$
   Then:
   $$T(n) = \\Theta(f(n))$$

---

### Classic Quick Examples:
- **Binary Search**: $T(n) = T(n/2) + O(1) \\implies a=1, b=2, \\log_2 1 = 0 \\implies T(n) = O(\\log n)$
- **Merge Sort**: $T(n) = 2T(n/2) + O(n) \\implies a=2, b=2, \\log_2 2 = 1 \\implies T(n) = O(n \\log n)$
- **Strassen Matrix Multiplication**: $T(n) = 7T(n/2) + O(n^2) \\implies n^{\\log_2 7} \\approx n^{2.807} \\implies T(n) = O(n^{2.81})$`
  },
  {
    id: 'note-cse-2',
    subjectId: 'cse-os',
    subjectName: 'Operating Systems',
    topicId: 'cse-os-t2',
    topicTitle: 'Process Synchronization & Deadlocks',
    branchId: 'CSE',
    year: 3,
    semester: 5,
    title: 'Banker\'s Algorithm & Deadlock Avoidance Complete Guide',
    author: 'Dr. Ramesh Sundaram',
    authorCollege: 'NIT Trichy',
    uploadedDate: '1 week ago',
    readTime: '12 min read',
    downloadsCount: 890,
    tags: ['Operating Systems', 'Deadlocks', 'Resource Allocation', 'Concurrency'],
    summary: 'Step-by-step matrix evaluation for safe state verification and request granting algorithms.',
    keyPoints: [
      'Four Coffman conditions necessary for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
      'Data structures: Available[m], Max[n][m], Allocation[n][m], Need[n][m]',
      'Safety test execution sequence with numerical problem walkthrough'
    ],
    contentMarkdown: `## 1. Coffman Conditions for Deadlocks

A deadlock can occur if and only if all four conditions hold simultaneously in a system:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process must currently hold at least one resource and request additional resources that are held by others.
3. **No Preemption**: Resources cannot be preempted; they are released only voluntarily.
4. **Circular Wait**: A closed chain of processes exists such that each process holds at least one resource needed by the next.

## 2. Banker's Algorithm Data Structures
Let $n$ be the number of processes and $m$ be the number of resource types:
- \`Available[m]\`: If \`Available[j] = k\`, there are $k$ instances of resource type $R_j$ available.
- \`Max[n][m]\`: Defines the maximum demand of each process.
- \`Allocation[n][m]\`: Defines the number of resources of each type currently allocated to each process.
- \`Need[n][m]\`: The remaining resource need of each process:
  $$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$$`
  },
  {
    id: 'note-ece-1',
    subjectId: 'ece-de',
    subjectName: 'Digital Electronics',
    topicId: 'ece-de-t1',
    topicTitle: 'K-Map Minimization & SOP/POS',
    branchId: 'ECE',
    year: 2,
    semester: 3,
    title: '4-Variable & 5-Variable K-Map Minimization Techniques',
    author: 'Prof. Ananya Sen',
    authorCollege: 'Jadavpur University',
    uploadedDate: '3 days ago',
    readTime: '10 min read',
    downloadsCount: 1120,
    tags: ['Digital Logic', 'Karnaugh Maps', 'Boolean Algebra', 'Hardware Design'],
    summary: 'Complete guide on grouping rules, don\'t-care conditions, and hazard elimination in digital circuits.',
    keyPoints: [
      'Gray code sequencing for adjacent row/column transitions (00, 01, 11, 10)',
      'Octet, quad, and pair grouping heuristics to maximize literal reduction',
      'Dealing with static-1 and static-0 timing hazards using redundant implicants'
    ],
    contentMarkdown: `## Karnaugh Map Minimization Fundamentals

A Karnaugh Map (K-Map) is a pictorial representation of a truth table used to simplify Boolean expressions without applying algebraic identities.

### Grouping Rules:
1. Groups must only contain 1s (for Sum of Products - SOP) or 0s (for Product of Sums - POS).
2. Groups must be powers of 2 (1, 2, 4, 8, 16 cells).
3. Groups may wrap around edges (top edge wraps with bottom; leftmost wraps with rightmost).
4. Always prioritize the largest possible group to eliminate the maximum number of literals:
   - A group of 2 eliminates 1 variable.
   - A group of 4 eliminates 2 variables.
   - A group of 8 eliminates 3 variables.`
  },
  {
    id: 'note-mech-1',
    subjectId: 'mech-thermo',
    subjectName: 'Engineering Thermodynamics',
    topicId: 'mech-thermo-t1',
    topicTitle: 'First Law for Open & Closed Systems',
    branchId: 'Mechanical',
    year: 2,
    semester: 3,
    title: 'Steady Flow Energy Equation (SFEE) Derivations & Applications',
    author: 'Dr. B. K. Mohapatra',
    authorCollege: 'IIT Kharagpur',
    uploadedDate: '5 days ago',
    readTime: '15 min read',
    downloadsCount: 740,
    tags: ['Thermodynamics', 'SFEE', 'Enthalpy', 'Thermal Engineering'],
    summary: 'Comprehensive derivation of energy balance for nozzles, diffusers, steam turbines, and throttling valves.',
    keyPoints: [
      'SFEE formula: h1 + v1^2/(2000) + g*z1/1000 + q = h2 + v2^2/(2000) + g*z2/1000 + w',
      'Isentropic expansion and calculation of nozzle exit velocity',
      'Joule-Thomson porous plug experiment and enthalpy invariance during throttling'
    ],
    contentMarkdown: `## Steady Flow Energy Equation (SFEE)

For an open control volume operating in steady-state conditions with uniform flow at inlet (1) and outlet (2):

$$h_1 + \\frac{v_1^2}{2000} + \\frac{g \\cdot z_1}{1000} + q = h_2 + \\frac{v_2^2}{2000} + \\frac{g \\cdot z_2}{1000} + w$$

### Application 1: Adiabatic Nozzle
- Work output: $w = 0$
- Heat transfer: $q = 0$
- Potential energy change: $\\Delta z \\approx 0$
- Inlet velocity: $v_1 \\ll v_2$

Exit velocity:
$$v_2 = \\sqrt{2000 \\cdot (h_1 - h_2)}$$`
  },
  {
    id: 'note-aiml-1',
    subjectId: 'aiml-dl',
    subjectName: 'Deep Learning & Neural Architectures',
    topicId: 'aiml-dl-t1',
    topicTitle: 'Backpropagation & Gradient Descent Math',
    branchId: 'AI_ML',
    year: 3,
    semester: 5,
    title: 'Mathematical Rigor of Backpropagation & Computational Graphs',
    author: 'Dr. Siddharth Mukherjee',
    authorCollege: 'IISc Bangalore',
    uploadedDate: '1 day ago',
    readTime: '14 min read',
    downloadsCount: 1650,
    tags: ['Deep Learning', 'Calculus', 'Backpropagation', 'Neural Networks'],
    summary: 'Vectorized Jacobian chain rule derivations, matrix calculus, and vanishing gradient remedies.',
    keyPoints: [
      'Layer-by-layer forward activation: z^[l] = W^[l] a^[l-1] + b^[l]',
      'Error delta vectors: δ^[l] = (W^[l+1]^T δ^[l+1]) ⊙ σ\'(z^[l])',
      'Modern optimizers comparison: SGD, Momentum, RMSprop, and Adam'
    ],
    contentMarkdown: `## Computational Graph & The Chain Rule

In deep neural networks, computing gradients analytically for each parameter matrix $W^{[l]}$ requires propagating error vectors backwards using the multivariate chain rule.

### Layer Equations:
$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
$$a^{[l]} = \\sigma(z^{[l]})$$

### Output Layer Gradients (Cross-Entropy with Softmax):
$$\\delta^{[L]} = a^{[L]} - y$$
$$\\frac{\\partial \\mathcal{L}}{\\partial W^{[L]}} = \\delta^{[L]} (a^{[L-1]})^T$$
$$\\frac{\\partial \\mathcal{L}}{\\partial b^{[L]}} = \\delta^{[L]}$$`
  }
];

export const PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = [
  {
    id: 'lang-c',
    name: 'C Programming',
    slug: 'c',
    category: 'System Programming',
    shortDesc: 'The mother of modern languages. Master pointers, memory allocation, and hardware-level interaction.',
    recommendedForBranches: ['ECE', 'EEE', 'Mechanical', 'CSE', 'IT'],
    color: '#3B82F6',
    version: 'C17 / C23',
    overview: 'C provides direct low-level memory access, a compact set of keywords, and clean structural style. It is the backbone of operating systems (Linux kernel), embedded microcontrollers, and graphics engines.',
    basicSyntax: {
      syntaxExplanation: 'Every C program begins at the `main()` entry function. Include headers like `<stdio.h>` for standard I/O routines.',
      starterCode: `#include <stdio.h>

int main() {
    int rollNumber = 42;
    float cgpa = 9.4;
    char grade = 'A';
    
    printf("StudySphere Student Details:\\n");
    printf("Roll: %d | CGPA: %.2f | Grade: %c\\n", rollNumber, cgpa, grade);
    
    return 0;
}`,
      sampleOutput: `StudySphere Student Details:\nRoll: 42 | CGPA: 9.40 | Grade: A`
    },
    concepts: [
      {
        id: 'c-concept-1',
        title: 'Pointers & Memory Addresses',
        explanation: 'A pointer stores the memory address of another variable. The address-of operator `&` retrieves an address, and dereference operator `*` accesses the value.',
        codeSnippet: `int num = 100;
int *ptr = &num; // ptr holds memory address of num
*ptr = 250;     // modifies num directly through the pointer`
      },
      {
        id: 'c-concept-2',
        title: 'Dynamic Memory Allocation (malloc, calloc, free)',
        explanation: 'Heap memory can be allocated at runtime. Always invoke `free()` to prevent memory leaks in embedded and systems development.',
        codeSnippet: `int *arr = (int*) malloc(5 * sizeof(int));
if (arr == NULL) { /* handle out of memory */ }
// perform operations
free(arr); // release memory block`
      }
    ],
    practiceQuestions: [
      {
        id: 'c-q1',
        title: 'Reverse a Linked List in C',
        difficulty: 'Medium',
        description: 'Given the head pointer of a singly linked list, reverse the node links in O(n) time and O(1) space.',
        starterCode: `struct Node* reverseList(struct Node* head) {\n    struct Node *prev = NULL, *curr = head, *next = NULL;\n    // Implement reversing pointers\n    return prev;\n}`,
        solutionCode: `struct Node* reverseList(struct Node* head) {
    struct Node *prev = NULL, *curr = head, *next = NULL;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
        expectedOutput: `Reversed list pointers verified.`,
        hints: ['Keep track of next node before overwriting curr->next.', 'Return prev as the new head.']
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between a pointer and an array in C?',
        answer: 'An array name acts as a constant pointer to its first element; it cannot be reassigned (e.g. arr = ptr is invalid). A pointer is a variable that can point to different memory addresses.',
        frequentlyAskedAt: ['Qualcomm', 'Texas Instruments', 'Cisco']
      },
      {
        question: 'What is a segmentation fault and what causes it?',
        answer: 'A segmentation fault (SIGSEGV) is a hardware-generated error when a program accesses a restricted memory area. Common causes: dereferencing NULL or dangling pointers, buffer overflows, and stack overflows.',
        frequentlyAskedAt: ['Intel', 'NVIDIA', 'AMD']
      }
    ]
  },
  {
    id: 'lang-cpp',
    name: 'C++',
    slug: 'cpp',
    category: 'High-Performance & OOP',
    shortDesc: 'Object-oriented performance power for Competitive Programming, Game Engines, and Robotics.',
    recommendedForBranches: ['CSE', 'ECE', 'AI_ML', 'IT', 'Mechanical'],
    color: '#6366F1',
    version: 'C++20',
    overview: 'C++ builds on C with classes, virtual inheritance, template metaprogramming, and the Standard Template Library (STL: vectors, maps, priority queues).',
    basicSyntax: {
      syntaxExplanation: 'Uses namespaces, classes, templates, and `std::cout` / `std::cin` streams from `<iostream>`.',
      starterCode: `#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> scores = {92, 88, 95, 100};
    int total = std::accumulate(scores.begin(), scores.end(), 0);
    
    std::cout << "Class average: " << (float)total / scores.size() << std::endl;
    return 0;
}`,
      sampleOutput: `Class average: 93.75`
    },
    concepts: [
      {
        id: 'cpp-concept-1',
        title: 'STL Containers: Vectors & Unordered Maps',
        explanation: 'Standard Template Library provides pre-built, highly optimized data structures with O(1) hash table lookups and dynamic arrays.',
        codeSnippet: `#include <unordered_map>
std::unordered_map<std::string, int> freq;
freq["sem5"] = 6;`
      },
      {
        id: 'cpp-concept-2',
        title: 'Polymorphism & Virtual Functions',
        explanation: 'Enables dynamic dispatch at runtime using virtual method tables (vtables).',
        codeSnippet: `class EngineeringBranch {
public:
    virtual void studyCore() = 0; // Pure virtual function
};`
      }
    ],
    practiceQuestions: [
      {
        id: 'cpp-q1',
        title: 'Two Sum using Hash Map',
        difficulty: 'Easy',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(n) time.',
        starterCode: `std::vector<int> twoSum(std::vector<int>& nums, int target) {\n    // Write O(n) solution using std::unordered_map\n}`,
        solutionCode: `std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
        expectedOutput: `[0, 1] for nums=[2,7,11,15], target=9`,
        hints: ['Store the complement = target - current element in a hash map as you iterate.']
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain RAII (Resource Acquisition Is Initialization) in C++.',
        answer: 'RAII binds the lifecycle of resources (heap memory, file handles, mutex locks) to the lifetime of stack objects. When the object goes out of scope, its destructor is automatically called, preventing resource leaks.',
        frequentlyAskedAt: ['Google', 'Microsoft', 'Bloomberg']
      }
    ]
  },
  {
    id: 'lang-java',
    name: 'Java',
    slug: 'java',
    category: 'Enterprise & Android',
    shortDesc: 'Platform-independent, robust OOP standard powering enterprise backends and Android systems.',
    recommendedForBranches: ['CSE', 'IT', 'AI_DS'],
    color: '#EA580C',
    version: 'Java 21 LTS',
    overview: 'Write once, run anywhere (WORA) via the JVM bytecode engine. Features strong type checking, automated garbage collection, and rich multithreading concurrency packages.',
    basicSyntax: {
      syntaxExplanation: 'All code resides inside a class. Uses static methods and JVM packaging.',
      starterCode: `public class StudySphere {
    public static void main(String[] args) {
        String student = "Priya";
        int semester = 3;
        System.out.println("Welcome, " + student + "! Enrolled in Semester " + semester);
    }
}`,
      sampleOutput: `Welcome, Priya! Enrolled in Semester 3`
    },
    concepts: [
      {
        id: 'java-c1',
        title: 'JVM Memory Model (Heap vs Stack)',
        explanation: 'Stack holds method frames, local primitives, and object references. Heap holds instantiated objects managed by the Garbage Collector.',
        codeSnippet: `Student s1 = new Student(); // 's1' reference in stack, instance in heap`
      }
    ],
    practiceQuestions: [
      {
        id: 'java-q1',
        title: 'Check for Valid Palindrome',
        difficulty: 'Easy',
        description: 'Verify if a string is a palindrome ignoring case and non-alphanumeric characters.',
        starterCode: `public boolean isPalindrome(String s) {\n    // Two-pointer approach\n    return true;\n}`,
        solutionCode: `public boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
        while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
        if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;
        i++; j--;
    }
    return true;
}`,
        expectedOutput: `true for 'A man, a plan, a canal: Panama'`,
        hints: ['Use Character.isLetterOrDigit() and skip invalid characters from left and right.']
      }
    ],
    interviewQuestions: [
      {
        question: 'Why is Java not considered 100% Object-Oriented?',
        answer: 'Because Java supports primitive data types (int, float, char, boolean, double, byte, short, long) which are not objects.',
        frequentlyAskedAt: ['Amazon', 'Oracle', 'Infosys']
      }
    ]
  },
  {
    id: 'lang-python',
    name: 'Python',
    slug: 'python',
    category: 'AI / Data Science & Scripting',
    shortDesc: 'The lingua franca of Artificial Intelligence, Data Science, automation, and rapid prototyping.',
    recommendedForBranches: ['AI_ML', 'AI_DS', 'CSE', 'ECE', 'Mechanical', 'Civil', 'EEE'],
    color: '#0284C7',
    version: 'Python 3.12',
    overview: 'High-level, dynamically typed language with readable indentation-based syntax. Boasts the richest scientific ecosystem: NumPy, Pandas, PyTorch, Scikit-Learn, and FastAPI.',
    basicSyntax: {
      syntaxExplanation: 'Uses clean indentation blocks instead of curly braces. Supports list comprehensions and native dictionary maps.',
      starterCode: `branch_subjects = {
    "CSE": ["DSA", "DBMS", "OS"],
    "ECE": ["Digital Electronics", "VLSI", "Signals"],
    "AI_ML": ["Deep Learning", "NLP", "Transformers"]
}

for branch, subjects in branch_subjects.items():
    print(f"{branch} has {len(subjects)} core subjects logged.")`,
      sampleOutput: `CSE has 3 core subjects logged.\nECE has 3 core subjects logged.\nAI_ML has 3 core subjects logged.`
    },
    concepts: [
      {
        id: 'py-c1',
        title: 'List Comprehensions & Generator Expressions',
        explanation: 'Concise expressions to create new sequences from existing iterables without verbose loops.',
        codeSnippet: `squares = [x**2 for x in range(10) if x % 2 == 0]
# Generates [0, 4, 16, 36, 64]`
      },
      {
        id: 'py-c2',
        title: 'Vectorized Operations with NumPy',
        explanation: 'SIMD-accelerated array computing avoiding Python bytecode loop overhead.',
        codeSnippet: `import numpy as np
arr = np.array([1, 2, 3, 4])
normalized = (arr - arr.mean()) / arr.std()`
      }
    ],
    practiceQuestions: [
      {
        id: 'py-q1',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        description: 'Find the length of the longest substring without duplicate characters using sliding window.',
        starterCode: `def lengthOfLongestSubstring(s: str) -> int:\n    # Implement sliding window\n    pass`,
        solutionCode: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
        expectedOutput: `3 for 'abcabcbb'`,
        hints: ['Keep a dictionary of {character: last_seen_index} and slide the left window pointer.']
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the Python GIL (Global Interpreter Lock)?',
        answer: 'The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecodes simultaneously. It simplifies memory management but limits CPU-bound multi-threaded parallelism (multiprocessing or native C extensions bypass it).',
        frequentlyAskedAt: ['Uber', 'Meta', 'Stripe']
      }
    ]
  },
  {
    id: 'lang-javascript',
    name: 'JavaScript',
    slug: 'javascript',
    category: 'Web & Full Stack',
    shortDesc: 'The ubiquitous language of the web. Powers dynamic browser user interfaces and Node.js servers.',
    recommendedForBranches: ['CSE', 'IT', 'AI_DS'],
    color: '#F59E0B',
    version: 'ES2024',
    overview: 'Asynchronous event-driven language with prototypal inheritance. The bedrock of React, Vue, Next.js, and server-side runtimes like Node.js and Bun.',
    basicSyntax: {
      syntaxExplanation: 'Uses `const` / `let` variable declarations, arrow functions `() => {}`, and template literals.',
      starterCode: `const portal = {
  name: "StudySphere",
  branches: 8,
  activeLearners: 12400
};

const message = \`\${portal.name} is active for \${portal.branches} branches with \${portal.activeLearners.toLocaleString()} students!\`;
console.log(message);`,
      sampleOutput: `StudySphere is active for 8 branches with 12,400 students!`
    },
    concepts: [
      {
        id: 'js-c1',
        title: 'Event Loop & Promises',
        explanation: 'JavaScript runs on a single main thread. Asynchronous operations are delegated and queued in the Microtask (Promises) and Macrotask (setTimeout) queues.',
        codeSnippet: `fetch('/api/subjects')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`
      }
    ],
    practiceQuestions: [
      {
        id: 'js-q1',
        title: 'Custom Debounce Function',
        difficulty: 'Medium',
        description: 'Implement a debounce function that delays invoking func until after wait milliseconds have elapsed.',
        starterCode: `function debounce(fn, delay) {\n  // Return wrapped debounced function\n}`,
        solutionCode: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
        expectedOutput: `Debounced invocation after delay`,
        hints: ['Store a timer ID in closure scope and clear it whenever a new call arrives.']
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the difference between == and ===.',
        answer: '== performs type coercion before comparison (e.g. 5 == "5" is true), whereas === checks both value and type strictly without coercion (5 === "5" is false).',
        frequentlyAskedAt: ['Adobe', 'Paytm', 'Atlassian']
      }
    ]
  },
  {
    id: 'lang-sql',
    name: 'SQL',
    slug: 'sql',
    category: 'Databases & Querying',
    shortDesc: 'Declarative standard for creating, querying, joining, and manipulating relational databases.',
    recommendedForBranches: ['CSE', 'IT', 'AI_DS', 'AI_ML', 'ECE'],
    color: '#059669',
    version: 'ANSI SQL / PostgreSQL',
    overview: 'Used to store, retrieve, and analyze structured data. Essential for backend services, business intelligence, and data pipeline ETL engineering.',
    basicSyntax: {
      syntaxExplanation: 'Uses declarative clauses: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY.',
      starterCode: `SELECT 
    b.branch_name, 
    COUNT(s.student_id) AS total_students,
    ROUND(AVG(s.gpa), 2) AS average_gpa
FROM students s
JOIN branches b ON s.branch_id = b.id
GROUP BY b.branch_name
HAVING COUNT(s.student_id) > 10
ORDER BY average_gpa DESC;`,
      sampleOutput: `branch_name | total_students | average_gpa\n------------+----------------+------------\nCSE         | 240            | 8.92\nAI & ML     | 120            | 8.85\nECE         | 180            | 8.74`
    },
    concepts: [
      {
        id: 'sql-c1',
        title: 'Window Functions (ROW_NUMBER, DENSE_RANK)',
        explanation: 'Performs calculations across a set of table rows related to the current row without collapsing them into a single row like GROUP BY.',
        codeSnippet: `SELECT student_name, branch, marks,
DENSE_RANK() OVER (PARTITION BY branch ORDER BY marks DESC) as rank
FROM exam_results;`
      }
    ],
    practiceQuestions: [
      {
        id: 'sql-q1',
        title: 'Find Second Highest Salary',
        difficulty: 'Easy',
        description: 'Write a SQL query to get the second highest salary from the Employee table.',
        starterCode: `SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE ...;`,
        solutionCode: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
        expectedOutput: `SecondHighestSalary: 95000`,
        hints: ['Use a subquery to filter out the overall maximum salary.']
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between WHERE and HAVING in SQL?',
        answer: 'WHERE filters rows before any groupings are applied. HAVING filters grouped rows after aggregation functions (SUM, AVG, COUNT) have been executed.',
        frequentlyAskedAt: ['Amazon', 'Microsoft', 'Snowflake']
      }
    ]
  },
  {
    id: 'lang-html',
    name: 'HTML5',
    slug: 'html',
    category: 'Web Structure',
    shortDesc: 'The structural skeleton of the World Wide Web with semantic tags and multimedia capabilities.',
    recommendedForBranches: ['CSE', 'IT'],
    color: '#E11D48',
    version: 'HTML5 Living Standard',
    overview: 'Defines the structural architecture and semantics of web documents. Modern HTML5 features native audio/video, canvas graphics, and accessibility landmarks.',
    basicSyntax: {
      syntaxExplanation: 'Uses paired tags `<tagname>...</tagname>` and semantic containers `<header>`, `<main>`, `<article>`.',
      starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>StudySphere Subject Portal</title>
</head>
<body>
  <main>
    <article>
      <h1>Engineering Curricula</h1>
      <p>Study notes, doubt clearing, and previous exam papers.</p>
    </article>
  </main>
</body>
</html>`,
      sampleOutput: `Document rendered with clean semantic hierarchy.`
    },
    concepts: [
      {
        id: 'html-c1',
        title: 'Semantic Markup & Accessibility (a11y)',
        explanation: 'Using tags like `<nav>`, `<aside>`, `<section>`, and ARIA attributes ensures screen readers and search engines parse content accurately.',
        codeSnippet: `<nav aria-label="Engineering Branch Navigation">
  <ul>
    <li><a href="/cse">CSE</a></li>
  </ul>
</nav>`
      }
    ],
    practiceQuestions: [
      {
        id: 'html-q1',
        title: 'Accessible Form Markup',
        difficulty: 'Easy',
        description: 'Create an accessible login form markup with appropriate labels, inputs, and aria-describedby.',
        starterCode: `<form>\n  <!-- Add accessible label and input -->\n</form>`,
        solutionCode: `<form>
  <label for="studentEmail">College Email</label>
  <input type="email" id="studentEmail" required aria-required="true" />
  <button type="submit">Access Portal</button>
</form>`,
        expectedOutput: `Accessible form markup created`,
        hints: ['Ensure the input id matches the label for attribute.']
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between localStorage, sessionStorage, and cookies?',
        answer: 'localStorage persists until explicitly cleared (up to 5-10MB). sessionStorage lasts only for the duration of the browser tab. Cookies are smaller (~4KB) and sent with every HTTP request to the server.',
        frequentlyAskedAt: ['Flipkart', 'Swiggy', 'Zomato']
      }
    ]
  },
  {
    id: 'lang-css',
    name: 'CSS3',
    slug: 'css',
    category: 'Web Presentation & Styling',
    shortDesc: 'Styling, layout orchestration (Flexbox, CSS Grid), animations, and responsive styling.',
    recommendedForBranches: ['CSE', 'IT'],
    color: '#7C3AED',
    version: 'CSS3 / CSS Modern Spec',
    overview: 'Styles web presentations. Master modern CSS Grid, Flexbox, custom properties (CSS variables), container queries, and hardware-accelerated transitions.',
    basicSyntax: {
      syntaxExplanation: 'Uses selectors followed by declaration blocks of `property: value;`.',
      starterCode: `:root {
  --primary-brand: #4f46e5;
  --surface-card: #ffffff;
}

.dashboard-card {
  background-color: var(--surface-card);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dashboard-card:hover {
  transform: translateY(-2px);
}`,
      sampleOutput: `Card styled with responsive elevation and smooth transition.`
    },
    concepts: [
      {
        id: 'css-c1',
        title: 'CSS Grid vs Flexbox',
        explanation: 'Flexbox is designed for 1-dimensional layouts (rows OR columns). CSS Grid is a 2-dimensional system managing both rows AND columns simultaneously.',
        codeSnippet: `.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`
      }
    ],
    practiceQuestions: [
      {
        id: 'css-q1',
        title: 'Center a Div Horizontally & Vertically',
        difficulty: 'Easy',
        description: 'Provide modern 2-line CSS to perfectly center child content in a container.',
        starterCode: `.container {\n  /* Your 2-line solution */\n}`,
        solutionCode: `.container {
  display: grid;
  place-items: center;
}`,
        expectedOutput: `Centered layout verified`,
        hints: ['Use display: grid and place-items: center.']
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the CSS Box Model and how box-sizing: border-box alters it.',
        answer: 'The Box Model consists of content, padding, border, and margin. By default (content-box), width specifies only content width, so padding and borders add to total size. With border-box, padding and border are included within the declared width.',
        frequentlyAskedAt: ['LinkedIn', 'Razorpay', 'Intuit']
      }
    ]
  }
];

export const INITIAL_DOUBTS: Doubt[] = [
  {
    id: 'doubt-1',
    title: 'Why does Dijkstra’s algorithm fail with negative weight cycles?',
    question: 'I understand Dijkstra calculates the shortest path using a greedy choice with a min-heap. But in our class test, a question asked why it produces wrong distances if negative edge weights exist (even without negative cycles). Can someone explain with a concrete 3-node graph?',
    subjectId: 'cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Graph Traversals & Shortest Paths',
    branchId: 'CSE',
    studentId: 'st-01',
    studentName: 'Varun Teja',
    studentBranch: 'CSE',
    studentCollege: 'NIT Warangal',
    studentAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Varun',
    createdAt: '4 hours ago',
    upvotes: 24,
    isResolved: true,
    tags: ['Algorithms', 'Graphs', 'Dijkstra', 'Greedy'],
    codeSnippet: `// Graph example:
// A -> B (weight: 3)
// A -> C (weight: 5)
// B -> C (weight: -4)
// Starting at node A`,
    answers: [
      {
        id: 'ans-1-1',
        doubtId: 'doubt-1',
        authorId: 'auth-ta-1',
        authorName: 'Sanjay Krishnan',
        authorRole: 'Teaching Assistant',
        authorBranch: 'CSE',
        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sanjay',
        answerText: 'Great question! Dijkstra relies on a greedy invariant: once a node is extracted from the priority queue (marked as "visited"), its shortest distance from the source is finalized and will NEVER decrease.\n\nTake your exact example:\n1. Start at A: dist[A]=0, dist[B]=3, dist[C]=5.\n2. Extract B (smallest distance = 3). Relax outgoing edges from B: edge B->C with weight -4 gives new distance to C = 3 + (-4) = -1.\n3. But what if C was visited FIRST because weights were arranged differently? If an edge with a negative weight comes LATER, Dijkstra will never re-evaluate already finalized nodes. That is why Bellman-Ford (which relaxes all edges V-1 times) is mandatory for negative edges.',
        createdAt: '3 hours ago',
        upvotes: 38,
        isBestAnswer: true
      },
      {
        id: 'ans-1-2',
        doubtId: 'doubt-1',
        authorId: 'auth-st-2',
        authorName: 'Megha Sen',
        authorRole: 'Peer Mentor',
        authorBranch: 'CSE',
        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Megha',
        answerText: 'Adding to Sanjay\'s answer: Even adding a constant C to all edge weights to make them positive does NOT fix Dijkstra, because paths with more edges get penalized more than paths with fewer edges!',
        createdAt: '1 hour ago',
        upvotes: 12,
        isBestAnswer: false
      }
    ]
  },
  {
    id: 'doubt-2',
    title: 'How does race-around condition occur in JK flip-flop and how to resolve it?',
    question: 'When J=1 and K=1 with clock pulse high, the output keeps toggling repeatedly. Why does this happen when the propagation delay of the flip-flop is less than the clock pulse width? Also, why is Master-Slave the primary solution?',
    subjectId: 'ece-de',
    subjectName: 'Digital Electronics',
    topic: 'Sequential Circuits: Flip-Flops & FSMs',
    branchId: 'ECE',
    studentId: 'st-02',
    studentName: 'Divya Sree',
    studentBranch: 'ECE',
    studentCollege: 'IIT Roorkee',
    studentAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Divya',
    createdAt: '1 day ago',
    upvotes: 19,
    isResolved: true,
    tags: ['Digital Electronics', 'Flip Flop', 'Hardware', 'Sequential Logic'],
    answers: [
      {
        id: 'ans-2-1',
        doubtId: 'doubt-2',
        authorId: 'auth-prof-1',
        authorName: 'Dr. Radhakrishnan',
        authorRole: 'Faculty',
        authorBranch: 'ECE',
        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Radhakrishnan',
        answerText: 'Condition for Race-Around: tp < tpw (where tp is gate propagation delay and tpw is clock pulse width).\n\nWhen J=1 and K=1, output Q toggles to Q\'. But since the clock pulse is STILL high, this new Q\' feeds right back to the inputs, toggling back to Q within time tp. This causes unpredictable multiple oscillations during a single clock pulse!\n\nSolutions:\n1. Keep tpw < tp (difficult to fabricate reliably).\n2. Master-Slave JK Flip-Flop: The Master triggers on the positive edge while the Slave triggers on the inverted negative edge. Because both are never enabled simultaneously, race-around is eliminated.\n3. Edge-triggered flip-flops using RC differentiating circuits.',
        createdAt: '22 hours ago',
        upvotes: 27,
        isBestAnswer: true
      }
    ]
  },
  {
    id: 'doubt-3',
    title: 'Why do we use steady flow energy equation instead of first law for closed systems in steam turbines?',
    question: 'In thermodynamics, when analyzing a turbine, why can’t we just use dQ = dU + dW? What is the physical meaning of flow work (P*v) in the enthalpy term?',
    subjectId: 'mech-thermo',
    subjectName: 'Engineering Thermodynamics',
    topic: 'First Law for Open & Closed Systems',
    branchId: 'Mechanical',
    studentId: 'st-03',
    studentName: 'Karthik Menon',
    studentBranch: 'Mechanical',
    studentCollege: 'NIT Calicut',
    studentAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Karthik',
    createdAt: '2 days ago',
    upvotes: 15,
    isResolved: false,
    tags: ['Thermodynamics', 'Enthalpy', 'Open Systems', 'Steam Turbines'],
    answers: [
      {
        id: 'ans-3-1',
        doubtId: 'doubt-3',
        authorId: 'auth-st-4',
        authorName: 'Aditya Verma',
        authorRole: 'Student',
        authorBranch: 'Mechanical',
        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aditya',
        answerText: 'In a closed system, no mass crosses the boundary, so only internal energy (U) changes. In an open system like a steam turbine, fluid is continuously entering and leaving. The fluid behind has to do work to push the fluid element into the control volume against existing pressure. That pushing work per unit mass is P*v (Flow Work). When you combine internal energy and flow work: H = U + P*v, giving the enthalpy term in SFEE!',
        createdAt: '1 day ago',
        upvotes: 14,
        isBestAnswer: false
      }
    ]
  }
];

export const PREVIOUS_PAPERS: PreviousPaper[] = [
  {
    id: 'paper-cse-1',
    subjectId: 'cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    branchId: 'CSE',
    year: 2,
    semester: 3,
    examType: 'End-Semester University Exam',
    academicYear: '2025-2026',
    universityName: 'Apex Technological University',
    durationHours: 3,
    totalMarks: 100,
    solutionAvailable: true,
    downloadCount: 3840,
    questions: [
      { section: 'Part A (Compulsory)', questionNumber: '1(a)', questionText: 'State the Master Theorem and determine the complexity of T(n) = 4T(n/2) + n^2.', marks: 4, topic: 'Master Theorem' },
      { section: 'Part A (Compulsory)', questionNumber: '1(b)', questionText: 'Differentiate between B-Tree and B+ Tree indexing with diagrams.', marks: 4, topic: 'Trees' },
      { section: 'Part A (Compulsory)', questionNumber: '1(c)', questionText: 'Explain the working of topological sort on Directed Acyclic Graphs (DAG).', marks: 4, topic: 'Graphs' },
      { section: 'Part B', questionNumber: '2(a)', questionText: 'Construct an AVL tree by inserting the sequence: 45, 12, 67, 34, 89, 23, 56. Show every rotation step explicitly.', marks: 12, topic: 'AVL Trees' },
      { section: 'Part B', questionNumber: '2(b)', questionText: 'Write Dijkstra algorithm in pseudocode and trace it on the provided 6-node weighted graph.', marks: 16, topic: 'Shortest Path' }
    ]
  },
  {
    id: 'paper-cse-2',
    subjectId: 'cse-os',
    subjectName: 'Operating Systems',
    branchId: 'CSE',
    year: 3,
    semester: 5,
    examType: 'Mid-Term 1',
    academicYear: '2025-2026',
    universityName: 'Apex Technological University',
    durationHours: 1.5,
    totalMarks: 50,
    solutionAvailable: true,
    downloadCount: 2190,
    questions: [
      { section: 'Section 1', questionNumber: '1', questionText: 'Consider 4 processes with burst times (P1: 6ms, P2: 8ms, P3: 7ms, P4: 3ms). Compute average waiting time under Round Robin with quantum = 4ms.', marks: 15, topic: 'CPU Scheduling' },
      { section: 'Section 2', questionNumber: '2', questionText: 'Write the safety algorithm of Banker’s deadlock avoidance and evaluate the given 5-process allocation matrix.', marks: 20, topic: 'Deadlocks' }
    ]
  },
  {
    id: 'paper-ece-1',
    subjectId: 'ece-de',
    subjectName: 'Digital Electronics',
    branchId: 'ECE',
    year: 2,
    semester: 3,
    examType: 'End-Semester University Exam',
    academicYear: '2025-2026',
    universityName: 'Apex Technological University',
    durationHours: 3,
    totalMarks: 100,
    solutionAvailable: true,
    downloadCount: 2950,
    questions: [
      { section: 'Part A', questionNumber: '1', questionText: 'Simplify the Boolean function F(A, B, C, D) = ∑m(0, 2, 5, 7, 8, 10, 13, 15) using 4-variable K-Map.', marks: 10, topic: 'K-Map' },
      { section: 'Part B', questionNumber: '2', questionText: 'Design a Synchronous MOD-10 Decade Up-Counter using J-K Flip Flops. Draw state transition table and excitation equations.', marks: 20, topic: 'Counters' }
    ]
  },
  {
    id: 'paper-mech-1',
    subjectId: 'mech-thermo',
    subjectName: 'Engineering Thermodynamics',
    branchId: 'Mechanical',
    year: 2,
    semester: 3,
    examType: 'End-Semester University Exam',
    academicYear: '2025-2026',
    universityName: 'Apex Technological University',
    durationHours: 3,
    totalMarks: 100,
    solutionAvailable: true,
    downloadCount: 1870,
    questions: [
      { section: 'Part A', questionNumber: '1', questionText: 'Derive the Steady Flow Energy Equation (SFEE) from first principles and reduce it for an adiabatic steam turbine.', marks: 15, topic: 'SFEE' },
      { section: 'Part B', questionNumber: '2', questionText: 'An air-standard Otto cycle has a compression ratio of 8. Determine thermal efficiency and mean effective pressure with peak cycle temperature 1800K.', marks: 20, topic: 'Air Standard Cycles' }
    ]
  },
  {
    id: 'paper-aiml-1',
    subjectId: 'aiml-dl',
    subjectName: 'Deep Learning & Neural Architectures',
    branchId: 'AI_ML',
    year: 3,
    semester: 5,
    examType: 'End-Semester University Exam',
    academicYear: '2025-2026',
    universityName: 'Apex Technological University',
    durationHours: 3,
    totalMarks: 100,
    solutionAvailable: true,
    downloadCount: 3100,
    questions: [
      { section: 'Section A', questionNumber: '1', questionText: 'Derive the backpropagation weight update equation for a 2-layer MLP using cross-entropy loss and sigmoid activation.', marks: 15, topic: 'Backprop' },
      { section: 'Section B', questionNumber: '2', questionText: 'Explain the internal architecture of residual blocks in ResNet. How do skip connections solve vanishing gradients?', marks: 20, topic: 'CNN & ResNet' }
    ]
  }
];

export const PROJECT_IDEAS: ProjectIdea[] = [
  // --- CSE PROJECTS ---
  {
    id: 'proj-cse-1',
    title: 'Distributed In-Memory Key-Value Store with Raft Consensus',
    branchId: 'CSE',
    difficulty: 'Advanced',
    domain: 'Distributed Systems & Systems Programming',
    summary: 'A fault-tolerant distributed cache mimicking Redis, utilizing the Raft consensus protocol for leader election, log replication, and zero data loss on node crashes.',
    techStack: ['C++20 / Go', 'gRPC', 'Protocol Buffers', 'CMake'],
    keyFeatures: [
      'Heartbeat leader election with randomized election timeouts',
      'Log compaction and snapshotting to disk',
      'Linearizable read and write operations across cluster partitions'
    ],
    learningOutcomes: ['Deep grasp of consensus algorithms', 'Asynchronous networking with gRPC', 'Thread concurrency safety'],
    estimatedWeeks: 6,
    architectureNotes: '3 to 5 cluster nodes communicating via RPC with persistent WAL (Write-Ahead Logging).'
  },
  {
    id: 'proj-cse-2',
    title: 'Intelligent Campus Room & Resource Booking System',
    branchId: 'CSE',
    difficulty: 'Intermediate',
    domain: 'Full-Stack Web & Databases',
    summary: 'A real-time scheduling portal for engineering college labs, seminar halls, and project rooms with automated conflict resolution and role-based permissions.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    keyFeatures: [
      'Interactive visual slot calendar with instantaneous conflict detection',
      'Faculty approval workflows and automated email alerts',
      'RFID badge check-in validation interface'
    ],
    learningOutcomes: ['Relational transactions & database locking', 'JWT role-based access control (RBAC)', 'Component UI state management'],
    estimatedWeeks: 4,
    architectureNotes: 'PostgreSQL row-level locking on reservations with RESTful backend routes.'
  },
  {
    id: 'proj-cse-3',
    title: 'CLI Memory Leak & Syntax Profiler',
    branchId: 'CSE',
    difficulty: 'Beginner',
    domain: 'Developer Tools',
    summary: 'A command-line utility that inspects C source files for unclosed file pointers and missing free() calls using static AST parsing.',
    techStack: ['Python', 'Regular Expressions / AST', 'Rich CLI'],
    keyFeatures: [
      'Color-coded terminal report with line numbers and violation severity',
      'Auto-fix suggestions for forgotten fclose() and free() invocations'
    ],
    learningOutcomes: ['Lexical analysis basics', 'CLI application design in Python'],
    estimatedWeeks: 2,
    architectureNotes: 'Tokenizes C source code into an abstract syntax sequence and maintains allocation stack tracking.'
  },

  // --- ECE PROJECTS ---
  {
    id: 'proj-ece-1',
    title: 'FPGA-Based RISC-V 32-Bit Pipelined Processor Core',
    branchId: 'ECE',
    difficulty: 'Advanced',
    domain: 'VLSI & Computer Architecture',
    summary: 'Design and synthesize a 5-stage pipelined RV32I processor on a Xilinx Artix-7 FPGA with data forwarding and branch hazard prediction.',
    techStack: ['Verilog HDL', 'Vivado', 'ModelSim', 'RISC-V Toolchain'],
    hardwareRequired: ['Basys 3 or Nexys A7 FPGA Board', 'USB-JTAG Cable'],
    keyFeatures: [
      'Hazard detection unit with stall insertion and data forwarding paths',
      'UART communication interface for sending execution results to PC terminal',
      'Executes compiled C programs via cross-compiler'
    ],
    learningOutcomes: ['Pipeline hazard mitigation in silicon', 'Timing constraint analysis', 'FPGA bitstream generation'],
    estimatedWeeks: 8,
    architectureNotes: 'Classic IF, ID, EX, MEM, WB five-stage microarchitecture synthesized at 50 MHz.'
  },
  {
    id: 'proj-ece-2',
    title: 'Smart Edge IoT Patient Health Telemetry Monitor',
    branchId: 'ECE',
    difficulty: 'Intermediate',
    domain: 'Embedded Systems & IoT',
    summary: 'A wearable wrist node with ESP32 tracking SpO2, heart rate, and body temperature with MQTT transmission to local hospital dashboard.',
    techStack: ['C / Embedded C', 'ESP-IDF', 'FreeRTOS', 'MQTT'],
    hardwareRequired: ['ESP32 Dev Module', 'MAX30102 Pulse Oximeter Sensor', 'MLX90614 Temp Sensor', 'OLED 0.96 inch'],
    keyFeatures: [
      'Real-time photoplethysmogram (PPG) waveform rendering on I2C OLED',
      'Low-power deep sleep state with timer wakeups',
      'Emergency threshold buzzer alarm and cellular SMS dispatch'
    ],
    learningOutcomes: ['I2C and SPI peripheral protocols', 'Real-time operating system task scheduling', 'Low-power battery profiling'],
    estimatedWeeks: 4,
    architectureNotes: 'FreeRTOS queue decoupling sensor sampling task from network transmission task.'
  },

  // --- MECHANICAL PROJECTS ---
  {
    id: 'proj-mech-1',
    title: 'Autonomous Solar-Powered Quadruped Inspection Robot',
    branchId: 'Mechanical',
    difficulty: 'Advanced',
    domain: 'Robotics & Mechanical Kinematics',
    summary: 'Design, kinematic linkage optimization, and 3D printing of a 4-legged walking robot capable of traversing uneven industrial terrain.',
    techStack: ['SolidWorks / Fusion 360', 'Python Kinematics', 'ANSYS Mechanical', 'Arduino/ROS'],
    hardwareRequired: ['12x High Torque Metal Gear Servos', 'Carbon Fiber Chassis', 'Solar Battery Unit'],
    keyFeatures: [
      'Inverse kinematics calculation for smooth trot and crawl gaits',
      'Stress and deflection analysis on servo brackets under static and dynamic shock',
      'Solar tracking panel mechanism for continuous battery trickle charging'
    ],
    learningOutcomes: ['Dynamic link load analysis', 'SolidWorks FEA stress validation', 'Leg inverse kinematics'],
    estimatedWeeks: 7,
    architectureNotes: 'Linkages optimized for maximum payload to self-weight ratio using aluminum-carbon composites.'
  },
  {
    id: 'proj-mech-2',
    title: 'Computational Fluid Dynamics (CFD) Analysis of Airfoil Vortex Generators',
    branchId: 'Mechanical',
    difficulty: 'Intermediate',
    domain: 'Fluid Dynamics & Aerodynamics',
    summary: 'Simulation study comparing NACA 2412 airfoil lift-to-drag ratios with and without passive micro-vortex generators across stall angles.',
    techStack: ['ANSYS Fluent', 'SolidWorks Flow', 'Python Matplotlib'],
    keyFeatures: [
      'Structured mesh generation with boundary layer prism inflation layers',
      'k-omega SST turbulence model validation against NASA wind tunnel data',
      'Pressure contour and velocity vector visualizations at high angles of attack'
    ],
    learningOutcomes: ['Mesh convergence studies', 'Navier-Stokes discretization in Fluent', 'Boundary layer separation physics'],
    estimatedWeeks: 3,
    architectureNotes: 'Mesh refinement at trailing edge and vortex generator tip with y+ < 1.'
  },

  // --- AI & ML PROJECTS ---
  {
    id: 'proj-aiml-1',
    title: 'Multimodal Medical Radiology Report Generator from X-Rays',
    branchId: 'AI_ML',
    difficulty: 'Advanced',
    domain: 'Computer Vision & Natural Language Generation',
    summary: 'A vision-language system that takes chest X-ray DICOM images, identifies pathologies with a Swin Transformer backbone, and outputs clinical diagnostic summaries.',
    techStack: ['PyTorch', 'Hugging Face Transformers', 'FastAPI', 'CUDA'],
    keyFeatures: [
      'Grad-CAM heatmaps highlighting pulmonary nodules and consolidation zones',
      'Beam search generation conditioned on cross-attention medical tokens',
      'BLEU, ROUGE, and clinical fact-checking CheXbert metric evaluations'
    ],
    learningOutcomes: ['Vision-Language cross-modal alignment', 'Fine-tuning transformer decoders', 'Medical image preprocessing'],
    estimatedWeeks: 6,
    architectureNotes: 'Swin-B visual encoder mapped through projection layers into a quantized LLaMA / Mistral text decoder.'
  }
];

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res-1',
    title: 'MIT 6.006: Introduction to Algorithms (Spring Full Course)',
    type: 'Video Lecture',
    subjectId: 'cse-dsa',
    subjectName: 'Data Structures & Algorithms',
    branchId: 'CSE',
    instructor: 'Prof. Erik Demaine & Dr. Jason Ku',
    platform: 'MIT OpenCourseWare',
    durationOrPages: '24 Lectures · 28 Hours',
    url: 'https://ocw.mit.edu',
    rating: 4.9,
    description: 'The golden standard course covering asymptotic bounds, dynamic programming, shortest paths, and data structure amortized bounds.'
  },
  {
    id: 'res-2',
    title: 'NPTEL: Digital Electronic Circuits',
    type: 'Video Lecture',
    subjectId: 'ece-de',
    subjectName: 'Digital Electronics',
    branchId: 'ECE',
    instructor: 'Prof. Goutam Saha',
    platform: 'NPTEL / IIT Kharagpur',
    durationOrPages: '40 Lectures · 30 Hours',
    url: 'https://nptel.ac.in',
    rating: 4.8,
    description: 'Thorough coverage of combinational circuits, sequential state tables, flip-flop timing hazards, and semiconductor memories.'
  },
  {
    id: 'res-3',
    title: 'Stanford CS140: Operating Systems Class Notes & Lab Guides',
    type: 'Documentation',
    subjectId: 'cse-os',
    subjectName: 'Operating Systems',
    branchId: 'CSE',
    instructor: 'Prof. Mendel Rosenblum',
    platform: 'Stanford University',
    durationOrPages: '18 Chapters · 240 Pages',
    url: 'https://cs140.stanford.edu',
    rating: 4.9,
    description: 'Practical exploration of virtual memory paging, process scheduling, and Pintos kernel implementation.'
  },
  {
    id: 'res-4',
    title: 'Fast.ai: Practical Deep Learning for Coders',
    type: 'Interactive Sandbox',
    subjectId: 'aiml-dl',
    subjectName: 'Deep Learning & Neural Architectures',
    branchId: 'AI_ML',
    instructor: 'Jeremy Howard',
    platform: 'Fast.ai',
    durationOrPages: '8 Lessons · Interactive Notebooks',
    url: 'https://course.fast.ai',
    rating: 4.9,
    description: 'Top-down pragmatic deep learning starting with production computer vision models and drilling down to low-level SGD backpropagation.'
  },
  {
    id: 'res-5',
    title: 'NPTEL: Basic Thermodynamics',
    type: 'Video Lecture',
    subjectId: 'mech-thermo',
    subjectName: 'Engineering Thermodynamics',
    branchId: 'Mechanical',
    instructor: 'Prof. S. K. Som',
    platform: 'NPTEL / IIT Kharagpur',
    durationOrPages: '42 Lectures · 32 Hours',
    url: 'https://nptel.ac.in',
    rating: 4.9,
    description: 'Unmatched conceptual explanations of entropy, availability, Maxwell relations, and cyclic steam processes.'
  }
];
