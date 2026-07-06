/**
 * 喜云到家 - 管理后台服务器
 * 
 * 功能：
 * 1. 提供 RESTful API 接口（公司信息、服务、案例、新闻、特色、留言）
 * 2. 处理图片上传
 * 3. 提供前端静态文件服务
 * 
 * 技术栈：Node.js + Express + SQLite
 */

// ============================================
// 依赖导入
// ============================================
const express = require('express');      // Web 框架
const Database = require('better-sqlite3'); // SQLite 数据库驱动
const multer = require('multer');        // 文件上传中间件
const path = require('path');            // 路径处理
const fs = require('fs');                // 文件系统操作

// ============================================
// Express 应用初始化
// ============================================
const app = express();
const PORT = 3000; // 服务端口

// ============================================
// 中间件配置
// ============================================
app.use(express.json());                    // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码请求体
app.use(express.static(path.join(__dirname, '../'))); // 提供前端静态文件服务

// ============================================
// 文件上传配置
// ============================================
// 上传目录：assets/images/uploads/
const upload = multer({ dest: path.join(__dirname, '../assets/images/uploads/') });

// ============================================
// 数据库初始化
// ============================================

// 创建 SQLite 数据库连接（文件存储，无需安装数据库服务）
const db = new Database(path.join(__dirname, 'data.db'));

// 启用 WAL 模式，提高并发读写性能
db.pragma('journal_mode = WAL');

// ============================================
// 创建数据表（如果不存在）
// ============================================

// 公司信息表（单行存储，id 固定为 1）
db.exec(`
  CREATE TABLE IF NOT EXISTS company_info (
    id INTEGER PRIMARY KEY DEFAULT 1,
    company_name TEXT DEFAULT '喜云到家',
    slogan TEXT DEFAULT '家更干净，心更轻松',
    phone TEXT DEFAULT '400-xxx-xxxx',
    email TEXT DEFAULT 'service@xiyun.com',
    address TEXT DEFAULT '',
    work_hours TEXT DEFAULT '',
    about_title TEXT DEFAULT '',
    about_lead TEXT DEFAULT '',
    about_content TEXT DEFAULT '',
    mission TEXT DEFAULT '',
    vision TEXT DEFAULT '',
    core_values TEXT DEFAULT '',
    copyright TEXT DEFAULT '2025 喜云到家 版权所有'
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    price TEXT DEFAULT '',
    category TEXT DEFAULT 'cleaning',
    sub_items TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    date TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT DEFAULT '',
    content TEXT DEFAULT '',
    date TEXT DEFAULT '',
    category TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT DEFAULT '',
    service TEXT DEFAULT '',
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    meta_description TEXT DEFAULT '',
    hero_title TEXT DEFAULT '',
    hero_tagline TEXT DEFAULT '',
    hero_button_text TEXT DEFAULT '',
    hero_button_link TEXT DEFAULT '',
    brand_story_title TEXT DEFAULT '',
    brand_story_lead TEXT DEFAULT '',
    brand_story_content TEXT DEFAULT '',
    cta_title TEXT DEFAULT '',
    cta_content TEXT DEFAULT '',
    cta_button_text TEXT DEFAULT '',
    cta_button_link TEXT DEFAULT ''
  );
`);

// ============================================
// 种子数据（从 seed-data.json 加载）
// ============================================

// 加载种子数据文件
const seedData = require('../seed-data.json');

// 检查服务表是否为空（判断是否需要初始化）
const count = db.prepare('SELECT COUNT(*) as c FROM services').get().c;
if (count === 0) {
  // 预编译 SQL 语句，提高插入效率
  const insertService = db.prepare('INSERT INTO services (title, description, price, category, sub_items, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
  const insertCase = db.prepare('INSERT INTO cases (title, description, date, sort_order) VALUES (?, ?, ?, ?)');
  const insertArticle = db.prepare('INSERT INTO articles (title, summary, content, date, category, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
  const insertFeature = db.prepare('INSERT INTO features (title, description, sort_order) VALUES (?, ?, ?)');

  // 使用事务批量插入，确保原子性
  const seed = db.transaction(() => {
    // 插入公司信息
    const c = seedData.company_info;
    db.prepare(`INSERT OR IGNORE INTO company_info (id, company_name, slogan, phone, email, address, work_hours, about_title, about_lead, about_content, mission, vision, core_values, copyright)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(c.company_name, c.slogan, c.phone, c.email, c.address, c.work_hours, c.about_title, c.about_lead, c.about_content, c.mission, c.vision, c.core_values, c.copyright);

    // 插入服务项目
    for (const s of seedData.services) {
      insertService.run(s.title, s.description, s.price, s.category, s.sub_items || '', s.sort_order);
    }

    // 插入案例展示
    for (const c of seedData.cases) {
      insertCase.run(c.title, c.description, c.date, c.sort_order);
    }

    // 插入新闻资讯
    for (const a of seedData.articles) {
      insertArticle.run(a.title, a.summary, a.content || '', a.date, a.category, a.sort_order);
    }

    // 插入优势特色
    for (const f of seedData.features) {
      insertFeature.run(f.title, f.description, f.sort_order);
    }

    // 插入页面配置
    for (const [slug, page] of Object.entries(seedData.pages)) {
      db.prepare(`INSERT OR IGNORE INTO pages (title, slug, hero_title, hero_tagline, hero_button_text, hero_button_link, brand_story_title, brand_story_lead, brand_story_content, cta_title, cta_content, cta_button_text, cta_button_link)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(page.title, slug, page.hero_title || '', page.hero_tagline || '', page.hero_button_text || '', page.hero_button_link || '', page.brand_story_title || '', page.brand_story_lead || '', page.brand_story_content || '', page.cta_title || '', page.cta_content || '', page.cta_button_text || '', page.cta_button_link || '');
    }
  });
  seed(); // 执行事务
  console.log('数据库初始化完成！（数据来源：seed-data.json）');
}

// ============================================
// API 路由定义
// ============================================

// --------------------------------------------
// 公司信息 API（单行存储，固定 id=1）
// --------------------------------------------

// 获取公司信息
app.get('/api/company-info', (req, res) => {
  const info = db.prepare('SELECT * FROM company_info WHERE id = 1').get();
  res.json({ data: info });
});

// 更新公司信息
app.put('/api/company-info', (req, res) => {
  // 从请求体中解构所有字段（values 重命名为 core_values 避免 SQL 保留字冲突）
  const { company_name, slogan, phone, email, address, work_hours, about_title, about_lead, about_content, mission, vision, values: core_values, copyright } = req.body;
  db.prepare(`UPDATE company_info SET company_name=?, slogan=?, phone=?, email=?, address=?, work_hours=?, about_title=?, about_lead=?, about_content=?, mission=?, vision=?, core_values=?, copyright=? WHERE id=1`)
    .run(company_name, slogan, phone, email, address, work_hours, about_title, about_lead, about_content, mission, vision, core_values, copyright);
  res.json({ success: true });
});

// --------------------------------------------
// 服务项目 API（CRUD 增删改查）
// --------------------------------------------

// 获取服务列表（支持按分类筛选）
app.get('/api/services', (req, res) => {
  const { category } = req.query; // 获取查询参数中的分类
  let services;
  if (category && category !== 'all') {
    // 按分类筛选
    services = db.prepare('SELECT * FROM services WHERE category = ? ORDER BY sort_order').all(category);
  } else {
    // 获取全部，按排序字段排列
    services = db.prepare('SELECT * FROM services ORDER BY sort_order').all();
  }
  res.json({ data: services });
});

// 新增服务
app.post('/api/services', (req, res) => {
  const { title, description, price, category, sub_items, image_url, sort_order } = req.body;
  const result = db.prepare('INSERT INTO services (title, description, price, category, sub_items, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, description || '', price || '', category || 'cleaning', sub_items || '', image_url || '', sort_order || 0);
  res.json({ id: result.lastInsertRowid, success: true }); // 返回新记录 ID
});

// 更新服务
app.put('/api/services/:id', (req, res) => {
  const { title, description, price, category, sub_items, image_url, sort_order } = req.body;
  db.prepare('UPDATE services SET title=?, description=?, price=?, category=?, sub_items=?, image_url=?, sort_order=? WHERE id=?')
    .run(title, description, price, category, sub_items, image_url, sort_order, req.params.id);
  res.json({ success: true });
});

// 删除服务
app.delete('/api/services/:id', (req, res) => {
  db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --------------------------------------------
// 案例展示 API（CRUD 增删改查）
// --------------------------------------------

// 获取案例列表（按排序和日期倒序）
app.get('/api/cases', (req, res) => {
  const cases = db.prepare('SELECT * FROM cases ORDER BY sort_order, date DESC').all();
  res.json({ data: cases });
});

// 新增案例
app.post('/api/cases', (req, res) => {
  const { title, description, date, image_url, sort_order } = req.body;
  const result = db.prepare('INSERT INTO cases (title, description, date, image_url, sort_order) VALUES (?, ?, ?, ?, ?)')
    .run(title, description || '', date || '', image_url || '', sort_order || 0);
  res.json({ id: result.lastInsertRowid, success: true });
});

// 更新案例
app.put('/api/cases/:id', (req, res) => {
  const { title, description, date, image_url, sort_order } = req.body;
  db.prepare('UPDATE cases SET title=?, description=?, date=?, image_url=?, sort_order=? WHERE id=?')
    .run(title, description, date, image_url, sort_order, req.params.id);
  res.json({ success: true });
});

// 删除案例
app.delete('/api/cases/:id', (req, res) => {
  db.prepare('DELETE FROM cases WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --------------------------------------------
// 新闻资讯 API（CRUD 增删改查）
// --------------------------------------------

// 获取新闻列表
app.get('/api/articles', (req, res) => {
  const articles = db.prepare('SELECT * FROM articles ORDER BY sort_order, date DESC').all();
  res.json({ data: articles });
});

// 新增新闻
app.post('/api/articles', (req, res) => {
  const { title, summary, content, date, category, image_url, sort_order } = req.body;
  const result = db.prepare('INSERT INTO articles (title, summary, content, date, category, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, summary || '', content || '', date || '', category || '', image_url || '', sort_order || 0);
  res.json({ id: result.lastInsertRowid, success: true });
});

// 更新新闻
app.put('/api/articles/:id', (req, res) => {
  const { title, summary, content, date, category, image_url, sort_order } = req.body;
  db.prepare('UPDATE articles SET title=?, summary=?, content=?, date=?, category=?, image_url=?, sort_order=? WHERE id=?')
    .run(title, summary, content, date, category, image_url, sort_order, req.params.id);
  res.json({ success: true });
});

// 删除新闻
app.delete('/api/articles/:id', (req, res) => {
  db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --------------------------------------------
// 优势特色 API（CRUD 增删改查）
// --------------------------------------------

// 获取特色列表
app.get('/api/features', (req, res) => {
  const features = db.prepare('SELECT * FROM features ORDER BY sort_order').all();
  res.json({ data: features });
});

// 新增特色
app.post('/api/features', (req, res) => {
  const { title, description, icon_url, sort_order } = req.body;
  const result = db.prepare('INSERT INTO features (title, description, icon_url, sort_order) VALUES (?, ?, ?, ?)')
    .run(title, description || '', icon_url || '', sort_order || 0);
  res.json({ id: result.lastInsertRowid, success: true });
});

// 更新特色
app.put('/api/features/:id', (req, res) => {
  const { title, description, icon_url, sort_order } = req.body;
  db.prepare('UPDATE features SET title=?, description=?, icon_url=?, sort_order=? WHERE id=?')
    .run(title, description, icon_url, sort_order, req.params.id);
  res.json({ success: true });
});

// 删除特色
app.delete('/api/features/:id', (req, res) => {
  db.prepare('DELETE FROM features WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --------------------------------------------
// 联系留言 API（CRUD 增删改查）
// --------------------------------------------

// 获取留言列表（按创建时间倒序）
app.get('/api/contacts', (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json({ data: contacts });
});

// 提交留言（前台用户使用）
app.post('/api/contacts', (req, res) => {
  const { name, phone, email, service, message } = req.body;
  const result = db.prepare('INSERT INTO contacts (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)')
    .run(name, phone, email || '', service || '', message);
  res.json({ id: result.lastInsertRowid, success: true });
});

// 更新留言状态（pending/processed/replied）
app.put('/api/contacts/:id', (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

// 删除留言
app.delete('/api/contacts/:id', (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --------------------------------------------
// 页面配置 API
// --------------------------------------------

// 按 slug 获取页面配置
app.get('/api/pages/:slug', (req, res) => {
  const page = db.prepare('SELECT * FROM pages WHERE slug = ?').get(req.params.slug);
  res.json({ data: page });
});

// 更新页面配置
app.put('/api/pages/:slug', (req, res) => {
  const b = req.body;
  db.prepare(`UPDATE pages SET title=?, meta_description=?, hero_title=?, hero_tagline=?, hero_button_text=?, hero_button_link=?, brand_story_title=?, brand_story_lead=?, brand_story_content=?, cta_title=?, cta_content=?, cta_button_text=?, cta_button_link=? WHERE slug=?`)
    .run(b.title, b.meta_description, b.hero_title, b.hero_tagline, b.hero_button_text, b.hero_button_link, b.brand_story_title, b.brand_story_lead, b.brand_story_content, b.cta_title, b.cta_content, b.cta_button_text, b.cta_button_link, req.params.slug);
  res.json({ success: true });
});

// --------------------------------------------
// 文件上传 API
// --------------------------------------------

// 上传图片文件，保存到 assets/images/uploads/ 目录
// 文件名格式：时间戳 + 原扩展名（如 1720000000.jpg）
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '未选择文件' });
  const ext = path.extname(req.file.originalname); // 获取原文件扩展名
  const newName = Date.now() + ext; // 生成新文件名（时间戳+扩展名）
  const newPath = path.join(__dirname, '../assets/images/uploads', newName);
  fs.renameSync(req.file.path, newPath); // 移动文件到目标目录
  res.json({ url: `/assets/images/uploads/${newName}` }); // 返回文件访问路径
});

// 上传文档文件（PDF、Word等），保存到 assets/docs/ 目录
app.post('/api/upload-doc', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '未选择文件' });
  const ext = path.extname(req.file.originalname);
  const originalName = path.parse(req.file.originalname).name;
  const newName = Date.now() + ext;
  const newPath = path.join(__dirname, '../assets/docs', newName);
  fs.renameSync(req.file.path, newPath);
  res.json({ 
    url: `/assets/docs/${newName}`,
    originalName: originalName,
    size: req.file.size
  });
});

// ============================================
// 启动服务器
// ============================================
app.listen(PORT, () => {
  console.log(`管理后台：http://localhost:${PORT}/admin`);
  console.log(`前台网站：http://localhost:${PORT}`);
});
