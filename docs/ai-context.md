# AI 开发上下文

本文档为 AI 辅助开发提供项目上下文信息。

## 项目概述

**项目名称**: 喜云到家官网 V1.0.0
**项目类型**: 企业展示型网站（品牌官网）
**品牌定位**: 专业家庭服务一站式平台
**技术栈**: 纯静态 HTML/CSS/JS，零依赖，浏览器直接打开
**品牌主色**: #448844（匠心苔绿）
**品牌辅色**: #E8A040（温暖橙）
**背景色**: #FFFAF0（暖白）

## 核心功能

1. **公司介绍**: 展示公司信息、企业文化、团队风采
2. **服务展示**: 列出所有服务项目，支持分类筛选
3. **案例展示**: 展示成功案例，支持分页
4. **新闻资讯**: 发布公司动态和行业资讯
5. **联系表单**: 在线留言功能

## 页面结构

| 页面 | 文件 | 功能 |
|------|------|------|
| 首页 | index.html | 品牌展示、服务入口、行动号召 |
| 关于我们 | pages/about.html | 公司简介、企业文化、团队介绍 |
| 服务项目 | pages/services.html | 服务列表、分类筛选 |
| 案例展示 | pages/cases.html | 案例卡片、分页展示 |
| 新闻资讯 | pages/news.html | 新闻列表、分页展示 |
| 联系我们 | pages/contact.html | 联系方式、在线留言表单 |

## CSS 架构

```
base.css        → 变量定义、重置样式、基础组件
layout.css      → 页面布局、头部、底部、网格
components.css  → 可复用组件（卡片、表单、徽章）
pages/*.css     → 页面特定样式
```

## JavaScript 模块

```
common.js       → XiYun 对象、公共函数、工具方法
nav.js          → 导航高亮、移动菜单
pages/*.js      → 页面特定交互
```

## 设计规范

### 颜色

| 色板 | 色值 | 用途 |
|------|------|------|
| 匠心苔绿 | `#448844` | 主色调 — 按钮、链接、强调元素 |
| 温暖橙 | `#E8A040` | 辅色 — CTA 按钮、高亮、促销标签 |
| 暖白 | `#FFFAF0` | 页面背景色 |
| 正文黑 | `#333333` | 正文文字 |
| 辅助灰 | `#666666` | 辅助文字、说明信息 |

### 间距
- 页面节内边距: 80px
- 组件间距: 30px
- 容器最大宽度: 1200px

### 圆角
- 按钮/卡片: 8px

## 开发约定

1. **文件命名**: kebab-case（小写+连字符）
2. **CSS 类名**: BEM 规范
3. **图片优化**: 使用 WebP 格式，压缩处理
4. **响应式**: 移动端优先，断点 768px
5. **无障碍**: 使用语义化标签，添加 alt 属性

## 常用代码片段

### 引入资源
```html
<link rel="stylesheet" href="../assets/css/base.css">
<script src="../assets/js/common.js"></script>
```

### 页面头部
```html
<header class="site-header">
    <div class="container">
        <div class="logo">
            <a href="../index.html"><img src="../assets/images/logo/logo.png" alt="喜云到家"></a>
        </div>
        <nav class="main-nav">
            <ul>
                <li><a href="../index.html">首页</a></li>
                <!-- 其他导航项 -->
            </ul>
        </nav>
    </div>
</header>
```

### 按钮组件
```html
<a href="#" class="btn btn-primary">主要按钮</a>
<a href="#" class="btn btn-secondary">次要按钮</a>
```

### 卡片组件
```html
<div class="card">
    <img src="image.jpg" alt="描述">
    <div class="card-body">
        <h3 class="card-title">标题</h3>
        <p class="card-text">内容</p>
    </div>
</div>
```
