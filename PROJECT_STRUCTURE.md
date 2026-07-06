# 项目结构说明

本文档详细说明喜云到家官网项目的目录结构和设计逻辑。

## 设计原则

### 1. 模块化分离
- **CSS 分层**: base → layout → components → pages，便于维护和扩展
- **JS 按功能拆分**: 公共逻辑与页面逻辑分离
- **组件化 HTML**: 公共部分（页头、页脚）可复用

### 2. 命名规范
- 文件名: 小写字母 + 连字符（kebab-case）
- CSS 类名: BEM 命名规范
- 图片: 按用途分目录，命名清晰

### 3. AI 辅助开发友好
- 清晰的目录结构便于 AI 理解
- 详细的注释和文档
- 模块化设计便于 AI 生成和修改代码

## 目录详解

### `/` 根目录
- `index.html`: 网站首页入口
- `README.md`: 项目概述和快速开始
- `PROJECT_STRUCTURE.md`: 本文档

### `/pages/` 页面目录
存放所有独立页面，每个页面包含完整的 HTML 结构。

### `/assets/` 静态资源
> 详见 [assets/README.md](./assets/README.md)

#### `/assets/css/` 样式文件
- `base.css`: CSS 变量、重置样式、基础组件
- `layout.css`: 页面布局、头部、底部、网格系统
- `components.css`: 可复用组件样式（卡片、表单、徽章等）
- `/pages/`: 页面特定样式

#### `/assets/js/` JavaScript 文件
- `common.js`: 公共函数、工具方法
- `nav.js`: 导航交互逻辑
- `/pages/`: 页面特定脚本

#### `/assets/images/` 图片资源
> 详见 [assets/images/README.md](./assets/images/README.md) — 命名规范与规格建议

- `logo/`: Logo 文件
- `banners/`: 轮播图、Banner
- `icons/`: 图标
- `services/`: 服务相关图片
- `about/`: 关于我们图片
- `cases/`: 案例图片
- `news/`: 新闻图片

### `/components/` 可复用组件
> 详见 [components/README.md](./components/README.md)

存放可复用的 HTML 片段，如页头、页脚、导航等。

### `/docs/` 文档目录
> 详见 [docs/README.md](./docs/README.md)
- `design-guidelines.md`: 设计规范
- `content-guide.md`: 内容填写指南
- `ai-context.md`: AI 开发上下文

## 扩展指南

### 添加新页面
1. 在 `/pages/` 创建新的 HTML 文件
2. 在 `/assets/css/pages/` 创建对应样式
3. 在 `/assets/js/pages/` 创建对应脚本（如需要）
4. 在导航中添加链接

### 添加新组件
1. 在 `/components/` 创建组件 HTML
2. 在 `/assets/css/components.css` 添加样式
3. 在需要的页面中引入

### 添加新图片
1. 根据图片用途放入对应子目录
2. 使用清晰的文件名
3. 优化图片大小和格式

## 代码规范

### HTML
- 使用语义化标签
- 保持缩进一致（2空格）
- 属性值使用双引号

### CSS
- 使用 CSS 变量定义颜色、间距
- 遵循 BEM 命名规范
- 响应式设计使用媒体查询

### JavaScript
- 使用 ES6+ 语法
- 避免全局变量
- 添加必要的注释
