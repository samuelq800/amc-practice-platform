const DATA_URL = "../amc_aops_2010_present.json";
const STORAGE_KEY = "amc-practice-progress-v1";
const MARKS_KEY = "amc-practice-marks-v1";
const FULL_EXAM_SECONDS = 75 * 60;

const weeklyRecommendationIds = [
  "2025_AMC_10A_10",
  "2025_AMC_12A_15",
  "2024_AMC_10B_20",
  "2024_AMC_12A_25",
];

const topicLabels = {
  algebra: "代数",
  geometry: "几何",
  number_theory: "数论",
  counting_and_probability: "计数与概率",
  prealgebra: "预代数",
  precalculus: "预备微积分",
};

const els = {
  entryScreen: document.querySelector("#entryScreen"),
  practiceShell: document.querySelector("#practiceShell"),
  entryMeta: document.querySelector("#entryMeta"),
  singlePracticeMode: document.querySelector("#singlePracticeMode"),
  fullExamSelect: document.querySelector("#fullExamSelect"),
  startFullExam: document.querySelector("#startFullExam"),
  reviewMode: document.querySelector("#reviewMode"),
  aboutMode: document.querySelector("#aboutMode"),
  aboutScreen: document.querySelector("#aboutScreen"),
  aboutToPractice: document.querySelector("#aboutToPractice"),
  aboutToEntry: document.querySelector("#aboutToEntry"),
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
  mode: "entry",
  activeExamId: null,
  examAnswers: {},
  examSubmitted: false,
  timerRemaining: FULL_EXAM_SECONDS,
  timerId: null,
  progress: loadProgress(),
  marks: loadMarks(),
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

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function saveMarks() {
  localStorage.setItem(MARKS_KEY, JSON.stringify(state.marks));
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
    ? `${state.data.exams.length} 套试卷 · ${state.data.problems.length} 题 · ${state.data.solution_summary?.solution_text_count || 0} 题内嵌解析`
    : "Loading...";
  els.entryMeta.textContent = text;
  els.datasetMeta.textContent = text;
}

function updateTimer() {
  const minutes = Math.floor(state.timerRemaining / 60);
  const seconds = state.timerRemaining % 60;
  els.timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  els.timerLabel.textContent = state.timerRemaining > 0 ? "剩余时间" : "时间到";
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
  state.examSubmitted = false;
  els.entryScreen.classList.remove("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
}

function showPracticeShell() {
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.remove("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
  els.filters.classList.toggle("is-hidden", state.mode === "exam");
  els.randomProblem.classList.toggle("is-hidden", state.mode === "exam");
  els.timerPanel.classList.toggle("is-hidden", state.mode !== "exam");
  els.submitExam.classList.toggle("is-hidden", state.mode !== "exam");
  els.revealAnswer.disabled = state.mode === "exam" && !state.examSubmitted;
}

function showReview() {
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.reviewScreen.classList.remove("is-hidden");
  els.aboutScreen.classList.add("is-hidden");
  renderReviewDashboard();
}

function showAbout() {
  els.entryScreen.classList.add("is-hidden");
  els.practiceShell.classList.add("is-hidden");
  els.reviewScreen.classList.add("is-hidden");
  els.aboutScreen.classList.remove("is-hidden");
}

function continuePracticeFromReview() {
  if (state.mode === "exam" || state.mode === "single") {
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
  showPracticeShell();
  applyFilters();
}

function enterFullExam() {
  const examId = els.fullExamSelect.value;
  const exam = examById(examId);
  if (!exam) return;
  state.mode = "exam";
  state.activeExamId = examId;
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
    "\n$$$$$1$$$$\n"
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
    .split(/\n{2,}|(?<=\.)\s+(?=(?:We|Thus|Since|The answer|Therefore|Let|Using)\b)/)
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

  fillSelect(els.yearFilter, years, "全部年份");
  fillSelect(els.levelFilter, [["10", "AMC 10"], ["12", "AMC 12"]], "全部考试");
  fillSelect(els.formFilter, [["A", "A 卷"], ["B", "B 卷"]], "全部卷别");
  fillSelect(els.examFilter, exams, "全部试卷");
  fillExactSelect(els.fullExamSelect, exams);
  fillSelect(els.topicFilter, topics, "全部知识点");
  fillSelect(els.mistakeTopicFilter, topics, "全部知识点");
  fillSelect(els.mistakeYearFilter, years, "全部年份");
  fillSelect(
    els.mistakeDifficultyFilter,
    [
      ["1-10", "1-10 题"],
      ["10-18", "10-18 题"],
      ["19-25", "19-25 题"],
    ],
    "全部难度"
  );
  fillSelect(
    els.mistakeStatusFilter,
    [
      ["priority", "高优先级"],
      ["wrong_history", "错题历史"],
      ["favorite", "收藏"],
      ["solution_viewed", "看过解析"],
    ],
    "全部状态"
  );
  fillSelect(
    els.difficultyFilter,
    [
      ["1-10", "1-10 题"],
      ["10-18", "10-18 题"],
      ["19-25", "19-25 题"],
    ],
    "全部难度"
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
  render();
}

function canShowAnswer(progress = null) {
  if (state.mode === "exam") return state.examSubmitted;
  return Boolean(state.revealed || progress);
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
  recordSubmission(problem, state.selectedChoice);
  state.revealed = true;
  markSolutionViewed(problem);
  saveProgress();
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
    recordSubmission(problem, answer.choice, {
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
  if (stat.total < 3) return "样本较少，继续做几题后再判断";
  if (accuracy < 0.5) return `优先复习 ${topicName(stat.tag)} 基础题`;
  if (accuracy < 0.7) return "建议复盘错题，再做同类中档题";
  if (accuracy < 0.85) return "整体稳定，可练中高难题";
  return "掌握较好，保持限时训练";
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
  if (!progress) labels.push("未做");
  if (progress?.correct) labels.push("做对");
  if (progress && !progress.correct) labels.push("做错");
  if (marks.solutionViewed) labels.push("看过解析");
  if (marks.favorite) labels.push("收藏");
  if (progress?.needsReview) labels.push("需要复习");
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
      `${topicName(problem.primary_topic)} · ${difficultyRange(problem)} 题 · ${progress?.choice ? `你的答案 ${progress.choice}` : "未作答"}`;
    button.innerHTML = `
      <span>
        <strong>${problem.display_name} #${problem.number}</strong>
        <small>${detail}</small>
        <span class="status-mini-row">${labels}</span>
      </span>
      <b>${options.badge?.(problem, progress, marks) || (progress?.needsReview ? "复习" : "查看")}</b>
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
  els.reviewMeta.textContent = answered.length
    ? `本机已保存 ${answered.length} 道作答记录，${priorityMistakes.length} 道高优先级错题需要复习`
    : "本机还没有保存作答记录";
  els.diagnosisTitle.textContent = answered.length ? `${topicDiagnosis().length} 个知识点` : "暂无记录";
  els.answeredTitle.textContent = `${answered.length} 题`;
  els.mistakeTitle.textContent = `${filteredMistakeProblems().length}/${mistakes.length} 题`;
  els.favoriteTitle.textContent = `${favorites.length} 题`;
  els.weeklyTitle.textContent = `${weeklyProblems().length} 题`;

  els.diagnosisRows.innerHTML = "";
  const diagnosis = topicDiagnosis();
  if (!diagnosis.length) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="4">提交答案后，这里会自动生成知识点正确率和复习建议。</td>';
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
    "还没有符合筛选条件的错题。提交错误答案后会自动加入这里。",
    {
      badge: (problem, progress) => progress?.needsReview ? `${progress.reviewCorrectStreak || 0}/2` : "已降级",
      detail: (problem, progress) => `${topicName(problem.primary_topic)} · ${difficultyRange(problem)} 题 · 错 ${progress?.wrongAttempts || 0} 次`,
    }
  );
  renderProblemCollection(els.favoriteList, favorites, "还没有收藏题。遇到好题、难题或典型题时点击“收藏”。");
  renderProblemCollection(
    els.weeklyList,
    weeklyProblems(),
    "本周推荐题暂未配置。",
    {
      badge: () => "推荐",
      detail: (problem) => `${topicName(problem.primary_topic)} · ${difficultyRange(problem)} 题 · 数学社推荐`,
    }
  );
  renderProblemCollection(els.answeredList, answered, "还没有已做题目。先进入单题练习或全卷练习提交答案。");
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
    els.datasetMeta.textContent = exam ? `全卷练习 · ${exam.display_name} · 75 分钟` : "全卷练习";
  } else {
    updateDatasetMeta();
  }
}

function renderList() {
  els.problemList.innerHTML = "";
  els.listTitle.textContent = `${state.filtered.length} 题`;

  if (!state.filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "没有匹配题目";
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
    button.textContent = state.mode === "exam" ? `#${problem.number}` : `${problem.year} ${problem.level}${problem.form}-${problem.number}`;
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
    els.problemTitle.textContent = "没有匹配题目";
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
  els.problemTitle.textContent = `Problem ${problem.number}`;
  els.statement.innerHTML = sanitizeHtml(problem.statement_html || `<p>${problem.statement_text}</p>`);
  renderChoices(problem, progress);
  setAnswerPanel(problem, progress);
  els.prevProblem.disabled = state.currentIndex === 0;
  els.nextProblem.disabled = state.currentIndex === state.filtered.length - 1;
  els.submitAnswer.textContent = state.mode === "exam" && !state.examSubmitted ? "保存本题" : "提交";
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
    els.answerStatus.textContent = "未选择题目";
    return;
  }

  if (state.mode === "exam" && !state.examSubmitted) {
    if (progress?.pending) {
      els.answerStatus.textContent = "已记录本题";
      els.answerStatus.classList.add("warn");
    } else {
      els.answerStatus.textContent = "未作答";
    }
  } else if (state.mode === "exam" && state.examSubmitted && !progress) {
    els.answerStatus.textContent = "空题";
    els.answerStatus.classList.add("warn");
  } else if (progress) {
    els.answerStatus.textContent = progress.correct ? "回答正确" : "回答错误";
    els.answerStatus.classList.add(progress.correct ? "good" : "bad");
  } else if (state.revealed) {
    els.answerStatus.textContent = "已提前显示答案/解析";
    els.answerStatus.classList.add("warn");
  } else {
    els.answerStatus.textContent = "未作答";
  }

  els.answerDetail.innerHTML = "";
  const shouldShowAnswer = canShowAnswer(progress);
  if (shouldShowAnswer) {
    if (problem.answer_choice) {
      const answerChoice = document.createElement("span");
      answerChoice.textContent = `答案：${problem.answer_choice}`;
      els.answerDetail.appendChild(answerChoice);
    }
    if (problem.answer_value) {
      if (els.answerDetail.childNodes.length) els.answerDetail.append(" · ");
      const answerValue = document.createElement("span");
      answerValue.append("选项值：");
      const mathValue = document.createElement("span");
      setMathText(mathValue, problem.answer_value);
      answerValue.appendChild(mathValue);
      els.answerDetail.appendChild(answerValue);
    }
    if (problem.answer_note) {
      if (els.answerDetail.childNodes.length) els.answerDetail.append(" · ");
      const note = document.createElement("span");
      note.textContent = `备注：${formatAnswerNote(problem.answer_note)}`;
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

  if (!shouldShowAnswer) {
    const prompt = document.createElement("p");
    prompt.textContent = state.mode === "exam"
      ? "考试模式中答案和解析已锁定，提交整卷后统一显示。"
      : "提交答案后会自动显示解析；作答前也可以点击“看答案/解析”。";
    els.solutionBody.appendChild(prompt);
  } else if (problem.solution_text) {
    const source = document.createElement("div");
    source.className = "solution-source-note";
    source.textContent = `解析来源：${problem.solution_source || "本地题库"}`;
    els.solutionBody.appendChild(source);
    const content = document.createElement("div");
    renderPlainText(content, problem.solution_text);
    els.solutionBody.appendChild(content);
  } else {
    const note = document.createElement("p");
    note.textContent = "这道题的内嵌解析还未采集，先使用 AoPS 解析页。";
    const link = document.createElement("a");
    link.href = problem.solution_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "打开 AoPS 解析";
    els.solutionBody.appendChild(note);
    els.solutionBody.appendChild(link);
  }

  els.problemSource.href = problem.problem_url;
  els.answerSource.href = problem.answer_key_url;
  els.solutionSource.href = problem.solution_url;
  els.favoriteProblem.textContent = marks.favorite ? "取消收藏" : "收藏";
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
        <strong>考试进行中</strong>
        <span>${answered}/${state.filtered.length} 题已保存</span>
      </div>
      <p>全卷练习中不能提前看解析。提交整卷后，会按 AMC 规则计算模拟分数。</p>
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
      <span>模拟 AMC 分数</span>
    </div>
    <div class="exam-result-list">
      <p><b>正确题号：</b>${listText(report.correct)}</p>
      <p><b>错误题号：</b>${listText(report.incorrect)}</p>
      <p><b>空题题号：</b>${listText(report.blank)}</p>
    </div>
    <div class="mini-table-wrap">
      <table class="mini-table">
        <thead><tr><th>知识点</th><th>作答</th><th>表现</th></tr></thead>
        <tbody>${topicRows}</tbody>
      </table>
    </div>
  `;
}

function formatAnswerNote(note) {
  const notes = {
    multiple_accepted: "多个答案被接受",
    no_official_choice_correct: "官方选项无正确答案",
    full_credit_all_answers: "原题有误，所有答案给满分",
  };
  return notes[note] || note;
}

function bindEvents() {
  els.singlePracticeMode.addEventListener("click", enterSinglePractice);
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
  els.favoriteProblem.addEventListener("click", toggleFavorite);
  els.clearAnswer.addEventListener("click", clearAnswer);
  els.prevProblem.addEventListener("click", () => move(-1));
  els.nextProblem.addEventListener("click", () => move(1));
  els.randomProblem.addEventListener("click", chooseRandom);
}

async function init() {
  bindEvents();
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
    state.problems = state.data.problems.slice().sort((a, b) => (
      b.year - a.year ||
      a.level - b.level ||
      a.form.localeCompare(b.form) ||
      a.number - b.number
    ));
    normalizeStoredProgress();
    initFilters();
    updateDatasetMeta();
    showEntry();
  } catch (error) {
    els.datasetMeta.textContent = "题库加载失败";
    els.entryMeta.textContent = "题库加载失败";
    els.statement.innerHTML = `<p class="empty">无法读取题库文件：${error.message}</p>`;
  }
}

init();
