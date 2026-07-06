# 图片资源 (images/)

## 目录结构

```
images/
├── logo/            # 品牌 Logo
│   └── logo.jpg     # 主 Logo（白底，1:1 比例）
│
├── icons/           # 功能图标（SVG，80x80）
│   ├── service.svg     # 专业服务
│   ├── quality.svg     # 品质保障
│   ├── convenient.svg  # 便捷预约
│   ├── trust.svg       # 值得信赖
│   ├── phone.svg       # 电话
│   ├── email.svg       # 邮箱
│   ├── address.svg     # 地址
│   └── time.svg        # 时间
│
├── services/        # 服务项目图片（SVG 占位，400x300）
│   ├── cleaning.svg        # 家政清洁
│   ├── deep-clean.svg      # 深度清洁
│   ├── repair.svg          # 家电维修
│   ├── air-conditioner.svg # 空调维修
│   ├── washing-machine.svg # 洗衣机维修
│   ├── moving.svg          # 搬家服务
│   ├── home-moving.svg     # 家庭搬家
│   ├── pipeline.svg        # 管道疏通
│   └── drain.svg           # 下水道疏通
│
├── cases/           # 案例展示图片（SVG 占位，600x400）
│   ├── case1.svg ~ case6.svg
│
├── news/            # 新闻资讯图片（SVG 占位，600x300）
│   ├── news1.svg ~ news4.svg
│
├── about/           # 关于我们图片
│   ├── company.svg     # 公司介绍（800x500）
│   ├── team1.svg       # 服务团队
│   ├── team2.svg       # 技术团队
│   └── team3.svg       # 客服团队
│
├── banners/         # Banner 图片（预留）
│
└── uploads/         # 用户通过后台上传的图片
    └── *.jpg/png/svg   # 上传的图片文件
```

## SVG 占位图说明

所有占位图使用 SVG 格式，特点：
- 品牌配色（绿色 #008800 / 橙色 #FF9955）
- 包含图标和文字说明
- 浏览器直接渲染，无需图片服务器
- 可通过后台上传实际图片替换

## 图片替换方式

1. **通过后台上传**：编辑服务/案例/新闻时选择文件上传
2. **手动替换**：将图片放入对应目录，修改文件名保持一致

## 图片命名规范

- 服务图片：按分类命名（cleaning.svg, repair.svg 等）
- 案例图片：case + 序号（case1.svg, case2.svg 等）
- 新闻图片：news + 序号（news1.svg, news2.svg 等）
- 上传图片：时间戳 + 原扩展名（1720000000.jpg）
