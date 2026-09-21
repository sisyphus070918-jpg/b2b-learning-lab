export type DeepLesson = {
  id: string;
  days: string;
  title: string;
  outcome: string;
  prerequisite: string;
  oneLine: string;
  beginner: string;
  professional: string;
  example: string;
  followAlong: string[];
  exercise: string;
  miniProject: string;
  commonMistakes: string[];
  check: string[];
  next: string;
};

export const aiLessons: DeepLesson[] = [
  {
    id: "ai-literacy", days: "Day 01–10", title: "AI 基础：把概念变成工作判断",
    outcome: "能区分生成式 AI、机器学习、深度学习、LLM、Agent 与自动化，并说明它们在一项工作中各自负责什么。",
    prerequisite: "无需编程；会使用浏览器与表格即可。",
    oneLine: "AI 是从数据中学习或生成结果的工具，价值取决于你交给它的任务、证据和复核。",
    beginner: "把 AI 想成很快的实习生：它能读、写、分类和提出想法，但不知道你公司的真实情况，也会把不确定的内容说得像真的。你负责给材料、定标准、检查结果。",
    professional: "机器学习从样本中拟合统计规律；深度学习以多层神经网络学习表示；生成式模型根据条件概率生成文本、图像或代码。LLM 是以 token 序列为输入输出的生成式模型，不等于数据库或事实核验系统。",
    example: "研究一家工业泵经销商时，AI 可以把产品页信息整理为表格；研究员仍须打开原网页核对产品、国家和业务角色，不能把 AI 的总结当作采购意向。",
    followAlong: ["打开一个对话式 AI 工具，新建名为“工业泵研究”的对话。", "输入一段公开产品描述，并要求分成：事实、合理假设、待核实。", "逐项回到原文，在表格旁标记能否找到来源。", "保留一条 AI 说错或无法证明的内容，写出纠正依据。"],
    exercise: "任选一项校园或制造业工作，写出 AI 可以做、必须由人做、必须有证据才能做的各 3 项任务。",
    miniProject: "建立《AI 使用边界清单》：任务、输入来源、允许输出、人工复核人、不能自动做的决定。",
    commonMistakes: ["把流畅回答当作事实", "把 AI 生成的联系人或认证当作真实资料", "只问“帮我分析”，没有提供目标、材料与输出格式"],
    check: ["能解释 LLM 为什么会产生幻觉", "能给每条结论标记事实、假设或待核实", "知道自动化不能替代商业审批"],
    next: "下一阶段学习 LLM 为什么会这样回答，以及怎样控制上下文与输出。",
  },
  {
    id: "llm", days: "Day 11–20", title: "LLM：理解能力、上下文与边界",
    outcome: "能用非技术语言解释 token、上下文窗口、预训练、微调、RAG 与幻觉，并为任务选择合适模型。",
    prerequisite: "完成 AI 基础，理解“事实需要来源”。",
    oneLine: "LLM 根据上下文预测下一段 token；它擅长模式与语言，不会自动知道你的最新业务事实。",
    beginner: "Token 可以理解为模型读写时切分的小片段。上下文窗口像一张有限大小的工作桌：桌上放得下的材料越相关，回答越可靠；放太多无关材料，重要内容反而被淹没。",
    professional: "Transformer 通过 self-attention 计算序列元素间的相关性。预训练学习通用语言分布，指令微调与偏好优化改善遵循指令的行为；RAG 在推理时检索外部资料并放入上下文，仍需评估检索质量、引用与时效。",
    example: "让模型比较两份泵规格书时，先上传或粘贴可公开使用的材料，要求逐项引用页面位置；若资料没有说明密封材质，输出应是“未找到”，而不是推测。",
    followAlong: ["准备两段相互矛盾的产品说明。", "要求模型只列出两段都支持的事实。", "再要求列出冲突项和需要向工厂确认的问题。", "删除其中一段，观察结论如何改变，并记录原因。"],
    exercise: "为“是否推荐某经销商进入优先名单”写一份输入清单：哪些资料必须提供，哪些资料只能作为假设。",
    miniProject: "制作《证据型 LLM 研究模板》：来源编号、摘录、结论、置信度、待核实问题。",
    commonMistakes: ["把上下文窗口当成永久记忆", "让模型补全缺失参数", "以为有引用就代表引用内容支持结论"],
    check: ["能解释 RAG 解决什么、不能解决什么", "知道 token 与成本、长度有关", "能把“未知”作为合格输出"],
    next: "接下来把这些边界写进 Prompt，让输出变成可复核的工作件。",
  },
  {
    id: "prompt", days: "Day 21–32", title: "Prompt 与 AI 工具：从提问到可复用工作流",
    outcome: "能写出包含角色、上下文、任务、限制、输出格式和验收标准的 Prompt，并迭代到可复核输出。",
    prerequisite: "理解事实、假设、待核实的区别。",
    oneLine: "好 Prompt 不是咒语，而是一份清楚的工作说明书。",
    beginner: "不要只说“帮我找客户”。告诉 AI：产品是什么、国家在哪里、哪些企业符合、哪些必须排除、资料从哪里来、结果要用什么表格交付。",
    professional: "Prompt 是对模型推理与生成空间的约束。结构化 schema、few-shot 示例、分步任务与验证规则通常比单纯增加措辞更稳定；敏感推理过程不应被当作可验证证据，应要求输出可检查的结论与来源。",
    example: "“基于下面三个官网链接摘录，筛选墨西哥工业泵分销商。只写原文支持的事实；无证据填‘待核实’；输出 CSV 字段为公司、产品证据、渠道角色、来源、下一步问题。”",
    followAlong: ["写一个没有限制的原始 Prompt。", "补充产品、市场、目标客户和排除条件。", "要求固定表格字段与‘未知’写法。", "用一条反例测试：把不相关企业放入材料，检查是否被排除。"],
    exercise: "把“帮我写开发信”改写成一份 6 段 Prompt，并指定不得编造客户需求、认证、价格或业绩。",
    miniProject: "建立自己的 Prompt 卡片库：研究、分类、邮件草稿、复盘 4 张卡，每张有输入、输出、限制与验收。",
    commonMistakes: ["给模型虚构的角色权力", "没有说明数据是否真实", "只看文案好不好看，不检查能否执行"],
    check: ["Prompt 中有明确输入和输出", "能说明何时需要人工核验", "能用同一标准比较两次结果"],
    next: "之后用 Python 和表格处理重复数据，让好 Prompt 可以批量、安全地使用。",
  },
  {
    id: "python-data", days: "Day 33–46", title: "Python 与数据：为 AI 项目做够用的编程",
    outcome: "能读写 CSV/JSON、清洗基础字段、处理异常，并把数据处理任务与客户研究场景对应。",
    prerequisite: "会使用文件夹、文本编辑器和表格；不要求数学或编程基础。",
    oneLine: "Python 是把重复、规则明确的工作交给计算机执行的工具。",
    beginner: "变量是贴了标签的盒子，list 是一列盒子，dict 是带字段名的一条记录。先让程序处理一小份模拟客户表，确认无误后再扩大。",
    professional: "以函数封装可重复逻辑，用异常处理显式区分可恢复与不可恢复问题。CSV 适合表格交换，JSON 适合嵌套结构；任何脚本应保留输入版本、处理规则和输出日志。",
    example: "把 20 行模拟企业数据读取为表格，统一国家名称、删除空官网字段、保留原始行号，再输出一份“待研究名单”。这不是爬取，也不代表企业有需求。",
    followAlong: ["新建一个仅含模拟数据的 customers.csv。", "用 Python 读取并打印前 3 行。", "检查 company 与 website 是否为空，输出缺失字段清单。", "把清洗结果保存为新文件，原文件不覆盖。"],
    exercise: "写出三个字段规则：国家名统一、网址为空时标记、同名企业不自动删除而是待人工判断。",
    miniProject: "完成“模拟客户名单清洗器”：输入 CSV，输出清洗 CSV 和异常报告。",
    commonMistakes: ["在真实文件上直接覆盖", "把相同名称当成重复企业", "把脚本结果当成商业判断"],
    check: ["能解释 list 与 dict 的用途", "能说明 CSV 和 JSON 的区别", "脚本出错时知道先看报错行和输入数据"],
    next: "下一阶段用 API 让程序按规则与外部服务交换数据。",
  },
  {
    id: "api", days: "Day 47–56", title: "API：让程序安全地调用服务",
    outcome: "能解释 HTTP、GET/POST、JSON、API Key、限流与环境变量，并完成一个只处理模拟数据的 API 小项目。",
    prerequisite: "能读懂简单 Python 函数与 JSON。",
    oneLine: "API 是程序之间按约定发送请求和接收结果的接口。",
    beginner: "把 API 想成点单：地址是餐厅、请求方法是点单方式、JSON 是菜单格式、响应是订单结果。密钥像银行卡密码，不能贴到网页、聊天或 GitHub。",
    professional: "HTTP 状态码表达请求结果；认证、超时、重试、速率限制、幂等性与日志决定集成是否稳定。密钥通过环境变量注入，客户端应最小权限、最少保存，并避免在异常日志中回显。",
    example: "对一份模拟公司列表调用一个公开、无需密钥的测试 API，练习读取状态码和 JSON；接入任何 LLM API 前，先计算调用次数、最大输入长度和预算上限。",
    followAlong: ["调用一个公开测试接口并打印 status code。", "读取 JSON 的一个字段，不打印全部响应。", "人为使用错误地址，捕获异常并输出可理解提示。", "把密钥示例写成环境变量名称，不写真实值。"],
    exercise: "为“批量总结 50 条模拟产品描述”列出成本控制措施：抽样、长度限制、缓存、失败重试和人工抽检。",
    miniProject: "完成“API 响应检查器”：对指定测试 URL 输出状态、关键字段与错误说明。",
    commonMistakes: ["把 Key 提交到 GitHub", "无限重试 429 限流", "只看 200 不验证返回内容"],
    check: ["能区分 GET 与 POST 的基本用途", "知道 401、429、5xx 需要的不同处理", "能说明为什么密钥不应放在前端"],
    next: "有了工具调用与数据边界后，可以理解 Agent 如何把多步任务连接起来。",
  },
  {
    id: "agent", days: "Day 57–68", title: "Agent：把任务拆开、执行、记录与复核",
    outcome: "能设计一个有工具、状态、停止条件和人工复核点的 AI 企业研究助手，而不把它当作全自动决策者。",
    prerequisite: "理解 Prompt、API 与事实核验。",
    oneLine: "Agent 是围绕目标循环调用模型和工具的工作流，必须受权限、数据与停止条件约束。",
    beginner: "普通聊天像一次问答；Agent 像按清单办事的助理：先读任务，再查资料，再填表，再把不能确定的部分交给你。它越能行动，越需要你规定边界。",
    professional: "Agent 常由模型、工具调用、短期状态、检索源、计划/执行循环与评估器构成。可靠性来自受限工具、结构化中间结果、可观察日志、失败恢复与人类审批，而非让模型“更自由”。",
    example: "企业研究助手的安全版本只能读取用户提供的官网摘录，输出证据表和问题清单；不得发送邮件、创建账号、访问私密系统或声称发现真实采购需求。",
    followAlong: ["写出一个研究助手的输入、允许工具和禁止动作。", "把任务拆成：提取事实、匹配 ICP、生成问题、人工复核。", "为每一步定义 JSON 输出字段。", "写出三个停止条件：资料缺失、来源冲突、触及敏感数据。"],
    exercise: "为 Agent 设计一个失败处理：官网无关、资料互相冲突、模型输出未含来源时分别怎么办。",
    miniProject: "画出《AI 企业研究助手》工作流并用三条模拟企业资料做人工走查。",
    commonMistakes: ["给 Agent 未受限的浏览、发送或删除权限", "把记忆当作永久可靠数据库", "忽略每一步的审计记录"],
    check: ["能说清模型、工具、工作流的区别", "有明确停止与人工审批点", "输出可以追溯到输入或来源"],
    next: "最后把可复核步骤串成自动化工作流，服务真实 B2B 研究。",
  },
  {
    id: "automation", days: "Day 69–90", title: "AI 自动化 × B2B：完成可展示的获客工作流",
    outcome: "能完成一个从模拟资料到客户研究报告的自动化原型，并与现有 28 天 B2B 实战课程交叉练习。",
    prerequisite: "完成至少一个数据、API 或 Agent 小项目，并能使用 B2B 证据表。",
    oneLine: "自动化负责把重复步骤稳定地串起来；商业判断、合规与对外沟通仍由人负责。",
    beginner: "工作流就像流水线：触发条件开始，规则处理数据，结果写入表格，异常交给人。先用虚构企业和公开资料练习，确认稳定后再讨论真实试用。",
    professional: "自动化由 trigger、状态、转换、条件分支、外部调用、幂等键、错误队列与可观测性组成。B2B 场景还需最小化个人数据、遵守平台条款、保存来源与复核记录。",
    example: "导入模拟企业 CSV → 检查必填字段 → 用模板生成研究任务 → 写入待核实问题 → 人工审核后才允许生成个性化草稿。流程不自动发信，不制造联系人或购买信号。",
    followAlong: ["从模拟 CSV 选择 5 行作为输入。", "定义触发、字段校验、输出表和人工审核节点。", "为一个缺少官网的样本设计异常分支。", "把输出与 Day 4–9 的 ICP、证据与分级标准交叉检查。"],
    exercise: "画出你的获客工作流，标出可以自动化、必须人工判断、禁止自动执行的节点。",
    miniProject: "Final Project：AI + B2B 海外获客系统原型，提交流程图、模拟数据、研究报告、复核日志与作品说明。",
    commonMistakes: ["为了自动化跳过 ICP 与证据核验", "把群发当成获客系统", "没有记录异常和人工修改"],
    check: ["每一步有输入、输出、负责人和失败处理", "没有把自动化输出当作真实商业事实", "作品可以由别人复现与审阅"],
    next: "进入项目中心，逐级完成工具、数据、API、Agent 与 B2B 项目，并整理成作品集。",
  },
];

export const diagnosticQuestions = [
  ["AI 基础", "以下哪项最接近 LLM 的可靠用法？", ["把流畅回答当作事实", "根据资料整理并回到来源复核", "让它猜出缺失参数"], 1],
  ["LLM", "上下文窗口主要影响什么？", ["模型可在一次任务中参考的输入范围", "电脑硬盘容量", "账号密码强度"], 0],
  ["Prompt", "哪个要求最利于客户研究输出可复核？", ["写得专业一些", "只输出结论", "每项结论附来源或标记待核实"], 2],
  ["Python", "CSV 最适合哪类入门任务？", ["保存一张客户名单表", "存放账号密码", "替代所有数据库"], 0],
  ["API", "API Key 应该如何保存？", ["发到群聊备用", "放在环境变量，不提交到仓库", "写进前端页面"], 1],
  ["Agent", "安全的研究 Agent 应该？", ["可自动发送任何邮件", "有工具边界、停止条件和人工复核", "不保留来源"], 1],
  ["B2B", "公开网站出现产品关键词，能证明什么？", ["对方正在采购", "最多证明需要进一步查看产品页", "一定是 A 类客户"], 1],
  ["海外市场", "市场资料中最重要的记录习惯是？", ["复制结论不写出处", "区分国家事实、假设与待核实", "只看一个搜索结果"], 1],
  ["英语阅读", "看不懂产品页术语时最合适的做法？", ["让 AI 随意猜测", "记录原句、上下文和待确认含义", "直接排除企业"], 1],
  ["信息检索", "研究企业的起点应是？", ["先找邮箱", "先确认产品、客户角色和公开证据", "先发开发信"], 1],
  ["自动化", "下列哪项不该无人审核自动执行？", ["规范化国家名", "发送对外报价或开发信", "检查 CSV 是否缺网址"], 1],
  ["商业判断", "什么是合格的“未知”？", ["用经验补全", "明确写待核实并提出验证问题", "隐藏起来"], 1],
] as const;

export const projectLadder = [
  ["Level 1", "AI 小工具", "把一段产品资料转成事实—假设—待核实表", "Prompt、结构化输出、人工复核"],
  ["Level 2", "Python 数据清洗器", "清洗模拟客户 CSV 并输出异常清单", "Python、CSV、异常处理"],
  ["Level 3", "API 响应检查器", "调用公开测试 API，记录状态与错误", "HTTP、JSON、环境变量"],
  ["Level 4", "AI 企业研究助手", "从模拟资料生成有来源的企业研究卡", "Agent、工具边界、证据表"],
  ["Level 5", "B2B 客户研究系统", "完成 ICP、名单、分级与开发策略", "市场研究、ICP、客户研究"],
  ["Level 6", "AI 自动化获客工作流", "自动生成待审核研究任务与复核日志", "工作流、数据质量、人工审批"],
  ["Final", "AI + B2B 海外获客系统", "交付可演示的端到端模拟项目与作品说明", "综合能力、证据、项目交付"],
] as const;

export const skillDomains = ["AI 基础", "LLM", "Prompt", "Python", "API", "Agent", "自动化", "B2B", "海外市场", "信息检索"];

export const unifiedRoadmap = [
  { phase: "01", days: "基础阶段 · 完成作品后再继续", ai: "AI 基础", b2b: "B2B 基础与产品认知", b2bDays: 1, lesson: "ai-literacy", outcome: "会区分 AI 能做什么、不能替人决定什么；完成产品—采购链—证据边界的第一张图。", project: "输出《AI 使用边界清单》与一份产品采购链图。" },
  { phase: "02", days: "理解阶段 · 不按日历硬推进", ai: "LLM", b2b: "海外市场与 ICP", b2bDays: 4, lesson: "llm", outcome: "会用上下文、来源和待核实项组织市场资料，避免把模型补全当市场事实。", project: "输出一份可验证 ICP 与证据型研究模板。" },
  { phase: "03", days: "练习阶段 · 做出可复用模板", ai: "Prompt / AI 工具", b2b: "找客户与潜客判断", b2bDays: 7, lesson: "prompt", outcome: "会把搜索、官网阅读和分级标准写成可复用的 AI 工作说明书。", project: "输出 4 张 Prompt 卡与一份模拟企业筛选表。" },
  { phase: "04", days: "双线并行 · 以成果为准", ai: "Python", b2b: "客户名单与信息清洗", b2bDays: 19, lesson: "python-data", outcome: "会用代码处理模拟名单的字段、缺失项和异常，不把数据清洗误当商业结论。", project: "完成模拟客户 CSV 清洗器与异常报告。" },
  { phase: "05", days: "双线并行 · 以成果为准", ai: "API", b2b: "客户研究与资料结构化", b2bDays: 20, lesson: "api", outcome: "会安全调用接口、处理 JSON 与错误，并为企业研究保留输入输出记录。", project: "完成 API 响应检查器与研究数据字段表。" },
  { phase: "06", days: "双线并行 · 以成果为准", ai: "Agent", b2b: "获客与销售沟通", b2bDays: 16, lesson: "agent", outcome: "会把企业研究拆成受限工具、证据、问题和人工复核节点。", project: "画出 AI 企业研究助手工作流，并完成 3 条模拟资料走查。" },
  { phase: "07", days: "整合阶段 · 先小范围验证", ai: "AI 自动化", b2b: "AI + B2B 服务与项目交付", b2bDays: 24, lesson: "automation", outcome: "会串联自动化、客户研究、分级和交付，准备真实企业的小范围验证。", project: "完成 AI + B2B 海外获客系统原型与作品说明。" },
] as const;

export const b2bEssentials = [
  { title: "先理解 B2B：你服务的是一家公司，不是随机消费者", simple: "制造商做海外获客，通常先找进口商、经销商、批发商、项目承包商或终端工厂。它们是否会买、怎么买、谁决定，不能只看公司名字。", do: "拿一家企业官网，先找产品页、服务对象、仓库/渠道和联系页；每条判断都保留原文或网址。", avoid: "看到邮箱、展会记录或关键词，就认定对方有采购需求。" },
  { title: "先看产品：参数为什么会影响客户是否值得找", simple: "工业品不是“质量好就能卖”。买家先要知道能不能用：泵看介质、流量、扬程、材质和密封；汽配看车型、OE 号和尺寸。", do: "做一张“参数—使用场景—买家影响—资料来源—待核实”表，先列 5 行。", avoid: "把没有测试、图纸或工厂答复支持的性能写成承诺。" },
  { title: "再找市场：国家不是标签，而是一组要核实的问题", simple: "选择市场不是看哪个国家大，而是看产品应用、渠道、进口条件、竞争与可接触买家是否匹配。", do: "固定“产品 + 国家 + 应用行业”，为需求、渠道、进入要求和公开资料分别建立来源卡。", avoid: "把其他国家的市场资料或旧新闻直接当成目标国当前机会。" },
  { title: "定义 ICP：什么样的企业才值得进名单", simple: "ICP 是可验证的理想客户画像。它规定企业在哪、卖什么、服务谁、为什么可能需要你的产品，以及哪些情况要排除。", do: "写 3 条必选、2 条加分、2 条排除条件，并为每条条件写一个官网或公开资料验证方法。", avoid: "把“海外企业”“规模大”或“有邮箱”当成客户画像。" },
  { title: "研究客户：从搜索结果变成有证据的客户档案", simple: "搜索只是入口。客户研究要依次确认企业、产品、渠道角色、能力、联系人线索与未知项。", do: "每家企业按“原文证据—能确认—合理假设—待核实—下一步”写一张研究卡。", avoid: "让 AI 或搜索摘要替代打开原始产品页和公司页。" },
  { title: "个性化获客：先确认下一步，不急着推销", simple: "首封联系的目标不是成交，而是验证产品、流程和角色。内容应和对方公开的产品/客户有关，不能虚构需求。", do: "针对一个合理职位，写 1 句证据型开场、1 个核实问题、1 份可提供资料和 1 个低压力下一步。", avoid: "群发、夸大能力、声称对方正在换供应商，或绕过当地规则获取个人联系方式。" },
  { title: "交付与服务：把学习变成别人能复核的项目", simple: "一份 B2B 获客项目要讲清边界：研究了什么、证据在哪里、哪些尚未核实、下一步由谁做、验收怎样算完成。", do: "用项目中心六步输出产品分析、ICP、名单、分级、开发策略和报价/交付边界。", avoid: "把模拟练习、AI 草稿或未经许可的信息包装成真实商业成果。" },
] as const;

export type CuratedResource = {
  lessonId: string;
  kind: "必学网页" | "视频课程" | "拓展练习";
  title: string;
  provider: string;
  url: string;
  access: string;
  focus: string;
  output: string;
  limit: string;
};

export const aiResources: CuratedResource[] = [
  { lessonId: "ai-literacy", kind: "必学网页", title: "Elements of AI", provider: "University of Helsinki / MinnaLearn", url: "https://www.elementsofai.com/", access: "免费公开课程；可不购买证书学习，注册可保存进度。", focus: "用非数学语言理解 AI、机器学习、神经网络、机会与限制。", output: "完成第 1 章后，用自己的话写出 AI 能做、不能做、必须人工复核的各 3 项。", limit: "课程是通用 AI 素养，不会替代制造业产品与市场事实核验。" },
  { lessonId: "ai-literacy", kind: "视频课程", title: "Machine Learning Crash Course", provider: "Google for Developers", url: "https://developers.google.com/machine-learning/crash-course", access: "免费官方课程；无需付费。", focus: "通过短视频、互动内容和练习建立机器学习的基本直觉。", output: "只学“Introduction to Machine Learning”部分，记录 3 个术语与它们对 LLM 学习的意义。", limit: "后续模块技术性较强；初学者不必一次完成全部练习。" },
  { lessonId: "llm", kind: "必学网页", title: "Hugging Face LLM Course · Chapter 1", provider: "Hugging Face", url: "https://huggingface.co/learn/llm-course/chapter1/1", access: "免费公开课程；部分实践功能可选注册免费账户。", focus: "理解 Transformer、tokenizer、模型能力和任务类型的实际位置。", output: "读完第一章，写出 token、模型、训练数据、推理四个词各一句，并标记一个仍不懂的问题。", limit: "含代码与深度学习术语；先读概念，代码可留到 Python 阶段。" },
  { lessonId: "llm", kind: "视频课程", title: "Hugging Face 官方视频频道", provider: "Hugging Face · YouTube", url: "https://www.youtube.com/@HuggingFace", access: "免费公开视频；无需购买。", focus: "选择与 LLM Course、Transformers 或 Agents 对应的视频，加深抽象概念的直观理解。", output: "选一个 15–30 分钟视频，写“讲了什么、和课程哪个概念对应、对企业研究有什么边界”。", limit: "频道视频难度不一；只选择与当前模块对应的内容，不追求全部观看。" },
  { lessonId: "prompt", kind: "必学网页", title: "OpenAI Academy", provider: "OpenAI", url: "https://academy.openai.com/", access: "免费公开学习中心；部分内容可能需免费登录，课程不要求购买证书。", focus: "了解如何把 AI 用于学习、研究和实际工作，并关注安全、验证和工作流。", output: "从当前可公开观看内容选一节，按“任务、输入、限制、输出、复核”改写成一张自己的 Prompt 卡。", limit: "内容会更新；以页面当前免费范围为准，不能把示例当作真实企业或市场结论。" },
  { lessonId: "prompt", kind: "视频课程", title: "ChatGPT Prompt Engineering for Developers：课程导览", provider: "DeepLearningAI · YouTube", url: "https://www.youtube.com/watch?v=H4YK_7MAckk", access: "免费公开 YouTube 视频；无需购买、无需账号即可观看。", focus: "用真实例子认识提示词原则、迭代和 LLM 应用的基本边界。", output: "观看后，把视频中的一个任务改成“有证据的企业资料分类”，并注明不允许编造字段。", limit: "这是导览视频；代码练习只有在理解 API 成本与密钥安全后再做。" },
  { lessonId: "python-data", kind: "必学网页", title: "CS50’s Introduction to Programming with Python", provider: "Harvard University", url: "https://cs50.harvard.edu/python/", access: "免费大学课程与公开视频；证书为可选项，不需要购买。", focus: "以小练习学习变量、条件、循环、函数、文件与异常处理。", output: "完成 Week 0 的前半部分；用变量和条件写一段“客户资料是否完整”的伪代码。", limit: "作业需要独立完成；不要把 AI 生成答案当作自己的理解。" },
  { lessonId: "python-data", kind: "视频课程", title: "CS50P Lecture 0：Functions, Variables", provider: "CS50 · YouTube", url: "https://www.youtube.com/watch?v=JP7ITIXGpHk", access: "免费公开 YouTube 视频；无需购买、无需账号即可观看。", focus: "从变量、函数和输入输出开始建立 Python 直觉。", output: "只观看前 30 分钟，抄写并改造一个示例：把用户输入改成“企业名称是否为空”的检查。", limit: "英文授课且节奏较快；看不懂时回到 CS50P 网页的讲义与小练习。" },
  { lessonId: "python-data", kind: "拓展练习", title: "The Python Tutorial", provider: "Python Software Foundation", url: "https://docs.python.org/3/tutorial/", access: "免费官方文档；无需账号。", focus: "查阅 list、dict、文件读写、异常和模块的准确用法。", output: "阅读 Data Structures 与 Errors and Exceptions 的指定小节，为模拟客户 CSV 写 5 条数据规则。", limit: "它是参考文档，初学者不必从头读完；结合 CS50 的练习使用。" },
  { lessonId: "api", kind: "必学网页", title: "An overview of HTTP", provider: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", access: "免费公开文档；无需账号。", focus: "理解客户端、服务器、请求、响应、HTTP 方法、状态码与无状态性。", output: "画一张“Python 程序 → API → JSON 响应”的图，并解释 200、401、429、500 各代表什么。", limit: "HTTP 概念不等于获得任何服务的调用权限；密钥、费用与条款要单独确认。" },
  { lessonId: "api", kind: "视频课程", title: "CS50P 课程视频与练习", provider: "Harvard University", url: "https://cs50.harvard.edu/python/", access: "免费大学课程；无需付费。", focus: "复习函数、文件、异常处理，为 API 小项目建立代码基础。", output: "选择与异常处理、文件相关的一节，记录一个常见错误和一个修复方法。", limit: "不是 API 专课；API 调用仍需按目标服务的官方文档和安全规则执行。" },
  { lessonId: "agent", kind: "必学网页", title: "Hugging Face Agents Course", provider: "Hugging Face", url: "https://huggingface.co/learn/agents-course/unit0/introduction", access: "免费课程；部分交互与结业功能可能需要免费账户。", focus: "学习 Agent、工具、工作流、框架、评估与最终项目的基本结构。", output: "完成 Unit 1 的概念阅读后，为“企业研究助手”写允许工具、禁止动作、停止条件和人工复核点。", limit: "课程假设已有基础 Python 与 LLM 知识；先完成前序模块再进入代码。" },
  { lessonId: "agent", kind: "视频课程", title: "Welcome to the Agents Course", provider: "Hugging Face · YouTube", url: "https://www.youtube.com/watch?v=iLVyYDbdSmM", access: "免费公开 YouTube 视频；无需购买、无需账号即可观看。", focus: "建立 Agent 课程的任务边界、学习顺序和项目预期。", output: "看完后写出你的企业研究助手的 3 个允许动作与 3 个禁止动作。", limit: "视频是课程导览；实际代码需在完成 Python 与 LLM 基础后再做。" },
  { lessonId: "automation", kind: "必学网页", title: "n8n Level 1 Course", provider: "n8n", url: "https://docs.n8n.io/courses/level-one/", access: "免费公开教程；可使用本地或自托管练习，云服务套餐另计。", focus: "理解 trigger、节点、数据转换、条件和工作流的基本做法。", output: "完成入门章节后，画出“模拟客户 CSV → 数据检查 → 待审核研究任务”的流程，不接触真实联系人。", limit: "不要在未理解权限、隐私和失败处理前连接真实邮箱或 CRM。" },
  { lessonId: "automation", kind: "视频课程", title: "n8n Quick Start：Build Your First Workflow", provider: "n8n · YouTube", url: "https://www.youtube.com/watch?v=4cQWJViybAQ", access: "免费公开 YouTube 视频；无需购买、无需账号即可观看。", focus: "观察触发、节点、数据流和简单工作流如何连接。", output: "暂停视频后画出自己的 B2B 模拟流程，并标出必须人工审核的一步。", limit: "不要照着视频直接连接真实邮箱、CRM 或联系人数据；先用虚构数据练习。" },
] as const;
