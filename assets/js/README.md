# JavaScript 文件 (js/)

## 文件说明

| 文件 | 职责 | 被谁引用 |
|------|------|---------|
| `api.js` | API 通信层，封装所有后端接口调用 | 所有页面 |
| `dataloader.js` | 数据加载器，从 API 获取数据并填充页面 DOM | 首页、服务页等 |
| `common.js` | 公共工具函数（Toast 提示、工具方法） | 所有页面 |
| `nav.js` | 导航栏交互（移动端菜单切换、滚动效果） | 所有页面 |

## api.js - API 通信层

封装与后端 Express 服务器的所有通信，主要方法：

```javascript
API.getCompanyInfo()     // 获取公司信息
API.getServices(category) // 获取服务列表（可按分类过滤）
API.getCases(page)       // 获取案例列表（分页）
API.getNews(page)        // 获取新闻列表（分页）
API.getFeatures()        // 获取优势特色
API.getPage(slug)        // 获取页面配置
API.submitContact(data)  // 提交联系表单
API.getMediaUrl(media)   // 获取媒体文件完整 URL
```

## dataloader.js - 数据加载器

从 API 获取数据并填充到页面 DOM，主要方法：

```javascript
DataLoader.initHomePage()      // 初始化首页（公司信息+优势+服务预览）
DataLoader.initServicesPage()  // 初始化服务页
DataLoader.initCasesPage()     // 初始化案例页
DataLoader.initNewsPage()      // 初始化新闻页
DataLoader.fillCompanyInfo()   // 填充公司信息到导航/页脚
DataLoader.fillFeatures()      // 填充优势特色到网格
DataLoader.fillServicesList()  // 填充服务列表
DataLoader.fillCasesList()     // 填充案例列表
DataLoader.fillNewsList()      // 填充新闻列表
```

## 页面专属脚本

- `pages/home.js` - 首页特殊交互
- `pages/services.js` - 服务筛选功能
- `pages/contact.js` - 联系表单提交

## 注意事项

1. `api.js` 中的 `API_BASE` 根据端口自动判断环境
2. 所有 API 调用返回 Promise，使用 async/await 处理
3. 图片加载失败时使用 SVG 占位图
