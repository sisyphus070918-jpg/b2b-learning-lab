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
} from "./data";
import { useLearning, today, active, streak, download } from "./store";
import type { Answer, State } from "./store";
import { useAgentTools } from "./useAgentTools";
const pageNames = [
  "学习总览",
  "学习路径",
  "每日任务",
  "案例训练",
  "知识库",
  "学习进度",
  "模拟接单",
];
const routes = [
  "overview",
  "path",
  "tasks",
  "cases",
  "library",
  "progress",
  "projects",
];
const icons = [
  LayoutDashboard,
  Route,
  ListChecks,
  ScanSearch,
  Library,
  BarChart3,
  BriefcaseBusiness,
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
  const [pathMode, setPathMode] = useState<"course" | "resources">("course");
  const [resourceCategory, setResourceCategory] = useState("全部");
  const go = (n: number) => {
    setPage(n);
    location.hash = routes[n];
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  const selectStage = (i: number) => {
    setStage(i);
    if (window.matchMedia("(max-width: 920px)").matches) {
      requestAnimationFrame(() =>
        document
          .getElementById("stage-lesson")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };
  const openStage = (i: number) => {
    setStage(i);
    go(1);
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
            出海研习社<small>B2B LEARNING LAB</small>
          </div>
        </div>
        <div className="nav-label">学习工作台</div>
        <nav aria-label="主导航">
          {pageNames.map((n, i) => {
            const Icon = icons[i];
            return (
              <button
                aria-current={page === i ? "page" : undefined}
                className={page === i ? "active" : ""}
                onClick={() => go(i)}
                key={n}
              >
                <Icon size={19} />
                {n}
                {i === 6 && <span className="new">实践</span>}
              </button>
            );
          })}
        </nav>
        <div className="side-note">
          <GraduationCap />
          <strong>从学习者到实践者</strong>
          <p>把每一次判断，变成下一次开发的底气。</p>
          <span>28 天 · 8 个能力阶段</span>
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
                  <h1>今天，向出海再进一步。</h1>
                  <p>从看懂一个产品开始，建立你的 B2B 海外获客能力。</p>
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
                    <span>选择学习日</span>
                    <ArrowRight />
                    <span>完成 5 项任务</span>
                    <ArrowRight />
                    <span>保存复盘</span>
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
              <section className="panel path-panel">
                <div className="section-heading">
                  <div>
                    <h2>你的能力成长路线</h2>
                    <p>8 个阶段，把知识串成一套工作方法。</p>
                  </div>
                  <button className="text-button" onClick={() => go(1)}>
                    完整学习路径 <ArrowUpRight size={17} />
                  </button>
                </div>
                <div className="path-strip">
                  {stages.map((st, i) => (
                    <button key={st.title} onClick={() => openStage(i)}>
                      <span
                        className={
                          s.lessons.includes(i) || i === 0 ? "selected" : ""
                        }
                      >
                        {s.lessons.includes(i) ? (
                          <Check size={14} />
                        ) : (
                          String(i + 1).padStart(2, "0")
                        )}
                      </span>
                      <strong>{st.title}</strong>
                      <small>{st.days}</small>
                    </button>
                  ))}
                </div>
              </section>
              <div className="bottom-cards">
                <section className="panel">
                  <ScanSearch className="green" />
                  <h3>把“看起来像客户”变成有依据的判断</h3>
                  <p>5 家模拟汽配企业，练习客户角色与 A / B / C 分级。</p>
                  <button className="text-button" onClick={() => go(3)}>
                    进入案例训练 <ArrowRight size={16} />
                  </button>
                </section>
                <section className="panel">
                  <BriefcaseBusiness className="green" />
                  <h3>你的第一份出海项目，先在这里演练</h3>
                  <p>接到一份制造企业需求，从产品分析走到完整交付。</p>
                  <button className="text-button" onClick={() => go(6)}>
                    领取模拟项目 <ArrowRight size={16} />
                  </button>
                </section>
              </div>
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
                      ][page]
                    }
                  </div>
                  <h1>{pageNames[page]}</h1>
                  <p>
                    {
                      [
                        "",
                        "按顺序学习，也可以随时回到需要巩固的阶段。",
                        "完成、记录、复盘。让今天的学习有一个具体成果。",
                        "先读证据，再做判断。这里的企业均为虚构教学案例。",
                        "把常用知识放在手边，让每一次实践都有参考。",
                        "用完成的练习衡量成长，让误判成为下一次的提醒。",
                        "接下一份模拟需求，练习交付一套完整的海外获客方案。",
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
                      aria-selected={pathMode === "course"}
                      className={pathMode === "course" ? "current" : ""}
                      onClick={() => setPathMode("course")}
                    >
                      系统课程
                    </button>
                    <button
                      role="tab"
                      aria-selected={pathMode === "resources"}
                      className={pathMode === "resources" ? "current" : ""}
                      onClick={() => setPathMode("resources")}
                    >
                      外部学习渠道
                    </button>
                  </div>
                  {pathMode === "course" ? (
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
                    <h2>
                      {stage === 0
                        ? "Day 1：汽车刹车片海外获客基础"
                        : stages[stage].title}
                    </h2>
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
                    <section className="curriculum-block">
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
                  ) : (
                    <section className="resource-library">
                      <div className="notice">
                        这些渠道用于补充系统课程。先带着当天的作业目标学习，再把外部知识转成自己的模板或案例；不要只收藏链接。
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
                  <section className="panel day-picker-panel">
                    <div className="section-heading">
                      <div>
                        <h2>选择学习日</h2>
                        <p>Day 1–28 已准备完成，可按顺序学习，也可自由切换。</p>
                      </div>
                      <span>{completedDays} / 28 日已完成</span>
                    </div>
                    <div className="day-picker" role="list" aria-label="28 天课程">
                      {dailyLessons.map((lesson) => {
                        const progress = s.taskDays[`day-${lesson.day}`] || [];
                        const complete = progress.length === 5;
                        return (
                          <button
                            key={lesson.day}
                            className={
                              s.selectedDay === lesson.day ? "current" : ""
                            }
                            onClick={() => selectDay(lesson.day)}
                            aria-label={`第 ${lesson.day} 日：${lesson.title}`}
                          >
                            <span>{complete ? <Check size={14} /> : lesson.day}</span>
                            <small>{lesson.stage}</small>
                          </button>
                        );
                      })}
                    </div>
                  </section>
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
                                else openStage(stageForDay(s.selectedDay));
                              }}
                            >
                              {t.id === "review" ? "写复盘" : "查看相关课程"}{" "}
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
                  <div className="library-toolbar">
                    <div className="filter-tabs">
                      {["全部", ...knowledge.map((k) => k.category)].map(
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
                      <h2>{knowledge[article].title}</h2>
                      <div className="article-text">
                        {knowledge[article].text}
                      </div>
                    </section>
                  ) : (
                    <div className="knowledge-grid">
                      {knowledge
                        .map((k, i) => ({ k, i }))
                        .filter(
                          ({ k }) =>
                            (category === "全部" || k.category === category) &&
                            `${k.title}${k.text}`
                              .toLowerCase()
                              .includes(query.toLowerCase()),
                        )
                        .map(({ k, i }) => (
                          <button
                            className="panel knowledge-card"
                            key={k.title}
                            onClick={() => setArticle(i)}
                          >
                            <span className="knowledge-icon">
                              <BookOpen size={22} />
                            </span>
                            <small>{k.category}</small>
                            <h3>{k.title}</h3>
                            <p>{k.text.slice(0, 68)}…</p>
                            <span className="text-button">
                              打开阅读 <ArrowUpRight size={16} />
                            </span>
                          </button>
                        ))}
                    </div>
                  )}
                  {!knowledge.some(
                    (k) =>
                      (category === "全部" || k.category === category) &&
                      `${k.title}${k.text}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                  ) && (
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
                  <div className="two-col">
                    <section className="panel">
                      <div className="section-heading">
                        <h2>能力地图</h2>
                        <span>{level}</span>
                      </div>
                      <p>完成阶段练习后点亮技能，这是学习自评记录。</p>
                      {stages.map((st, i) => (
                        <div className="skill-row" key={st.skill}>
                          <div>
                            <span>{st.skill}</span>
                            <small>
                              {s.lessons.includes(i) ? "练习已完成" : "待练习"}
                            </small>
                          </div>
                          <progress
                            max={1}
                            value={s.lessons.includes(i) ? 1 : 0}
                          />
                        </div>
                      ))}
                      <button className="text-button" onClick={() => go(1)}>
                        继续提升技能 <ArrowRight size={16} />
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
