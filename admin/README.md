# 管理后台 (admin/)

## 文件说明

| 文件 | 说明 |
|------|------|
| `server.js` | Express 服务器主文件，包含所有 API 路由和静态文件服务 |
| `admin.html` | 后台管理界面，纯 HTML/CSS/JS 实现 |
| `data.db` | SQLite 数据库文件（运行时自动生成） |
| `package.json` | Node.js 依赖配置 |
| `node_modules/` | 依赖包（自动生成） |

## server.js 说明

### 数据库表结构

```sql
-- 公司信息（单行存储）
company_info: id, company_name, slogan, phone, email, address, work_hours,
              about_title, about_lead, about_content, mission, vision,
              core_values, copyright

-- 服务项目
services: id, title, description, price, category, sub_items, image_url, sort_order

-- 案例展示
cases: id, title, description, date, image_url, sort_order

-- 新闻资讯
articles: id, title, summary, content, date, category, image_url, sort_order

-- 优势特色
features: id, title, description, icon_url, sort_order

-- 联系留言
contacts: id, name, phone, email, service, message, status

-- 页面配置
pages: id, title, slug, hero_title, hero_tagline, ...
```

### API 路由

- `GET/PUT /api/company-info` - 公司信息
- `GET/POST/PUT/DELETE /api/services` - 服务项目 CRUD
- `GET/POST/PUT/DELETE /api/cases` - 案例展示 CRUD
- `GET/POST/PUT/DELETE /api/articles` - 新闻资讯 CRUD
- `GET/POST/PUT/DELETE /api/features` - 优势特色 CRUD
- `GET/POST/PUT/DELETE /api/contacts` - 联系留言 CRUD
- `GET/PUT /api/pages/:slug` - 页面配置
- `POST /api/upload` - 图片上传

### 图片上传

上传的图片保存到 `../assets/images/uploads/` 目录，文件名为时间戳+原扩展名。

## admin.html 说明

后台管理界面，包含以下功能模块：

1. **数据概览** - 显示各模块数据统计
2. **公司信息** - 编辑公司基本信息和企业文化
3. **服务项目** - 服务的增删改查
4. **案例展示** - 案例的增删改查
5. **新闻资讯** - 新闻的增删改查
6. **优势特色** - 特色的增删改查
7. **联系留言** - 查看和处理用户留言

所有表单支持图片上传，编辑时可预览已有图片。
