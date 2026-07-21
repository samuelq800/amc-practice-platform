(function mathAdminAssignments() {
  "use strict";

  const els = {
    title: document.querySelector("#mathAdminAssignmentTitle"),
    name: document.querySelector("#mathAdminAssignmentName"),
    due: document.querySelector("#mathAdminAssignmentDue"),
    contest: document.querySelector("#mathAdminAssignmentContest"),
    problem: document.querySelector("#mathAdminAssignmentProblem"),
    add: document.querySelector("#mathAdminAddProblem"),
    notes: document.querySelector("#mathAdminAssignmentNotes"),
    draft: document.querySelector("#mathAdminAssignmentDraft"),
    publish: document.querySelector("#mathAdminPublish"),
    message: document.querySelector("#mathAdminAssignmentMessage"),
    list: document.querySelector("#mathAdminAssignmentList"),
  };

  const adminState = { assignments: [], draft: [], contest: "AMC" };

  function problemContest(problem) {
    if (state.bmoProblems.some((item) => item.id === problem?.id)) return "BMO";
    if (state.aimeProblems.some((item) => item.id === problem?.id)) return "AIME";
    return "AMC";
  }

  function contestProblems(contest = els.contest.value) {
    if (contest === "BMO") return state.bmoProblems;
    if (contest === "AIME") return state.aimeProblems;
    return state.problems;
  }

  function problemLabel(problem) {
    const contest = problemContest(problem);
    if (contest === "BMO") return `BMO1 ${problem.year_label || problem.year} #${problem.number || "?"} · ${topicName(problem.primary_topic)}`;
    if (contest === "AIME") return `${problem.year} ${problem.form || "AIME"} #${problem.number}`;
    return `${problem.year} AMC ${problem.level}${problem.form} #${problem.number}`;
  }

  function fillProblemSelect() {
    els.problem.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "选择题目 / Select a problem";
    els.problem.appendChild(placeholder);
    contestProblems().forEach((problem) => {
      const option = document.createElement("option");
      option.value = problem.id;
      option.textContent = problemLabel(problem);
      els.problem.appendChild(option);
    });
  }

  function renderDraft() {
    els.draft.innerHTML = "";
    adminState.draft.forEach((problemId) => {
      const problem = problemById(problemId);
      if (!problem) return;
      const chip = document.createElement("span");
      chip.className = "math-assignment-chip";
      chip.append(document.createTextNode(problemLabel(problem)));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "×";
      remove.title = "移除 / Remove";
      remove.addEventListener("click", () => {
        adminState.draft = adminState.draft.filter((id) => id !== problemId);
        renderDraft();
      });
      chip.appendChild(remove);
      els.draft.appendChild(chip);
    });
  }

  function addProblem() {
    const problemId = els.problem.value;
    if (!problemId || adminState.draft.includes(problemId)) return;
    adminState.draft.push(problemId);
    els.problem.value = "";
    els.message.textContent = "";
    renderDraft();
  }

  function formatDate(value) {
    if (!value) return "无截止日期 / No due date";
    return `截止 / Due ${new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value))}`;
  }

  function assignmentContest(assignment) {
    const problem = problemById(assignment.problem_ids?.[0]);
    return problem ? problemContest(problem) : "AMC";
  }

  function renderAssignments() {
    els.title.textContent = `${adminState.assignments.length} assignments`;
    els.list.innerHTML = "";
    if (!adminState.assignments.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "还没有发布数学社任务 / No Math Club assignments yet.";
      els.list.appendChild(empty);
      return;
    }
    adminState.assignments.forEach((assignment) => {
      const item = document.createElement("article");
      item.className = "math-admin-assignment-item";
      const copy = document.createElement("div");
      const heading = document.createElement("strong");
      heading.textContent = assignment.title || `${assignmentContest(assignment)} 练习任务`;
      const meta = document.createElement("small");
      meta.textContent = `${assignmentContest(assignment)} · ${assignment.problem_ids?.length || 0} 题 · ${formatDate(assignment.due_at)}`;
      copy.append(heading, meta);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "撤回 / Remove";
      remove.addEventListener("click", () => deleteAssignment(assignment.id));
      item.append(copy, remove);
      els.list.appendChild(item);
    });
  }

  async function publishAssignment() {
    if (!isAdmin()) return;
    if (!adminState.draft.length) {
      els.message.textContent = "请至少加入一道题目 / Add at least one problem.";
      return;
    }
    const contest = els.contest.value;
    const client = cloudClient();
    els.publish.disabled = true;
    els.message.textContent = "正在发布…… / Publishing...";
    const { error } = await client.from("amc_assignments").insert({
      created_by: state.user.id,
      target_role: "mathclubmembers",
      title: els.name.value.trim() || `${contest} 练习 · ${new Date().toLocaleDateString("zh-CN")}`,
      instructions: els.notes.value.trim() || null,
      problem_ids: adminState.draft,
      due_at: els.due.value ? new Date(`${els.due.value}T23:59:59`).toISOString() : null,
    });
    els.publish.disabled = false;
    if (error) {
      els.message.textContent = `发布失败 / Failed: ${error.message}`;
      return;
    }
    adminState.draft = [];
    els.name.value = "";
    els.notes.value = "";
    els.due.value = "";
    els.message.textContent = "任务已发布给 Math Club / Published.";
    renderDraft();
    await loadAssignments();
  }

  async function deleteAssignment(assignmentId) {
    if (!isAdmin()) return;
    const { error } = await cloudClient().from("amc_assignments").delete().eq("id", assignmentId);
    if (error) {
      els.message.textContent = `撤回失败 / Failed: ${error.message}`;
      return;
    }
    els.message.textContent = "任务已撤回 / Assignment removed.";
    await loadAssignments();
  }

  async function loadAssignments() {
    if (!isAdmin()) return;
    fillProblemSelect();
    const { data, error } = await cloudClient()
      .from("amc_assignments")
      .select("id,title,instructions,problem_ids,due_at,created_at")
      .eq("target_role", "mathclubmembers")
      .order("created_at", { ascending: false });
    if (error) {
      els.message.textContent = `任务读取失败 / Failed: ${error.message}`;
      return;
    }
    adminState.assignments = data || [];
    renderAssignments();
  }

  els.contest.addEventListener("change", () => {
    if (adminState.draft.length && adminState.contest !== els.contest.value) {
      adminState.draft = [];
      renderDraft();
    }
    adminState.contest = els.contest.value;
    fillProblemSelect();
  });
  els.add.addEventListener("click", addProblem);
  els.publish.addEventListener("click", publishAssignment);
  document.querySelector("#adminRefresh")?.addEventListener("click", loadAssignments);
  window.loadMathAdminAssignments = loadAssignments;
}());
