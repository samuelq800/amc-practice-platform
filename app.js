const DATA_URLS = ["./amc_aops_2010_present.json?v=20260712-figure-fix1", "../amc_aops_2010_present.json?v=20260712-figure-fix1"];
const STORAGE_KEY = "amc-practice-progress-v1";
const MARKS_KEY = "amc-practice-marks-v1";
const LAYOUT_KEY = "amc-practice-layout-v1";
const FULL_EXAM_SECONDS = 75 * 60;

const SUPABASE_URL = "https://bwlcnaruyjazaxyiiumd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_bGhQso88Ml6VEpX4reo8QQ_VjwL7yND";

// The Supabase anon/publishable key is safe in frontend code only when Row Level Security
// policies are enabled and correctly scoped. Never put a service_role key, database password,
// JWT secret, or hard-coded admin password in this static GitHub Pages app.
const CLOUD_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const weeklyRecommendationIds = [
  "2025_AMC_10A_10",
  "2025_AMC_12A_15",
  "2024_AMC_10B_20",
  "2024_AMC_12A_25",
];

const topicLabels = {
  algebra: "代数 / Algebra",
  geometry: "几何 / Geometry",
  number_theory: "数论 / Number Theory",
  counting_and_probability: "计数与概率 / Counting & Probability",
  prealgebra: "预代数 / Prealgebra",
  precalculus: "预备微积分 / Precalculus",
};

const solutionStageLabels = {
  idea: "初步思路 / Idea",
  key_steps: "关键步骤 / Key Steps",
  full_calculation: "完整计算 / Full Work",
};

const els = {
  entryScreen: document.querySelector("#entryScreen"),
  practiceShell: document.querySelector("#practiceShell"),
  entryMeta: document.querySelector("#entryMeta"),
  authTitle: document.querySelector("#authTitle"),
  authStatusText: document.querySelector("#authStatusText"),
  authGuestPanel: document.querySelector("#authGuestPanel"),
  authUserPanel: document.querySelector("#authUserPanel"),
  authForm: document.querySelector("#authForm"),
  authEmail: document.querySelector("#authEmail"),
  authPassword: document.querySelector("#authPassword"),
  authSubmit: document.querySelector("#authSubmit"),
  authCancel: document.querySelector("#authCancel"),
  authMessage: document.querySelector("#authMessage"),
  openLogin: document.querySelector("#openLogin"),
  openSignup: document.querySelector("#openSignup"),
  continueGuest: document.querySelector("#continueGuest"),
  userBadge: document.querySelector("#userBadge"),
  topUserBadge: document.querySelector("#topUserBadge"),
  reviewUserBadge: document.querySelector("#reviewUserBadge"),
  logoutButton: document.querySelector("#logoutButton"),
  topLogoutButton: document.querySelector("#topLogoutButton"),
  adminDashboardButton: document.querySelector("#adminDashboardButton"),
  topAdminDashboardButton: document.querySelector("#topAdminDashboardButton"),
  reviewAdminDashboardButton: document.querySelector("#reviewAdminDashboardButton"),
  singlePracticeMode: document.querySelector("#singlePracticeMode"),
  assignedPracticeCard: document.querySelector("#assignedPracticeCard"),
  assignedPracticeMode: document.querySelector("#assignedPracticeMode"),
  assignmentScreen: document.querySelector("#assignmentScreen"),
  assignmentMeta: document.querySelector("#assignmentMeta"),
  assignmentUserBadge: document.querySelector("#assignmentUserBadge"),
  assignmentList: document.querySelector("#assignmentList"),
  assignmentRefresh: document.querySelector("#assignmentRefresh"),
  assignmentToEntry: document.querySelector("#assignmentToEntry"),
  fullExamSelect: document.querySelector("#fullExamSelect"),
  startFullExam: document.querySelector("#startFullExam"),
  reviewMode: document.querySelector("#reviewMode"),
  aboutMode: document.querySelector("#aboutMode"),
  aboutScreen: document.querySelector("#aboutScreen"),
  aboutToPractice: document.querySelector("#aboutToPractice"),
  aboutToEntry: document.querySelector("#aboutToEntry"),
  adminScreen: document.querySelector("#adminScreen"),
  adminMeta: document.querySelector("#adminMeta"),
  adminRefresh: document.querySelector("#adminRefresh"),
  adminExportCsv: document.querySelector("#adminExportCsv"),
  adminToPractice: document.querySelector("#adminToPractice"),
  adminToEntry: document.querySelector("#adminToEntry"),
  adminTotalStudents: document.querySelector("#adminTotalStudents"),
  adminTotalAttempts: document.querySelector("#adminTotalAttempts"),
  adminAverageAccuracy: document.querySelector("#adminAverageAccuracy"),
  adminActiveUsers: document.querySelector("#adminActiveUsers"),
  adminStudentFilter: document.querySelector("#adminStudentFilter"),
  adminYearFilter: document.querySelector("#adminYearFilter"),
  adminLevelFilter: document.querySelector("#adminLevelFilter"),
  adminTopicFilter: document.querySelector("#adminTopicFilter"),
  adminDifficultyFilter: document.querySelector("#adminDifficultyFilter"),
  adminDateFrom: document.querySelector("#adminDateFrom"),
  adminDateTo: document.querySelector("#adminDateTo"),
  adminStudentTitle: document.querySelector("#adminStudentTitle"),
  adminStudentRows: document.querySelector("#adminStudentRows"),
  adminProblemTitle: document.querySelector("#adminProblemTitle"),
  adminProblemRows: document.querySelector("#adminProblemRows"),
  adminRecentTitle: document.querySelector("#adminRecentTitle"),
  adminRecentList: document.querySelector("#adminRecentList"),
  reviewScreen: document.querySelector("#reviewScreen"),
  reviewMeta: document.querySelector("#reviewMeta"),
  reviewTotal: document.querySelector("#reviewTotal"),
  reviewCorrect: document.querySelector("#reviewCorrect"),
  reviewAccuracy: document.querySelector("#reviewAccuracy"),
  reviewPriority: document.querySelector("#reviewPriority"),
  reviewFavorites: document.querySelector("#reviewFavorites"),
  diagnosisTitle: document.querySelector("#diagnosisTitle"),
  diagnosisRows: document.querySelector("#diagnosisRows"),
  mistakeTitle: document.querySelector("#mistakeTitle"),
  mistakeTopicFilter: document.querySelector("#mistakeTopicFilter"),
  mistakeYearFilter: document.querySelector("#mistakeYearFilter"),
  mistakeDifficultyFilter: document.querySelector("#mistakeDifficultyFilter"),
  mistakeStatusFilter: document.querySelector("#mistakeStatusFilter"),
  mistakeList: document.querySelector("#mistakeList"),
  favoriteTitle: document.querySelector("#favoriteTitle"),
  favoriteList: document.querySelector("#favoriteList"),
  weeklyTitle: document.querySelector("#weeklyTitle"),
  weeklyList: document.querySelector("#weeklyList"),
  answeredTitle: document.querySelector("#answeredTitle"),
  answeredList: document.querySelector("#answeredList"),
  reviewToPractice: document.querySelector("#reviewToPractice"),
  reviewToAbout: document.querySelector("#reviewToAbout"),
  reviewToEntry: document.querySelector("#reviewToEntry"),
  datasetMeta: document.querySelector("#datasetMeta"),
  statTotal: document.querySelector("#statTotal"),
  statAnswered: document.querySelector("#statAnswered"),
  statCorrect: document.querySelector("#statCorrect"),
  timerPanel: document.querySelector("#timerPanel"),
  timerText: document.querySelector("#timerText"),
  timerLabel: document.querySelector("#timerLabel"),
  backToEntry: document.querySelector("#backToEntry"),
  openReview: document.querySelector("#openReview"),
  openAbout: document.querySelector("#openAbout"),
  filters: document.querySelector(".filters"),
  workspace: document.querySelector(".workspace"),
  workspaceResizers: document.querySelectorAll(".workspace-resizer"),
  yearFilter: document.querySelector("#yearFilter"),
  levelFilter: document.querySelector("#levelFilter"),
  formFilter: document.querySelector("#formFilter"),
  examFilter: document.querySelector("#examFilter"),
  topicFilter: document.querySelector("#topicFilter"),
  difficultyFilter: document.querySelector("#difficultyFilter"),
  searchFilter: document.querySelector("#searchFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  randomProblem: document.querySelector("#randomProblem"),
  listTitle: document.querySelector("#listTitle"),
  problemList: document.querySelector("#problemList"),
  problemKicker: document.querySelector("#problemKicker"),
  problemTitle: document.querySelector("#problemTitle"),
  prevProblem: document.querySelector("#prevProblem"),
  nextProblem: document.querySelector("#nextProblem"),
  statement: document.querySelector("#statement"),
  choicePanel: document.querySelector("#choicePanel"),
  submitAnswer: document.querySelector("#submitAnswer"),
  submitExam: document.querySelector("#submitExam"),
  revealAnswer: document.querySelector("#revealAnswer"),
  favoriteProblem: document.querySelector("#favoriteProblem"),
  clearAnswer: document.querySelector("#clearAnswer"),
  examResultSection: document.querySelector("#examResultSection"),
  examResultBody: document.querySelector("#examResultBody"),
  answerStatus: document.querySelector("#answerStatus"),
  answerDetail: document.querySelector("#answerDetail"),
  problemStatusTags: document.querySelector("#problemStatusTags"),
  topicTags: document.querySelector("#topicTags"),
  solutionStageControl: document.querySelector("#solutionStageControl"),
  solutionBody: document.querySelector("#solutionBody"),
  problemSource: document.querySelector("#problemSource"),
  answerSource: document.querySelector("#answerSource"),
  solutionSource: document.querySelector("#solutionSource"),
};

const state = {
  data: null,
  problems: [],
  filtered: [],
  currentIndex: 0,
  selectedChoice: null,
  revealed: false,
  solutionStage: "idea",
  mode: "entry",
  activeExamId: null,
  activeAssignmentId: null,
  assignments: [],
  examAnswers: {},
  examSubmitted: false,
  timerRemaining: FULL_EXAM_SECONDS,
  timerId: null,
  progress: loadProgress(),
  marks: loadMarks(),
  layout: loadLayout(),
  supabase: null,
  authMode: "guest",
  authAction: "login",
  user: null,
  profile: null,
  cloudReady: false,
  cloudStatus: "",
  cloudAttempts: [],
  cloudFavorites: [],
  adminData: { profiles: [], attempts: [] },
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function loadMarks() {
  try {
    return JSON.parse(localStorage.getItem(MARKS_KEY)) || {};
  } catch {
    return {};
  }
}

function loadLayout() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY)) || {};
    return {
      listWidth: Number(saved.listWidth) || 230,
      solutionWidth: Number(saved.solutionWidth) || 380,
    };
  } catch {
    return { listWidth: 230, solutionWidth: 380 };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function saveMarks() {
  localStorage.setItem(MARKS_KEY, JSON.stringify(state.marks));
}

function saveLayout() {
  localStorage.setItem(LAYOUT_KEY, JSON.stringify(state.layout));
}

function cloudClient() {
  if (state.supabase) return state.supabase;
  if (!CLOUD_ENABLED || !window.supabase?.createClient) return null;
  state.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return state.supabase;
}

function isLoggedIn() {
  return Boolean(state.user);
}

function isAdmin() {
  return state.profile?.role === "admin";
}

function isMathClubMember() {
  return state.profile?.role === "mathclubmembers";
}

function displayName() {
  return state.profile?.display_name || state.user?.email || "Guest";
}

function setAuthMessage(message = "", tone = "") {
  if (!els.authMessage) return;
  els.authMessage.textContent = message;
  els.authMessage.className = `auth-message ${tone}`.trim();
}

function setCloudStatus(message = "") {
  state.cloudStatus = message;
  renderAuthState();
}

function openAuthForm(action) {
  state.authAction = action;
  els.authForm.classList.remove("is-hidden");
  els.authSubmit.textContent = action === "signup" ? "注册 / Sign up" : "登录 / Login";
  setAuthMessage(action === "signup" ? "创建账号后练习记录会同步到云端。 / Records sync after sign-up." : "登录后会加载你的云端记录。 / Cloud records load after login.");
  els.authEmail.focus();
}

function closeAuthForm() {
  els.authForm.classList.add("is-hidden");
  els.authPassword.value = "";
  setAuthMessage("");
}

function enterGuestMode() {
  state.authMode = "guest";
  state.user = null;
  state.profile = null;
  state.cloudReady = false;
  state.cloudAttempts = [];
  state.cloudFavorites = [];
  state.assignments = [];
  state.progress = loadProgress();
  state.marks = loadMarks();
  normalizeStoredProgress();
  renderAuthState();
  renderReviewDashboard();
  render();
}

function renderAuthState() {
  const loggedIn = isLoggedIn();
  const roleLabel = loggedIn ? (isAdmin() ? "admin" : isMathClubMember() ? "mathclubmembers" : "student") : "guest";
  const label = loggedIn
    ? `${displayName()} · ${roleLabel}`
    : state.authMode === "guest"
      ? "Guest · 本机记录"
      : "未登录 / Not signed in";
  [els.userBadge, els.topUserBadge, els.reviewUserBadge, els.assignmentUserBadge].forEach((node) => {
    if (node) node.textContent = label;
  });
  els.assignedPracticeCard.classList.toggle("is-hidden", !isMathClubMember());
  els.authGuestPanel.classList.add("is-hidden");
  els.authUserPanel.classList.toggle("is-hidden", !loggedIn);
  els.topLogoutButton.classList.toggle("is-hidden", !loggedIn);
  [els.adminDashboardButton, els.topAdminDashboardButton, els.reviewAdminDashboardButton].forEach((button) => {
    if (button) button.classList.add("is-hidden");
  });
  if (loggedIn) {
    els.authTitle.innerHTML = "云端账号已连接<br />Cloud account connected";
    els.authStatusText.textContent = state.cloudStatus || "练习记录和收藏会同步到 Supabase。 / Attempts and favorites sync to Supabase.";
  } else if (state.authMode === "guest") {
    els.authTitle.innerHTML = "游客模式<br />Guest Mode";
    els.authStatusText.textContent = "请从主入口登录；当前记录只保存在本机浏览器。 / Sign in from the main entrance; records stay in this browser only.";
  } else {
    els.authTitle.innerHTML = "共享登录状态<br />Shared Login Session";
    els.authStatusText.textContent = "请在苏州中学国际部竞赛平台入口登录；本页会自动读取同一个 Supabase 会话。 / Sign in from the main entrance; this page reuses the same Supabase session.";
  }
}

async function ensureProfile(user) {
  const client = cloudClient();
  if (!client || !user) return null;
  const { data, error } = await client
    .from("profiles")
    .select("id,email,display_name,role,created_at")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw error;
  if (data) return data;

  const profile = {
    id: user.id,
    email: user.email,
    display_name: user.email?.split("@")[0] || "Student",
    role: "student",
  };
  const { data: inserted, error: insertError } = await client
    .from("profiles")
    .insert(profile)
    .select("id,email,display_name,role,created_at")
    .single();
  if (insertError) return profile;
  return inserted;
}

function problemById(problemId) {
  const rawId = String(problemId || "").trim();
  const exact = state.problems.find((problem) => problem.id === rawId);
  if (exact) return exact;

  // Older Math Club assignments saved single-digit numbers without the
  // zero-padding used by the AMC problem bank, e.g. ..._1 instead of ..._01.
  const match = rawId.match(/^(\d{4})(?:_(Fall))?_AMC_(10|12)([AB])_(\d{1,2})$/);
  if (!match) return null;
  const [, year, season, level, form, number] = match;
  return state.problems.find((problem) => (
    String(problem.year) === year &&
    String(problem.level) === level &&
    problem.form === form &&
    Number(problem.number) === Number(number) &&
    (season ? String(problem.season || "").toLowerCase() === season.toLowerCase() : !problem.season)
  )) || null;
}

function attemptToProgress(problem, attempts) {
  const sorted = attempts.slice().sort((a, b) => String(a.submitted_at || "").localeCompare(String(b.submitted_at || "")));
  let aggregate = {};
  for (const attempt of sorted) {
    const correct = Boolean(attempt.is_correct);
    const previous = aggregate;
    const wrongAttempts = (previous.wrongAttempts || 0) + (correct ? 0 : 1);
    const correctAttempts = (previous.correctAttempts || 0) + (correct ? 1 : 0);
    const reviewCorrectStreak = correct
      ? (previous.needsReview || previous.everWrong ? (previous.reviewCorrectStreak || 0) + 1 : previous.reviewCorrectStreak || 0)
      : 0;
    aggregate = {
      ...previous,
      choice: attempt.selected_answer,
      correct,
      submittedAt: attempt.submitted_at,
      attempts: (previous.attempts || 0) + 1,
      wrongAttempts,
      correctAttempts,
      everWrong: Boolean(previous.everWrong || !correct),
      needsReview: correct ? reviewCorrectStreak < 2 && Boolean(previous.everWrong || previous.needsReview) : true,
      reviewCorrectStreak,
      source: attempt.mode,
      examId: attempt.exam_id,
    };
  }
  return problem && aggregate.choice ? aggregate : null;
}

function mergeCloudAttemptsIntoProgress(attempts) {
  const grouped = new Map();
  for (const attempt of attempts || []) {
    if (!attempt.problem_id) continue;
    if (!grouped.has(attempt.problem_id)) grouped.set(attempt.problem_id, []);
    grouped.get(attempt.problem_id).push(attempt);
  }
  const next = {};
  for (const [problemId, records] of grouped.entries()) {
    const problem = problemById(problemId);
    const progress = attemptToProgress(problem, records);
    if (progress) next[problemId] = progress;
  }
  state.progress = next;
  saveProgress();
}

function mergeCloudFavoritesIntoMarks(favorites) {
  const next = { ...state.marks };
  for (const mark of Object.values(next)) {
    if (mark) mark.favorite = false;
  }
  for (const favorite of favorites || []) {
    if (!favorite.problem_id) continue;
    next[favorite.problem_id] = {
      ...(next[favorite.problem_id] || {}),
      favorite: true,
      favoriteAt: favorite.created_at || new Date().toISOString(),
    };
  }
  state.marks = next;
  saveMarks();
}

async function loadCloudState() {
  const client = cloudClient();
  if (!client || !state.user) return;
  setCloudStatus("正在加载云端记录... / Loading cloud records...");
  const [attemptsResult, favoritesResult] = await Promise.all([
    client
      .from("attempts")
      .select("id,user_id,problem_id,exam_id,year,level,form,number,topic,difficulty,selected_answer,correct_answer,is_correct,time_spent_seconds,mode,submitted_at")
      .eq("user_id", state.user.id)
      .order("submitted_at", { ascending: true }),
    client
      .from("favorites")
      .select("id,user_id,problem_id,created_at")
      .eq("user_id", state.user.id)
      .order("created_at", { ascending: true }),
  ]);
  if (attemptsResult.error) throw attemptsResult.error;
  if (favoritesResult.error) throw favoritesResult.error;
  state.cloudAttempts = attemptsResult.data || [];
  state.cloudFavorites = favoritesResult.data || [];
  mergeCloudAttemptsIntoProgress(state.cloudAttempts);
  mergeCloudFavoritesIntoMarks(state.cloudFavorites);
  state.cloudReady = true;
  setCloudStatus(`已同步 ${state.cloudAttempts.length} 条云端作答记录，${state.cloudFavorites.length} 个收藏。 / Synced ${state.cloudAttempts.length} attempts and ${state.cloudFavorites.length} favorites.`);
}

async function applySession(session) {
  state.user = session?.user || null;
  state.authMode = state.user ? "cloud" : "guest";
  state.profile = null;
  if (!state.user) {
    state.assignments = [];
    renderAuthState();
    return;
  }
  try {
    state.profile = await ensureProfile(state.user);
    renderAuthState();
    await loadCloudState();
    await loadAssignedAssignments();
    renderReviewDashboard();
    render();
  } catch (error) {
    state.cloudReady = false;
    setCloudStatus(`云端连接失败，已保留本机记录。 / Cloud unavailable; local fallback active. ${error.message}`);
  }
}

async function initAuth() {
  const client = cloudClient();
  if (!client) {
    state.authMode = "guest";
    setCloudStatus("Supabase 脚本未加载，当前使用本机记录。 / Supabase script unavailable; using local records.");
    return;
  }
  const { data } = await client.auth.getSession();
  await applySession(data.session);
  client.auth.onAuthStateChange((_event, session) => {
    applySession(session);
  });
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const client = cloudClient();
  if (!client) {
    setAuthMessage("Supabase 暂不可用，请先使用游客模式。 / Supabase unavailable; use guest mode for now.", "bad");
    return;
  }
  const email = els.authEmail.value.trim();
  const password = els.authPassword.value;
  if (!email || !password) {
    setAuthMessage("请输入邮箱和密码。 / Please enter email and password.", "bad");
    return;
  }
  setAuthMessage("处理中... / Working...", "warn");
  const result = state.authAction === "signup"
    ? await client.auth.signUp({ email, password })
    : await client.auth.signInWithPassword({ email, password });
  if (result.error) {
    setAuthMessage(result.error.message, "bad");
    return;
  }
  closeAuthForm();
  setAuthMessage(state.authAction === "signup" ? "注册成功，请按 Supabase 邮件设置完成验证。 / Sign-up submitted; check email if confirmation is enabled." : "登录成功。 / Signed in.", "good");
}

async function logout() {
  const client = cloudClient();
  if (client) await client.auth.signOut();
  enterGuestMode();
}

function attemptPayload(problem, progress, extra = {}) {
  return {
    user_id: state.user?.id,
    problem_id: problem.id,
    exam_id: extra.examId || progress.examId || problem.exam_id || null,
    year: Number(problem.year) || null,
    level: Number(problem.level) || null,
    form: problem.form || null,
    number: Number(problem.number) || null,
    topic: problem.primary_topic || null,
    difficulty: difficultyRange(problem),
    selected_answer: progress.choice,
    correct_answer: problem.answer_choice || null,
    is_correct: Boolean(progress.correct),
    time_spent_seconds: Number.isFinite(extra.timeSpentSeconds) ? extra.timeSpentSeconds : null,
    mode: extra.source || progress.source || (state.mode === "exam" ? "full_exam" : state.mode === "assignment" ? "assignment" : "single"),
    // TODO: When the BMO mode stores a distinct internal contest marker, map it to "BMO".
    // Current AMC records default to "AMC" so existing AMC practice remains stable.
    contest_type: problem.type === "BMO" || problem.contest_type === "BMO" ? "BMO" : "AMC",
    platform: "amc-practice-platform",
    source_url: window.location.href,
    submitted_at: progress.submittedAt || new Date().toISOString(),
  };
}

async function saveAttemptCloud(problem, progress, extra = {}) {
  if (!isLoggedIn()) return;
  const client = cloudClient();
  if (!client) return;
  const payload = attemptPayload(problem, progress, extra);
  const { error } = await client.from("attempts").insert(payload);
  if (error) {
    setCloudStatus(`云端作答保存失败，本机记录已保留。 / Cloud attempt save failed; local copy kept. ${error.message}`);
    return;
  }
  state.cloudAttempts.push({ ...payload, id: crypto.randomUUID?.() || `${payload.problem_id}-${payload.submitted_at}` });
  setCloudStatus("作答已同步。 / Attempt synced.");
}

async function syncFavoriteCloud(problem, isFavorite) {
  if (!isLoggedIn()) return;
  const client = cloudClient();
  if (!client) return;
  if (isFavorite) {
    const { error } = await client
      .from("favorites")
      .upsert({ user_id: state.user.id, problem_id: problem.id }, { onConflict: "user_id,problem_id" });
    if (error) {
      setCloudStatus(`云端收藏保存失败，本机收藏已保留。 / Cloud favorite save failed; local copy kept. ${error.message}`);
      return;
    }
    setCloudStatus("收藏已同步。 / Favorite synced.");
  } else {
    const { error } = await client
      .from("favorites")
      .delete()
      .eq("user_id", state.user.id)
      .eq("problem_id", problem.id);
    if (error) {
      setCloudStatus(`云端收藏删除失败，本机收藏已更新。 / Cloud favorite delete failed; local copy updated. ${error.message}`);
      return;
    }
    setCloudStatus("收藏已取消同步。 / Favorite removed.");
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function problemMarks(problem) {
  if (!problem) return {};
  return state.marks[problem.id] || {};
}

function ensureMarks(problem) {
  if (!state.marks[problem.id]) state.marks[problem.id] = {};
  return state.marks[problem.id];
}

function difficultyRange(problem) {
  const number = Number(problem.number);
  if (number >= 1 && number <= 10) return "1-10";
  if (number >= 11 && number <= 18) return "10-18";
  return "19-25";
}

function recordSubmission(problem, choice, extra = {}) {
  const previous = problemProgress(problem) || {};
  const correct = answerMatches(problem, choice) || problem.answer_note === "full_credit_all_answers";
  const wrongAttempts = (previous.wrongAttempts || 0) + (correct ? 0 : 1);
  const correctAttempts = (previous.correctAttempts || 0) + (correct ? 1 : 0);
  const reviewCorrectStreak = correct
    ? (previous.needsReview || previous.everWrong ? (previous.reviewCorrectStreak || 0) + 1 : previous.reviewCorrectStreak || 0)
    : 0;

  state.progress[problem.id] = {
    ...previous,
    ...extra,
    choice,
    correct,
    submittedAt: extra.submittedAt || new Date().toISOString(),
    attempts: (previous.attempts || 0) + 1,
    wrongAttempts,
    correctAttempts,
    everWrong: Boolean(previous.everWrong || !correct),
    needsReview: correct ? reviewCorrectStreak < 2 && Boolean(previous.everWrong || previous.needsReview) : true,
    reviewCorrectStreak,
  };
  return state.progress[problem.id];
}

function normalizeStoredProgress() {
  let changed = false;
  for (const record of Object.values(state.progress)) {
    if (!record || !("correct" in record)) continue;
    if (!record.attempts) {
      record.attempts = 1;
      changed = true;
    }
    if (record.correct && !record.correctAttempts) {
      record.correctAttempts = 1;
      changed = true;
    }
    if (!record.correct && !record.everWrong) {
      record.everWrong = true;
      record.needsReview = true;
      record.wrongAttempts = record.wrongAttempts || 1;
      record.reviewCorrectStreak = 0;
      changed = true;
    }
  }
  if (changed) saveProgress();
}

function uniqueValues(items, getter) {
  return [...new Set(items.map(getter).filter((value) => value !== null && value !== undefined && value !== ""))];
}

function option(select, value, label) {
  const node = document.createElement("option");
  node.value = value;
  node.textContent = label;
  select.appendChild(node);
}

function fillSelect(select, entries, allLabel) {
  select.innerHTML = "";
  option(select, "all", allLabel);
  for (const [value, label] of entries) option(select, value, label);
}

function fillExactSelect(select, entries) {
  select.innerHTML = "";
  for (const [value, label] of entries) option(select, value, label);
}

function topicName(topic) {
  return topicLabels[topic] || topic;
}

function examSort(a, b) {
  return b.year - a.year || b.level - a.level || a.form.localeCompare(b.form);
}

function examById(examId) {
  return state.data?.exams.find((exam) => exam.id === examId) || null;
}

function updateDatasetMeta() {
  const text = state.data
    ? `${state.data.exams.length} 套试卷 / papers · ${state.data.problems.length} 题 / problems · ${state.data.solution_summary?.solution_text_count || 0} 题内嵌解析 / inline solutions`
    : "加载中 / Loading...";
  els.entryMeta.textContent = text;
  els.datasetMeta.textContent = text;
}

function updateTimer() {
  const minutes = Math.floor(state.timerRemaining / 60);
  const seconds = state.timerRemaining % 60;
  els.timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  els.timerLabel.textContent = state.timerRemaining > 0 ? "剩余时间 / Time left" : "时间到 / Time up";
  els.timerPanel.classList.toggle("time-up", state.timerRemaining <= 0);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  stopTimer();
  state.timerRemaining = FULL_EXAM_SECONDS;
  updateTimer();
  state.timerId = setInterval(() => {
    state.timerRemaining = Math.max(0, state.timerRemaining - 1);
    updateTimer();
    if (state.timerRemaining === 0) stopTimer();
  }, 1000);
}

function showEntry() {
  stopTimer();
  state.mode = "entry";
  state.activeExamId = null;
  state.activeAssignmentId = null;
  state.examSubmitted = false;
  els.entryScreen.classList.remove("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.assignmentScreen.classList.add("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.adminScreen.classList.add("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
}

function showPracticeShell() {
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.remove("is-hidden");
  els.assignmentScreen.classList.add("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.adminScreen.classList.add("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
  const isLockedSet = state.mode === "exam" || state.mode === "assignment";
  els.filters.classList.toggle("is-hidden", isLockedSet);
  els.randomProblem.classList.toggle("is-hidden", isLockedSet);
  els.timerPanel.classList.toggle("is-hidden", state.mode !== "exam");
  els.submitExam.classList.toggle("is-hidden", state.mode !== "exam");
  els.revealAnswer.disabled = state.mode === "exam" && !state.examSubmitted;
  requestAnimationFrame(applyWorkspaceLayout);
}

function showReview() {
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.assignmentScreen.classList.add("is-hidden");
  els.reviewScreen.classList.remove("is-hidden");
  els.adminScreen.classList.add("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
  renderReviewDashboard();
}

function showAbout() {
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.assignmentScreen.classList.add("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.adminScreen.classList.add("is-hidden");
  els.aboutScreen.classList.remove("is-hidden");
}

async function showAdminDashboard() {
  if (!isAdmin()) return;
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.assignmentScreen.classList.add("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.adminScreen.classList.remove("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
  await loadAdminDashboard();
}

function formatAssignmentDate(value) {
  if (!value) return "未设置截止时间 / No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未设置截止时间 / No due date";
  return `截止 / Due ${new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)}`;
}

function assignmentProblems(assignment) {
  return (assignment?.problem_ids || []).map(problemById).filter(Boolean);
}

function renderAssignedAssignments(message = "") {
  if (!els.assignmentList) return;
  els.assignmentList.innerHTML = "";
  if (!isMathClubMember()) {
    els.assignmentMeta.textContent = "仅数学社成员可查看老师布置的题目 / Math Club membership required.";
    return;
  }
  if (message) els.assignmentMeta.textContent = message;
  else els.assignmentMeta.textContent = state.assignments.length
    ? `${state.assignments.length} 个任务 / assignments · 选择任务后即可直接作答`
    : "暂无已发布任务 / No assignments published yet.";

  if (!state.assignments.length) {
    const empty = document.createElement("div");
    empty.className = "assignment-empty";
    empty.textContent = "老师暂时还没有发布 AMC 练习任务。 / Your teacher has not published an AMC assignment yet.";
    els.assignmentList.appendChild(empty);
    return;
  }

  for (const assignment of state.assignments) {
    const problems = assignmentProblems(assignment);
    const answered = problems.filter((problem) => problemProgress(problem)).length;
    const correct = problems.filter((problem) => problemProgress(problem)?.correct).length;
    const card = document.createElement("article");
    card.className = "assignment-card";
    const info = document.createElement("div");
    info.className = "assignment-card-copy";
    const eyebrow = document.createElement("span");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = `AMC 任务 / ${problems.length} 题`;
    const title = document.createElement("h3");
    title.textContent = assignment.title || "数学社 AMC 练习 / Math Club AMC Practice";
    const instruction = document.createElement("p");
    instruction.textContent = assignment.instructions || "完成题目后可直接查看答案与分阶段解析。 / Answers and staged solutions are available after submission.";
    const meta = document.createElement("div");
    meta.className = "assignment-meta-row";
    [formatAssignmentDate(assignment.due_at), `${answered}/${problems.length} 已完成 / completed`, `${correct} 正确 / correct`].forEach((label) => {
      const chip = document.createElement("span");
      chip.textContent = label;
      meta.appendChild(chip);
    });
    const items = document.createElement("p");
    items.className = "assignment-problems";
    items.textContent = problems.length
      ? problems.map((problem) => `${problem.year} AMC ${problem.level}${problem.form} #${problem.number}`).join(" · ")
      : "本任务中的题目尚未载入，请刷新题库后再试。 / Assigned problems are unavailable; refresh and try again.";
    info.append(eyebrow, title, instruction, meta, items);
    const action = document.createElement("button");
    action.type = "button";
    action.textContent = problems.length ? "开始作答 / Start" : "题目未载入 / Unavailable";
    action.disabled = !problems.length;
    action.addEventListener("click", () => startAssignment(assignment.id));
    card.append(info, action);
    els.assignmentList.appendChild(card);
  }
}

async function loadAssignedAssignments() {
  if (!isMathClubMember()) {
    state.assignments = [];
    renderAssignedAssignments();
    return;
  }
  const client = cloudClient();
  if (!client) return;
  const { data, error } = await client
    .from("amc_assignments")
    .select("id,title,instructions,problem_ids,due_at,created_at")
    .eq("target_role", "mathclubmembers")
    .order("created_at", { ascending: false });
  if (error) {
    renderAssignedAssignments(`无法读取布置任务 / Unable to load assignments: ${error.message}`);
    return;
  }
  state.assignments = data || [];
  renderAssignedAssignments();
}

async function showAssignedAssignments() {
  if (!isMathClubMember()) return;
  stopTimer();
  state.mode = "assignments";
  state.activeExamId = null;
  state.activeAssignmentId = null;
  state.examSubmitted = false;
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.assignmentScreen.classList.remove("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.adminScreen.classList.add("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
  renderAssignedAssignments("读取老师布置的题目中 / Loading assignments...");
  await loadAssignedAssignments();
}

function startAssignment(assignmentId) {
  const assignment = state.assignments.find((item) => item.id === assignmentId);
  const problems = assignmentProblems(assignment);
  if (!assignment || !problems.length) return;
  stopTimer();
  state.mode = "assignment";
  state.activeAssignmentId = assignment.id;
  state.activeExamId = null;
  state.examSubmitted = false;
  state.filtered = problems;
  state.currentIndex = 0;
  state.selectedChoice = problemProgress(problems[0])?.choice || null;
  state.revealed = Boolean(problemProgress(problems[0]));
  showPracticeShell();
  render();
}

function continuePracticeFromReview() {
  if (state.mode === "exam" || state.mode === "single" || state.mode === "assignment") {
    showPracticeShell();
    render();
  } else {
    enterSinglePractice();
  }
}

function enterSinglePractice() {
  stopTimer();
  state.mode = "single";
  state.activeExamId = null;
  state.activeAssignmentId = null;
  showPracticeShell();
  applyFilters();
}

function enterFullExam() {
  const examId = els.fullExamSelect.value;
  const exam = examById(examId);
  if (!exam) return;
  state.mode = "exam";
  state.activeExamId = examId;
  state.activeAssignmentId = null;
  state.examAnswers = {};
  state.examSubmitted = false;
  state.filtered = state.problems
    .filter((problem) => problem.exam_id === examId)
    .sort((a, b) => a.number - b.number);
  state.currentIndex = 0;
  state.selectedChoice = null;
  state.revealed = false;
  showPracticeShell();
  startTimer();
  render();
}

function inDifficultyRange(problem, range) {
  const number = Number(problem.number);
  if (!Number.isFinite(number)) return false;
  if (range === "1-10") return number >= 1 && number <= 10;
  if (range === "10-18") return number >= 10 && number <= 18;
  if (range === "19-25") return number >= 19 && number <= 25;
  return true;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function queueMathTypeset(root = document.body) {
  if (!window.MathJax) return;
  const run = () => {
    if (window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([root]).catch(() => {});
    }
  };
  if (window.MathJax.startup?.promise) {
    window.MathJax.startup.promise.then(run);
  } else {
    run();
  }
}

function looksLikeLatex(value) {
  return /\\[a-zA-Z]+|[_^{}]/.test(value);
}

function prepareMathText(value) {
  const text = String(value || "");
  const withDisplayBlocks = text.replace(
    /(\\begin\{(?:align\*?|aligned|equation\*?|gather\*?|cases|array)\}[\s\S]*?\\end\{(?:align\*?|aligned|equation\*?|gather\*?|cases|array)\})/g,
    (block) => `\n$$\n${block}\n$$\n`
  );
  if (/[＄$]|\\\(|\\\[/.test(withDisplayBlocks)) return withDisplayBlocks;
  return looksLikeLatex(withDisplayBlocks) ? `\\(${withDisplayBlocks}\\)` : withDisplayBlocks;
}

function setMathText(node, value) {
  node.textContent = prepareMathText(value);
}

function renderPlainText(target, text) {
  target.innerHTML = "";
  const parts = String(text || "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => !/^Solution(?:\s+\d+)?$/i.test(part))
    .filter(Boolean);
  for (const part of parts.length ? parts : [text]) {
    const paragraph = document.createElement("p");
    setMathText(paragraph, part);
    target.appendChild(paragraph);
  }
}

function sanitizeHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  template.content.querySelectorAll("script, style, iframe, object, embed").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();
      if (name.startsWith("on") || value.startsWith("javascript:")) node.removeAttribute(attr.name);
    });
  });
  template.content.querySelectorAll("p, div").forEach((node) => {
    const text = [
      node.textContent || "",
      ...[...node.querySelectorAll("img")].map((img) => img.getAttribute("alt") || ""),
    ].join(" ");
    if (["A", "B", "C", "D", "E"].every((letter) => new RegExp(`\\(${letter}\\)|\\{${letter}\\}`).test(text))) {
      node.remove();
    }
  });
  return template.innerHTML;
}

function getFilters() {
  return {
    year: els.yearFilter.value,
    level: els.levelFilter.value,
    form: els.formFilter.value,
    exam: els.examFilter.value,
    topic: els.topicFilter.value,
    difficulty: els.difficultyFilter.value,
    search: els.searchFilter.value.trim().toLowerCase(),
  };
}

function initFilters() {
  const years = uniqueValues(state.problems, (p) => p.year)
    .sort((a, b) => b - a)
    .map((year) => [String(year), String(year)]);
  const exams = state.data.exams
    .slice()
    .sort(examSort)
    .map((exam) => [exam.id, exam.display_name]);
  const topics = uniqueValues(state.problems, (p) => p.primary_topic)
    .sort((a, b) => topicName(a).localeCompare(topicName(b), "zh-CN"))
    .map((topic) => [topic, topicName(topic)]);

  fillSelect(els.yearFilter, years, "全部年份 / All Years");
  fillSelect(els.levelFilter, [["10", "AMC 10"], ["12", "AMC 12"]], "全部考试 / All Contests");
  fillSelect(els.formFilter, [["A", "A 卷 / Form A"], ["B", "B 卷 / Form B"]], "全部卷别 / All Forms");
  fillSelect(els.examFilter, exams, "全部试卷 / All Papers");
  fillExactSelect(els.fullExamSelect, exams);
  fillSelect(els.topicFilter, topics, "全部知识点 / All Topics");
  fillSelect(els.mistakeTopicFilter, topics, "全部知识点 / All Topics");
  fillSelect(els.mistakeYearFilter, years, "全部年份 / All Years");
  fillSelect(
    els.mistakeDifficultyFilter,
    [
      ["1-10", "1-10 题 / Problems 1-10"],
      ["10-18", "10-18 题 / Problems 10-18"],
      ["19-25", "19-25 题 / Problems 19-25"],
    ],
    "全部难度 / All Difficulty"
  );
  fillSelect(
    els.mistakeStatusFilter,
    [
      ["priority", "高优先级 / High Priority"],
      ["wrong_history", "错题历史 / Error History"],
      ["favorite", "收藏 / Favorite"],
      ["solution_viewed", "看过解析 / Solution Viewed"],
    ],
    "全部状态 / All Status"
  );
  fillSelect(
    els.difficultyFilter,
    [
      ["1-10", "1-10 题 / Problems 1-10"],
      ["10-18", "10-18 题 / Problems 10-18"],
      ["19-25", "19-25 题 / Problems 19-25"],
    ],
    "全部难度 / All Difficulty"
  );
}

function applyFilters(keepCurrent = false) {
  const previousId = currentProblem()?.id;
  const filters = getFilters();
  state.filtered = state.problems.filter((problem) => {
    if (filters.year !== "all" && String(problem.year) !== filters.year) return false;
    if (filters.level !== "all" && String(problem.level) !== filters.level) return false;
    if (filters.form !== "all" && problem.form !== filters.form) return false;
    if (filters.exam !== "all" && problem.exam_id !== filters.exam) return false;
    if (filters.topic !== "all" && !problem.topic_tags.includes(filters.topic)) return false;
    if (filters.difficulty !== "all" && !inDifficultyRange(problem, filters.difficulty)) return false;
    if (filters.search) {
      const haystack = [
        problem.id,
        problem.display_name,
        problem.number,
        problem.primary_topic,
        problem.statement_text,
      ].join(" ").toLowerCase();
      if (!haystack.includes(filters.search)) return false;
    }
    return true;
  });

  state.currentIndex = 0;
  if (keepCurrent && previousId) {
    const nextIndex = state.filtered.findIndex((problem) => problem.id === previousId);
    if (nextIndex >= 0) state.currentIndex = nextIndex;
  }
  state.selectedChoice = null;
  state.revealed = false;
  render();
}

function currentProblem() {
  return state.filtered[state.currentIndex] || null;
}

function problemProgress(problem) {
  return state.progress[problem.id] || null;
}

function currentProgress(problem) {
  if (!problem) return null;
  if (state.mode === "exam" && !state.examSubmitted) {
    const answer = state.examAnswers[problem.id];
    return answer ? { choice: answer.choice, pending: true } : null;
  }
  return problemProgress(problem);
}

function answerMatches(problem, choice) {
  return (problem.answer_choices_accepted || []).includes(choice);
}

function markSolutionViewed(problem) {
  if (!problem || state.mode === "exam" && !state.examSubmitted) return;
  ensureMarks(problem).solutionViewed = true;
  ensureMarks(problem).solutionViewedAt = new Date().toISOString();
  saveMarks();
}

function toggleFavorite() {
  const problem = currentProblem();
  if (!problem) return;
  const marks = ensureMarks(problem);
  marks.favorite = !marks.favorite;
  marks.favoriteAt = marks.favorite ? new Date().toISOString() : marks.favoriteAt;
  saveMarks();
  syncFavoriteCloud(problem, marks.favorite);
  render();
}

function canShowAnswer(progress = null) {
  if (state.mode === "exam") return state.examSubmitted;
  return Boolean(state.revealed || progress);
}

function solutionStages(problem) {
  if (!problem?.solution_text) return null;
  return problem.solution_stages || {
    idea: problem.solution_text,
    key_steps: problem.solution_text,
    full_calculation: problem.solution_text,
  };
}

function activeSolutionStage(problem) {
  const stages = solutionStages(problem);
  if (!stages) return null;
  return stages[state.solutionStage] ? state.solutionStage : "full_calculation";
}

function updateSolutionStageButtons(problem, shouldShowAnswer) {
  const stages = solutionStages(problem);
  const canChooseStage = Boolean(shouldShowAnswer && stages);
  els.solutionStageControl.classList.toggle("is-hidden", !canChooseStage);
  if (!canChooseStage) return;

  const activeStage = activeSolutionStage(problem);
  els.solutionStageControl.querySelectorAll(".solution-stage-button").forEach((button) => {
    const stage = button.dataset.stage;
    const hasText = Boolean(stages[stage]);
    button.disabled = !hasText;
    button.classList.toggle("active", stage === activeStage);
    button.setAttribute("aria-pressed", String(stage === activeStage));
  });
}

function examReport() {
  const correct = [];
  const incorrect = [];
  const blank = [];
  const topicStats = new Map();

  for (const problem of state.filtered) {
    const answer = state.examAnswers[problem.id];
    const isBlank = !answer?.choice;
    const isCorrect = !isBlank && (answerMatches(problem, answer.choice) || problem.answer_note === "full_credit_all_answers");
    if (isBlank) blank.push(problem.number);
    else if (isCorrect) correct.push(problem.number);
    else incorrect.push(problem.number);

    const tags = problem.topic_tags?.length ? problem.topic_tags : [problem.primary_topic];
    for (const tag of tags) {
      if (!topicStats.has(tag)) topicStats.set(tag, { tag, total: 0, correct: 0, blank: 0 });
      const stat = topicStats.get(tag);
      stat.total += 1;
      if (isBlank) stat.blank += 1;
      if (isCorrect) stat.correct += 1;
    }
  }

  return {
    correct,
    incorrect,
    blank,
    score: correct.length * 6 + blank.length * 1.5,
    topicStats: [...topicStats.values()].sort((a, b) => topicName(a.tag).localeCompare(topicName(b.tag), "zh-CN")),
  };
}

function setSelected(choice) {
  if (state.mode === "exam" && state.examSubmitted) return;
  state.selectedChoice = choice;
  const problem = currentProblem();
  if (state.mode === "exam" && !state.examSubmitted && problem) {
    state.examAnswers[problem.id] = {
      choice,
      answeredAt: new Date().toISOString(),
    };
  }
  state.revealed = false;
  render();
}

function submitAnswer() {
  const problem = currentProblem();
  if (!problem || !state.selectedChoice) return;
  if (state.mode === "exam" && !state.examSubmitted) {
    state.examAnswers[problem.id] = {
      choice: state.selectedChoice,
      answeredAt: new Date().toISOString(),
    };
    state.revealed = false;
    render();
    return;
  }
  const progress = recordSubmission(problem, state.selectedChoice, state.mode === "assignment" ? {
    source: "assignment",
    assignmentId: state.activeAssignmentId,
  } : {});
  state.revealed = true;
  markSolutionViewed(problem);
  saveProgress();
  saveAttemptCloud(problem, progress);
  renderReviewDashboard();
  render();
}

function revealAnswer() {
  if (!currentProblem()) return;
  if (state.mode === "exam" && !state.examSubmitted) return;
  state.revealed = true;
  markSolutionViewed(currentProblem());
  renderProblem();
}

function clearAnswer() {
  const problem = currentProblem();
  if (!problem) return;
  if (state.mode === "exam" && !state.examSubmitted) {
    delete state.examAnswers[problem.id];
    state.selectedChoice = null;
    state.revealed = false;
    render();
    return;
  }
  delete state.progress[problem.id];
  state.selectedChoice = null;
  state.revealed = false;
  saveProgress();
  renderReviewDashboard();
  render();
}

function submitWholeExam() {
  if (state.mode !== "exam" || state.examSubmitted) return;
  stopTimer();
  state.examSubmitted = true;
  const submittedAt = new Date().toISOString();
  for (const problem of state.filtered) {
    const answer = state.examAnswers[problem.id];
    if (!answer?.choice) continue;
    const progress = recordSubmission(problem, answer.choice, {
      submittedAt,
      source: "full_exam",
      examId: state.activeExamId,
    });
    saveAttemptCloud(problem, progress, {
      submittedAt,
      source: "full_exam",
      examId: state.activeExamId,
    });
  }
  const current = currentProblem();
  state.selectedChoice = currentProgress(current)?.choice || null;
  state.revealed = true;
  saveProgress();
  renderReviewDashboard();
  render();
}

function move(delta) {
  if (!state.filtered.length) return;
  state.currentIndex = Math.max(0, Math.min(state.filtered.length - 1, state.currentIndex + delta));
  const progress = currentProgress(currentProblem());
  state.selectedChoice = progress?.choice || null;
  state.revealed = state.mode === "exam" ? state.examSubmitted : Boolean(progress);
  render();
}

function chooseRandom() {
  if (!state.filtered.length) return;
  state.currentIndex = Math.floor(Math.random() * state.filtered.length);
  const progress = currentProgress(currentProblem());
  state.selectedChoice = progress?.choice || null;
  state.revealed = state.mode === "exam" ? state.examSubmitted : Boolean(progress);
  render();
}

function answeredProblems() {
  return state.problems
    .map((problem) => ({ problem, progress: problemProgress(problem) }))
    .filter((item) => item.progress)
    .sort((a, b) => String(b.progress.submittedAt || "").localeCompare(String(a.progress.submittedAt || "")));
}

function mistakeProblems() {
  return state.problems
    .map((problem) => ({ problem, progress: problemProgress(problem), marks: problemMarks(problem) }))
    .filter((item) => item.progress?.everWrong)
    .sort((a, b) => Number(Boolean(b.progress.needsReview)) - Number(Boolean(a.progress.needsReview)) ||
      String(b.progress.submittedAt || "").localeCompare(String(a.progress.submittedAt || "")));
}

function favoriteProblems() {
  return state.problems
    .map((problem) => ({ problem, progress: problemProgress(problem), marks: problemMarks(problem) }))
    .filter((item) => item.marks.favorite)
    .sort((a, b) => String(b.marks.favoriteAt || "").localeCompare(String(a.marks.favoriteAt || "")));
}

function weeklyProblems() {
  const byId = new Map(state.problems.map((problem) => [problem.id, problem]));
  return weeklyRecommendationIds
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((problem) => ({ problem, progress: problemProgress(problem), marks: problemMarks(problem) }));
}

function filteredMistakeProblems() {
  const topic = els.mistakeTopicFilter.value;
  const year = els.mistakeYearFilter.value;
  const difficulty = els.mistakeDifficultyFilter.value;
  const status = els.mistakeStatusFilter.value;
  return mistakeProblems().filter(({ problem, progress, marks }) => {
    if (topic !== "all" && !problem.topic_tags.includes(topic)) return false;
    if (year !== "all" && String(problem.year) !== year) return false;
    if (difficulty !== "all" && difficultyRange(problem) !== difficulty) return false;
    if (status === "priority" && !progress.needsReview) return false;
    if (status === "wrong_history" && !progress.everWrong) return false;
    if (status === "favorite" && !marks.favorite) return false;
    if (status === "solution_viewed" && !marks.solutionViewed) return false;
    return true;
  });
}

function percent(correct, total) {
  return total ? `${Math.round((correct / total) * 100)}%` : "0%";
}

function topicDiagnosis() {
  const stats = new Map();
  for (const { problem, progress } of answeredProblems()) {
    const tags = problem.topic_tags?.length ? problem.topic_tags : [problem.primary_topic];
    for (const tag of tags) {
      if (!stats.has(tag)) stats.set(tag, { tag, total: 0, correct: 0 });
      const stat = stats.get(tag);
      stat.total += 1;
      if (progress.correct) stat.correct += 1;
    }
  }
  return [...stats.values()].sort((a, b) => {
    const accuracyA = a.total ? a.correct / a.total : 0;
    const accuracyB = b.total ? b.correct / b.total : 0;
    return accuracyA - accuracyB || b.total - a.total || topicName(a.tag).localeCompare(topicName(b.tag), "zh-CN");
  });
}

function diagnosisAdvice(stat) {
  const accuracy = stat.total ? stat.correct / stat.total : 0;
  if (stat.total < 3) return "样本较少，继续做几题后再判断 / Small sample; answer a few more before judging.";
  if (accuracy < 0.5) return `优先复习 ${topicName(stat.tag)} 基础题 / Prioritize fundamentals in ${topicName(stat.tag)}.`;
  if (accuracy < 0.7) return "建议复盘错题，再做同类中档题 / Review mistakes, then try similar medium problems.";
  if (accuracy < 0.85) return "整体稳定，可练中高难题 / Stable; move toward medium-hard problems.";
  return "掌握较好，保持限时训练 / Strong; maintain timed practice.";
}

function dateTime(value) {
  if (!value) return "-";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return String(value);
  }
}

function filterAdminAttempts() {
  const student = els.adminStudentFilter.value;
  const year = els.adminYearFilter.value;
  const level = els.adminLevelFilter.value;
  const topic = els.adminTopicFilter.value;
  const difficulty = els.adminDifficultyFilter.value;
  const from = els.adminDateFrom.value ? new Date(`${els.adminDateFrom.value}T00:00:00`) : null;
  const to = els.adminDateTo.value ? new Date(`${els.adminDateTo.value}T23:59:59`) : null;
  return state.adminData.attempts.filter((attempt) => {
    if (student !== "all" && attempt.user_id !== student) return false;
    if (year !== "all" && String(attempt.year) !== year) return false;
    if (level !== "all" && String(attempt.level) !== level) return false;
    if (topic !== "all" && attempt.topic !== topic) return false;
    if (difficulty !== "all" && attempt.difficulty !== difficulty) return false;
    const submitted = attempt.submitted_at ? new Date(attempt.submitted_at) : null;
    if (from && submitted && submitted < from) return false;
    if (to && submitted && submitted > to) return false;
    return true;
  });
}

function profileFor(userId) {
  return state.adminData.profiles.find((profile) => profile.id === userId) || {};
}

function setupAdminFilters() {
  const profiles = state.adminData.profiles.slice().sort((a, b) => String(a.email || "").localeCompare(String(b.email || "")));
  fillSelect(
    els.adminStudentFilter,
    profiles.map((profile) => [profile.id, profile.display_name || profile.email || profile.id]),
    "全部学生 / All Students"
  );
  const attempts = state.adminData.attempts;
  fillSelect(
    els.adminYearFilter,
    uniqueValues(attempts, (attempt) => attempt.year).sort((a, b) => b - a).map((year) => [String(year), String(year)]),
    "全部年份 / All Years"
  );
  fillSelect(els.adminLevelFilter, [["10", "AMC 10"], ["12", "AMC 12"]], "全部考试 / All Contests");
  fillSelect(
    els.adminTopicFilter,
    uniqueValues(attempts, (attempt) => attempt.topic)
      .sort((a, b) => topicName(a).localeCompare(topicName(b), "zh-CN"))
      .map((topic) => [topic, topicName(topic)]),
    "全部知识点 / All Topics"
  );
  fillSelect(
    els.adminDifficultyFilter,
    uniqueValues(attempts, (attempt) => attempt.difficulty)
      .sort()
      .map((difficulty) => [difficulty, difficulty]),
    "全部难度 / All Difficulty"
  );
}

function renderAdminDashboard() {
  const attempts = filterAdminAttempts();
  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((attempt) => attempt.is_correct).length;
  const activeSince = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const activeUsers = new Set(attempts.filter((attempt) => new Date(attempt.submitted_at).getTime() >= activeSince).map((attempt) => attempt.user_id));
  els.adminTotalStudents.textContent = String(state.adminData.profiles.length);
  els.adminTotalAttempts.textContent = String(totalAttempts);
  els.adminAverageAccuracy.textContent = percent(correctAttempts, totalAttempts);
  els.adminActiveUsers.textContent = String(activeUsers.size);
  els.adminMeta.textContent = `当前筛选 ${totalAttempts} 条作答记录 / ${totalAttempts} filtered attempts`;

  const byStudent = new Map();
  for (const profile of state.adminData.profiles) {
    byStudent.set(profile.id, { profile, total: 0, correct: 0, lastActive: "" });
  }
  for (const attempt of attempts) {
    const row = byStudent.get(attempt.user_id) || { profile: profileFor(attempt.user_id), total: 0, correct: 0, lastActive: "" };
    row.total += 1;
    if (attempt.is_correct) row.correct += 1;
    if (String(attempt.submitted_at || "") > String(row.lastActive || "")) row.lastActive = attempt.submitted_at;
    byStudent.set(attempt.user_id, row);
  }
  const studentRows = [...byStudent.values()].sort((a, b) => b.total - a.total || String(b.lastActive || "").localeCompare(String(a.lastActive || "")));
  els.adminStudentTitle.textContent = `${studentRows.length} students`;
  els.adminStudentRows.innerHTML = studentRows.length ? "" : '<tr><td colspan="6">暂无学生数据 / No student data</td></tr>';
  for (const row of studentRows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.profile.display_name || "-"}</td>
      <td>${row.profile.email || "-"}</td>
      <td>${row.total}</td>
      <td>${row.correct}</td>
      <td>${percent(row.correct, row.total)}</td>
      <td>${dateTime(row.lastActive)}</td>
    `;
    els.adminStudentRows.appendChild(tr);
  }

  const byProblem = new Map();
  for (const attempt of attempts) {
    const key = attempt.problem_id;
    const problem = problemById(key);
    const row = byProblem.get(key) || {
      problem_id: key,
      exam: problem?.display_name || attempt.exam_id || "-",
      number: attempt.number || problem?.number || "-",
      topic: attempt.topic || problem?.primary_topic || "-",
      total: 0,
      correct: 0,
    };
    row.total += 1;
    if (attempt.is_correct) row.correct += 1;
    byProblem.set(key, row);
  }
  const problemRows = [...byProblem.values()].sort((a, b) => b.total - a.total || String(a.problem_id).localeCompare(String(b.problem_id))).slice(0, 200);
  els.adminProblemTitle.textContent = `${byProblem.size} problems`;
  els.adminProblemRows.innerHTML = problemRows.length ? "" : '<tr><td colspan="6">暂无题目数据 / No problem data</td></tr>';
  for (const row of problemRows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.problem_id}</td>
      <td>${row.exam}</td>
      <td>${row.number}</td>
      <td>${topicName(row.topic)}</td>
      <td>${row.total}</td>
      <td>${percent(row.correct, row.total)}</td>
    `;
    els.adminProblemRows.appendChild(tr);
  }

  const recent = attempts.slice().sort((a, b) => String(b.submitted_at || "").localeCompare(String(a.submitted_at || ""))).slice(0, 50);
  els.adminRecentTitle.textContent = `${recent.length} attempts`;
  els.adminRecentList.innerHTML = "";
  if (!recent.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "暂无作答记录 / No attempts yet";
    els.adminRecentList.appendChild(empty);
  }
  for (const attempt of recent) {
    const profile = profileFor(attempt.user_id);
    const item = document.createElement("button");
    item.type = "button";
    item.className = `answered-item ${attempt.is_correct ? "correct" : "incorrect"}`;
    item.innerHTML = `
      <span>
        <strong>${profile.display_name || profile.email || "Student"} · ${attempt.problem_id}</strong>
        <small>${topicName(attempt.topic)} · 选择 ${attempt.selected_answer || "-"} / 正答 ${attempt.correct_answer || "-"} · ${dateTime(attempt.submitted_at)}</small>
      </span>
      <b>${attempt.is_correct ? "正确 / Correct" : "错误 / Wrong"}</b>
    `;
    item.addEventListener("click", () => jumpToProblem(attempt.problem_id));
    els.adminRecentList.appendChild(item);
  }
}

async function loadAdminDashboard() {
  if (!isAdmin()) return;
  const client = cloudClient();
  if (!client) return;
  els.adminMeta.textContent = "正在读取 Supabase 数据... / Loading Supabase data...";
  const [profilesResult, attemptsResult] = await Promise.all([
    client.from("profiles").select("id,email,display_name,role,created_at").order("created_at", { ascending: false }),
    client
      .from("attempts")
      .select("id,user_id,problem_id,exam_id,year,level,form,number,topic,difficulty,selected_answer,correct_answer,is_correct,time_spent_seconds,mode,submitted_at")
      .order("submitted_at", { ascending: false })
      .limit(5000),
  ]);
  if (profilesResult.error) {
    els.adminMeta.textContent = `读取学生失败 / Failed to load students: ${profilesResult.error.message}`;
    return;
  }
  if (attemptsResult.error) {
    els.adminMeta.textContent = `读取作答失败 / Failed to load attempts: ${attemptsResult.error.message}`;
    return;
  }
  state.adminData = {
    profiles: profilesResult.data || [],
    attempts: attemptsResult.data || [],
  };
  setupAdminFilters();
  renderAdminDashboard();
}

function exportAdminCsv() {
  if (!isAdmin()) return;
  const rows = filterAdminAttempts();
  const headers = ["student_email", "student_name", "problem_id", "exam_id", "year", "level", "form", "number", "topic", "difficulty", "selected_answer", "correct_answer", "is_correct", "mode", "submitted_at"];
  const escapeCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((attempt) => {
      const profile = profileFor(attempt.user_id);
      return [
        profile.email,
        profile.display_name,
        attempt.problem_id,
        attempt.exam_id,
        attempt.year,
        attempt.level,
        attempt.form,
        attempt.number,
        topicName(attempt.topic),
        attempt.difficulty,
        attempt.selected_answer,
        attempt.correct_answer,
        attempt.is_correct,
        attempt.mode,
        attempt.submitted_at,
      ].map(escapeCell).join(",");
    }),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `amc-admin-attempts-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function jumpToProblem(problemId) {
  const problem = state.problems.find((item) => item.id === problemId);
  if (!problem) return;
  stopTimer();
  state.mode = "single";
  state.activeExamId = null;
  showPracticeShell();
  els.yearFilter.value = "all";
  els.levelFilter.value = "all";
  els.formFilter.value = "all";
  els.examFilter.value = "all";
  els.topicFilter.value = "all";
  els.difficultyFilter.value = "all";
  els.searchFilter.value = "";
  state.filtered = state.problems.slice().sort((a, b) => (
    b.year - a.year ||
    a.level - b.level ||
    a.form.localeCompare(b.form) ||
    a.number - b.number
  ));
  state.currentIndex = Math.max(0, state.filtered.findIndex((item) => item.id === problemId));
  state.selectedChoice = problemProgress(problem)?.choice || null;
  state.revealed = true;
  render();
}

function statusLabels(problem, progress = null, marks = {}) {
  const labels = [];
  if (!progress) labels.push("未做 / Unattempted");
  if (progress?.correct) labels.push("做对 / Correct");
  if (progress && !progress.correct) labels.push("做错 / Incorrect");
  if (marks.solutionViewed) labels.push("看过解析 / Solution Viewed");
  if (marks.favorite) labels.push("收藏 / Favorite");
  if (progress?.needsReview) labels.push("需要复习 / Needs Review");
  return labels;
}

function renderProblemCollection(target, items, emptyText, options = {}) {
  target.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = emptyText;
    target.appendChild(empty);
    return;
  }

  for (const { problem, progress = null, marks = problemMarks(problem) } of items) {
    const button = document.createElement("button");
    button.type = "button";
    const priority = progress?.needsReview ? " needs-review" : "";
    const correctness = progress ? (progress.correct ? " correct" : " incorrect") : "";
    button.className = `answered-item${correctness}${priority}`;
    const labels = statusLabels(problem, progress, marks)
      .map((label) => `<em>${label}</em>`)
      .join("");
    const detail = options.detail?.(problem, progress, marks) ||
      `${topicName(problem.primary_topic)} · ${difficultyRange(problem)} 题 / band · ${progress?.choice ? `你的答案 / Your answer ${progress.choice}` : "未作答 / Not answered"}`;
    button.innerHTML = `
      <span>
        <strong>${problem.display_name} #${problem.number}</strong>
        <small>${detail}</small>
        <span class="status-mini-row">${labels}</span>
      </span>
      <b>${options.badge?.(problem, progress, marks) || (progress?.needsReview ? "复习 / Review" : "查看 / View")}</b>
    `;
    button.addEventListener("click", () => jumpToProblem(problem.id));
    target.appendChild(button);
  }
}

function renderReviewDashboard() {
  const answered = answeredProblems();
  const correct = answered.filter((item) => item.progress.correct).length;
  const mistakes = mistakeProblems();
  const priorityMistakes = mistakes.filter((item) => item.progress.needsReview);
  const favorites = favoriteProblems();
  els.reviewTotal.textContent = String(answered.length);
  els.reviewCorrect.textContent = String(correct);
  els.reviewAccuracy.textContent = percent(correct, answered.length);
  els.reviewPriority.textContent = String(priorityMistakes.length);
  els.reviewFavorites.textContent = String(favorites.length);
  const recordScope = isLoggedIn()
    ? `云端账号 ${displayName()} / Cloud account ${displayName()}`
    : "游客本机记录 / Guest local records";
  els.reviewMeta.textContent = answered.length
    ? `${recordScope}：已保存 ${answered.length} 道作答记录，${priorityMistakes.length} 道高优先级错题需要复习 / ${answered.length} attempts saved; ${priorityMistakes.length} high-priority errors need review.`
    : `${recordScope}：还没有保存作答记录 / No attempt records yet.`;
  els.diagnosisTitle.textContent = answered.length ? `${topicDiagnosis().length} 个知识点 / topics` : "暂无记录 / No records";
  els.answeredTitle.textContent = `${answered.length} 题 / problems`;
  els.mistakeTitle.textContent = `${filteredMistakeProblems().length}/${mistakes.length} 题 / problems`;
  els.favoriteTitle.textContent = `${favorites.length} 题 / problems`;
  els.weeklyTitle.textContent = `${weeklyProblems().length} 题 / problems`;

  els.diagnosisRows.innerHTML = "";
  const diagnosis = topicDiagnosis();
  if (!diagnosis.length) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="4">提交答案后，这里会自动生成知识点正确率和复习建议。 / After you submit answers, topic accuracy and review suggestions will appear here.</td>';
    els.diagnosisRows.appendChild(row);
  } else {
    for (const stat of diagnosis) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${topicName(stat.tag)}</td>
        <td>${stat.total}</td>
        <td>${percent(stat.correct, stat.total)}</td>
        <td>${diagnosisAdvice(stat)}</td>
      `;
      els.diagnosisRows.appendChild(row);
    }
  }

  renderProblemCollection(
    els.mistakeList,
    filteredMistakeProblems(),
    "还没有符合筛选条件的错题。提交错误答案后会自动加入这里。 / No matching mistakes yet. Incorrect submissions will be added automatically.",
    {
      badge: (problem, progress) => progress?.needsReview ? `${progress.reviewCorrectStreak || 0}/2` : "已降级 / Lower Priority",
      detail: (problem, progress) => `${topicName(problem.primary_topic)} · ${difficultyRange(problem)} 题 / band · 错 ${progress?.wrongAttempts || 0} 次 / wrong ${progress?.wrongAttempts || 0} time(s)`,
    }
  );
  renderProblemCollection(els.favoriteList, favorites, "还没有收藏题。遇到好题、难题或典型题时点击“收藏”。 / No favorites yet. Click Favorite on strong, difficult, or representative problems.");
  renderProblemCollection(
    els.weeklyList,
    weeklyProblems(),
    "本周推荐题暂未配置。 / Weekly picks are not configured yet.",
    {
      badge: () => "推荐 / Pick",
      detail: (problem) => `${topicName(problem.primary_topic)} · ${difficultyRange(problem)} 题 / band · 数学社推荐 / Math Club pick`,
    }
  );
  renderProblemCollection(els.answeredList, answered, "还没有已做题目。先进入单题练习或全卷练习提交答案。 / No answered problems yet. Submit answers in single practice or full mock mode first.");
}

function render() {
  renderStats();
  renderList();
  renderProblem();
}

function renderStats() {
  const visibleIds = new Set(state.filtered.map((problem) => problem.id));
  const visibleProgress = state.mode === "exam" && !state.examSubmitted
    ? Object.entries(state.examAnswers)
      .filter(([id]) => visibleIds.has(id))
      .map(([, value]) => value)
    : Object.entries(state.progress)
      .filter(([id]) => visibleIds.has(id))
      .map(([, value]) => value);
  els.statTotal.textContent = String(state.filtered.length);
  els.statAnswered.textContent = String(visibleProgress.length);
  els.statCorrect.textContent = state.mode === "exam" && !state.examSubmitted
    ? "-"
    : String(visibleProgress.filter((item) => item.correct).length);
  if (state.mode === "exam") {
    const exam = examById(state.activeExamId);
    els.datasetMeta.textContent = exam ? `全卷练习 / Full Mock · ${exam.display_name} · 75 分钟 / 75 min` : "全卷练习 / Full Mock";
  } else if (state.mode === "assignment") {
    const assignment = state.assignments.find((item) => item.id === state.activeAssignmentId);
    els.datasetMeta.textContent = assignment
      ? `老师布置题目 / Assigned Problems · ${assignment.title || "Math Club AMC Practice"} · ${state.filtered.length} 题 / problems`
      : `老师布置题目 / Assigned Problems · ${state.filtered.length} 题 / problems`;
  } else {
    updateDatasetMeta();
  }
}

function renderList() {
  els.problemList.innerHTML = "";
  els.listTitle.textContent = `${state.filtered.length} 题 / problems`;

  if (!state.filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "没有匹配题目 / No matching problems";
    els.problemList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  state.filtered.forEach((problem, index) => {
    const progress = currentProgress(problem);
    const marks = problemMarks(problem);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "problem-tile";
    if (index === state.currentIndex) button.classList.add("active");
    if (state.mode === "exam" && !state.examSubmitted && progress) button.classList.add("answered");
    if (!(state.mode === "exam" && !state.examSubmitted) && progress?.correct) button.classList.add("correct");
    if (!(state.mode === "exam" && !state.examSubmitted) && progress && !progress.correct) button.classList.add("incorrect");
    if (progress?.needsReview) button.classList.add("needs-review");
    if (marks.favorite) button.classList.add("favorite");
    if (marks.solutionViewed) button.classList.add("solution-viewed");
    button.textContent = state.mode === "exam" || state.mode === "assignment" ? `#${problem.number}` : `${problem.year} ${problem.level}${problem.form}-${problem.number}`;
    button.title = `${problem.display_name} #${problem.number}`;
    button.addEventListener("click", () => {
      state.currentIndex = index;
      const nextProgress = currentProgress(problem);
      state.selectedChoice = nextProgress?.choice || null;
      state.revealed = state.mode === "exam" ? state.examSubmitted : Boolean(nextProgress);
      render();
    });
    fragment.appendChild(button);
  });
  els.problemList.appendChild(fragment);
}

function renderProblem() {
  const problem = currentProblem();
  if (!problem) {
    els.problemKicker.textContent = "-";
    els.problemTitle.textContent = "没有匹配题目 / No matching problems";
    els.statement.innerHTML = "";
    els.choicePanel.innerHTML = "";
    els.favoriteProblem.disabled = true;
    setAnswerPanel(null);
    return;
  }

  const progress = currentProgress(problem);
  if (!state.selectedChoice && progress?.choice) state.selectedChoice = progress.choice;
  if (state.mode === "exam") {
    state.revealed = state.examSubmitted;
  } else if (progress) {
    state.revealed = true;
  }

  els.problemKicker.textContent = `${problem.display_name} · ${topicName(problem.primary_topic)}`;
  els.problemTitle.textContent = `Problem ${problem.number} / 第 ${problem.number} 题`;
  els.statement.innerHTML = sanitizeHtml(problem.statement_html || `<p>${problem.statement_text}</p>`);
  renderChoices(problem, progress);
  setAnswerPanel(problem, progress);
  els.prevProblem.disabled = state.currentIndex === 0;
  els.nextProblem.disabled = state.currentIndex === state.filtered.length - 1;
  els.submitAnswer.textContent = state.mode === "exam" && !state.examSubmitted ? "保存本题 / Save" : "提交 / Submit";
  els.submitAnswer.disabled = state.mode === "exam" && state.examSubmitted;
  els.revealAnswer.disabled = state.mode === "exam" && !state.examSubmitted;
  els.clearAnswer.disabled = state.mode === "exam" && state.examSubmitted;
  els.favoriteProblem.disabled = false;
  els.submitExam.disabled = state.mode !== "exam" || state.examSubmitted;
  renderExamResult();
  queueMathTypeset(document.querySelector(".workspace"));
}

function renderChoices(problem, progress) {
  els.choicePanel.innerHTML = "";
  const choices = problem.choices || {};
  for (const letter of ["A", "B", "C", "D", "E"]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    if (state.selectedChoice === letter) button.classList.add("selected");
    if (state.mode === "exam" && state.examSubmitted) button.disabled = true;
    if (canShowAnswer(progress)) {
      if (answerMatches(problem, letter)) button.classList.add("correct-choice");
      if (state.selectedChoice === letter && !answerMatches(problem, letter)) button.classList.add("wrong-choice");
    }
    button.innerHTML = `<span class="choice-letter">${letter}</span><span class="choice-text"></span>`;
    setMathText(button.querySelector(".choice-text"), choices[letter] || letter);
    button.addEventListener("click", () => setSelected(letter));
    els.choicePanel.appendChild(button);
  }
}

function setAnswerPanel(problem, progress = null) {
  els.answerStatus.className = "answer-status";
  els.answerDetail.textContent = "";
  els.problemStatusTags.innerHTML = "";
  els.topicTags.innerHTML = "";
  els.solutionBody.innerHTML = "";

  if (!problem) {
    els.answerStatus.textContent = "未选择题目 / No problem selected";
    updateSolutionStageButtons(null, false);
    return;
  }

  if (state.mode === "exam" && !state.examSubmitted) {
    if (progress?.pending) {
      els.answerStatus.textContent = "已记录本题 / Saved";
      els.answerStatus.classList.add("warn");
    } else {
      els.answerStatus.textContent = "未作答 / Not answered";
    }
  } else if (state.mode === "exam" && state.examSubmitted && !progress) {
    els.answerStatus.textContent = "空题 / Blank";
    els.answerStatus.classList.add("warn");
  } else if (progress) {
    els.answerStatus.textContent = progress.correct ? "回答正确 / Correct" : "回答错误 / Incorrect";
    els.answerStatus.classList.add(progress.correct ? "good" : "bad");
  } else if (state.revealed) {
    els.answerStatus.textContent = "已提前显示答案/解析 / Answer and solution revealed";
    els.answerStatus.classList.add("warn");
  } else {
    els.answerStatus.textContent = "未作答 / Not answered";
  }

  els.answerDetail.innerHTML = "";
  const shouldShowAnswer = canShowAnswer(progress);
  if (shouldShowAnswer) {
    if (problem.answer_choice) {
      const answerChoice = document.createElement("span");
      answerChoice.textContent = `答案 / Answer: ${problem.answer_choice}`;
      els.answerDetail.appendChild(answerChoice);
    }
    if (problem.answer_value) {
      if (els.answerDetail.childNodes.length) els.answerDetail.append(" · ");
      const answerValue = document.createElement("span");
      answerValue.append("选项值 / Choice value: ");
      const mathValue = document.createElement("span");
      setMathText(mathValue, problem.answer_value);
      answerValue.appendChild(mathValue);
      els.answerDetail.appendChild(answerValue);
    }
    if (problem.answer_note) {
      if (els.answerDetail.childNodes.length) els.answerDetail.append(" · ");
      const note = document.createElement("span");
      note.textContent = `备注 / Note: ${formatAnswerNote(problem.answer_note)}`;
      els.answerDetail.appendChild(note);
    }
  }

  const marks = problemMarks(problem);
  for (const label of statusLabels(problem, progress, marks)) {
    const chip = document.createElement("span");
    chip.className = "tag";
    chip.textContent = label;
    els.problemStatusTags.appendChild(chip);
  }

  for (const tag of problem.topic_tags || []) {
    const chip = document.createElement("span");
    chip.className = "tag";
    chip.textContent = topicName(tag);
    els.topicTags.appendChild(chip);
  }

  updateSolutionStageButtons(problem, shouldShowAnswer);

  if (!shouldShowAnswer) {
    const prompt = document.createElement("p");
    prompt.textContent = state.mode === "exam"
      ? "考试模式中答案和解析已锁定，提交整卷后统一显示。 / In exam mode, answers and solutions are locked until you submit the full paper."
      : "提交答案后会自动显示解析；作答前也可以点击“看答案/解析”。 / The solution appears after submission; you may also reveal it before answering.";
    els.solutionBody.appendChild(prompt);
  } else if (problem.solution_text) {
    const source = document.createElement("div");
    source.className = "solution-source-note";
    const stage = activeSolutionStage(problem);
    source.textContent = `解析来源 / Source: ${problem.solution_source || "本地题库 / Local bank"} · ${solutionStageLabels[stage] || "解析 / Solution"}`;
    els.solutionBody.appendChild(source);
    const content = document.createElement("div");
    content.className = "solution-stage-content";
    renderPlainText(content, solutionStages(problem)[stage] || problem.solution_text);
    els.solutionBody.appendChild(content);
  } else {
    const note = document.createElement("p");
    note.textContent = "这道题的内嵌解析还未采集，先使用 AoPS 解析页。 / Inline solution is not available yet; please use the AoPS solution page.";
    const link = document.createElement("a");
    link.href = problem.solution_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "打开 AoPS 解析 / Open AoPS Solution";
    els.solutionBody.appendChild(note);
    els.solutionBody.appendChild(link);
  }

  els.problemSource.href = problem.problem_url;
  els.answerSource.href = problem.answer_key_url;
  els.solutionSource.href = problem.solution_url;
  els.favoriteProblem.textContent = marks.favorite ? "取消收藏 / Unfavorite" : "收藏 / Favorite";
}

function renderExamResult() {
  const isExam = state.mode === "exam";
  els.examResultSection.classList.toggle("is-hidden", !isExam);
  els.examResultBody.innerHTML = "";
  if (!isExam) return;

  if (!state.examSubmitted) {
    const answered = Object.keys(state.examAnswers).length;
    els.examResultBody.innerHTML = `
      <div class="exam-score-card">
        <strong>考试进行中 / In Progress</strong>
        <span>${answered}/${state.filtered.length} 题已保存 / saved</span>
      </div>
      <p>全卷练习中不能提前看解析。提交整卷后，会按 AMC 规则计算模拟分数。 / Solutions are locked during the mock exam. Submit the full paper to receive an AMC-style score.</p>
    `;
    return;
  }

  const report = examReport();
  const listText = (items) => items.length ? items.join(", ") : "-";
  const topicRows = report.topicStats.map((stat) => {
    const answered = stat.total - stat.blank;
    return `
      <tr>
        <td>${topicName(stat.tag)}</td>
        <td>${answered}/${stat.total}</td>
        <td>${percent(stat.correct, stat.total)}</td>
      </tr>
    `;
  }).join("");

  els.examResultBody.innerHTML = `
    <div class="exam-score-card">
      <strong>${report.score.toFixed(1)}</strong>
      <span>模拟 AMC 分数 / Simulated AMC Score</span>
    </div>
    <div class="exam-result-list">
      <p><b>正确题号 / Correct:</b> ${listText(report.correct)}</p>
      <p><b>错误题号 / Incorrect:</b> ${listText(report.incorrect)}</p>
      <p><b>空题题号 / Blank:</b> ${listText(report.blank)}</p>
    </div>
    <div class="mini-table-wrap">
      <table class="mini-table">
        <thead><tr><th>知识点 / Topic</th><th>作答 / Answered</th><th>表现 / Performance</th></tr></thead>
        <tbody>${topicRows}</tbody>
      </table>
    </div>
  `;
}

function formatAnswerNote(note) {
  const notes = {
    multiple_accepted: "多个答案被接受 / Multiple answers accepted",
    no_official_choice_correct: "官方选项无正确答案 / No official choice is correct",
    full_credit_all_answers: "原题有误，所有答案给满分 / Flawed problem; all answers receive full credit",
  };
  return notes[note] || note;
}

function applyWorkspaceLayout() {
  if (!els.workspace) return;
  fitWorkspaceLayout();
  els.workspace.style.setProperty("--list-width", `${state.layout.listWidth}px`);
  els.workspace.style.setProperty("--solution-width", `${state.layout.solutionWidth}px`);
}

function fitWorkspaceLayout() {
  if (!els.workspace) return;
  const totalWidth = els.workspace.getBoundingClientRect().width;
  if (!totalWidth || totalWidth < 900) return;

  const minList = 150;
  const minSolution = 280;
  const minProblem = Math.min(520, Math.max(320, totalWidth * 0.32));
  state.layout.listWidth = Math.round(clamp(state.layout.listWidth, minList, Math.min(380, totalWidth * 0.34)));
  state.layout.solutionWidth = Math.round(clamp(state.layout.solutionWidth, minSolution, Math.min(620, totalWidth * 0.42)));

  const maxSideWidth = totalWidth - minProblem - 24;
  const sideWidth = state.layout.listWidth + state.layout.solutionWidth;
  if (sideWidth <= maxSideWidth) return;

  let overflow = sideWidth - maxSideWidth;
  const solutionReduction = Math.min(overflow, Math.max(0, state.layout.solutionWidth - minSolution));
  state.layout.solutionWidth -= solutionReduction;
  overflow -= solutionReduction;
  if (overflow > 0) {
    state.layout.listWidth = Math.max(minList, state.layout.listWidth - overflow);
  }
}

function updateWorkspaceColumn(side, clientX) {
  if (!els.workspace) return;
  const rect = els.workspace.getBoundingClientRect();
  const totalWidth = rect.width;
  const minList = 150;
  const maxList = Math.min(380, Math.max(150, totalWidth * 0.34));
  const minSolution = 280;
  const maxSolution = Math.min(620, Math.max(280, totalWidth * 0.42));
  const minProblem = Math.min(520, Math.max(320, totalWidth * 0.32));

  if (side === "left") {
    const maxAllowed = Math.max(minList, totalWidth - state.layout.solutionWidth - minProblem - 24);
    state.layout.listWidth = Math.round(clamp(clientX - rect.left, minList, Math.min(maxList, maxAllowed)));
  } else {
    const maxAllowed = Math.max(minSolution, totalWidth - state.layout.listWidth - minProblem - 24);
    state.layout.solutionWidth = Math.round(clamp(rect.right - clientX, minSolution, Math.min(maxSolution, maxAllowed)));
  }
  applyWorkspaceLayout();
}

function bindWorkspaceResize() {
  applyWorkspaceLayout();
  window.addEventListener("resize", applyWorkspaceLayout);
  els.workspaceResizers.forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const side = handle.dataset.resize;
      document.body.classList.add("is-resizing");
      handle.setPointerCapture?.(event.pointerId);

      const onPointerMove = (moveEvent) => {
        updateWorkspaceColumn(side, moveEvent.clientX);
      };

      const onPointerUp = () => {
        document.body.classList.remove("is-resizing");
        saveLayout();
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);
    });

    handle.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const side = handle.dataset.resize;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const delta = 18 * direction;
      updateWorkspaceColumn(side, handle.getBoundingClientRect().left + delta);
      saveLayout();
    });
  });
}

async function loadProblemBank() {
  const errors = [];
  for (const url of DATA_URLS) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(errors.join("；"));
}

function bindEvents() {
  els.openLogin.addEventListener("click", () => openAuthForm("login"));
  els.openSignup.addEventListener("click", () => openAuthForm("signup"));
  els.continueGuest.addEventListener("click", enterGuestMode);
  els.authCancel.addEventListener("click", closeAuthForm);
  els.authForm.addEventListener("submit", handleAuthSubmit);
  els.logoutButton.addEventListener("click", logout);
  els.topLogoutButton.addEventListener("click", logout);
  [els.adminDashboardButton, els.topAdminDashboardButton, els.reviewAdminDashboardButton].forEach((button) => {
    button.addEventListener("click", showAdminDashboard);
  });
  els.adminRefresh.addEventListener("click", loadAdminDashboard);
  els.adminExportCsv.addEventListener("click", exportAdminCsv);
  els.adminToPractice.addEventListener("click", continuePracticeFromReview);
  els.adminToEntry.addEventListener("click", showEntry);
  [els.adminStudentFilter, els.adminYearFilter, els.adminLevelFilter, els.adminTopicFilter, els.adminDifficultyFilter, els.adminDateFrom, els.adminDateTo].forEach((control) => {
    control.addEventListener("change", renderAdminDashboard);
  });
  els.singlePracticeMode.addEventListener("click", enterSinglePractice);
  els.assignedPracticeMode.addEventListener("click", showAssignedAssignments);
  els.assignmentRefresh.addEventListener("click", loadAssignedAssignments);
  els.assignmentToEntry.addEventListener("click", showEntry);
  els.startFullExam.addEventListener("click", enterFullExam);
  els.reviewMode.addEventListener("click", showReview);
  els.aboutMode.addEventListener("click", showAbout);
  els.backToEntry.addEventListener("click", showEntry);
  els.openReview.addEventListener("click", showReview);
  els.openAbout.addEventListener("click", showAbout);
  els.reviewToPractice.addEventListener("click", continuePracticeFromReview);
  els.reviewToAbout.addEventListener("click", showAbout);
  els.reviewToEntry.addEventListener("click", showEntry);
  els.aboutToPractice.addEventListener("click", enterSinglePractice);
  els.aboutToEntry.addEventListener("click", showEntry);
  [els.mistakeTopicFilter, els.mistakeYearFilter, els.mistakeDifficultyFilter, els.mistakeStatusFilter].forEach((select) => {
    select.addEventListener("change", renderReviewDashboard);
  });
  [els.yearFilter, els.levelFilter, els.formFilter, els.examFilter, els.topicFilter, els.difficultyFilter].forEach((select) => {
    select.addEventListener("change", () => applyFilters(true));
  });
  els.searchFilter.addEventListener("input", () => applyFilters(true));
  els.resetFilters.addEventListener("click", () => {
    els.yearFilter.value = "all";
    els.levelFilter.value = "all";
    els.formFilter.value = "all";
    els.examFilter.value = "all";
    els.topicFilter.value = "all";
    els.difficultyFilter.value = "all";
    els.searchFilter.value = "";
    applyFilters();
  });
  els.submitAnswer.addEventListener("click", submitAnswer);
  els.submitExam.addEventListener("click", submitWholeExam);
  els.revealAnswer.addEventListener("click", revealAnswer);
  els.solutionStageControl.querySelectorAll(".solution-stage-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.solutionStage = button.dataset.stage || "idea";
      renderProblem();
    });
  });
  els.favoriteProblem.addEventListener("click", toggleFavorite);
  els.clearAnswer.addEventListener("click", clearAnswer);
  els.prevProblem.addEventListener("click", () => move(-1));
  els.nextProblem.addEventListener("click", () => move(1));
  els.randomProblem.addEventListener("click", chooseRandom);
}

async function init() {
  bindEvents();
  bindWorkspaceResize();
  renderAuthState();
  try {
    state.data = await loadProblemBank();
    state.problems = state.data.problems.slice().sort((a, b) => (
      b.year - a.year ||
      a.level - b.level ||
      a.form.localeCompare(b.form) ||
      a.number - b.number
    ));
    normalizeStoredProgress();
    initFilters();
    updateDatasetMeta();
    await initAuth();
    const problemId = new URLSearchParams(window.location.search).get("problem");
    const directProblem = problemById(problemId);
    if (directProblem) {
      enterSinglePractice();
      state.filtered = [directProblem];
      state.currentIndex = 0;
      state.selectedChoice = problemProgress(directProblem)?.choice || null;
      state.revealed = Boolean(problemProgress(directProblem));
      render();
    } else {
      showEntry();
    }
  } catch (error) {
    els.datasetMeta.textContent = "题库加载失败 / Problem bank failed to load";
    els.entryMeta.textContent = "题库加载失败 / Problem bank failed to load";
    els.statement.innerHTML = `<p class="empty">无法读取题库文件 / Unable to read problem bank file: ${error.message}</p>`;
  }
}

init();
