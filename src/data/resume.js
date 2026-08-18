// 简历数据源 —— 修改这里的字段即可更新全站内容
// 占位内容标注了【待补充】，拿到真实资料后替换

// 基路径：GitHub Pages 项目站部署在子路径下，图片一律用相对路径
const base = import.meta.env.BASE_URL // 开发时 '/'，生产(./) 相对路径

export const profile = {
  name: '苏旭',
  nameEn: 'SU XU',
  role: '视觉设计师 / AI 设计师 / 品牌设计师',
  tagline: '用结构与视觉，让复杂的信息变得清晰而有温度。',
  bio: [
    '沧州交通学院 电气工程及其自动化 2026 届毕业生。关注视觉设计、品牌表达与 AI 工具的生产力结合，擅长把「复杂」拆解成「清晰」。',
    '作为视觉表达方向的设计实践者，累计交付 100+ 份汇报、答辩与路演类作品；同时持续用 AI 编程与生成式工具重构设计工作流，让效率与品质并存。',
  ],
  location: '河北 · 承德',
  phone: '181-3189-1680',
  email: 'suxu@email.com',
  emailHref: 'mailto:suxu@email.com',
  linkedin: 'linkedin.com/in/suxu-profile',
  linkedinHref: 'https://linkedin.com/in/suxu-profile',
  school: '沧州交通学院',
  major: '电气工程及其自动化',
  education: '2026 届 · 本科',
  avatar: `${base}photos/headshot.jpg`, // 大头照 photo1
}

export const stats = [
  { value: '100+', label: '设计作品交付', note: '汇报 · 答辩 · 路演' },
  { value: '2026', label: 'AI 训练师认证', note: '阿里巴巴认证' },
  { value: '3', label: '设计方向', note: '视觉 · AI · 品牌' },
  { value: '5+', label: '电气核心课程', note: 'PLC · 电路 · 控制' },
]

export const nav = [
  { id: 'works', num: '01', label: '作品' },
  { id: 'about', num: '02', label: '关于' },
  { id: 'life', num: '03', label: '生活' },
  { id: 'strengths', num: '04', label: '优势' },
  { id: 'contact', num: '05', label: '联系' },
]

// 证书墙（photo2–photo5）。证书名称/顺序若与实际不符，直接修改 title 即可
export const certs = [
  { src: `${base}photos/certs/cert-01.jpg`, title: '阿里巴巴 · 人工智能训练师', meta: '认证 · 2026', note: 'AI 数据标注与模型训练基础能力' },
  { src: `${base}photos/certs/cert-02.jpg`, title: '阿里云 · Clouder 专项认证', meta: '阿里云', note: '云计算与工程实践能力' },
  { src: `${base}photos/certs/cert-03.jpg`, title: '技能认证', meta: '证书 · 待标注', note: '证书名称可在 resume.js 中补充' },
  { src: `${base}photos/certs/cert-04.jpg`, title: '技能认证', meta: '证书 · 待标注', note: '证书名称可在 resume.js 中补充' },
]

// 生活掠影（photo6–photo11）
export const life = {
  archery: {
    src: `${base}photos/life/archery.jpg`,
    tag: '爱好',
    title: '射箭',
    desc: '专注与控制，是射箭教会我的事。把呼吸、站姿与每一次释放都当作一次校准。',
  },
  douyin: {
    src: `${base}photos/life/douyin.jpg`,
    tag: '社交',
    title: '抖音主页',
    desc: '分享创作与生活片段，记录灵感的流动。',
    url: '', // 填入抖音主页链接后，卡片会自动变为可点击跳转
  },
  gallery: [
    { src: `${base}photos/life/moment-01.jpg`, note: '个人记录' },
    { src: `${base}photos/life/moment-02.jpg`, note: '风景' },
    { src: `${base}photos/life/moment-03.jpg`, note: '个人记录' },
    { src: `${base}photos/life/moment-04.jpg`, note: '风景' },
  ],
}

export const works = [
  {
    id: 'ppt',
    num: '01',
    title: 'PPT 视觉设计作品集',
    category: '核心作品',
    span: 'wide',
    accent: true,
    desc: '累计 100+ 份设计交付，覆盖学术答辩、商业路演、活动策划等多种场景。以信息架构为核心，让每一页都服务于「被看懂」。',
    tags: ['PowerPoint', '信息可视化', '结构化表达', '叙事设计'],
    metrics: [
      { value: '100+', label: '交付作品' },
      { value: '6+', label: '场景类型' },
      { value: '100%', label: '满意度' },
    ],
    status: '作品集',
    statusTone: 'solid',
  },
  {
    id: 'workflow',
    num: '02',
    title: 'AI 增强设计工作流',
    category: '能力方向',
    span: 'tall',
    accent: false,
    desc: '使用 Cursor、GitHub Copilot、通义灵码 与大模型工具，将重复性内容生产与数据处理自动化，重构设计生产链路。',
    tags: ['Cursor', 'Copilot', '通义灵码', '自动化'],
    metrics: null,
    status: '持续实践',
    statusTone: 'line',
  },
  {
    id: 'ali-trainer',
    num: '03',
    title: '阿里巴巴 · 人工智能训练师',
    category: '专业证书',
    span: '',
    accent: false,
    desc: '2026 年获得阿里巴巴认证，具备 AI 数据标注与模型训练的基础能力，理解「数据 → 训练 → 调优」的完整链路。',
    tags: ['AI 数据标注', '模型训练', '质量评估'],
    metrics: null,
    status: '认证 · 2026',
    statusTone: 'line',
  },
  {
    id: 'clouder',
    num: '04',
    title: '阿里云 Clouder 专项技能认证',
    category: '专业证书',
    span: '',
    accent: false,
    desc: '阿里云 Clouder 专项技能认证，覆盖云计算基础与工程实践，为 AI 与数据类项目提供工程视角。',
    tags: ['云计算', '阿里云', '工程实践'],
    metrics: null,
    status: '认证',
    statusTone: 'line',
  },
  {
    id: 'slot',
    num: '05',
    title: '品牌视觉提案',
    category: '即将呈现',
    span: '',
    accent: false,
    placeholder: true,
    desc: '这个位置留给下一个作品。正在规划或整理中的品牌视觉案例，将在后续更新中呈现。',
    tags: ['品牌定位', '视觉系统', '提案'],
    metrics: null,
    status: '待补充',
    statusTone: 'dash',
  },
]

export const strengths = [
  {
    num: '01',
    icon: '◎',
    title: '视觉与信息设计',
    desc: '把复杂信息转化为清晰的视觉语言。精于版式、层级与信息图表的组织，让「被看懂」成为每一页的设计目标。',
    tags: ['PowerPoint 精通', '信息可视化', '结构化叙事'],
  },
  {
    num: '02',
    icon: '◇',
    title: 'AI 增强工作流',
    desc: '用 AI 工具放大设计与生产效能。覆盖代码生成、内容生产、数据处理到方案迭代，把重复交给机器，把判断留给自己。',
    tags: ['Cursor / Copilot', '大模型应用', '自动化脚本'],
  },
  {
    num: '03',
    icon: '◈',
    title: '技术 & 系统思维',
    desc: '电气工程与自动化专业底子，带来严谨的逻辑与系统视角。技术理解力让设计与工程之间的对话更顺畅。',
    tags: ['PLC 基础', '电路与控制', '系统化思考'],
  },
  {
    num: '04',
    icon: '◐',
    title: '品牌与交付',
    desc: '从需求梳理到方案落地，重视结果与反馈。善于把抽象需求翻译成可执行的视觉方案，并在迭代中持续打磨。',
    tags: ['需求梳理', '项目协作', '持续迭代'],
  },
]

export const contact = {
  heading: ['一起，', '做点真正出色的东西。'],
  sub: '无论是作品集打磨、品牌视觉提案，还是 AI 驱动的效率方案，都欢迎聊聊。',
  methods: [
    { icon: '✉️', label: '邮箱', value: 'suxu@email.com', href: 'mailto:suxu@email.com' },
    { icon: '📞', label: '电话', value: '181-3189-1680', href: 'tel:18131891680' },
    { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/suxu-profile', href: 'https://linkedin.com/in/suxu-profile' },
    { icon: '📍', label: '所在地', value: '河北 · 承德', href: null },
  ],
}
