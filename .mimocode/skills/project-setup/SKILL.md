---
name: project-setup
description: 喜云到家项目初始化和框架搭建 - 创建目录结构、配置文件、README文档
---

# 项目初始化技能

为喜云到家相关项目创建标准化的目录结构和配置文件。

## 使用场景

- 创建新的网站项目
- 初始化项目目录结构
- 生成 README 文档
- 配置开发环境

## 标准目录结构

```
项目根目录/
├── index.html              # 主页面
├── pages/                  # 子页面
│   ├── services.html       # 服务介绍
│   ├── community.html      # 交流社区
│   ├── documents.html      # 文档资料
│   └── appointment.html    # 下单预约
├── assets/                 # 静态资源
│   ├── css/                # 样式文件
│   │   ├── base.css        # 基础样式
│   │   ├── layout.css      # 布局样式
│   │   ├── components.css  # 组件样式
│   │   └── pages/          # 页面专属样式
│   ├── js/                 # JavaScript 文件
│   │   ├── common.js       # 公共函数
│   │   ├── nav.js          # 导航逻辑
│   │   └── api.js          # API 接口
│   └── images/             # 图片资源
│       ├── logo/           # Logo 文件
│       ├── services/       # 服务图片
│       └── uploads/        # 上传图片
├── admin/                  # 管理后台
│   ├── server.js           # 后台服务器
│   ├── admin.html          # 管理界面
│   ├── data.db             # SQLite 数据库
│   └── seed-data.json      # 种子数据
├── backend/                # 后端服务 (可选)
├── components/             # 可复用组件
├── docs/                   # 项目文档
├── 资料素材/               # 品牌素材
├── .gitignore              # Git 忽略文件
├── README.md               # 项目说明
└── PROJECT_STRUCTURE.md    # 项目结构说明
```

## 创建步骤

### 1. 创建目录结构

```bash
# 创建主要目录
mkdir -p pages assets/css/pages assets/js assets/images/{logo,services,uploads} admin components docs 资料素材
```

### 2. 创建基础文件

```bash
# 创建 .gitignore
cat > .gitignore << 'EOF'
node_modules/
*.db
*.db-journal
*.db-wal
.DS_Store
Thumbs.db
*.log
.env
.env.local
EOF

# 创建 README.md
cat > README.md << 'EOF'
# 项目名称

## 项目简介
简要描述项目的目的和功能。

## 技术栈
- 前端: HTML5 + CSS3 + JavaScript
- 后端: Node.js + Express
- 数据库: SQLite
- 样式: 自定义 CSS (品牌色 #008800, #FF9955)

## 目录结构
[插入目录结构说明]

## 快速开始
1. 安装依赖: `cd admin && npm install`
2. 启动服务: `node server.js`
3. 访问网站: http://localhost:3000
4. 访问后台: http://localhost:3000/admin

## 开发指南
- 前端文件在 `pages/` 和 `assets/` 目录
- 后台管理在 `admin/` 目录
- 使用 `dev` 分支进行开发
- 完成后合并到 `main` 分支

## 部署
[部署说明]
EOF
```

### 3. 创建 CSS 基础文件

```bash
# base.css - 基础样式
cat > assets/css/base.css << 'EOF'
/* 基础样式 - 设计Token、排版、工具类 */
:root {
  --primary: #008800;
  --primary-light: #e6f5e6;
  --primary-dark: #006600;
  --accent: #FF9955;
  --accent-light: #fff3e6;
  --radius: 16px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.1);
  --font-heading: 'Noto Serif SC', serif;
  --font-body: 'Noto Sans SC', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  line-height: 1.6;
  color: #333;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  height: auto;
}
EOF
```

### 4. 创建 JavaScript 基础文件

```bash
# common.js - 公共函数
cat > assets/js/common.js << 'EOF'
/**
 * 喜云到家 - 公共函数库
 */

// 品牌配置
const BRAND = {
  name: '喜云到家',
  slogan: '让家更干净，让心更轻松',
  phone: '400-xxx-xxxx',
  email: 'service@xiyun.com'
};

// 工具函数
const Utils = {
  // 格式化日期
  formatDate(date) {
    return new Date(date).toLocaleDateString('zh-CN');
  },
  
  // 防抖函数
  debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  // 节流函数
  throttle(fn, delay = 300) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last > delay) {
        last = now;
        fn.apply(this, args);
      }
    };
  }
};

// 导航初始化
function initNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', Utils.throttle(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }));
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initNav();
});
EOF
```

### 5. 创建服务器文件

```bash
# admin/server.js - 后台服务器
cat > admin/server.js << 'EOF'
/**
 * 喜云到家 - 管理后台服务器
 * Node.js + Express + SQLite
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// 数据库初始化
const db = sqlite3(path.join(__dirname, 'data.db'));
db.pragma('journal_mode = WAL');

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    price TEXT,
    duration TEXT,
    features TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    content TEXT,
    image_url TEXT,
    customer_name TEXT,
    customer_review TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  // ... 其他表
`);

// API 路由
// ... (根据实际需求添加)

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`管理后台: http://localhost:${PORT}/admin`);
});
EOF
```

### 6. 初始化 Git

```bash
git init
git add .
git commit -m "feat: 项目初始化"
git checkout -b dev
```

## 品牌规范

### 颜色

- **主色**: #008800 (绿色)
- **辅助色**: #FF9955 (暖橙)
- **背景**: #ffffff (白色)
- **文字**: #333333 (深灰)

### 字体

- **标题**: Noto Serif SC (思源宋体)
- **正文**: Noto Sans SC (思源黑体)

### 设计风格

- 简约、美观、大方
- 毛玻璃导航效果
- 卡片式布局
- 入场动画

## 注意事项

1. 所有文件使用 UTF-8 编码
2. CSS 使用 BEM 命名规范
3. JavaScript 使用 ES6+ 语法
4. 图片使用 SVG 或 WebP 格式
5. 保持代码中文注释
