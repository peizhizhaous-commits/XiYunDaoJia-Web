# 🧩 可复用组件 (components/)

本目录存放网站的**可复用 HTML 组件片段**，用于在多个页面中共享页头、页脚、导航、CTA 区块等公共模块。

## 当前状态

> ⚠️ **本目录目前为空**。当前版本的组件逻辑直接内联在各 HTML 页面中。后续迭代将提取公共 HTML 片段到此目录，实现组件复用。

## 目录结构

```
components/
└── sections/                    # 页面区块组件
    ├── header.html              # （计划）页头组件 — logo + 导航 + 联系方式
    ├── footer.html              # （计划）页脚组件 — 版权信息 + 链接
    ├── nav.html                 # （计划）导航组件 — 响应式菜单
    ├── cta.html                 # （计划）行动号召区块
    ├── contact-form.html        # （计划）联系表单组件
    └── service-card.html        # （计划）服务卡片组件
```

## 使用方式（规划）

组件将以 HTML 片段形式存放，页面通过以下方式引用：

```html
<!-- 方式一：Server-Side Include（需服务器支持） -->
<!--#include virtual="/components/sections/header.html" -->

<!-- 方式二：JavaScript 动态加载 -->
<div id="header-placeholder"></div>
<script>
  fetch('/components/sections/header.html')
    .then(res => res.text())
    .then(html => document.getElementById('header-placeholder').innerHTML = html);
</script>
```

## 组件规范（规划）

- 每个组件一个独立文件
- 文件名使用 kebab-case（`service-card.html`）
- 组件内不使用 `<html>`、`<body>` 等外层标签
- CSS 样式统一写在 `assets/css/components.css` 中

---

📅 最后更新：2026-06-29
