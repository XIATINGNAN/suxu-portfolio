# 苏旭 · 个人作品集网站

暗色系、高级克制、带科技感的个人官网。React + Vite 实现，PC / 移动端自适应，版心 1700px。

## 快速开始

```bash
npm install
npm run dev        # 开发预览 → http://localhost:5173
npm run build      # 生产构建 → dist/
npm run preview    # 预览生产构建
```

## 内容怎么改

所有文案统一在 [`src/data/resume.js`](src/data/resume.js) 中维护，改字段即可全站生效。结构如下：

| 字段 | 说明 |
| --- | --- |
| `profile` | 姓名、定位、简介、联系方式、教育背景 |
| `stats` | 「关于」区的数据行（项目数据） |
| `nav` | 导航链接 |
| `works` | 精选项目 / 证书大卡片（`placeholder: true` 表示待补充占位） |
| `strengths` | 个人优势卡片 |
| `contact` | 收尾页联系信息 |

## 素材替换

- **头像**：把照片放到 `public/avatar.jpg`（无照片时自动显示「苏」字首字母徽标）
- **Hero 视频背景**：把视频放到 `public/hero-bg.mp4`（并可选 `public/hero-poster.jpg` 封面）。未提供时自动回退到「极光渐变 + 科技网格」的动效背景
- 网页图标：`public/favicon.svg`

## 待补充内容

简历中的实习经历、部分项目细节为【待补充】状态。当前以结构化占位卡片呈现，拿到真实资料后直接在 `resume.js` 中替换即可。
