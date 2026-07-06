# 前端页面 (pages/)

## 页面列表

| 文件 | 页面 | 说明 |
|------|------|------|
| `index.html` | 首页 | 品牌展示、优势特色、服务预览、CTA 行动号召 |
| `about.html` | 关于我们 | 公司简介、企业文化、团队风采 |
| `services.html` | 服务项目 | 服务列表、分类筛选、价格展示、服务特性 |
| `cases.html` | 案例展示 | 真实服务案例、客户评价、分页浏览 |
| `news.html` | 新闻资讯 | 新闻文章、分类标签、分页浏览 |
| `contact.html` | 联系我们 | 联系方式、在线留言表单 |

## 页面结构

每个页面包含以下公共区块：

1. **导航区** (`<header>`) - Logo + 主导航菜单 + 联系电话
2. **页面标题区** (`<section class="page-header">`) - 面包屑导航
3. **内容区** (`<main>`) - 各页面专属内容
4. **页脚区** (`<footer>`) - 公司信息 + 版权声明

## 数据加载

所有页面通过 `api.js` 和 `dataloader.js` 从后端 API 获取数据：

```html
<script src="../assets/js/api.js"></script>
<script src="../assets/js/dataloader.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    DataLoader.initXxxPage();  // 调用对应的初始化方法
  });
</script>
```

## 新增页面步骤

1. 在 `pages/` 目录创建 HTML 文件
2. 复制现有页面的导航和页脚结构
3. 在 `assets/css/pages/` 创建对应 CSS 文件
4. 在 `assets/js/pages/` 创建对应 JS 文件（如需要）
5. 在导航栏添加链接
6. 在 `api.js` 中添加新的 API 方法（如需要）
7. 在 `dataloader.js` 中添加数据加载逻辑（如需要）
