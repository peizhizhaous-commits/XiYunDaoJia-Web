# 喜云到家 - 官网项目

> 家更干净，心更轻松

## 项目简介

喜云到家是智净优邸旗下专注家庭深度保洁与到家服务的品牌官网。本项目是一个纯静态前端网站，使用原生 HTML/CSS/JavaScript 构建，无需复杂框架，易于维护和部署。

---

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式和动画 |
| JavaScript (ES6+) | 交互逻辑 |
| Strapi (可选) | 后端 CMS 内容管理 |
| Vercel | 静态网站托管 |

---

## 项目结构

```
2607_XiYunDaoJia_Web/
├── index.html                 # 首页 - 网站入口
├── pages/                     # 子页面目录
│   ├── about.html             # 关于喜云 - 品牌故事、企业文化
│   ├── services.html          # 服务介绍 - 四大服务分类详情
│   ├── community.html         # 交流社区 - 问答、百科、动态
│   ├── documents.html         # 文档资料 - 标准、指南、政策
│   └── appointment.html       # 立即预约 - 预约表单
├── assets/                    # 静态资源目录
│   ├── css/                   # 样式文件
│   │   ├── base.css           # 基础样式（颜色变量、排版、通用类）
│   │   ├── layout.css         # 布局样式（导航、Hero、页脚）
│   │   ├── components.css     # 组件样式（卡片、表单、徽章等）
│   │   └── pages/             # 页面专属样式
│   │       ├── home.css       # 首页样式
│   │       ├── about.css      # 关于页样式
│   │       ├── services.css   # 服务页样式
│   │       ├── community.css  # 社区页样式
│   │       ├── documents.css  # 文档页样式
│   │       └── appointment.css# 预约页样式
│   ├── js/                    # JavaScript 文件
│   │   ├── common.js          # 全局公共模块（工具函数）
│   │   ├── nav.js             # 导航栏交互（移动端菜单）
│   │   ├── api.js             # API 通信层（与后端交互）
│   │   ├── dataloader.js      # 数据加载器（填充页面内容）
│   │   └── pages/             # 页面专属脚本
│   │       ├── home.js        # 首页脚本
│   │       ├── services.js    # 服务页脚本
│   │       └── contact.js     # 联系页脚本
│   └── images/                # 图片资源
│       ├── logo/              # Logo 图片
│       ├── services/          # 服务图片
│       ├── news/              # 新闻图片
│       └── icons/             # 图标
├── admin/                     # 管理后台
│   ├── server.js              # Express 后端服务器
│   ├── admin.html             # 管理后台页面
│   ├── data.db                # SQLite 数据库
│   └── package.json           # 后端依赖配置
├── backend/                   # Strapi CMS（可选）
│   ├── src/api/               # API 内容类型定义
│   └── package.json           # Strapi 依赖配置
├── vercel.json                # Vercel 部署配置
└── seed-data.json             # 初始数据（服务、案例等）
```

---

## 核心文件说明

### CSS 文件架构

#### 1. `assets/css/base.css` - 基础样式
```css
/* 设计 Token - 统一管理颜色、阴影、圆角等 */
:root {
    --primary: #008800;        /* 主色 - 喜云生态绿 */
    --accent: #FF9955;         /* 点缀色 - 暖云橙 */
    --text-primary: #1a1a1a;   /* 主要文字色 */
    --bg-light: #f8f9fa;       /* 浅灰背景 */
}

/* 包含：Reset 重置、排版基础、通用容器、按钮基类 */
```

#### 2. `assets/css/layout.css` - 布局样式
```css
/* 站点头部 - 毛玻璃效果导航 */
.site-header { ... }

/* Hero 横幅区 - 首页大图 */
.hero { ... }

/* 页脚 */
.site-footer { ... }
```

#### 3. `assets/css/components.css` - 组件样式
```css
/* 可复用组件：卡片、徽章、表单、分页器等 */
.card { ... }
.badge { ... }
.form-group { ... }
```

#### 4. `assets/css/pages/*.css` - 页面专属样式
每个页面有独立的 CSS 文件，避免样式冲突。

---

### JavaScript 文件架构

#### 1. `assets/js/common.js` - 全局公共模块
```javascript
// 全局命名空间 XiYun
const XiYun = {
    init(),           // 初始化入口
    formatDate(),     // 日期格式化
    validateEmail(),  // 邮箱校验
    validatePhone(),  // 手机号校验
    showToast(),      // Toast 消息提示
};
```

#### 2. `assets/js/nav.js` - 导航栏交互
```javascript
// 功能：
// 1. 移动端汉堡菜单展开/收起
// 2. 根据当前 URL 自动高亮导航链接
```

#### 3. `assets/js/api.js` - API 通信层
```javascript
// 封装所有后端 API 调用
const API = {
    getCompanyInfo(),   // 获取公司信息
    getServices(),      // 获取服务列表
    getCases(),         // 获取案例列表
    getNews(),          // 获取新闻列表
    getFeatures(),      // 获取优势特色
    submitContact(),    // 提交联系表单
};
```

#### 4. `assets/js/dataloader.js` - 数据加载器
```javascript
// 从 API 加载数据并填充到页面 DOM
const DataLoader = {
    initHomePage(),       // 初始化首页
    initServicesPage(),   // 初始化服务页
    fillCompanyInfo(),    // 填充公司信息
    fillFeatures(),       // 填充优势特色
    fillServicesList(),   // 填充服务列表
};
```

---

## 页面说明

### 首页 (`index.html`)
- **Hero 区域**：品牌标语、统计数据、预约按钮
- **信任条**：累计服务家庭数、好评率、响应时间
- **核心服务**：展示 4 项主要服务
- **为什么选择我们**：标准化流程、赔付保障、实名认证
- **社区精选**：最新问答和动态

### 服务介绍 (`pages/services.html`)
- **分类 Tab**：保洁清洗、照料陪护、家庭事务、支援服务
- **服务卡片**：手风琴式展开详情
- **吸顶导航**：滚动时 Tab 固定在顶部

### 交流社区 (`pages/community.html`)
- **家政问答**：常见问题手风琴展示
- **行业百科**：图文文章列表
- **喜云动态**：品牌新闻和活动

### 文档资料 (`pages/documents.html`)
- **服务标准手册**：流程、验收标准、工具说明
- **下单指南**：步骤说明、注意事项
- **政策说明**：赔付、隐私、取消政策
- **场景方案**：新家开荒、养宠家庭等
- **资料下载**：PDF 和图片资源

### 关于喜云 (`pages/about.html`)
- **品牌故事**：企业介绍
- **使命愿景价值观**：企业文化
- **我们的优势**：核心竞争力
- **专业团队**：团队数据

### 立即预约 (`pages/appointment.html`)
- **预约表单**：姓名、电话、地址、服务类型、时间

---

## 后端架构

### 管理后台 (`admin/`)
- **技术栈**：Express.js + SQLite
- **功能**：提供 RESTful API，管理服务、案例、新闻等数据
- **数据库**：`data.db` 存储所有内容数据

### Strapi CMS (`backend/`) - 可选
- **技术栈**：Strapi 5.x
- **内容类型**：文章、案例、服务、公司信息、页面配置
- **适用场景**：需要可视化后台管理内容时使用

---

## 部署说明

### Vercel 部署（推荐）
1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 自动部署，获得公网访问地址

### 本地开发
```bash
# 前端（纯静态）
# 直接用浏览器打开 index.html 或使用 Live Server

# 后端管理后台
cd admin
npm install
node server.js
# 访问 http://localhost:3000
```

### Strapi CMS（可选）
```bash
cd backend
npm install
npm run develop
# 访问 http://localhost:1337
```

---

## 设计规范

### 颜色系统
| 变量名 | 颜色值 | 用途 |
|--------|--------|------|
| `--primary` | #008800 | 主色（绿色） |
| `--primary-dark` | #006600 | 深绿（悬停） |
| `--primary-light` | #e6f5e6 | 浅绿（背景） |
| `--accent` | #FF9955 | 点缀色（橙色） |
| `--accent-dark` | #E68A3D | 深橙（悬停） |

### Tab 按钮规范
- **默认状态**：绿色背景 (`var(--primary)`)
- **悬停状态**：深绿色 (`var(--primary-dark)`)
- **选中状态**：橙色背景 (`var(--accent)`)

### 间距规范
- 页面内边距：`80px 0`
- 卡片内边距：`24px - 36px`
- 网格间距：`24px - 48px`

### 圆角规范
- 大圆角：`16px`（卡片）
- 小圆角：`8px`（按钮、输入框）
- 胶囊形：`30px`（Tab 按钮）

---

## 响应式断点

| 断点 | 宽度 | 适配设备 |
|------|------|----------|
| 桌面 | > 768px | PC、大平板 |
| 平板 | ≤ 768px | iPad、小平板 |
| 手机 | ≤ 480px | iPhone、Android |

---

## 文件编辑指南

### 修改颜色主题
编辑 `assets/css/base.css` 中的 `:root` 变量

### 修改页面布局
编辑 `assets/css/layout.css`

### 修改特定页面样式
编辑对应的 `assets/css/pages/*.css` 文件

### 修改页面内容
直接编辑对应的 HTML 文件

### 添加新页面
1. 在 `pages/` 目录创建新的 HTML 文件
2. 复制现有页面的导航栏和页脚代码
3. 在 `assets/css/pages/` 创建对应的 CSS 文件
4. 在导航栏中添加新页面链接

---

## 常见问题

### Q: 如何修改电话号码？
A: 编辑 HTML 文件中的 `400-xxx-xxxx`，或通过管理后台修改公司信息

### Q: 如何添加新的服务项目？
A: 编辑 `pages/services.html`，在对应分类下添加服务卡片

### Q: 如何修改 Logo？
A: 替换 `assets/images/logo/logo.jpg` 文件

### Q: 如何部署到自己的服务器？
A: 将整个项目文件夹上传到服务器，配置 Nginx 指向 `index.html` 即可

---

## 更新日志

### V1.0.1 (2026-07-09)
- 优化页面顶栏设计，移除浪费空间的绿色横幅
- 统一 Tab 按钮样式：绿色默认，橙色选中
- 升级 Strapi 和 better-sqlite3 依赖版本

### V1.0.0 (2026-07-03)
- 项目初始化
- 完成所有页面基础框架
- 实现响应式布局

---

## 联系方式

- **品牌**：喜云到家
- **母公司**：智净优邸
- **服务热线**：400-xxx-xxxx
- **服务时间**：周一至周日 8:00-20:00
