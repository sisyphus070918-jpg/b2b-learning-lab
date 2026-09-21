import {
  LayoutDashboard,
  Route,
  ListChecks,
  ScanSearch,
  Library,
  BarChart3,
  BriefcaseBusiness,
  ArrowUpRight,
  ArrowRight,
  Globe2,
  Check,
  Flame,
  Target,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Download,
  RotateCcw,
  Search,
  CheckCircle2,
  Clock3,
  PencilLine,
  BrainCircuit,
  ClipboardCheck,
  Bot,
  FolderKanban,
  Trophy,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  stages,
  cases,
  knowledge,
  terms,
  briefs,
  dailyLessons,
  makeDayTasks,
  stageCurriculum,
  learningResources,
  knowledgeByDay,
} from "./data";
import { getDailyCourseDetail } from "./dailyCourseDetails";
import { getCourseResources, stageHandbooks } from "./courseEnhancements";
import { useLearning, today, active, streak, download } from "./store";
import type { Answer, State } from "./store";
import { useAgentTools } from "./useAgentTools";
import { aiLessons, aiResources, b2bEssentials, diagnosticQuestions, projectLadder, skillDomains, unifiedRoadmap } from "./learningBlueprint";
const pageNames = [
  "学习总览",
  "综合学习路径",
  "每日任务",
  "案例训练",
  "知识库",
  "成长档案",
  "项目中心",
  "AI 深入教材",
  "能力前测",
  "AI 学习导师",
  "我的作品集",
];
const routes = [
  "overview",
  "path",
  "tasks",
  "cases",
  "library",
  "progress",
  "projects",
  "ai",
  "assessment",
  "mentor",
  "portfolio",
];
const icons = [
  LayoutDashboard,
  Route,
  ListChecks,
  ScanSearch,
  Library,
  BarChart3,
  BriefcaseBusiness,
  BrainCircuit,
  ClipboardCheck,
  Bot,
  Trophy,
];
const blankAnswer = (): Answer => ({
  type: "",
  grade: "",
  position: "",
  reason: "",
  strategy: "",
});
const projectLabels = [
  "产品分析",
  "理想客户画像 ICP",
  "寻找 5 家客户",
  "客户分级",
  "开发策略",
  "报价与交付方案",
];
const projectHints = [
  "写出应用场景、关键参数、工厂优势与待核实信息。",
  "写出地区、客户角色、产品范围、必选条件和排除条件。",
  "每行一家：企业名称、来源或“模拟”、相关证据。请至少填写 5 行，不要编造真实企业资料。",
  "对这 5 家企业分别给出 A / B / C 级、判断证据和待核实问题。",
  "写出目标职位、首轮沟通切入点、后续跟进与下一步。",
  "报价指你的研究服务费。写出金额 / 币种、工作范围、工期、验收标准与不包含的服务。",
];
function initialPage() {
  const index = routes.indexOf(location.hash.slice(1));
  return index < 0 ? 0 : index;
}
const stageForDay = (day: number) =>
  [3, 6, 9, 12, 15, 18, 23, 28].findIndex((end) => day <= end);
const mentorReply = (question: string, selectedDay: number) => {
  const q = question.toLowerCase();
  const context = dailyLessons[selectedDay - 1];
  if (q.includes("不懂") || q.includes("是什么") || q.includes("什么意思"))
    return `先用今天的任务来理解：${context.title}。把问题拆成“我已确认的事实、我的假设、还需要谁来确认”三列；先完成一行，再继续扩展。`;
  if (q.includes("代码") || q.includes("python") || q.includes("报错"))
    return "请先保留完整报错信息、出错代码的最小片段、输入样例和你预期的结果。不要粘贴密钥。先用模拟 CSV 或 JSON 复现，再逐行检查文件路径、字段名和数据类型。";
  if (q.includes("客户") || q.includes("开发") || q.includes("邮件"))
    return "先不要直接发信。确认目标企业的产品页、商业角色和相关证据；把不能证明的采购需求标为待核实。再为一个合理职位写一条只请求下一步验证的个性化草稿。";
  return `你现在处于 Day ${selectedDay}「${context.title}」。请先写出你想得到的输出、已有资料和最担心出错的地方。我会按“概念 → 一个示例 → 可执行练习 → 自测”帮你拆解。`;
};
export default function App() {
  const { state: s, setState, storageError } = useLearning();
  const [page, setPage] = useState(initialPage);
  const [stage, setStage] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [projectStep, setProjectStep] = useState(0);
  const [pathMode, setPathMode] = useState<"unified" | "course" | "resources">("unified");
  const [roadmapPhase, setRoadmapPhase] = useState(0);
  const [resourceCategory, setResourceCategory] = useState("全部");
  const [aiLessonIndex, setAiLessonIndex] = useState(0);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [mentorDraft, setMentorDraft] = useState("");
  const go = (n: number) => {
    setPage(n);
    location.hash = routes[n];
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openUnifiedPath = () => {
    setPathMode("unified");
    go(1);
  };
  useAgentTools(s, go);
  useEffect(() => {
    const listener = () => setPage(initialPage());
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    document.title = `${pageNames[page]} · 出海研习社`;
  }, [page]);
  const dayLesson = dailyLessons[s.selectedDay - 1];
  const stageDays = dailyLessons.filter(
    (lesson) => lesson.stage === stages[stage].title,
  );
  const pathLesson =
    stageDays.find((lesson) => lesson.day === s.selectedDay) || stageDays[0];
  const pathDetail = getDailyCourseDetail(pathLesson.day);
  const pathResources = getCourseResources(pathLesson.day);
  const stageHandbook = stageHandbooks[stages[stage].title] ?? [];
  const knowledgeCategories = [
    "全部",
    ...Array.from(new Set(knowledge.map((item) => item.category))),
  ];
  const visibleKnowledge = knowledge
    .map((item, index) => ({ item, index }))
    .filter(
      ({ item }) =>
        (category === "全部" || item.category === category) &&
        `${item.title}${item.text}`.toLowerCase().includes(query.toLowerCase()),
    );
  const recommendedKnowledge = (knowledgeByDay[s.selectedDay] || [])
    .map((title) => knowledge.find((item) => item.title === title))
    .filter((item): item is (typeof knowledge)[number] => Boolean(item));
  const knowledgeDaysFor = (title: string) =>
    Object.entries(knowledgeByDay)
      .filter(([, titles]) => titles.includes(title))
      .map(([day]) => Number(day));
  const dayTasks = makeDayTasks(s.selectedDay);
  const dayKey = `day-${s.selectedDay}`;
  const done = s.taskDays[dayKey] || [];
  const analyzed = Object.keys(s.answers).length;
  const completedDays = Object.entries(s.taskDays).filter(
    ([key, list]) =>
      key.startsWith("day-") &&
      ["learn", "notes", "practice", "deliver", "review"].every((id) =>
        list.includes(id),
      ),
  ).length;
  const skills = s.lessons.length;
  const diagnosticScore = s.diagnostic.answers.reduce(
    (total, answer, index) => total + (answer === diagnosticQuestions[index]?.[3] ? 1 : 0),
    0,
  );
  const portfolioCount = Object.keys(s.portfolio).length;
  const aiLesson = aiLessons[aiLessonIndex];
  const focusedRoadmapPhase = unifiedRoadmap[roadmapPhase];
  const currentAiResources = aiResources.filter((item) => item.lessonId === aiLesson.id);
  const skillLevel = (domain: string) => {
    const evidence = s.skillEvidence[domain] || 0;
    const diagnosticBoost = s.diagnostic.completedAt ? Math.min(1, Math.floor(diagnosticScore / 5)) : 0;
    return Math.min(3, evidence + diagnosticBoost);
  };
  const level =
    skills >= 8
      ? "项目实践者"
      : skills >= 4
        ? "获客进阶者"
        : skills >= 1
          ? "行业探索者"
          : "入门探索者";
  const update = (fn: (prev: State) => State) =>
    setState((prev) => active(fn(prev)));
  const toggleTask = (id: string) =>
    setState((prev) => {
      const key = `day-${prev.selectedDay}`;
      const list = prev.taskDays[key] || [];
      return active({
        ...prev,
        taskDays: {
          ...prev.taskDays,
          [key]: list.includes(id)
            ? list.filter((x) => x !== id)
            : [...list, id],
        },
      });
    });
  const selectDay = (day: number) =>
    setState((prev) => ({ ...prev, selectedDay: day }));
  const markAiLessonPracticed = (lessonId: string) => {
    const domains: Record<string, string> = { "ai-literacy": "AI 基础", llm: "LLM", prompt: "Prompt", "python-data": "Python", api: "API", agent: "Agent", automation: "自动化" };
    const domain = domains[lessonId] || "AI 基础";
    setState((prev) =>
      active({
        ...prev,
        skillEvidence: { ...prev.skillEvidence, [domain]: Math.min(3, (prev.skillEvidence[domain] || 0) + 1) },
      }),
    );
    setToast("已记录一次实践证据；技能等级还会结合前测与项目完成情况更新");
  };
  const askMentor = () => {
    const prompt = mentorDraft.trim();
    if (!prompt) return;
    setState((prev) =>
      active({
        ...prev,
        mentorMessages: [
          ...prev.mentorMessages,
          { id: crypto.randomUUID(), role: "user", text: prompt, date: today() },
          { id: crypto.randomUUID(), role: "mentor", text: mentorReply(prompt, prev.selectedDay), date: today() },
        ],
      }),
    );
    setMentorDraft("");
  };
  const selectPathDay = (day: number) => {
    const boundedDay = Math.max(1, Math.min(28, day));
    const targetLesson = dailyLessons[boundedDay - 1];
    const targetStage = stages.findIndex((item) => item.title === targetLesson.stage);
    selectDay(boundedDay);
    if (targetStage >= 0) setStage(targetStage);
    requestAnimationFrame(() =>
      document.getElementById("stage-day-course")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    );
  };
  const openB2bCourse = (day: number) => {
    setPathMode("course");
    selectPathDay(day);
    go(1);
  };
  const openAiTextbook = (lessonId: string) => {
    const lessonIndex = aiLessons.findIndex((lesson) => lesson.id === lessonId);
    if (lessonIndex >= 0) setAiLessonIndex(lessonIndex);
    go(7);
  };
  const jumpToCourseSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const chooseStage = (i: number) => {
    setStage(i);
    const firstDay = dailyLessons.find(
      (lesson) => lesson.stage === stages[i].title,
    );
    if (firstDay && dailyLessons[s.selectedDay - 1]?.stage !== stages[i].title) {
      selectDay(firstDay.day);
    }
  };
  const selectStage = (i: number) => {
    chooseStage(i);
    if (window.matchMedia("(max-width: 920px)").matches) {
      requestAnimationFrame(() =>
        document
          .getElementById("stage-lesson")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };
  const openStage = (i: number) => {
    chooseStage(i);
    go(1);
  };
  const openDailyCourseAt = (sectionId: string) => {
    openStage(stageForDay(s.selectedDay));
    requestAnimationFrame(() =>
      requestAnimationFrame(() => jumpToCourseSection(sectionId)),
    );
  };
  const openKnowledgeArticle = (title: string) => {
    const index = knowledge.findIndex((item) => item.title === title);
    if (index < 0) return;
    setCategory("全部");
    setQuery("");
    setArticle(index);
    go(4);
  };
  const selected = cases[caseIndex];
  const draft = s.caseDrafts[selected.id] || blankAnswer();
  const result = s.answers[selected.id];
  const setDraft = (key: keyof Answer, value: string) =>
    setState((prev) => ({
      ...prev,
      caseDrafts: {
        ...prev.caseDrafts,
        [selected.id]: {
          ...(prev.caseDrafts[selected.id] || blankAnswer()),
          [key]: value,
        },
      },
    }));
  const caseValid = !!(
    draft.type &&
    draft.grade &&
    draft.position &&
    draft.reason.trim().length >= 15 &&
    draft.strategy.trim().length >= 15
  );
  const submitCase = () => {
    if (!caseValid) return;
    const score =
      Number(draft.type === selected.type) +
      Number(draft.grade === selected.grade) +
      Number(draft.position === selected.position);
    update((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [selected.id]: { ...draft, score, date: today() },
      },
      mistakes:
        score < 3
          ? [...prev.mistakes, { id: selected.id, date: today(), score }]
          : prev.mistakes,
    }));
    setToast("判断已保存，查看下方逐项反馈");
  };
  const brief = briefs[s.projectIndex];
  const project = s.projects[String(s.projectIndex)] || {
    fields: Array(6).fill("") as string[],
    submitted: false,
  };
  const projectValid = project.fields.every(
    (v, i) =>
      v.trim().length >= 20 &&
      (i !== 2 ||
        v
          .trim()
          .split("\n")
          .filter((l) => l.trim()).length >= 5),
  );
  const projectText = () =>
    `# ${brief.name} · ${brief.product}出海项目\n\n目标市场：${brief.market}\n${brief.detail}\n${brief.constraint}\n\n状态：${project.submitted ? "已完成练习（尚未经真实客户验收）" : "草稿"}\n\n${projectLabels.map((label, i) => `## ${i + 1}. ${label}\n${project.fields[i] || "未填写"}`).join("\n\n")}`;
  const setField = (value: string) =>
    setState((prev) => {
      const old = prev.projects[String(prev.projectIndex)] || {
        fields: Array(6).fill(""),
        submitted: false,
      };
      return {
        ...prev,
        projects: {
          ...prev.projects,
          [String(prev.projectIndex)]: {
            fields: old.fields.map((v, i) => (i === projectStep ? value : v)),
            submitted: false,
          },
        },
      };
    });
  const saveNote = () => {
    if (s.noteDraft.trim().length < 5) return;
    update((prev) => ({
      ...prev,
        notes: [
          {
            id: crypto.randomUUID(),
            date: today(),
            day: prev.selectedDay,
            text: prev.noteDraft.trim(),
          },
        ...prev.notes,
      ],
      noteDraft: "",
    }));
    setToast("学习记录已保存");
  };
  const Stats = () => (
    <div className="stats">
      {[
        [Flame, "连续学习", streak(s.activity), "天"],
        [ScanSearch, "已分析企业", analyzed, "家"],
        [Check, "完成学习", completedDays, "天"],
        [Target, "已掌握技能", skills, "/ 8"],
      ].map(([Icon, label, n, u]) => {
        const I = Icon as typeof Flame;
        return (
          <section className="stat" key={String(label)}>
            <div>
              {String(label)}
              <I size={18} />
            </div>
            <strong>
              {String(n)}
              <small>{String(u)}</small>
            </strong>
            <span>
              {label === "已分析企业"
                ? "按已提交的不同企业统计"
                : label === "已掌握技能"
                  ? "按已完成的阶段练习统计"
                  : label === "完成学习"
                    ? "完成当天全部 5 项任务"
                    : "完成任务、练习或记录即计入"}
            </span>
          </section>
        );
      })}
    </div>
  );
  return (
    <div className="shell">
      <aside>
        <div className="brand">
          <span className="brand-icon">
            <Globe2 size={26} />
          </span>
          <div>
            出海研习社<small>AI × B2B PRACTICE LAB</small>
          </div>
        </div>
        <nav aria-label="主导航">
          {[
            ["学习工作台", [0, 1, 2, 3, 4, 6]],
            ["我的成长", [5]],
          ].map(([label, ids]) => (
            <div className="nav-group" key={String(label)}>
              <div className="nav-label">{String(label)}</div>
              {(ids as number[]).map((i) => {
                const Icon = icons[i];
                const n = pageNames[i];
                return <button aria-current={page === i ? "page" : undefined} className={page === i ? "active" : ""} onClick={() => go(i)} key={n}>
                  <Icon size={18} />{n}{i === 6 && <span className="new">实践</span>}
                </button>;
              })}
            </div>
          ))}
        </nav>
        <div className="side-note">
          <GraduationCap />
          <strong>从学习者到实践者</strong>
          <p>把每一次判断，变成下一次开发的底气。</p>
          <span>90 天 · AI × B2B 双主线</span>
        </div>
        <div className="profile">
          <span>学</span>
          <div>
            我的学习空间<small>制造业出海 · {level}</small>
          </div>
        </div>
      </aside>
      <main>
        <header>
          <span>
            我的工作台 <ChevronRight size={14} /> {pageNames[page]}
          </span>
          <span className="top-right">
            自主学习计划 <span className="avatar">学</span>
          </span>
        </header>
        <div className="content">
          {storageError && (
            <div role="alert" className="notice">
              浏览器未能保存数据。请先导出学习记录，检查存储空间或浏览器隐私设置。
            </div>
          )}
          {page === 0 ? (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">LEARN. PRACTICE. GO GLOBAL.</div>
                  <h1>AI × B2B 实战学习平台</h1>
                  <p>从 AI 零基础，到 AI 自动化，再到 AI + B2B 实战。每一步都要留下可验证的学习和项目成果。</p>
                </div>
                <span className="date-chip">
                  {new Date().toLocaleDateString("zh-CN", {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </span>
              </div>
              <Stats />
              <div className="dashboard-grid">
                <section className="hero">
                  <div className="eyebrow">
                    当前学习日 · DAY {String(s.selectedDay).padStart(2, "0")}
                  </div>
                  <h2>{dayLesson.title}</h2>
                  <p>{dayLesson.objective}</p>
                  <div className="hero-tags">
                    <span>{dayLesson.stage}</span>
                    <span>{dayLesson.duration}</span>
                    <span>{done.length} / 5 已完成</span>
                  </div>
                  <button className="light-button" onClick={() => go(2)}>
                    {done.length ? "继续本日学习" : "开始本日学习"}{" "}
                    <ArrowUpRight size={18} />
                  </button>
                  <div className="hero-path">
                    <span>理解概念</span>
                    <ArrowRight />
                    <span>完成练习与复核</span>
                    <ArrowRight />
                    <span>沉淀项目与作品集</span>
                  </div>
                </section>
                <section className="panel">
                  <div className="section-heading">
                    <h2>今日任务</h2>
                    <span>{done.length} / 5</span>
                  </div>
                  {dayTasks.slice(0, 4).map((t, i) => (
                    <button
                      className="task-row"
                      key={t.id}
                      onClick={() => go(2)}
                    >
                      <span
                        className={`check-box ${done.includes(t.id) ? "checked" : ""}`}
                      >
                        {done.includes(t.id) && <Check size={13} />}
                      </span>
                      <span>
                        <strong>{t.title}</strong>
                        <small>
                          {t.time} · 0{i + 1}
                        </small>
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                  <button className="text-button" onClick={() => go(2)}>
                    查看全部任务 <ArrowRight size={16} />
                  </button>
                </section>
              </div>
              <section className="panel overview-next">
                <div className="section-heading"><div><h2>现在只做一件事</h2><p>先完成今天的任务；卡住时再回到路线、知识库或案例，不必同时打开所有模块。</p></div></div>
                <div className="overview-actions">
                  {!s.diagnostic.completedAt && <button onClick={() => go(8)}><BrainCircuit size={18}/><span><strong>先做能力前测</strong><small>12 题，帮助判断从哪里开始</small></span><ArrowRight size={16}/></button>}
                  <button onClick={() => go(2)}><ListChecks size={18}/><span><strong>继续 Day {s.selectedDay}</strong><small>{dayLesson.title} · {done.length}/5 项任务已完成</small></span><ArrowRight size={16}/></button>
                  <button onClick={openUnifiedPath}><Route size={18}/><span><strong>查看综合学习路径</strong><small>确认 AI 学习如何对应 B2B 实战</small></span><ArrowRight size={16}/></button>
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    {
                      [
                        "",
                        "YOUR LEARNING ROADMAP",
                        "ONE DAY, ONE STEP",
                        "PRACTICE WITH EVIDENCE",
                        "YOUR KNOWLEDGE SHELF",
                        "GROWTH YOU CAN SEE",
                        "FROM BRIEF TO DELIVERY",
                        "UNIFIED AI × B2B ROADMAP",
                        "START WITH YOUR BASELINE",
                        "CONTEXT-AWARE STUDY SUPPORT",
                        "BUILD EVIDENCE, SHOW YOUR WORK",
                      ][page]
                    }
                  </div>
                  <h1>{pageNames[page]}</h1>
                  <p>
                    {
                      [
                        "",
                        "按 AI × B2B 的能力顺序推进；以阶段作品为准，不受原来 28 天节奏限制。",
                        "完成、记录、复盘。让今天的学习有一个具体成果。",
                        "先读证据，再做判断。这里的企业均为虚构教学案例。",
                        "把常用知识放在手边，让每一次实践都有参考。",
                        "用完成的练习衡量成长，让误判成为下一次的提醒。",
                        "接下一份模拟需求，练习交付一套完整的海外获客方案。",
                        "这里是 AI 深入教材：概念、跟做、小项目和免费学习资源都保留在这里。",
                        "先识别自己的起点，再获得一条可调整的学习建议。",
                        "围绕你今天的学习日、技能与项目状态，获得下一步拆解。",
                        "把完成的项目整理成能用于求职、实习或合作展示的作品说明。",
                      ][page]
                    }
                  </p>
                </div>
              </div>
              {page === 1 && (
                <>
                  <div className="path-mode-tabs" role="tablist" aria-label="学习路径视图">
                    <button
                      role="tab"
                      aria-selected={pathMode === "unified"}
                      className={pathMode === "unified" ? "current" : ""}
                      onClick={() => setPathMode("unified")}
                    >
                      AI × B2B 主路线
                    </button>
                    <button
                      role="tab"
                      aria-selected={pathMode === "course"}
                      className={pathMode === "course" ? "current" : ""}
                      onClick={() => setPathMode("course")}
                    >
                      B2B 详细教材
                    </button>
                    <button
                      role="tab"
                      aria-selected={pathMode === "resources"}
                      className={pathMode === "resources" ? "current" : ""}
                      onClick={() => setPathMode("resources")}
                    >
                      免费学习资源
                    </button>
                  </div>
                  {pathMode === "unified" ? (
                    <>
                      <section className="panel path-intro">
                        <div className="eyebrow">ONE INTEGRATED ROADMAP · LEARN BY OUTPUT</div>
                        <h2>只看当前阶段，完成成果再继续</h2>
                        <p>这条路线不按原来的 28 天倒计时。先建立 AI 与 B2B 的共同基础；从 Python 开始两条能力线并行，最后汇合为可展示的项目。</p>
                      </section>
                      <section className="phase-selector" aria-label="选择当前学习阶段">
                        {unifiedRoadmap.map((item, index) => (
                          <button key={item.phase} className={roadmapPhase === index ? "current" : ""} onClick={() => setRoadmapPhase(index)}>
                            <span>{item.phase}</span><strong>{item.ai}</strong><small>{item.b2b}</small>
                          </button>
                        ))}
                      </section>
                      <section className="panel phase-focus">
                        <div className="phase-focus-heading">
                          <div><span className="phase-kicker">阶段 {focusedRoadmapPhase.phase} · {focusedRoadmapPhase.days}</span><h2>{focusedRoadmapPhase.ai} <ArrowRight size={20}/> {focusedRoadmapPhase.b2b}</h2></div>
                          <span className="phase-count">{roadmapPhase + 1} / {unifiedRoadmap.length}</span>
                        </div>
                        <p className="phase-outcome">{focusedRoadmapPhase.outcome}</p>
                        <div className="phase-project"><strong>本阶段要留下的成果</strong><span>{focusedRoadmapPhase.project}</span></div>
                        <div className="phase-actions">
                          <button className="primary" onClick={() => openAiTextbook(focusedRoadmapPhase.lesson)}><BrainCircuit size={17}/>学习 AI 教材</button>
                          <button className="secondary" onClick={() => { selectPathDay(focusedRoadmapPhase.b2bDays); go(2); }}><ListChecks size={17}/>做 B2B 练习</button>
                          <button className="text-button" onClick={() => openB2bCourse(focusedRoadmapPhase.b2bDays)}>查看 B2B 详细教材 <ArrowRight size={16}/></button>
                        </div>
                      </section>
                      <details className="panel b2b-compass">
                        <summary><span><div className="eyebrow">B2B STARTER COMPASS</div><strong>B2B 零基础的 7 个判断参考</strong><small>需要补基础时再展开，不占用主路线的注意力。</small></span><ChevronRight size={18}/></summary>
                        <div className="b2b-essential-grid">{b2bEssentials.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.simple}</p><div><strong>你现在就做：</strong>{item.do}</div><small><b>不要这样做：</b>{item.avoid}</small></article>)}</div>
                      </details>
                      <p className="path-help">找不到资料时，打开“免费学习资源”；不理解产品、市场或客户术语时，打开“B2B 详细教材”。</p>
                    </>
                  ) : pathMode === "course" ? (
                    <>
                      <section className="panel path-bridge"><div><div className="eyebrow">B2B COURSE LIBRARY</div><h2>这里是 B2B 的详细教材库，不是固定的 28 天倒计时</h2><p>选择与你当前综合阶段对应的一天即可。这里的课程用来补产品、市场、客户与获客的基础；完成作品后再回到主路线继续。</p></div><button className="secondary" onClick={() => setPathMode("unified")}>回到主路线 <ArrowRight size={16}/></button></section>
                    <div className="learning-layout">
                  <section className="panel stage-list">
                    {stages.map((st, i) => (
                      <button
                        key={st.title}
                        onClick={() => selectStage(i)}
                        className={i === stage ? "current" : ""}
                      >
                        <span className="stage-number">
                          {s.lessons.includes(i) ? (
                            <Check size={16} />
                          ) : (
                            String(i + 1).padStart(2, "0")
                          )}
                        </span>
                        <span>
                          <strong>{st.title}</strong>
                          <small>{st.days}</small>
                        </span>
                        <ChevronRight size={15} />
                      </button>
                    ))}
                  </section>
                  <section className="panel lesson" id="stage-lesson">
                    <div className="eyebrow">
                      STAGE {String(stage + 1).padStart(2, "0")} ·{" "}
                      {stages[stage].en}
                    </div>
                    <h2>{stages[stage].title}</h2>
                    <p className="lesson-goal">{stages[stage].goal}</p>
                    {stages[stage].lessons.map((title, i) => (
                      <div className="lesson-section" key={title}>
                        <h3>
                          <span>0{i + 1}</span>
                          {title}
                        </h3>
                        <p>{stages[stage].body[i]}</p>
                      </div>
                    ))}
                    <section className="stage-day-course" id="stage-day-course" aria-labelledby="stage-day-title">
                      <div className="stage-day-heading">
                        <div>
                          <span className="pill">每日课程</span>
                          <h3 id="stage-day-title">选择这一阶段的学习日</h3>
                        </div>
                        <span>Day {String(pathLesson.day).padStart(2, "0")}</span>
                      </div>
                      <div className="stage-day-tabs" role="tablist" aria-label="本阶段每日课程">
                        {stageDays.map((lesson) => (
                          <button
                            key={lesson.day}
                            role="tab"
                            aria-selected={pathLesson.day === lesson.day}
                            className={pathLesson.day === lesson.day ? "current" : ""}
                            onClick={() => selectDay(lesson.day)}
                          >
                            <strong>Day {lesson.day}</strong>
                            <span>{lesson.title}</span>
                          </button>
                        ))}
                      </div>
                      <article className="stage-day-detail">
                        <div className="stage-day-summary">
                          <div>
                            <small>{pathLesson.duration}</small>
                            <h3>{pathLesson.title}</h3>
                            <p>{pathLesson.objective}</p>
                          </div>
                          <button className="outline-button" onClick={() => go(2)}>
                            去完成 Day {pathLesson.day} 任务 <ArrowRight size={15} />
                          </button>
                        </div>
                        <nav className="daily-course-toc" aria-label="当日课程目录">
                          <div><Clock3 size={15} /><span>{pathLesson.duration}</span></div>
                          {[
                            ["daily-overview", "核心问题"],
                            ["daily-reading", "课程正文"],
                            ["daily-example", "案例拆解"],
                            ["daily-actions", "实战与自测"],
                            ["daily-resources", "学习网页"],
                            ["stage-handbook", "概念手册"],
                            ["stage-curriculum", "深入课程"],
                          ].map(([id, label]) => (
                            <button key={id} onClick={() => jumpToCourseSection(id)}>{label}</button>
                          ))}
                        </nav>
                        <section className="daily-core-question" id="daily-overview">
                          <span>今日核心问题</span>
                          <h3>{pathDetail.coreQuestion}</h3>
                          <p>{pathDetail.whyItMatters}</p>
                        </section>
                        <div className="stage-day-grid">
                          <div>
                            <strong>今天要掌握</strong>
                            <ul>
                              {pathLesson.concepts.map((concept) => (
                                <li key={concept}>{concept}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>动手练习</strong>
                            <p>{pathLesson.practice}</p>
                            <strong>今日交付物</strong>
                            <p>{pathLesson.deliverable}</p>
                          </div>
                        </div>
                        <section className="daily-reading-section" id="daily-reading">
                          <div className="daily-section-title">
                            <span className="pill">课程正文</span>
                            <h3>从概念到判断，逐步理解今天的主题</h3>
                          </div>
                          <div className="daily-reading-list">
                            {pathDetail.readings.map((reading, index) => (
                              <article className="daily-reading-card" key={reading.title}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                  <h3>{reading.title}</h3>
                                  <p>{reading.content}</p>
                                  <ul>
                                    {reading.takeaways.map((takeaway) => (
                                      <li key={takeaway}>{takeaway}</li>
                                    ))}
                                  </ul>
                                </div>
                              </article>
                            ))}
                          </div>
                        </section>
                        <section className="daily-example" id="daily-example">
                          <span>示例拆解</span>
                          <div>
                            <h3>{pathDetail.example.title}</h3>
                            <p>{pathDetail.example.content}</p>
                          </div>
                        </section>
                        <div className="daily-action-grid" id="daily-actions">
                          <section>
                            <span className="pill">实战步骤</span>
                            <h3>照着完成今天的练习</h3>
                            <ol>
                              {pathDetail.workflow.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                          </section>
                          <section>
                            <span className="pill">自测标准</span>
                            <h3>达到这些标准再进入下一天</h3>
                            <ul>
                              {pathDetail.selfCheck.map((item) => (
                                <li key={item}>
                                  <CheckCircle2 size={16} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </section>
                        </div>
                        <section className="daily-resources-section" id="daily-resources">
                          <div className="daily-section-title">
                            <span className="pill">对应学习网页</span>
                            <h3>带着当天的任务学习，不只是收藏链接</h3>
                            <p>
                              今天配置 {pathResources.length} 项优质免费资源。第一项是核心必学，其余是按时间选择的拓展课程；每项都写明学习重点和可提交的输出，无需购买证书、会员或扩展服务。若目标页面以后改为收费，请先跳过并反馈给我替换。
                            </p>
                          </div>
                          <div className="daily-resource-list">
                            {pathResources.map((resource, resourceIndex) => (
                              <article className="daily-resource-card" key={resource.id}>
                                <span className={resourceIndex === 0 ? "resource-priority required" : "resource-priority optional"}>
                                  {resourceIndex === 0 ? "核心必学" : "拓展选学"}
                                </span>
                                <div className="daily-resource-meta">
                                  <span>{resource.provider}</span>
                                  <small>{resource.language} · {resource.access}</small>
                                </div>
                                <h3>{resource.title}</h3>
                                <dl>
                                  <div>
                                    <dt>重点学习</dt>
                                    <dd>{resource.learn}</dd>
                                  </div>
                                  <div>
                                    <dt>学习输出</dt>
                                    <dd>{resource.task}</dd>
                                  </div>
                                </dl>
                                <p className="resource-caution">{resource.note}</p>
                                <a href={resource.url} target="_blank" rel="noreferrer">
                                  打开官方学习页面 <ArrowUpRight size={15} />
                                </a>
                              </article>
                            ))}
                          </div>
                        </section>
                        <section className="stage-handbook-section" id="stage-handbook">
                          <div className="daily-section-title">
                            <span className="pill">本阶段概念手册</span>
                            <h3>{stages[stage].title}必须理解的核心概念</h3>
                            <p>每个概念都包含定义、业务用途、判断证据和常见误区。遇到陌生词时先回到这里。</p>
                          </div>
                          <div className="stage-handbook-grid">
                            {stageHandbook.map((item) => (
                              <article className="handbook-card" key={item.term}>
                                <h3>{item.term}</h3>
                                <p>{item.definition}</p>
                                <dl>
                                  <div><dt>业务用途</dt><dd>{item.businessUse}</dd></div>
                                  <div><dt>判断证据</dt><dd>{item.evidence}</dd></div>
                                  <div><dt>常见误区</dt><dd>{item.pitfall}</dd></div>
                                </dl>
                              </article>
                            ))}
                          </div>
                        </section>
                        <nav className="daily-course-pagination" aria-label="上一天或下一天">
                          <button disabled={pathLesson.day === 1} onClick={() => selectPathDay(pathLesson.day - 1)}>
                            上一天
                          </button>
                          <span>Day {pathLesson.day} / 28</span>
                          <button disabled={pathLesson.day === 28} onClick={() => selectPathDay(pathLesson.day + 1)}>
                            下一天 <ArrowRight size={14} />
                          </button>
                        </nav>
                      </article>
                    </section>
                    <section className="curriculum-block" id="stage-curriculum">
                      <div className="curriculum-heading">
                        <div>
                          <span className="pill">深入课程</span>
                          <h3>完成本阶段后，你应该能够</h3>
                        </div>
                        <span>{stageCurriculum[stage].chapters.length} 个学习单元</span>
                      </div>
                      <ul className="outcome-list">
                        {stageCurriculum[stage].outcomes.map((outcome) => (
                          <li key={outcome}>
                            <CheckCircle2 size={17} />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                      <div className="chapter-list">
                        {stageCurriculum[stage].chapters.map((chapter, index) => (
                          <article className="chapter-card" key={chapter.title}>
                            <div className="chapter-index">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <div>
                              <h3>{chapter.title}</h3>
                              <p>{chapter.content}</p>
                              <ul>
                                {chapter.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          </article>
                        ))}
                      </div>
                      <div className="curriculum-tools">
                        <div className="template-card">
                          <h3>阶段作业模板</h3>
                          <ol>
                            {stageCurriculum[stage].template.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="mistake-card">
                          <h3>常见误区</h3>
                          <ul>
                            {stageCurriculum[stage].mistakes.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                    {stage === 0 && (
                      <>
                        <div className="lesson-section">
                          <h3>
                            <span>04</span>产品认知：带着 8 个问题读
                          </h3>
                          <ol className="reading-list">
                            {[
                              "刹车片卖给谁？",
                              "OEM 和售后市场有什么不同？",
                              "进口商、经销商和批发商各自做什么？",
                              "为什么买家会考虑从中国采购？",
                              "采购商最关心哪些问题？",
                              "为什么不能只看价格？",
                              "哪些市场值得调研，依据是什么？",
                              "买家在什么情况下会换供应商？",
                            ].map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ol>
                          <p>
                            中国供应商可能在制造配套、型号覆盖或成本上有优势，但应逐厂验证。墨西哥、阿联酋等在本课中是练习市场，不是已验证的需求排名。
                          </p>
                        </div>
                        <div className="lesson-section">
                          <h3>
                            <span>05</span>10 个必须知道的外贸词
                          </h3>
                          <div className="term-grid">
                            {terms.map(([en, cn]) => (
                              <div key={en}>
                                <strong>{en}</strong>
                                <span>{cn}</span>
                              </div>
                            ))}
                          </div>
                          <blockquote>
                            We are looking for aftermarket brake pad
                            distributors.
                            <br />
                            <span>我们正在寻找汽车售后刹车片经销商。</span>
                          </blockquote>
                        </div>
                        <div className="lesson-section">
                          <h3>
                            <span>06</span>写出第一个 ICP
                          </h3>
                          <p>
                            练习参考：墨西哥 · 汽配进口商 / 经销商 · 售后市场 ·
                            约 10–200 人（参考）· 经营制动产品 ·
                            有批发渠道。联系人优先考虑采购经理、老板或总经理。采购意向仍需验证。
                          </p>
                          <label className="field">
                            我的客户画像
                            <textarea
                              value={s.icp}
                              onChange={(e) =>
                                setState((prev) => ({
                                  ...prev,
                                  icp: e.target.value,
                                }))
                              }
                              placeholder="地区 / 产品 / 企业角色 / 必选条件 / 采购职位 / 待核实需求"
                              rows={4}
                            />
                          </label>
                          <small className="muted">输入自动保存在本机。</small>
                        </div>
                        <div className="lesson-section">
                          <h3>
                            <span>07</span>A / B / C 判断与 5 家企业作业
                          </h3>
                          <div className="grade-guide">
                            <span>
                              <b>A</b>产品与采购角色明确匹配
                            </span>
                            <span>
                              <b>B</b>相关，但关键证据不足
                            </span>
                            <span>
                              <b>C</b>不匹配本轮目标
                            </span>
                          </div>
                          <p>
                            先在案例训练中完成 5
                            家模拟海外企业。每家写出角色、分级、职位、理由和策略；再尝试自行查找真实汽配企业，保留来源与日期。
                          </p>
                          <button className="secondary" onClick={() => go(3)}>
                            开始 5 家企业判断 <ArrowRight size={16} />
                          </button>
                        </div>
                      </>
                    )}
                    <div className="exercise">
                      <h3>
                        <PencilLine size={18} />
                        阶段练习
                      </h3>
                      <p>{stages[stage].exercise}</p>
                      <label className="field">
                        我的练习答案
                        <textarea
                          rows={5}
                          value={s.exercise[String(stage)] || ""}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              exercise: {
                                ...prev.exercise,
                                [String(stage)]: e.target.value,
                              },
                              lessons: prev.lessons.filter((n) => n !== stage),
                            }))
                          }
                          placeholder="写下你的分析，至少 30 个字符。完成表示自评通过，并非专业认证。"
                        />
                      </label>
                      <div className="actions">
                        <button
                          className="primary"
                          disabled={
                            (s.exercise[String(stage)] || "").trim().length < 30
                          }
                          onClick={() => {
                            update((prev) => ({
                              ...prev,
                              lessons: Array.from(
                                new Set([...prev.lessons, stage]),
                              ),
                            }));
                            setToast("阶段练习已完成，能力进度已更新");
                          }}
                        >
                          {s.lessons.includes(stage)
                            ? "已完成 · 再次保存"
                            : "完成阶段练习"}
                          <Check size={16} />
                        </button>
                        {stage < 7 && (
                          <button
                            className="text-button"
                            onClick={() => {
                              setStage(stage + 1);
                              window.scrollTo(0, 0);
                            }}
                          >
                            下一阶段 <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                    </div>
                  </>
                  ) : (
                    <section className="resource-library">
                      <div className="notice">
                        当前收录 {learningResources.length} 个经过筛选的优质免费渠道，覆盖系统课程、市场数据、关税合规、商务英语、销售和项目交付。先带着当天的作业目标学习，再把外部知识转成自己的模板或案例；无需购买证书、会员或扩展服务。
                      </div>
                      <div className="filter-tabs resource-filters">
                        {[
                          "全部",
                          ...Array.from(new Set(learningResources.map((item) => item.category))),
                        ].map((item) => (
                          <button
                            key={item}
                            className={resourceCategory === item ? "current" : ""}
                            onClick={() => setResourceCategory(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      <div className="resource-grid">
                        {learningResources
                          .filter(
                            (item) =>
                              resourceCategory === "全部" ||
                              item.category === resourceCategory,
                          )
                          .map((item) => (
                            <article className="panel resource-card" key={item.title}>
                              <div className="resource-meta">
                                <span>{item.category}</span>
                                <small>{item.verified} 核验</small>
                              </div>
                              <small className="provider">{item.provider}</small>
                              <h2>{item.title}</h2>
                              <div className="resource-tags">
                                <span>{item.language}</span>
                                <span>{item.cost}</span>
                              </div>
                              <dl>
                                <div>
                                  <dt>适合学习</dt>
                                  <dd>{item.bestFor}</dd>
                                </div>
                                <div>
                                  <dt>怎么配合本平台</dt>
                                  <dd>{item.useWith}</dd>
                                </div>
                              </dl>
                              <a
                                className="secondary"
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                前往官方渠道 <ArrowUpRight size={16} />
                              </a>
                            </article>
                          ))}
                      </div>
                      <p className="resource-footnote">
                        课程是否开放、免费范围和注册要求可能调整，请以目标网站当前说明为准。市场数据只能说明总体趋势，不能证明某家企业存在采购意向。
                      </p>
                    </section>
                  )}
                </>
              )}
              {page === 2 && (
                <>
                  <details className="panel day-switcher">
                    <summary><span><strong>Day {s.selectedDay} · {dayLesson.title}</strong><small>{completedDays} / 28 日已完成 · 点击切换学习日</small></span><ChevronRight size={18}/></summary>
                    <div className="day-picker" role="list" aria-label="28 天课程">
                      {dailyLessons.map((lesson) => {
                        const progress = s.taskDays[`day-${lesson.day}`] || [];
                        const complete = progress.length === 5;
                        return <button key={lesson.day} className={s.selectedDay === lesson.day ? "current" : ""} onClick={() => selectDay(lesson.day)} aria-label={`第 ${lesson.day} 日：${lesson.title}`}><span>{complete ? <Check size={14} /> : lesson.day}</span><small>{lesson.stage}</small></button>;
                      })}
                    </div>
                  </details>
                  <div className="two-col day-workspace">
                    <section className="panel">
                      <div className="section-heading">
                        <div>
                          <div className="eyebrow">
                            DAY {String(s.selectedDay).padStart(2, "0")} · {dayLesson.stage}
                          </div>
                          <h2>{dayLesson.title}</h2>
                        </div>
                        <span>{done.length} / 5 已完成</span>
                      </div>
                      <p className="day-objective">{dayLesson.objective}</p>
                      <progress max={5} value={done.length} />
                      <div className="day-concepts">
                        <strong>今天要掌握</strong>
                        <ul>
                          {dayLesson.concepts.map((concept) => (
                            <li key={concept}>{concept}</li>
                          ))}
                        </ul>
                      </div>
                      {dayTasks.map((t) => (
                        <div className="daily-task" key={t.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={done.includes(t.id)}
                              onChange={() => toggleTask(t.id)}
                            />
                            <strong
                              className={done.includes(t.id) ? "completed" : ""}
                            >
                              {t.title}
                            </strong>
                          </label>
                          <p>{t.hint}</p>
                          <div>
                            <small>
                              <Clock3 size={13} />
                              {t.time}
                            </small>
                            <button
                              className="text-button"
                              onClick={() => {
                                if (t.id === "review")
                                  document.getElementById("note")?.focus();
                                else
                                  openDailyCourseAt(
                                    t.id === "learn"
                                      ? "daily-overview"
                                      : t.id === "notes"
                                        ? "daily-reading"
                                        : "daily-actions",
                                  );
                              }}
                            >
                              {
                                t.id === "review"
                                  ? "写复盘"
                                  : t.id === "learn"
                                    ? "打开核心问题"
                                    : t.id === "notes"
                                      ? "开始学习正文"
                                      : t.id === "practice"
                                        ? "查看实战步骤"
                                        : "查看自测标准"
                              }{" "}
                              <ArrowUpRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </section>
                    <div>
                      <section className="panel day-deliverable">
                        <span className="knowledge-icon"><Target size={22} /></span>
                        <small>今日成果</small>
                        <h3>{dayLesson.deliverable}</h3>
                        <p>{dayLesson.practice}</p>
                      </section>
                      <section className="panel below day-knowledge-panel">
                        <div className="day-knowledge-heading">
                          <div>
                            <small>与 Day {s.selectedDay} 对应</small>
                            <h3>今日推荐知识</h3>
                          </div>
                          <BookOpen size={20} />
                        </div>
                        <div className="day-knowledge-list">
                          {recommendedKnowledge.map((item) => (
                            <button
                              key={item.title}
                              onClick={() => openKnowledgeArticle(item.title)}
                            >
                              <span>{item.category}</span>
                              <strong>{item.title}</strong>
                              <ArrowUpRight size={15} />
                            </button>
                          ))}
                        </div>
                      </section>
                      <section className="panel below">
                        <h2>Day {s.selectedDay} 学习记录</h2>
                        <p className="spaced">一个新收获，一个还想弄懂的问题。</p>
                        <label className="field">
                          我的复盘
                          <textarea
                            id="note"
                            rows={7}
                            value={s.noteDraft}
                            onChange={(e) =>
                              setState((prev) => ({
                                ...prev,
                                noteDraft: e.target.value,
                              }))
                            }
                            placeholder="今天我理解了……&#10;下一次我想验证……"
                          />
                        </label>
                        <button
                          className="primary"
                          disabled={s.noteDraft.trim().length < 5}
                          onClick={saveNote}
                        >
                          保存学习记录 <Check size={16} />
                        </button>
                      </section>
                      <section className="panel below">
                        <div className="section-heading">
                          <h2>本日历史记录</h2>
                          <span>
                            {s.notes.filter((n) => (n.day || 1) === s.selectedDay).length} 条
                          </span>
                        </div>
                        {s.notes.some((n) => (n.day || 1) === s.selectedDay) ? (
                          s.notes
                            .filter((n) => (n.day || 1) === s.selectedDay)
                            .map((n) => (
                              <article className="note" key={n.id}>
                                <small>{n.date} · Day {n.day || 1}</small>
                                <p>{n.text}</p>
                              </article>
                            ))
                        ) : (
                          <div className="empty">
                            <BookOpen />
                            <p>这一日还没有复盘记录。</p>
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                </>
              )}
              {page === 3 && (
                <>
                  <div className="notice">
                    教学口径：地区不限的售后刹车片批量买家。若限定墨西哥，其他国家应移出该名单。企业名称及资料均为模拟，不可直接用于实际开发。
                  </div>
                  <div className="case-tabs">
                    {cases.map((c, i) => (
                      <button
                        key={c.id}
                        className={i === caseIndex ? "current" : ""}
                        onClick={() => setCaseIndex(i)}
                      >
                        <span>0{i + 1}</span>
                        {c.name}
                        {s.answers[c.id] && <CheckCircle2 size={15} />}
                      </button>
                    ))}
                  </div>
                  <div className="two-col">
                    <section className="panel case-profile">
                      <span className="pill">
                        模拟企业档案 · {caseIndex + 1} / 5
                      </span>
                      <h2>{selected.name}</h2>
                      <p>{selected.country}</p>
                      <h3>你已获得的信息</h3>
                      <ul className="facts">
                        {selected.facts.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <div className="hint-box">
                        <Target size={20} />
                        <div>
                          <strong>判断顺序</strong>
                          <p>
                            产品 → 商业角色 → 采购能力 →
                            待核实事项。不要把“可能需要”当作采购意向。
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="panel">
                      <h2>你的客户判断</h2>
                      <div className="form-grid">
                        <label className="field">
                          客户类型
                          <select
                            value={draft.type}
                            onChange={(e) => setDraft("type", e.target.value)}
                          >
                            <option value="">请选择</option>
                            {[
                              "进口商 / 经销商",
                              "批发商",
                              "修理厂 / 零售商",
                              "无关行业",
                            ].map((x) => (
                              <option key={x}>{x}</option>
                            ))}
                          </select>
                        </label>
                        <label className="field">
                          目标职位
                          <select
                            value={draft.position}
                            onChange={(e) =>
                              setDraft("position", e.target.value)
                            }
                          >
                            <option value="">请选择</option>
                            {[
                              "采购经理",
                              "老板 / 总经理",
                              "市场专员",
                              "不适用",
                            ].map((x) => (
                              <option key={x}>{x}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <fieldset className="grade-choice">
                        <legend>客户分级</legend>
                        {["A", "B", "C"].map((g) => (
                          <label
                            className={draft.grade === g ? "chosen" : ""}
                            key={g}
                          >
                            <input
                              type="radio"
                              name="grade"
                              value={g}
                              checked={draft.grade === g}
                              onChange={() => setDraft("grade", g)}
                            />
                            {g} 类
                          </label>
                        ))}
                      </fieldset>
                      <label className="field">
                        判断理由
                        <textarea
                          rows={3}
                          value={draft.reason}
                          onChange={(e) => setDraft("reason", e.target.value)}
                          placeholder="引用档案中的事实，至少 15 个字符。"
                        />
                      </label>
                      <label className="field">
                        开发策略
                        <textarea
                          rows={3}
                          value={draft.strategy}
                          onChange={(e) => setDraft("strategy", e.target.value)}
                          placeholder="找谁、核实什么、下一步做什么？至少 15 个字符。"
                        />
                      </label>
                      <button
                        className="primary"
                        disabled={!caseValid}
                        onClick={submitCase}
                      >
                        {result ? "重新提交判断" : "提交并查看反馈"}
                        <ArrowRight size={16} />
                      </button>
                    </section>
                  </div>
                  {result && (
                    <section className="panel below feedback">
                      <div className="section-heading">
                        <h2>参考反馈</h2>
                        <span>客观项 {result.score} / 3</span>
                      </div>
                      <div className="feedback-grid">
                        {[
                          ["客户类型", result.type, selected.type],
                          ["客户分级", result.grade, selected.grade],
                          ["目标职位", result.position, selected.position],
                        ].map(([label, value, expected]) => (
                          <div key={label}>
                            <small>{label}</small>
                            <strong
                              className={value === expected ? "green" : "amber"}
                            >
                              {value === expected ? "✓ 一致" : "需复盘"} ·{" "}
                              {value}
                            </strong>
                            <p>参考：{expected}</p>
                          </div>
                        ))}
                      </div>
                      <h3>为什么这样判断</h3>
                      <p>{selected.reason}</p>
                      <h3>可参考的下一步</h3>
                      <p>{selected.strategy}</p>
                      <p className="micro">
                        理由与策略不做自动语义评分，请对照参考自评。上方客观项分数是最近一次提交的结果。
                      </p>
                      <button
                        className="secondary"
                        onClick={() => {
                          setCaseIndex((caseIndex + 1) % cases.length);
                          window.scrollTo(0, 0);
                        }}
                      >
                        {caseIndex === 4 ? "返回第一家" : "继续下一家"}{" "}
                        <ArrowRight size={16} />
                      </button>
                    </section>
                  )}
                </>
              )}
              {page === 4 && (
                <>
                  <section className="panel library-start">
                    <div><div className="eyebrow">START FROM TODAY</div><h2>先解决今天的问题，再查完整知识库</h2><p>知识库是做任务时的参考，不需要从头刷完。今天推荐的是 Day {s.selectedDay}「{dayLesson.title}」最相关的内容。</p></div>
                    <div className="library-recommended">{recommendedKnowledge.slice(0, 3).map((item) => <button key={item.title} onClick={() => setArticle(knowledge.findIndex((entry) => entry.title === item.title))}><BookOpen size={15}/>{item.title}<ArrowUpRight size={14}/></button>)}</div>
                  </section>
                  <div className="library-toolbar">
                    <div className="library-meta">
                      <strong>{knowledge.length} 篇实用知识</strong>
                      <span>{knowledgeCategories.length - 1} 个主题 · 当前显示 {visibleKnowledge.length} 篇</span>
                    </div>
                    <div className="filter-tabs">
                      {knowledgeCategories.map(
                        (c) => (
                          <button
                            className={category === c ? "current" : ""}
                            key={c}
                            onClick={() => {
                              setCategory(c);
                              setArticle(null);
                            }}
                          >
                            {c}
                            <span aria-hidden="true">
                              {c === "全部"
                                ? knowledge.length
                                : knowledge.filter((item) => item.category === c)
                                    .length}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                    <label className="search">
                      <Search size={17} />
                      <input
                        aria-label="搜索知识库"
                        placeholder="搜索知识、术语…"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setArticle(null);
                        }}
                      />
                    </label>
                  </div>
                  {article !== null ? (
                    <section className="panel article">
                      <button
                        className="text-button"
                        onClick={() => setArticle(null)}
                      >
                        ← 返回知识库
                      </button>
                      <div className="eyebrow spaced">
                        {knowledge[article].category}
                      </div>
                      <div className="knowledge-day-tags">
                        {knowledgeDaysFor(knowledge[article].title).map((day) => (
                          <button key={day} onClick={() => { selectDay(day); go(2); }}>
                            Day {day}
                          </button>
                        ))}
                      </div>
                      <h2>{knowledge[article].title}</h2>
                      <div className="article-text">
                        {knowledge[article].text}
                      </div>
                    </section>
                  ) : (
                    <div className="knowledge-grid">
                      {visibleKnowledge.map(({ item: k, index: i }) => (
                          <button
                            className="panel knowledge-card"
                            key={k.title}
                            onClick={() => setArticle(i)}
                          >
                            <span className="knowledge-icon">
                              <BookOpen size={22} />
                            </span>
                            <small>{k.category}</small>
                            <span className="knowledge-days">
                              推荐 Day {knowledgeDaysFor(k.title).join(" · ")}
                            </span>
                            <h3>{k.title}</h3>
                            <p>{k.text.slice(0, 68)}…</p>
                            <span className="text-button">
                              打开阅读 <ArrowUpRight size={16} />
                            </span>
                          </button>
                        ))}
                    </div>
                  )}
                  {visibleKnowledge.length === 0 && (
                    <div className="panel empty">
                      <Search />
                      <p>没有匹配内容，试试“刹车片”或“采购”。</p>
                    </div>
                  )}
                </>
              )}
              {page === 5 && (
                <>
                  <Stats />
                  <section className="growth-tools">
                    <button className="panel" onClick={() => go(8)}><ClipboardCheck className="green"/><span><strong>能力前测</strong><small>{s.diagnostic.completedAt ? `已完成 · ${diagnosticScore}/${diagnosticQuestions.length}` : "用 12 题确认你的起点"}</small></span><ArrowRight size={16}/></button>
                    <button className="panel" onClick={() => go(9)}><Bot className="green"/><span><strong>AI 学习导师</strong><small>围绕当前 Day 和项目拆解下一步</small></span><ArrowRight size={16}/></button>
                    <button className="panel" onClick={() => go(10)}><Trophy className="green"/><span><strong>我的作品集</strong><small>{portfolioCount} 件作品条目已保存</small></span><ArrowRight size={16}/></button>
                  </section>
                  <div className="two-col">
                    <section className="panel">
                      <div className="section-heading">
                        <h2>能力地图</h2>
                        <span>{level}</span>
                      </div>
                      <p>等级由前测、练习记录与项目完成共同形成；完成课程本身不会自动证明掌握。</p>
                      {skillDomains.map((domain) => {
                        const value = domain === "B2B" ? Math.min(3, s.lessons.length) : skillLevel(domain);
                        return <div className="skill-row" key={domain}>
                          <div>
                            <span>{domain}</span>
                            <small>
                              {value ? `Lv ${value} · 已有学习或实践证据` : "Lv 0 · 待建立证据"}
                            </small>
                          </div>
                          <progress
                            max={3}
                            value={value}
                          />
                        </div>;
                      })}
                      <button className="text-button" onClick={openUnifiedPath}>
                        去综合路径补齐能力 <ArrowRight size={16} />
                      </button>
                    </section>
                    <div>
                      <section className="panel">
                        <h2>最近 14 天的积累</h2>
                        <div className="activity-grid">
                          {Array.from({ length: 14 }, (_, i) => {
                            const d = new Date();
                            d.setDate(d.getDate() - 13 + i);
                            const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                            return (
                              <div
                                className={
                                  s.activity.includes(date) ? "studied" : ""
                                }
                                key={date}
                                title={`${date} ${s.activity.includes(date) ? "有学习记录" : "暂无记录"}`}
                              >
                                <span>{d.getDate()}</span>
                                {s.activity.includes(date) ? (
                                  <Check size={13} />
                                ) : (
                                  <span>–</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <p className="micro">
                          绿色表示当日有任务、练习或复盘记录。连续天数从今天或昨天向前计算。
                        </p>
                      </section>
                      <section className="panel below">
                        <div className="section-heading">
                          <h2>错题与误判</h2>
                          <span>{s.mistakes.length} 次记录</span>
                        </div>
                        {s.mistakes.length ? (
                          <>
                            <p className="micro">
                              保留每次误判，重做不重复增加企业总数。
                            </p>
                            {s.mistakes
                              .slice()
                              .reverse()
                              .map((m, i) => {
                                const ci = cases.findIndex(
                                  (c) => c.id === m.id,
                                );
                                return ci < 0 ? null : (
                                  <button
                                    className="mistake"
                                    key={`${m.id}-${i}`}
                                    onClick={() => {
                                      setCaseIndex(ci);
                                      go(3);
                                    }}
                                  >
                                    <span>
                                      <strong>{cases[ci].name}</strong>
                                      <small>
                                        {m.date} · 当次 {m.score}/3 ·{" "}
                                        {s.answers[m.id]?.score === 3
                                          ? "已纠正"
                                          : "待复盘"}
                                      </small>
                                    </span>
                                    <RotateCcw size={16} />
                                  </button>
                                );
                              })}
                          </>
                        ) : (
                          <div className="empty">
                            <CheckCircle2 />
                            <p>暂无误判记录。完成案例后在这里复盘。</p>
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                  <section className="panel below">
                    <div className="section-heading">
                      <div>
                        <h2>你的学习档案</h2>
                        <p>
                          数据仅保存在当前浏览器；清除站点数据会删除记录。可导出一份
                          JSON 备份留存。
                        </p>
                      </div>
                      <button
                        className="secondary"
                        onClick={() =>
                          download(
                            `出海研习社-学习记录-${today()}.json`,
                            JSON.stringify(s, null, 2),
                            "application/json",
                          )
                        }
                      >
                        <Download size={16} />
                        导出学习记录
                      </button>
                    </div>
                    <div className="archive-summary">
                      <span>
                        复盘记录 <b>{s.notes.length}</b>
                      </span>
                      <span>
                        完成模拟项目{" "}
                        <b>
                          {
                            Object.values(s.projects).filter((p) => p.submitted)
                              .length
                          }
                        </b>
                      </span>
                      <span>
                        学习等级 <b>{level}</b>
                      </span>
                    </div>
                  </section>
                </>
              )}
              {page === 6 && (
                <>
                  <section className="panel project-ladder">
                    <div className="section-heading">
                      <div><h2>项目阶梯</h2><p>先完成小而可复核的作品，再进入 B2B 客户研究与自动化交付。</p></div>
                      <span>{Object.values(s.projects).filter((item) => item.submitted).length} 个 B2B 项目已提交</span>
                    </div>
                    <div className="ladder-grid">
                      {projectLadder.map(([levelName, title, outcome, tools]) => (
                        <article key={levelName}><small>{levelName}</small><h3>{title}</h3><p>{outcome}</p><span>{tools}</span></article>
                      ))}
                    </div>
                  </section>
                  <div className="project-brief">
                    <div>
                      <div className="eyebrow">CLIENT BRIEF · 模拟需求</div>
                      <h2>
                        {brief.name}
                        <span className="pill">
                          {brief.product} → {brief.market}
                        </span>
                      </h2>
                      <p>{brief.detail}</p>
                      <p className="brief-constraint">{brief.constraint}</p>
                    </div>
                    <button
                      className="light-button"
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          projectIndex: (prev.projectIndex + 1) % briefs.length,
                        }));
                        setProjectStep(0);
                        setToast("已切换项目，原项目草稿已保留");
                      }}
                    >
                      <RotateCcw size={16} />
                      换一个项目
                    </button>
                  </div>
                  <div className="project-steps">
                    {projectLabels.map((l, i) => (
                      <button
                        key={l}
                        className={projectStep === i ? "current" : ""}
                        onClick={() => setProjectStep(i)}
                      >
                        <span>
                          {project.fields[i].trim().length >= 20 ? (
                            <Check size={14} />
                          ) : (
                            i + 1
                          )}
                        </span>
                        {l}
                      </button>
                    ))}
                  </div>
                  <section className="panel project-work">
                    <div className="section-heading">
                      <div>
                        <div className="eyebrow">
                          STEP 0{projectStep + 1} / 06
                        </div>
                        <h2>{projectLabels[projectStep]}</h2>
                      </div>
                      <span>
                        {project.submitted ? "练习已提交" : "草稿自动保存"}
                      </span>
                    </div>
                    <p>{projectHints[projectStep]}</p>
                    <label className="field">
                      我的方案
                      <textarea
                        rows={10}
                        value={project.fields[projectStep]}
                        onChange={(e) => setField(e.target.value)}
                        placeholder={projectHints[projectStep]}
                      />
                    </label>
                    <p className="micro">
                      每步至少 20 个字符；客户清单至少 5
                      个非空行。只校验完整性，不自动证明分析准确。
                    </p>
                    <div className="actions">
                      <button
                        className="secondary"
                        disabled={projectStep === 0}
                        onClick={() => setProjectStep(projectStep - 1)}
                      >
                        上一步
                      </button>
                      {projectStep < 5 ? (
                        <button
                          className="primary"
                          onClick={() => setProjectStep(projectStep + 1)}
                        >
                          保存并下一步 <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          className="primary"
                          disabled={!projectValid}
                          onClick={() => {
                            update((prev) => ({
                              ...prev,
                              projects: {
                                ...prev.projects,
                                [String(prev.projectIndex)]: {
                                  ...project,
                                  submitted: true,
                                },
                              },
                            }));
                            setToast("模拟方案已提交，请对照交付清单复盘");
                          }}
                        >
                          提交模拟方案 <Check size={16} />
                        </button>
                      )}
                      <button
                        className="text-button"
                        onClick={() =>
                          download(
                            `${brief.name}-获客方案.md`,
                            projectText(),
                            "text/markdown",
                          )
                        }
                      >
                        <Download size={16} />
                        导出方案
                      </button>
                    </div>
                    {projectStep === 5 && !projectValid && (
                      <p className="micro amber">
                        尚有步骤未填完整：
                        {projectLabels
                          .filter(
                            (_, i) =>
                              project.fields[i].trim().length < 20 ||
                              (i === 2 &&
                                project.fields[i]
                                  .trim()
                                  .split("\n")
                                  .filter((l) => l.trim()).length < 5),
                          )
                          .join("、")}
                      </p>
                    )}
                  </section>
                  {project.submitted && (
                    <section className="panel below">
                      <h2 className="green">方案已保存 · 交付前自查</h2>
                      <ul className="reading-list">
                        <li>产品能力与资质是否有证据？</li>
                        <li>客户清单是否匹配 ICP，真实企业是否附来源？</li>
                        <li>分级理由与下一步是否对应？</li>
                        <li>服务报价是否明确范围、时间与验收标准？</li>
                      </ul>
                      <p>
                        当前为模拟练习完成，不代表商业方案已经审核或已发送给任何企业。
                      </p>
                    </section>
                  )}
                </>
              )}
              {page === 7 && (
                <>
                  <section className="panel path-bridge"><div><div className="eyebrow">AI DEEP DIVE</div><h2>只学习当前阶段需要的 AI 内容</h2><p>先在综合学习路径确定所在阶段，再在这里读概念、跟做练习、完成小项目并使用免费的网页或视频。完成后回到综合路径，衔接对应的 B2B 动作。</p></div><button className="secondary" onClick={openUnifiedPath}>回到综合路径 <ArrowRight size={16}/></button></section>
                  <div className="ai-lesson-tabs" role="tablist" aria-label="AI 核心教材">
                    {aiLessons.map((lesson, index) => <button key={lesson.id} className={aiLessonIndex === index ? "current" : ""} onClick={() => setAiLessonIndex(index)}><small>{lesson.days}</small>{lesson.title}</button>)}
                  </div>
                  <section className="panel deep-lesson" id="ai-core-textbook">
                    <div className="section-heading"><div><div className="eyebrow">{aiLesson.days} · 在线教材</div><h2>{aiLesson.title}</h2></div><button className="secondary" onClick={() => markAiLessonPracticed(aiLesson.id)}><Check size={16}/>记录一次练习</button></div>
                    <div className="lesson-summary"><div><small>学习目标</small><p>{aiLesson.outcome}</p></div><div><small>前置知识</small><p>{aiLesson.prerequisite}</p></div><div><small>一句话理解</small><p>{aiLesson.oneLine}</p></div></div>
                    <div className="deep-grid">
                      <article><h3>小白解释</h3><p>{aiLesson.beginner}</p></article><article><h3>专业解释</h3><p>{aiLesson.professional}</p></article>
                      <article><h3>真实工作案例</h3><p>{aiLesson.example}</p></article><article><h3>跟我做</h3><ol>{aiLesson.followAlong.map((step) => <li key={step}>{step}</li>)}</ol></article>
                      <article><h3>独立练习</h3><p>{aiLesson.exercise}</p></article><article><h3>小项目</h3><p>{aiLesson.miniProject}</p></article>
                      <article><h3>常见错误</h3><ul>{aiLesson.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h3>自测标准</h3><ul>{aiLesson.check.map((item) => <li key={item}>{item}</li>)}</ul></article>
                    </div>
                    <section className="ai-resource-section">
                      <div className="section-heading"><div><div className="eyebrow">FREE LEARNING RESOURCES</div><h2>本模块的免费网页与视频</h2><p>先完成“必学网页”，再按需要观看视频或做拓展练习。所有链接都可免费完成这里指定的学习输出。</p></div><span>{currentAiResources.length} 项</span></div>
                      <div className="ai-resource-grid">{currentAiResources.map((resource) => <article key={resource.url}><div><span>{resource.kind}</span><small>{resource.provider}</small></div><h3>{resource.title}</h3><dl><div><dt>学习重点</dt><dd>{resource.focus}</dd></div><div><dt>本次学习输出</dt><dd>{resource.output}</dd></div><div><dt>访问条件</dt><dd>{resource.access}</dd></div><div><dt>适用限制</dt><dd>{resource.limit}</dd></div></dl><a className="secondary" href={resource.url} target="_blank" rel="noreferrer">打开免费学习资源 <ArrowUpRight size={16}/></a></article>)}</div>
                    </section>
                    <div className="lesson-next"><strong>下一步</strong><p>{aiLesson.next}</p><button className="text-button" onClick={() => go(aiLesson.id === "automation" ? 6 : 8)}>完成前测或进入项目中心 <ArrowRight size={16}/></button></div>
                  </section>
                </>
              )}
              {page === 8 && (
                <>
                  <section className="panel assessment-intro"><BrainCircuit className="green"/><div><h2>你的能力前测</h2><p>这不是考试，也不会决定你能否学习。它用 12 个基础题判断你现在更适合从哪里起步。答案与结果只保存在当前浏览器。</p></div><span>{s.diagnostic.completedAt ? `已完成 · ${diagnosticScore} / ${diagnosticQuestions.length}` : `第 ${assessmentStep + 1} / ${diagnosticQuestions.length} 题`}</span></section>
                  {!s.diagnostic.completedAt ? (() => { const item = diagnosticQuestions[assessmentStep]; const [domain, prompt, options] = item; return <section className="panel assessment-card"><div className="eyebrow">{domain}</div><h2>{prompt}</h2><div className="answer-list">{options.map((option, index) => <button key={option} className={s.diagnostic.answers[assessmentStep] === index ? "chosen" : ""} onClick={() => setState((prev) => { const answers = [...prev.diagnostic.answers]; answers[assessmentStep] = index; return active({ ...prev, diagnostic: { ...prev.diagnostic, answers } }); })}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div><div className="actions"><button className="secondary" disabled={assessmentStep === 0} onClick={() => setAssessmentStep(assessmentStep - 1)}>上一题</button><button className="primary" disabled={s.diagnostic.answers[assessmentStep] === undefined} onClick={() => { if (assessmentStep === diagnosticQuestions.length - 1) { setState((prev) => active({ ...prev, diagnostic: { ...prev.diagnostic, completedAt: today() } })); setToast("前测已完成，学习路线已按你的起点生成"); } else setAssessmentStep(assessmentStep + 1); }}>{assessmentStep === diagnosticQuestions.length - 1 ? "生成学习建议" : "下一题"}<ArrowRight size={16}/></button></div></section> })() : <section className="panel assessment-result"><Trophy className="green"/><h2>当前起点：{diagnosticScore <= 4 ? "基础建立期" : diagnosticScore <= 8 ? "可开始实战期" : "可进入项目期"}</h2><p>得分 {diagnosticScore} / {diagnosticQuestions.length}。建议先学习 {diagnosticScore <= 4 ? "AI 基础 → LLM → Prompt，并完成对应的 B2B 基础教材。" : diagnosticScore <= 8 ? "Prompt、Python 与证据型客户研究，并从项目阶梯 Level 1 开始。" : "API、Agent 与自动化，同时完成 B2B 客户研究项目。"}</p><div className="actions"><button className="primary" onClick={openUnifiedPath}>打开综合学习路径 <ArrowRight size={16}/></button><button className="secondary" onClick={() => { setState((prev) => ({ ...prev, diagnostic: { answers: [] } })); setAssessmentStep(0); }}>重新测试</button></div></section>}
                </>
              )}
              {page === 9 && (
                <>
                  <section className="panel mentor-context"><Bot className="green"/><div><h2>AI 学习导师</h2><p>导师会以你当前的学习日、已提交项目、能力前测和学习记录为背景给出下一步。它不访问外部账号，不代替你核实企业、法规、联系人或商业事实。</p></div><span>当前：Day {s.selectedDay} · {dayLesson.title}</span></section>
                  <section className="panel mentor-chat"><div className="mentor-suggestions"><button onClick={() => setMentorDraft("这是什么意思？请用更简单的例子解释今天的概念。")}>这是什么意思？</button><button onClick={() => setMentorDraft("给我一个更简单的练习，并告诉我怎样自测。")}>给我一个更简单的练习</button><button onClick={() => setMentorDraft("这个项目下一步怎么办？")}>这个项目下一步怎么办？</button></div><div className="message-list">{s.mentorMessages.length ? s.mentorMessages.slice(-8).map((message) => <article className={message.role} key={message.id}><small>{message.role === "mentor" ? "学习导师" : "我"} · {message.date}</small><p>{message.text}</p></article>) : <div className="empty"><Bot/><p>先输入一个具体问题。描述你已有的材料、想得到的输出和卡住的地方，回答会更有用。</p></div>}</div><label className="field">我想问<textarea rows={4} value={mentorDraft} onChange={(event) => setMentorDraft(event.target.value)} placeholder="例如：我不知道怎样区分已确认事实和合理假设。"/></label><button className="primary" onClick={askMentor}><Send size={16}/>请导师拆解下一步</button></section>
                </>
              )}
              {page === 10 && (
                <>
                  <section className="panel portfolio-intro"><Trophy className="green"/><div><h2>我的作品集</h2><p>作品集保存的是你完成项目时的目标、方法、证据与结果说明。它不是自动生成的“能力证明”；提交前应由你复核并补充真实链接、截图与可公开材料。</p></div><span>{portfolioCount} 件已保存</span></section>
                  <section className="panel"><div className="section-heading"><div><h2>从当前模拟接单项目生成作品条目</h2><p>仅在方案已提交后可保存。保存后可导出 JSON；任何真实企业信息应先确认授权与公开范围。</p></div><button className="primary" disabled={!project.submitted} onClick={() => { setState((prev) => active({ ...prev, portfolio: { ...prev.portfolio, [`brief-${prev.projectIndex}`]: { summary: `${brief.name}：从产品分析、ICP 到客户分级和开发策略的模拟海外获客方案。`, evidence: "模拟项目字段、证据边界与交付前自查已保留在浏览器学习记录中。", demo: "可在本站项目中心打开；如需公开展示，请另行补充经授权的截图、GitHub 或 Demo 链接。", savedAt: today() } } })); setToast("作品条目已保存到当前浏览器"); }}><FolderKanban size={16}/>保存当前项目为作品</button></div>{!project.submitted && <p className="micro amber">请先在项目中心完成六步并提交方案，才能保存作品条目。</p>}</section>
                  <div className="portfolio-grid">{Object.entries(s.portfolio).length ? Object.entries(s.portfolio).map(([id, item]) => <article className="panel" key={id}><small>{item.savedAt} · {id}</small><h3>{item.summary}</h3><p><b>证据：</b>{item.evidence}</p><p><b>展示：</b>{item.demo}</p></article>) : <div className="empty"><Trophy/><p>尚无作品。完成一个小项目或模拟接单项目后，将它保存为可展示的说明。</p></div>}</div>
                </>
              )}
            </>
          )}
          <footer>
            出海研习社 <span>每天一点积累，让判断有据可循。</span>
          </footer>
        </div>
      </main>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
