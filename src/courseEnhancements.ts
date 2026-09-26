export type StageHandbookItem = {
  term: string;
  definition: string;
  businessUse: string;
  evidence: string;
  pitfall: string;
};

export const stageHandbooks: Record<string, StageHandbookItem[]> = {
  行业认知: [
    { term: "产品—市场组合", definition: "同一种产品在不同国家、应用行业和渠道中，面对的买家、规格、法规与价格体系会不同。", businessUse: "先固定“产品 + 市场 + 应用”，再研究客户，避免把全球所有买家混在一起。", evidence: "目标市场车型/设备结构、产品目录、应用案例、公开贸易与行业资料。", pitfall: "把“中国能生产”直接推导为“目标市场会购买”。" },
    { term: "OEM 原厂配套", definition: "产品进入整车、整机或品牌商的原始生产与配套体系，通常需要更长的验证、审核与协同周期。", businessUse: "判断工厂是否具备体系、研发、验证、追溯和稳定交付能力。", evidence: "真实客户审核记录、质量体系、项目流程、开发与测试文件；均需由工厂核实。", pitfall: "看到网站出现 OEM 字样就认定企业是原厂供应商或拥有相关客户。" },
    { term: "Aftermarket 售后市场", definition: "产品在设备或车辆投入使用后，用于维修、保养、替换或升级的市场。", businessUse: "识别进口商、品牌商、分销商、批发商、零售商与维修网络。", evidence: "售后产品目录、车型覆盖、渠道网络、仓库、品牌组合和服务对象。", pitfall: "把所有修理厂都当成适合批量进口的客户。" },
    { term: "应用与适配", definition: "产品能否在特定车型、设备、介质、环境或工况中正确工作。", businessUse: "决定询盘要问什么、资料要给什么，也决定错误选型的风险。", evidence: "图纸、OE 号、规格表、选型参数、测试条件、样品验证。", pitfall: "只介绍材料和产能，不确认产品是否适用于买家的实际场景。" },
    { term: "采购链与价值链", definition: "产品、信息、资金从制造商经过不同渠道角色到达终端使用者的路径。", businessUse: "区分谁进口、谁库存、谁影响、谁使用、谁付款，从而选择正确客户和职位。", evidence: "企业业务说明、销售网络、仓库、品牌授权、客户类型和交易条款。", pitfall: "把最终使用产品的人自动当成直接海外买家。" },
    { term: "采购角色证据矩阵", definition: "把一次采购中的角色、参与环节、关注点、所需证据、公开信号和验证问题放进同一张表，并标注确认程度。", businessUse: "判断先联系谁、提供哪类材料，以及需要向对方核实哪些决策流程。", evidence: "官网团队与服务页、招聘信息、实际沟通答复、询盘记录和供应商审核文件。", pitfall: "仅凭职位名称断定某人有最终决策权，或把公开任职信息当成采购意向。" },
    { term: "供应商切换触发点", definition: "促使买家评估新供应商的具体变化，如缺货、质量波动、交付不稳、新品扩张或需要备选。", businessUse: "将工厂能力与买家真实风险连接，形成有依据的价值主张。", evidence: "买家访谈、公开扩张信息、产品线变化、实际询盘和历史交付问题。", pitfall: "没有证据就声称对方正在更换供应商。" },
    { term: "总拥有成本 TCO", definition: "除采购单价外，还包含运输、库存、缺货、质量、维护、退换与管理等成本。", businessUse: "解释为什么质量一致、交期和售后有时比最低单价更重要。", evidence: "落地费用、缺陷率、维修频率、库存周期、异常处理记录。", pitfall: "无法获得数据时编造节省金额。" },
    { term: "事实—假设—待核实", definition: "事实有来源；假设是基于事实的暂时推理；待核实项是影响判断但尚未确认的信息。", businessUse: "保证研究结论透明，防止 AI 和研究人员把合理猜测写成采购意向。", evidence: "来源网址、原文摘要、核实日期、访谈答复和工厂确认。", pitfall: "使用“可能、应该、大概”掩盖没有证据。" },
  ],
  "客户画像 ICP": [
    { term: "ICP 理想客户画像", definition: "对最值得服务的企业类型所做的可验证描述，不是单个联系人，也不是泛泛的行业名称。", businessUse: "统一搜索、筛选、分级和开发信息的目标。", evidence: "地区、细分行业、商业角色、产品、规模、渠道与采购场景。", pitfall: "只写“海外客户”或“有需求的企业”。" },
    { term: "企业特征 Firmographics", definition: "描述企业的结构信息，如地区、行业、规模、所有制、网点和经营年限。", businessUse: "帮助缩小市场，但必须与业务角色和产品匹配结合。", evidence: "官网、企业登记、团队页、分支机构和行业目录。", pitfall: "用员工数一个字段决定企业价值。" },
    { term: "必选条件", definition: "不满足就不进入当前目标名单的条件。", businessUse: "保持名单方向一致，减少无关线索。", evidence: "例如明确经营相关产品并服务目标行业。", pitfall: "把无法公开观察的“有采购预算”设为必选。" },
    { term: "加分信号", definition: "不会单独决定是否入选，但会提高研究和联系优先级的线索。", businessUse: "在符合必选条件的企业之间排序。", evidence: "仓库、区域网络、自有品牌、技术支持、互补产品线。", pitfall: "用一个强信号替代所有基础条件。" },
    { term: "排除条件", definition: "与项目目标明确冲突、能够减少低价值研究的条件。", businessUse: "识别纯零售、纯服务、无关应用和重复主体。", evidence: "业务说明、产品结构、服务范围和公司主体。", pitfall: "条件过度严格，把小而专业的进口商排除。" },
    { term: "可观察证据", definition: "研究者可以从公开页面、文件或直接沟通中确认的信号。", businessUse: "把主观描述改成任何人都能执行的筛选规则。", evidence: "产品目录、品牌页、网点、仓库、职位、公开文件。", pitfall: "使用“看起来专业”“应该有实力”等无法复核的判断。" },
    { term: "ICP 条件卡", definition: "把一个筛选条件拆成判断规则、证据入口、反向证据、缺失状态和验证问题的最小工作单元。", businessUse: "让搜索、人工研究和后续 A/B/C 分级使用相同证据标准，并发现哪些条件在公开资料中根本无法验证。", evidence: "官网产品/品牌/服务/联系页面、目录、公开登记或直接沟通答复；记录网址、原文摘要和日期。", pitfall: "只写“有仓储”“采购量大”等结论，没有说明去哪里找、什么算符合，或把证据缺失默认为符合。" },
    { term: "证据阈值", definition: "将线索处置区分为“明确反向证据”“关键证据缺失”和“符合/可继续验证”的最低标准。", businessUse: "把保留、待核实、排除变成可执行动作，避免用信息缺失直接淘汰，也避免用单个关键词直接保留。", evidence: "产品、角色、渠道/项目能力和主体一致性的原始页面；每项记录来源、日期与反向信号。", pitfall: "把搜索摘要、员工数、网站设计或一个模糊词当作充分证据，或把待核实状态误写成 A 类。" },
    { term: "条件可验证率", definition: "在小样本中，某项 ICP 条件能够被原始页面或沟通清楚判断为命中、未命中或不适用的比例；证据缺失需要单独统计。", businessUse: "识别哪些条件适合做公开筛选门槛，哪些应降级为加分信号或改成待验证问题。", evidence: "样本表中每个条件的命中、未命中、证据缺失、不适用次数，以及每条对应页面和日期。", pitfall: "把可验证率当成市场比例，或为了提高可验证率而删除真正重要但需要后续沟通确认的问题。" },
    { term: "反向画像", definition: "明确哪些公司虽然出现产品关键词，却不适合当前项目。", businessUse: "提前定义伪相关结果和停止条件。", evidence: "仅维修、仅内容媒体、单店零售、无关细分行业等。", pitfall: "把反向画像理解为永远没有价值；项目目标改变时应重评。" },
    { term: "小样本验证", definition: "先用 5–10 家真实企业测试画像的覆盖率、区分度和可验证性。", businessUse: "发现条件过宽、过窄或无法观察的问题。", evidence: "每项条件在样本中的命中、缺失和排除记录。", pitfall: "用几个样本推断整个市场规模。" },
  ],
  潜客判断: [
    { term: "来源层级", definition: "不同来源的可信度、用途和时效不同。官网是企业自述，登记信息确认主体，目录用于发现线索。", businessUse: "为每个结论选择合适来源并进行交叉核对。", evidence: "官网、政府/协会、品牌授权、行业目录、社交资料与搜索摘要。", pitfall: "把搜索摘要或 AI 回答当作最终证据。" },
    { term: "证据卡", definition: "记录公司、结论、原文摘要、来源、日期、假设和下一步的标准化研究单元。", businessUse: "让企业判断可以复查、更新和移交。", evidence: "至少一条产品证据和一条角色/能力证据。", pitfall: "只保存链接，不记录链接支持什么结论。" },
    { term: "十分钟证据阅读", definition: "在固定时限内按产品、业务角色、网络/项目能力、联系/主体的顺序阅读官网，并用证据卡记录结论与缺失。", businessUse: "先决定是否值得继续研究，再投入时间寻找联系人、写开发信或做深度尽调。", evidence: "产品/目录、About/服务/品牌、网络/项目、Contact/法律页的原文摘要、URL、页面类型与核实日期。", pitfall: "从首页口号、网站视觉、搜索摘要或单个职位就推断全国覆盖、采购能力或采购意向。" },
    { term: "商业角色", definition: "企业在供应链中赚钱的方式，如进口、品牌、分销、批发、集成或终端使用。", businessUse: "判断它为什么采购、采购量级和价值诉求。", evidence: "服务对象、条款、品牌来源、渠道网络、项目说明。", pitfall: "根据名称中的 Trading、International 等词直接判断。" },
    { term: "采购能力", definition: "企业具备批量购买、库存、项目供货或持续使用产品的能力。", businessUse: "区分有产品关联与真正值得优先开发。", evidence: "仓储、网点、SKU、销售区域、项目规模和团队配置。", pitfall: "把公司历史长自动等同于当前采购能力。" },
    { term: "A/B/C 分级", definition: "按项目匹配与证据完整度分配研究和开发优先级。", businessUse: "A 类深度开发，B 类先核实，C 类停止当前投入。", evidence: "产品、角色、能力、地区和缺失项的统一规则。", pitfall: "把 A 类误写成已确认有采购意向。" },
    { term: "误判 False Positive", definition: "企业表面命中关键词，但业务角色、产品或能力不符合画像。", businessUse: "通过记录误判原因改进搜索式与排除规则。", evidence: "维修页、新闻页、无关产品同名、过期目录和聚合站。", pitfall: "删除误判记录，导致下次再次研究。" },
    { term: "信息时效", definition: "证据可能因产品线、团队、网点和职位变化而失效。", businessUse: "对高价值线索设置复核日期和更新状态。", evidence: "页面更新时间、当前团队资料、近期新闻和有效联系方式。", pitfall: "使用多年以前的职位或目录却不标记日期。" },
    { term: "下一最佳动作", definition: "在当前证据基础上，成本最低且最能减少关键不确定性的动作。", businessUse: "把 B 类核实和 A 类开发区别开来。", evidence: "缺失字段、待核实问题、可用渠道和研究上限。", pitfall: "对所有线索直接寻找邮箱并发送同一封邮件。" },
  ],
  外贸基础: [
    { term: "询盘 Inquiry / RFQ", definition: "买家对产品、价格或交易条件的咨询；RFQ 通常包含更明确的报价要求。", businessUse: "判断需要补技术信息还是可以进入正式报价。", evidence: "型号、数量、用途、目的地、时间和包装要求。", pitfall: "看到 Please send price 就立即报最低价。" },
    { term: "MOQ", definition: "供应商能够接受的最低订单数量，可能来自原料、生产、包装或运输约束。", businessUse: "解释起订逻辑并设计试单、混装或包装替代。", evidence: "工厂成本、换线、包装版费和原材料起订。", pitfall: "把 MOQ 当作不可解释的固定数字。" },
    { term: "Lead Time", definition: "从约定起算条件满足到产品准备完成的时间，不一定包含国际运输。", businessUse: "明确排产、样品、生产和运输各阶段。", evidence: "图稿确认、预付款、物料到位、生产与检验节点。", pitfall: "只写 30 days，不说明从何时开始。" },
    { term: "Incoterms®", definition: "ICC 制定的贸易术语规则，用于说明交付、费用、风险和责任分配。", businessUse: "在报价和合同中明确具体规则、地点与版本。", evidence: "ICC 官方规则、正式报价和买卖合同。", pitfall: "把贸易术语误当成付款条款或所有权转移规则。" },
    { term: "Pro Forma Invoice", definition: "用于说明拟议产品和交易条件的形式发票，常作为报价或订单准备文件。", businessUse: "集中呈现规格、数量、价格、条款和有效期。", evidence: "双方确认的询盘信息与企业正式模板。", pitfall: "信息未确认就把形式发票视为最终合同。" },
    { term: "Landed Cost", definition: "货物到达买家指定地点的总成本，可能包括产品、运输、保险、关税、税费和清关等。", businessUse: "理解买家比较的不只是出厂单价。", evidence: "报价、货代费用、官方税率与买家当地成本。", pitfall: "在税费和分类不确定时给出虚假精确数字。" },
    { term: "付款条件", definition: "约定付款方式、比例、节点、币种和风险分配。", businessUse: "平衡供应商现金流与买家信用风险。", evidence: "双方资信、订单阶段、银行与保险安排。", pitfall: "把通用建议直接当成适用于所有客户的条件。" },
    { term: "样品—试单—批量", definition: "分别验证产品、交易执行和稳定供应的三个阶段。", businessUse: "为不同阶段设置数量、价格、包装、检验和交期。", evidence: "验证目标、通过标准和下一阶段条件。", pitfall: "用批量价格承诺一次性样品，或把样品通过当成批量订单。" },
  ],
  商务英语: [
    { term: "Relevance Opener", definition: "用对方可核实的产品、市场或角色证据说明为什么联系。", businessUse: "在前两句建立业务相关性。", evidence: "官网目录、品牌页、区域网络和公开资料。", pitfall: "用 I hope you are well 后直接堆公司介绍。" },
    { term: "Value Proposition", definition: "说明已验证能力怎样帮助特定买家降低风险或扩大业务。", businessUse: "连接企业证据与一个具体合作方向。", evidence: "真实产品范围、交期、测试、包装或选型能力。", pitfall: "使用 best quality、lowest price 等无法证明的空话。" },
    { term: "Call to Action", definition: "希望收件人采取的下一步动作。", businessUse: "把回复门槛降到一个问题、一次资料确认或简短转介。", evidence: "当前机会阶段和仍需验证的信息。", pitfall: "首封邮件就要求长会议、大订单或完整采购计划。" },
    { term: "Clarification", definition: "通过简短问题确认规格、数量、角色、流程或理解。", businessUse: "避免因语言简化而改变技术与商业事实。", evidence: "询盘原文、规格文件和对方答复。", pitfall: "为了让英文流畅，擅自补齐未知信息。" },
    { term: "Follow-up", definition: "在首封之后用新信息、问题或证据继续推进。", businessUse: "测试相关性并降低收件人的理解成本。", evidence: "上次邮件、企业证据、补充资料和联系状态。", pitfall: "只写 Did you see my email?" },
    { term: "Tone", definition: "邮件呈现的正式程度、礼貌和确定性。", businessUse: "让表达直接但不强迫，专业但不复杂。", evidence: "关系阶段、地区习惯和对方表达方式。", pitfall: "使用过度奉承、催促或绝对保证。" },
    { term: "Proofreading", definition: "发送前检查事实、姓名、公司、产品、数字、附件和语言。", businessUse: "防止模板残留和错误承诺。", evidence: "发送清单、附件版本和原始研究记录。", pitfall: "只检查语法，不检查业务事实。" },
    { term: "Attachment Discipline", definition: "只发送与当前问题有关、大小合适且版本正确的资料。", businessUse: "减少收件人负担并避免暴露无关或未核实资料。", evidence: "目标职位、产品范围、资料版本和使用许可。", pitfall: "第一次联系就发送完整目录和多个大附件。" },
  ],
  销售沟通: [
    { term: "Discovery", definition: "通过提问理解买家现状、问题、影响、标准和流程。", businessUse: "判断是否存在真实机会以及需要什么证据。", evidence: "买家原话、时间表、评估标准和下一步。", pitfall: "把访谈变成连续产品介绍。" },
    { term: "Current State", definition: "买家目前使用的产品、供应方式、流程和满意程度。", businessUse: "建立变化前的基线。", evidence: "供应商数量、现有型号、库存方式和流程描述。", pitfall: "默认现有方案一定有问题。" },
    { term: "Pain / Challenge", definition: "当前方案中具体、持续并影响业务的问题。", businessUse: "判断工厂能力是否能解决。", evidence: "缺货、质量、覆盖、维护、交期或成本的具体例子。", pitfall: "把一般愿望夸大成紧急痛点。" },
    { term: "Impact", definition: "问题对收入、成本、客户、生产、库存或风险造成的后果。", businessUse: "判断问题优先级和商业价值。", evidence: "停机、退货、延期、缺货和额外成本。", pitfall: "没有数据就编造经济影响。" },
    { term: "Decision Criteria", definition: "买家评估产品和供应商时采用的技术与商业标准。", businessUse: "决定样品、报价和资料重点。", evidence: "规格、质量要求、交期、价格、付款和审核流程。", pitfall: "只问预算，不问适配与风险。" },
    { term: "Objection", definition: "阻碍下一步的顾虑、条件或信息缺口。", businessUse: "通过澄清识别真实原因，再选择相应证据。", evidence: "价格比较口径、现有供应关系、内部优先级和风险。", pitfall: "听到异议立即降价或反驳。" },
    { term: "Next Step", definition: "双方明确的动作、负责人、时间和完成标准。", businessUse: "判断机会是否真实前进。", evidence: "会议纪要、邮件确认和到期状态。", pitfall: "用保持联系、尽快回复等模糊结尾。" },
    { term: "Qualification", definition: "判断需求、匹配、决策、时间和资源是否值得继续投入。", businessUse: "把相关企业与当前销售机会分开。", evidence: "需求强度、负责人、评估流程、时间表和承诺。", pitfall: "把打开邮件或礼貌回复当成销售机会。" },
  ],
  客户开发: [
    { term: "关键词矩阵", definition: "将产品同义词、角色、应用、地区和当地语言组合成可测试搜索式。", businessUse: "系统发现不同类型企业并比较结果质量。", evidence: "搜索式、结果数、相关企业数和误判类型。", pitfall: "长期只用一个英文产品词搜索。" },
    { term: "发现来源", definition: "用于找到公司候选的渠道，如展会、协会、品牌网络、目录和贸易数据。", businessUse: "扩大候选覆盖。", evidence: "来源名称、页面、检索日期和进入原因。", pitfall: "把目录中的信息直接当作已验证事实。" },
    { term: "公司验证", definition: "确认官网、主体、产品、角色和地区是否属于同一企业。", businessUse: "避免聚合站、重名和镜像网站。", evidence: "官方域名、地址、法律主体、联系页和第三方登记。", pitfall: "看到相似公司名就合并记录。" },
    { term: "联系人角色", definition: "在目标企业中负责、影响或批准当前合作议题的职位。", businessUse: "选择采购、产品、技术、老板或业务开发等入口。", evidence: "团队页、职业资料、新闻、公司规模和决策任务。", pitfall: "所有企业都寻找 Purchasing Manager。" },
    { term: "Pipeline Stage", definition: "线索从待研究、已验证、待联系、已联系到回复或停止的状态。", businessUse: "追踪下一步并防止重复触达。", evidence: "最近动作、责任人、日期和停止原因。", pitfall: "使用“跟进中”一个状态覆盖所有情况。" },
    { term: "小批次测试", definition: "先用少量高匹配企业测试画像、职位和信息，再决定是否扩大。", businessUse: "减少群发造成的误判与浪费。", evidence: "每批 ICP、模板版本、发送数量和回复质量。", pitfall: "样本过小时根据回复率做确定结论。" },
    { term: "有效回复", definition: "能够确认角色、需求、拒绝原因或下一步的信息，不只是自动回复。", businessUse: "比单纯回复率更准确地衡量策略。", evidence: "回复内容、转介、问题和会议/资料动作。", pitfall: "把所有回复都计为机会。" },
    { term: "停止条件", definition: "明确拒绝、退订、信息错误、长期无证据或不匹配时停止当前开发。", businessUse: "保护时间、名单质量和对方体验。", evidence: "联系状态、拒绝原话、退信与排除原因。", pitfall: "没有停止机制地反复发送。" },
  ],
  项目交付: [
    { term: "Scope 项目范围", definition: "规定项目要做什么、不做什么、为哪个产品和市场服务。", businessUse: "控制预期、工时和变更。", evidence: "范围说明、交付字段、周期、客户输入和修改轮次。", pitfall: "用海外获客一个词覆盖研究、联系、运营和成交。" },
    { term: "Deliverable 交付物", definition: "客户能够接收、查看和验收的具体成果。", businessUse: "把工作过程转成名单、报告、策略、模板或会议。", evidence: "文件名称、格式、数量、版本和交付日期。", pitfall: "只描述做了很多研究，不说明交付什么。" },
    { term: "Acceptance Criteria", definition: "判断交付是否达到约定质量的可检查标准。", businessUse: "减少主观争议。", evidence: "字段完整率、证据链接、去重、分级一致和抽检规则。", pitfall: "把不可控的回复或成交作为名单验收标准。" },
    { term: "Assumption", definition: "项目计划暂时依赖、但仍需客户或市场验证的条件。", businessUse: "暴露风险并触发核实。", evidence: "产品适用性、资料完整、目标市场和客户响应。", pitfall: "把假设隐藏在结论里。" },
    { term: "Risk Register", definition: "记录风险、概率、影响、负责人和应对动作的清单。", businessUse: "管理资料不足、合规、时效、联系人和交付风险。", evidence: "风险事件、触发信号、缓解措施和状态。", pitfall: "只写风险存在，不安排动作。" },
    { term: "Version Control", definition: "记录画像、名单、邮件和报价每次修改的版本、日期和原因。", businessUse: "支持协作、追责和复盘。", evidence: "版本号、变更日志、批准人与文件位置。", pitfall: "多人通过文件名最终版2反复覆盖。" },
    { term: "Service Pricing", definition: "按照范围、工时、难度、工具与价值形成研究或开发服务价格。", businessUse: "将服务费与产品、广告、数据和第三方成本分开。", evidence: "工作分解、工时估算、修改与付款节点。", pitfall: "按客户可能成交额随意报价或保证结果。" },
    { term: "Retrospective", definition: "比较计划、执行、结果和误判，把经验转成下一轮规则。", businessUse: "持续改进 ICP、来源、证据、文案和交付。", evidence: "漏斗数据、错误案例、客户反馈与行动项。", pitfall: "只总结做得好不好，没有形成可执行改进。" },
  ],
};

export type CourseResource = {
  id: string;
  provider: string;
  title: string;
  url: string;
  language: string;
  access: string;
  learn: string;
  task: string;
  note: string;
};

export const courseResourceCatalog: CourseResource[] = [
  { id: "trade-ph-aftermarket", provider: "U.S. International Trade Administration", title: "Philippine Automotive Aftermarket", url: "https://www.trade.gov/market-intelligence/philippine-automotive-aftermarket", language: "英语", access: "免费官方网页；无需购买课程", learn: "通过一个具体市场认识汽车售后市场的产品范围、零售与批发商、维修中心、专业改装店、电商平台以及本地合作伙伴的作用。", task: "从正文提取五类销售渠道，画出“零部件供应商 → 渠道 → 维修/零售 → 车主”的链条；再标出哪些结论只适用于菲律宾、不能直接套用到墨西哥。", note: "美国国际贸易管理局的免费市场简报。它是菲律宾案例，不代表全球市场；数据与认证要求使用前要按目标国重新核实。" },
  { id: "trade-market-research", provider: "U.S. International Trade Administration", title: "Conducting Market Research", url: "https://www.trade.gov/conducting-market-research", language: "英语", access: "免费网页", learn: "如何提出研究问题、结合一手与二手研究、比较市场并形成出口计划。", task: "把页面的问题清单改写成当前产品的十项市场研究问题。", note: "方法可以借鉴；具体出口规则需按中国与目的国另行核实。" },
  { id: "trade-due-diligence", provider: "U.S. International Trade Administration", title: "Perform Due Diligence", url: "https://www.trade.gov/perform-due-diligence", language: "英语", access: "免费网页与视频", learn: "目标市场、合作伙伴、买家和付款风险的尽职调查框架。", task: "用页面框架检查一家公司，并写出三个仍需第三方核实的风险。", note: "不能替代正式信用、法律或合规审查。" },
  { id: "trade-evaluate-reps", provider: "U.S. International Trade Administration", title: "Evaluate Foreign Representatives", url: "https://www.trade.gov/evaluate-foreign-representatives", language: "英语", access: "免费网页", learn: "评估代理商和分销商时应核实的历史、销售能力、市场知识、仓储与商业资信。", task: "把官方问题转成一份 12 项经销商访谈清单。", note: "页面面向美国出口商，但合作伙伴评估思路可迁移。" },
  { id: "salesforce-qualification", provider: "Salesforce Trailhead", title: "Lead Qualification: Quick Look", url: "https://trailhead.salesforce.com/content/learn/modules/lead-qualification-quick-look", language: "英语", access: "免费学习模块；部分功能需账户", learn: "为什么要做线索资格判断，以及 BANT、CHAMP、MEDDIC 等框架的差异。", task: "挑选一个框架，删掉不适合早期制造业陌生开发的字段，再解释原因。", note: "软件销售术语不能直接照搬，需转成制造业采购证据。" },
  { id: "trade-incoterms", provider: "U.S. International Trade Administration", title: "Know Your Incoterms", url: "https://www.trade.gov/know-your-incoterms", language: "英语；含图解与视频", access: "免费官方网页；无需购买课程", learn: "11 个 Incoterms® 2020 规则如何划分运输、保险、单证、清关、成本与风险，并理解海运专用规则和适用所有运输方式规则的区别。", task: "使用页面图解比较 EXW、FCA、FOB、CIF 和 DAP：分别记录适用运输方式、交货点、风险转移点和主要费用责任；不会的项目写“待核实”。", note: "美国国际贸易管理局的免费教学页，适合建立框架；Incoterms® 规则由 ICC 制定且受版权保护，正式报价和合同仍应使用合法取得的规则文本并做专业核对。" },
  { id: "trade-pricing", provider: "U.S. International Trade Administration", title: "Pricing Strategy", url: "https://www.trade.gov/pricing-strategy", language: "英语", access: "免费网页", learn: "出口定价中的成本、市场需求、竞争、运输、税费、佣金与融资因素。", task: "把产品出厂价之外的成本列成落地成本树，并标出未知数据来源。", note: "示例面向美国企业，计算方法需按实际出口主体调整。" },
  { id: "access2markets", provider: "European Commission", title: "Access2Markets Tutorials", url: "https://trade.ec.europa.eu/access-to-markets/en/content/tutorials", language: "英语及欧盟多语言界面", access: "免费官方工具与教程", learn: "如何查询欧盟关税、产品要求、贸易协定和原产地规则。", task: "选择一个示例产品和欧盟目的国，记录产品编码、关税、程序与仍需专业核实项。", note: "仅用于欧盟市场学习；结果取决于正确的产品分类和交易条件。" },
  { id: "wto-intro", provider: "World Trade Organization", title: "Introduction to the WTO", url: "https://www.learning.wto.org/course/info.php?id=3", language: "英语及平台提供的其他语言", access: "免费自学课程；需注册，无需购买证书", learn: "多边贸易体系、WTO 基本原则、协定与信息来源。", task: "完成导论后，用自己的话解释 WTO 规则与单笔产品进口要求的区别。", note: "宏观规则课程不能替代目标国的具体法规查询。" },
  { id: "british-email", provider: "British Council LearnEnglish", title: "English for Emails", url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails", language: "英语", access: "免费课程与互动练习", learn: "邮件结构、开头结尾、段落组织、校对与邮件礼仪。", task: "完成 Unit 7 与 Unit 8，再用学到的结构重写 Day 14 开发信。", note: "语言课程负责表达清楚，业务事实仍需独立核实。" },
  { id: "hubspot-sales", provider: "HubSpot Academy", title: "Inbound Sales Certification", url: "https://academy.hubspot.com/courses/inbound-sales", language: "英语；字幕情况以平台为准", access: "免费课程；通常需要账户", learn: "识别合适潜客、开展探索式沟通并以买家情境推进销售。", task: "将课程中的软件销售示例改写成工业泵或汽配采购情境。", note: "框架可借鉴，不要把数字营销线索行为直接当成采购意向。" },
  { id: "salesforce-prospecting", provider: "Salesforce Trailhead", title: "Prospecting to Improve Sales", url: "https://trailhead.salesforce.com/content/learn/modules/prospecting-to-improve-sales", language: "英语", access: "免费学习模块", learn: "战略性寻找潜客、建立销售管道和规划开发活动。", task: "完成模块后，为五家 A 类企业分别写一条“为什么现在值得联系”的证据。", note: "触发点必须有来源，不能由模板自动生成。" },
  { id: "itc-export-marketing", provider: "International Trade Centre", title: "Setting up an Export Marketing Strategy", url: "https://learning.intracen.org/course/info.php?id=147", language: "英语", access: "免费课程；需注册，开放状态以页面为准", learn: "出口营销战略、信息定位与出口营销流程。", task: "完成一个模块后，把结论填入模拟接单项目的目标市场、信息与行动三栏。", note: "ITC 官方 SME Trade Academy 课程。" },
  { id: "wto-stats", provider: "World Trade Organization", title: "WTO Stats", url: "https://stats.wto.org/en", language: "英语、法语、西班牙语", access: "免费官方数据门户；网页查询与导出无需购买订阅", learn: "按经济体、时间和商品组查看货物贸易、服务贸易与关税指标，并阅读指标定义、单位、频率和数据来源。", task: "选择三个目标市场与同一商品组，导出可比较的年度进口数据；记录指标名、单位、年份、更新时间和三个数据限制。", note: "WTO Stats 的商品组通常比 HS 六位编码更粗，适合看大趋势；具体产品研究要与 UN Comtrade 交叉核实，贸易总量也不能证明某家公司有采购意向。" },
  { id: "un-comtrade", provider: "United Nations Statistics Division", title: "UN Comtrade", url: "https://comtradeplus.un.org/TradeFlow", language: "英语", access: "免费公开查询；完成课程练习不需要购买高级额度", learn: "按报告国、伙伴、产品与年份查询货物贸易数据。", task: "用同一 HS 编码比较三个市场三年的进口趋势，并记录数据可用性。", note: "先核实 HS 编码；报告国与伙伴国数据可能存在口径差异。免费查询足以完成练习，不要为批量下载额度付费。" },
  { id: "trade-export-plan", provider: "U.S. International Trade Administration", title: "Sample Export Plan", url: "https://www.trade.gov/sample-export-plan", language: "英语", access: "免费网页与模板", learn: "出口计划的企业准备、市场选择、渠道、定价、行动、预算与复盘结构。", task: "用页面目录检查自己的模拟项目，补齐缺失章节并标出暂不适用项。", note: "模板面向美国企业，合规部分需按实际出口主体调整。" },
  { id: "trade-develop-plan", provider: "U.S. International Trade Administration", title: "Develop an Export Plan", url: "https://www.trade.gov/develop-export-plan", language: "英语", access: "免费官方教程；无需账号", learn: "从产品出口潜力、目标市场、客户画像、渠道、定价、人员、预算和时间表建立完整出口计划。", task: "回答页面中的 11 组规划问题，并把答案分成已确认、待工厂确认、待市场验证三栏。", note: "页面面向美国出口商，规划框架可迁移；中国出口手续和目标国要求必须另行核实。" },
  { id: "trade-select-markets", provider: "U.S. International Trade Administration", title: "Selecting International Markets", url: "https://www.trade.gov/selecting-international-markets", language: "英语；含视频", access: "免费官方网页与视频；无需账号", learn: "从需求、竞争、法规、物流、文化、售后和合作伙伴条件比较候选市场。", task: "为三个候选国家制作七项比较表，每项都填写来源、判断和缺失信息，最后给出暂定优先级。", note: "方法可借鉴，不能直接套用页面中的美国出口管制说明。" },
  { id: "trade-export-videos", provider: "U.S. International Trade Administration", title: "How to Export Videos", url: "https://www.trade.gov/how-export-videos", language: "英语；免费视频", access: "免费官方系列课程；无需账号", learn: "出口规划、市场进入、寻找买家、收款融资、产品准备、单证与运输的完整流程。", task: "选择与当天主题最相关的一段视频，记录三个动作、两个需要核实的条件和一个可直接用于模拟项目的模板字段。", note: "视频按美国出口商视角制作；学习流程即可，法规和机构服务不能照搬。" },
  { id: "trade-sales-channels", provider: "U.S. International Trade Administration", title: "Sales Channels", url: "https://www.trade.gov/sales-channels", language: "英语", access: "免费官方网页；无需账号", learn: "直接销售、代理商、代表、经销商、批发商、出口中间商和跨境电商的差异。", task: "为当前产品比较三种渠道的客户关系、控制力、成本、库存责任与验证问题，并选择一个首选渠道。", note: "渠道选择取决于产品、团队和市场；不要把某个渠道写成所有企业的标准答案。" },
  { id: "trade-find-buyers", provider: "U.S. International Trade Administration", title: "Find Buyers and Partners", url: "https://www.trade.gov/find-buyers-and-partners", language: "英语", access: "免费官方指南；页面中部分商业服务可收费但课程不要求使用", learn: "通过展会、贸易活动、在线渠道、合作伙伴和尽调逐步发现与筛选海外买家。", task: "从免费方法中选四种，为每种写搜索入口、可获得证据、成本和停止条件；不购买页面中的定制服务。", note: "美国商务服务只适用于符合条件的美国企业；本课程只学习公开方法，不推荐购买服务。" },
  { id: "trade-documents", provider: "U.S. International Trade Administration", title: "Common Export Documents", url: "https://www.trade.gov/common-export-documents", language: "英语", access: "免费官方网页；无需账号", learn: "形式发票、商业发票、装箱单、原产地证、空运单、提单及特殊单证的用途和区别。", task: "建立一张单证表，列出文件名称、出具方、使用阶段、核心字段和需要向进口商或货代确认的问题。", note: "美国出口申报要求不适用于中国主体；实际单证应向中国主管部门、目的国进口商和专业服务商核实。" },
  { id: "trade-payment-methods", provider: "U.S. International Trade Administration", title: "Methods of Payment", url: "https://www.trade.gov/methods-payment", language: "英语；含视频与图表", access: "免费官方教程；无需账号", learn: "预付款、信用证、托收、赊账和寄售对买卖双方风险、成本与竞争力的影响。", task: "按出口商风险、买家风险、银行参与、成本和适用场景比较五种付款方式，再为首单提出待专业核实的选择。", note: "只用于理解风险结构；真实付款条件需要结合双方资信、银行要求、保险和合同审查。" },
  { id: "trade-negotiate-sale", provider: "U.S. International Trade Administration", title: "Negotiate an Export Sale", url: "https://www.trade.gov/negotiate-export-sale", language: "英语；含视频", access: "免费官方学习路径；无需账号", learn: "把定价、贸易术语、付款、形式发票、关税和融资放进同一场出口谈判。", task: "为一个模拟询盘制作谈判准备表：目标、底线、可交换条件、未知成本、需批准事项和下一步。", note: "页面中的融资机构面向美国企业；谈判结构可以迁移，金融与法律安排必须按实际主体核实。" },
  { id: "british-negotiating", provider: "British Council LearnEnglish", title: "Negotiating", url: "https://learnenglish.britishcouncil.org/free-resources/business/business/magazine/negotiating", language: "英语", access: "免费文章与练习；无需购买课程", learn: "用目标、问题、倾听、共同利益和备选方案进行协作式谈判。", task: "完成准备题和阅读练习，再用英文写出工业品 MOQ 谈判的目标、三个问题、两个共同利益与两个备选方案。", note: "侧重语言和沟通原则，不替代正式合同、价格授权或专业谈判建议；部分地区网络可能需要稍后重试。" },
  { id: "british-meetings", provider: "British Council LearnEnglish", title: "Managing Meetings", url: "https://learnenglish.britishcouncil.org/free-resources/business/business/magazine/managing-meetings", language: "英语", access: "免费文章与练习；无需购买课程", learn: "设置议程、选择参会人、澄清理解、记录决定、分配行动和按时结束会议。", task: "为一次 20 分钟采购需求会议写英文议程，并准备三句澄清、三句总结和一份行动项记录。", note: "练习的是会议表达与结构；技术结论和商业承诺仍要由负责人确认。" },
  { id: "salesforce-discovery", provider: "Salesforce Trailhead", title: "Customer-Centric Sales Discovery", url: "https://trailhead.salesforce.com/content/learn/modules/design-thinking-for-sales/take-a-customercentric-approach-to-discovery", language: "英语", access: "免费学习单元；可直接阅读，测验通常需免费账号", learn: "先了解客户业务和终端客户，再通过体验、访谈与共同构想发现真实机会。", task: "选择一家模拟企业，分别写出 Know the customer、Be the customer、Connect 和 Create a point of view 四步证据与问题。", note: "案例来自软件销售；需要改写成制造业采购场景，不能把公开线索当成已确认需求。" },
  { id: "salesforce-conversations", provider: "Salesforce Trailhead", title: "Customer-Centric Conversations", url: "https://trailhead.salesforce.com/content/learn/modules/customer-centric-conversations-strategies/create-a-customer-centric-conversation-message", language: "英语", access: "免费学习单元；可直接阅读，测验通常需免费账号", learn: "把调研结果组织为风险、结果、挑战和请求，形成以客户为中心的沟通信息。", task: "用 Risk–Outcome–Challenge–Ask 框架改写一封开发信，每个判断旁边标注证据或待核实。", note: "框架可用于制造业开发，但不能照搬 Salesforce 产品话术或虚构客户结果。" },
  { id: "salesforce-objections", provider: "Salesforce Trailhead", title: "Objection Handling Strategies", url: "https://trailhead.salesforce.com/content/learn/modules/objection-handling-strategies/prepare-for-objections", language: "英语", access: "免费学习模块；测验通常需免费账号", learn: "识别异议背后的原因，并使用 Defuse、Discover、Deliver 三步先澄清再回应。", task: "针对价格高、已有供应商和担心质量三个异议，各写一句缓和、一组发现问题和一项可核实证据。", note: "回应必须使用企业真实证据；没有证明材料时应承诺核实，而不是编造案例或数字。" },
  { id: "salesforce-deal", provider: "Salesforce Trailhead", title: "Lock Down Your Sales Deal", url: "https://trailhead.salesforce.com/content/learn/modules/sales-deal-structures/lock-down-your-sales-deal", language: "英语", access: "免费学习单元；测验通常需免费账号", learn: "用 Give and Get、优先级和可调条件准备谈判，避免只围绕单价逐项让步。", task: "把数量、包装、交期、付款、价格和产品组合列成六个可调项，为每次让步写出对应交换条件。", note: "软件订阅案例需改写成实物制造业条件；最终价格和权限必须由企业负责人确认。" },
  { id: "openlearn-project", provider: "The Open University · OpenLearn", title: "Project Management: The Start of the Project Journey", url: "https://www.open.edu/openlearn/money-business/leadership-management/project-management-the-start-the-project-journey/content-section-0", language: "英语", access: "免费大学课程；正文可阅读，免费账号可记录进度", learn: "项目目标、利益相关者、可行性、范围、生命周期、计划、预算与项目经理职责。", task: "只学习第 1 节和第 4.4 节，为模拟获客项目写目标、范围、五类利益相关者、约束和项目经理职责。", note: "完整课程较长，按指定章节学习即可；无需购买学位课程或证书。" },
  { id: "openlearn-risk", provider: "The Open University · OpenLearn", title: "Risk Management", url: "https://www.open.edu/openlearn/money-business/risk-management?active-tab=description-tab", language: "英语", access: "免费大学课程；可获得免费参与证明", learn: "风险识别、概率与影响、应对、责任人、监控、报告以及风险管理计划。", task: "学习 Session 1 和风险管理流程部分，为模拟项目建立至少八项风险的概率—影响—应对—责任人清单。", note: "课程覆盖企业风险，需筛选与客户研究、合规、数据质量、沟通和项目交付有关的部分。" },
];

export const resourceIdsByDay: Record<number, string[]> = {
  1: ["trade-ph-aftermarket", "trade-sales-channels", "trade-market-research"],
  2: ["trade-export-videos", "trade-develop-plan", "trade-ph-aftermarket"],
  3: ["trade-sales-channels", "trade-evaluate-reps", "trade-ph-aftermarket"],
  4: ["trade-market-research", "trade-select-markets", "trade-sales-channels", "salesforce-qualification"],
  5: ["salesforce-qualification", "trade-due-diligence", "trade-select-markets"],
  6: ["trade-market-research", "wto-stats", "trade-select-markets", "trade-due-diligence"],
  7: ["trade-due-diligence", "trade-evaluate-reps", "salesforce-discovery"],
  8: ["salesforce-qualification", "salesforce-discovery", "trade-evaluate-reps"],
  9: ["trade-due-diligence", "salesforce-qualification", "trade-find-buyers"],
  10: ["trade-negotiate-sale", "trade-documents", "trade-payment-methods", "trade-pricing"],
  11: ["trade-payment-methods", "trade-incoterms", "trade-negotiate-sale", "trade-documents"],
  12: ["trade-pricing", "trade-incoterms", "trade-documents", "access2markets"],
  13: ["british-email", "british-meetings", "wto-intro"],
  14: ["british-email", "salesforce-conversations", "hubspot-sales"],
  15: ["british-email", "british-meetings", "salesforce-conversations"],
  16: ["salesforce-discovery", "hubspot-sales", "salesforce-conversations", "salesforce-qualification"],
  17: ["salesforce-objections", "british-negotiating", "salesforce-deal"],
  18: ["british-meetings", "salesforce-conversations", "hubspot-sales"],
  19: ["wto-stats", "un-comtrade", "trade-market-research", "trade-select-markets"],
  20: ["un-comtrade", "trade-due-diligence", "trade-find-buyers", "trade-sales-channels"],
  21: ["trade-evaluate-reps", "salesforce-prospecting", "trade-find-buyers", "salesforce-discovery"],
  22: ["salesforce-conversations", "salesforce-prospecting", "british-email"],
  23: ["salesforce-prospecting", "hubspot-sales", "trade-find-buyers"],
  24: ["openlearn-project", "trade-export-plan", "itc-export-marketing"],
  25: ["openlearn-project", "openlearn-risk", "trade-due-diligence", "trade-export-plan"],
  26: ["salesforce-conversations", "openlearn-project", "itc-export-marketing", "salesforce-prospecting"],
  27: ["trade-pricing", "salesforce-deal", "openlearn-risk", "trade-export-plan"],
  28: ["openlearn-project", "openlearn-risk", "trade-export-plan", "itc-export-marketing"],
};

export const getCourseResources = (day: number) => {
  const ids = resourceIdsByDay[day] ?? [];
  return ids
    .map((id) => courseResourceCatalog.find((resource) => resource.id === id))
    .filter((resource): resource is CourseResource => Boolean(resource));
};
