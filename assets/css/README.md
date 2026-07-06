# 样式文件 (css/)

## 文件说明

| 文件 | 说明 | 加载顺序 |
|------|------|---------|
| `base.css` | 全局基础样式：CSS 变量、浏览器 Reset、排版、通用类 | 第 1 位 |
| `layout.css` | 页面布局：导航栏、Hero 区、网格、页脚、响应式 | 第 2 位 |
| `components.css` | 可复用组件：卡片、徽章、表单、分页、加载动画 | 第 3 位 |
| `pages/` | 各页面专属样式覆盖 | 第 4 位 |

## CSS 变量（base.css）

```css
:root {
  --primary-color: #008800;      /* 品牌主色（绿） */
  --primary-dark: #006600;       /* 主色深色变体 */
  --secondary-color: #FF9955;    /* 辅助色（橙） */
  --text-color: #333333;         /* 正文文字色 */
  --text-light: #666666;         /* 次要文字色 */
  --bg-color: #ffffff;           /* 页面背景色 */
  --bg-light: #f5f7fa;           /* 浅灰背景 */
  --border-color: #e0e0e0;       /* 边框色 */
  --shadow: 0 2px 8px rgba(0,0,0,0.1);  /* 通用阴影 */
  --radius: 8px;                 /* 统一圆角 */
  --transition: all 0.3s ease;   /* 统一过渡动画 */
}
```

## 页面专属样式

- `home.css` - 首页 Hero 渐变、品牌故事区
- `services.css` - 服务卡片布局、筛选按钮、服务特性列表
- `cases.css` - 案例网格、分页导航
- `about.css` - 公司简介、企业文化、团队风采
- `news.css` - 新闻列表、文章卡片
- `contact.css` - 联系表单、地图区

## 响应式断点

- `> 768px` - 桌面端（默认）
- `≤ 768px` - 平板/手机（网格降为 2 列，导航换行）
