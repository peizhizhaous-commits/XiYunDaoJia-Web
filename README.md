# 喜云到家官网 V1.0.0

> 家更干净，心更轻松 — 新时代生活方式服务商

## 项目简介

喜云到家是智净优邸旗下专注家庭深度保洁与到家服务的品牌官网，包含前台展示页面和轻量级管理后台。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | HTML5 + CSS3 + JavaScript | 纯静态页面，无框架依赖 |
| 后端 | Node.js + Express | 轻量级 MVP 管理后台 |
| 数据库 | SQLite (better-sqlite3) | 无需安装，开箱即用 |
| 图片 | SVG 占位图 + 实际图片上传 | 支持后台上传替换 |

## 项目结构

```
2606喜云到家官网开发V1.0.0/
├── admin/                    # 管理后台（后端服务）
│   ├── server.js            # Express 服务器（API + 静态文件服务）
│   ├── admin.html           # 后台管理界面
│   ├── data.db              # SQLite 数据库文件
│   └── package.json         # Node.js 依赖配置
│
├── assets/                   # 前端静态资源
│   ├── css/                 # 样式文件
│   │   ├── base.css         # 全局基础样式（CSS变量、Reset、通用类）
│   │   ├── layout.css       # 页面布局（导航、Hero、页脚、响应式）
│   │   ├── components.css   # 可复用组件（卡片、表单、分页等）
│   │   └── pages/           # 各页面专属样式
│   │       ├── home.css     # 首页样式
│   │       ├── services.css # 服务项目页样式
│   │       ├── cases.css    # 案例展示页样式
│   │       ├── about.css    # 关于我们页样式
│   │       ├── news.css     # 新闻资讯页样式
│   │       └── contact.css  # 联系我们页样式
│   │
│   ├── js/                  # JavaScript 文件
│   │   ├── api.js           # API 通信层（与后端交互）
│   │   ├── dataloader.js    # 数据加载器（填充页面内容）
│   │   ├── common.js        # 公共工具函数
│   │   ├── nav.js           # 导航栏交互
│   │   └── pages/           # 各页面专属脚本
│   │       ├── home.js      # 首页脚本
│   │       ├── services.js  # 服务页脚本
│   │       ├── contact.js   # 联系页脚本
│   │       └── ...
│   │
│   ├── images/              # 图片资源
│   │   ├── logo/            # 品牌 Logo
│   │   ├── icons/           # 功能图标（SVG）
│   │   ├── services/        # 服务项目图片（SVG占位）
│   │   ├── cases/           # 案例展示图片（SVG占位）
│   │   ├── news/            # 新闻资讯图片（SVG占位）
│   │   ├── about/           # 关于我们图片（SVG占位）
│   │   └── uploads/         # 用户上传的图片
│   │
│   └── fonts/               # 字体文件（预留）
│
├── pages/                    # 前端页面
│   ├── index.html           # 首页（入口）
│   ├── about.html           # 关于我们
│   ├── services.html        # 服务项目
│   ├── cases.html           # 案例展示
│   ├── news.html            # 新闻资讯
│   └── contact.html         # 联系我们
│
├── docs/                     # 项目文档
│   └── ai-context.md        # AI 开发上下文
│
├── 资料素材/                  # 原始素材（参考用）
│   ├── Logo/                # Logo 原始文件
│   ├── 01_企业文化.md        # 企业文化文档
│   └── ...
│
└── README.md                 # 本文件
```

## 快速开始

### 1. 启动管理后台

```bash
cd admin
npm install          # 首次运行需要安装依赖
node server.js       # 启动服务
```

启动后访问：
- 管理后台：http://localhost:3000/admin
- 前台网站：http://localhost:3000

### 2. 管理内容

打开后台 http://localhost:3000/admin，可管理：
- 公司信息（名称、标语、联系方式、企业文化）
- 服务项目（增删改查、分类、价格、图片）
- 案例展示（增删改查、日期、图片）
- 新闻资讯（增删改查、分类、图片）
- 优势特色（增删改查、图标）
- 联系留言（查看、标记处理、删除）

### 3. 上传图片

在后台编辑服务/案例/新闻时，可点击"选择文件"上传图片，上传后自动保存到 `assets/images/uploads/` 目录。

## 数据库说明

使用 SQLite 数据库（`admin/data.db`），包含以下表：

| 表名 | 说明 | 关键字段 |
|------|------|---------|
| company_info | 公司信息（单行） | company_name, slogan, phone, email |
| services | 服务项目 | title, price, category, image_url |
| cases | 案例展示 | title, description, date, image_url |
| articles | 新闻资讯 | title, summary, category, date |
| features | 优势特色 | title, description, icon_url |
| contacts | 联系留言 | name, phone, message, status |
| pages | 页面配置 | slug, hero_title, cta_title |

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/company-info | 获取公司信息 |
| PUT | /api/company-info | 更新公司信息 |
| GET | /api/services | 获取服务列表（支持 ?category= 过滤） |
| POST | /api/services | 新增服务 |
| PUT | /api/services/:id | 更新服务 |
| DELETE | /api/services/:id | 删除服务 |
| GET | /api/cases | 获取案例列表 |
| POST | /api/cases | 新增案例 |
| PUT | /api/cases/:id | 更新案例 |
| DELETE | /api/cases/:id | 删除案例 |
| GET | /api/articles | 获取新闻列表 |
| POST | /api/articles | 新增新闻 |
| PUT | /api/articles/:id | 更新新闻 |
| DELETE | /api/articles/:id | 删除新闻 |
| GET | /api/features | 获取特色列表 |
| POST | /api/features | 新增特色 |
| PUT | /api/features/:id | 更新特色 |
| DELETE | /api/features/:id | 删除特色 |
| GET | /api/contacts | 获取留言列表 |
| POST | /api/contacts | 提交留言 |
| PUT | /api/contacts/:id | 更新留言状态 |
| DELETE | /api/contacts/:id | 删除留言 |
| POST | /api/upload | 上传图片文件 |

## 品牌色值

| 用途 | 色值 | 说明 |
|------|------|------|
| 主色 | #008800 | 品牌绿，用于导航、按钮、强调 |
| 辅助色 | #FF9955 | 橙色，用于维修类服务、hover 效果 |
| 正文色 | #333333 | 主要文字颜色 |
| 次要色 | #666666 | 辅助说明文字 |
| 背景色 | #FFFFFF | 页面背景 |
| 浅灰背景 | #F5F7FA | 区块底色 |

## 注意事项

1. **修改公司信息**：在后台"公司信息"页面修改，前台自动更新
2. **添加服务**：在后台"服务项目"中新增，选择分类和上传图片
3. **替换图片**：编辑对应条目时上传新图片即可替换
4. **联系留言**：用户在前台提交的留言在后台"联系留言"中查看
5. **数据库备份**：定期备份 `admin/data.db` 文件
