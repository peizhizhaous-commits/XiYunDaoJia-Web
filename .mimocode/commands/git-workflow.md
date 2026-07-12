---
description: Git 版本控制常用操作 - 状态检查、提交、分支管理
---

# Git 工作流命令

## 参数说明

- `$ARGUMENTS` - 用户的完整命令参数
- `$1` - 操作类型 (status/commit/branch/push/pull)

## 命令模板

### 查看状态

```bash
# 查看当前分支和状态
git status

# 查看最近提交
git log --oneline -10

# 查看文件变更
git diff --stat
```

### 提交更改

```bash
# 添加所有更改
git add .

# 提交 (带消息)
git commit -m "$2"

# 查看提交历史
git log --oneline -5
```

### 分支管理

```bash
# 查看所有分支
git branch -a

# 创建并切换到新分支
git checkout -b $2

# 切换分支
git checkout $2

# 合并分支
git merge $2

# 删除分支
git branch -d $2
```

### 远程操作

```bash
# 查看远程仓库
git remote -v

# 推送到远程
git push origin $2

# 拉取远程更新
git pull origin $2

# 设置远程仓库
git remote add origin <url>
```

## 常用场景

### 场景 1: 更新版本状态

用户说: "更新本文件夹的git版本状态"

```bash
git status
git log --oneline -5
git diff --stat
```

### 场景 2: 创建开发分支

用户说: "创建一个dev开发分支"

```bash
git checkout -b dev
git branch -a
```

### 场景 3: 提交所有更改

用户说: "帮我提交一下"

```bash
git add .
git commit -m "feat: 更新功能"
git status
```

### 场景 4: 推送到远程

用户说: "推送到github"

```bash
git push origin main
```

## 项目特定信息

- **项目路径**: `/mnt/e/D_Coding/2607_XiYunDaoJia_Web/`
- **主分支**: `main`
- **开发分支**: `dev`
- **标签**: `v1.0.0`, `V1.0.1`
- **Git 用户**: zpz <peizhizhaous@gmail.com>
- **远程仓库**: 未配置 (用户自行在 Trae/GitHub 上传)

## 注意事项

- 提交前先检查状态
- 使用有意义的提交消息
- 开发完成后合并到 main 分支
- 定期推送到远程仓库备份
