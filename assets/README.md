# 前端静态资源 (assets/)

## 目录结构

```
assets/
├── css/           # 样式文件
├── js/            # JavaScript 文件
├── images/        # 图片资源
└── fonts/         # 字体文件（预留）
```

## CSS 文件加载顺序

1. `base.css` - 全局基础（CSS变量、Reset、通用类）
2. `layout.css` - 页面布局（导航、Hero、页脚、响应式）
3. `components.css` - 可复用组件（卡片、表单、分页等）
4. `pages/xxx.css` - 各页面专属样式

## JS 文件说明

| 文件 | 职责 | 被谁引用 |
|------|------|---------|
| `api.js` | API 通信层，封装所有后端接口调用 | 所有页面 |
| `dataloader.js` | 数据加载器，从 API 获取数据并填充页面 | 首页、服务页等 |
| `common.js` | 公共工具函数（Toast提示等） | 所有页面 |
| `nav.js` | 导航栏交互（移动端菜单等） | 所有页面 |

## 图片资源

- `logo/` - 品牌 Logo（logo.jpg）
- `icons/` - 功能图标（SVG 格式，80x80）
- `services/` - 服务项目图片（SVG 占位，400x300）
- `cases/` - 案例展示图片（SVG 占位，600x400）
- `news/` - 新闻资讯图片（SVG 占位，600x300）
- `about/` - 关于我们图片（SVG 占位）
- `uploads/` - 用户通过后台上传的图片

## 注意事项

1. 所有图片引用使用 `.svg` 扩展名（占位图）或 `.jpg`（Logo）
2. 上传的图片保存在 `uploads/` 目录
3. CSS 使用 CSS 变量定义品牌色，修改 `base.css` 中的 `:root` 可全局换色
