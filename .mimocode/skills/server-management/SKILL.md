---
name: server-management
description: 管理 Node.js 和 Strapi 服务器的启动、停止、状态检查和日志查看
---

# 服务器管理技能

自动化管理喜云到家项目的服务器进程。

## 使用场景

- 检查服务器是否正在运行
- 启动/停止 Node.js 后台服务
- 启动/停止 Strapi 服务
- 查看服务器日志
- 重启服务

## 命令参考

### 检查服务器状态

```bash
# 检查 Node.js 服务器
ps aux | grep "node server" | grep -v grep

# 检查 Strapi 服务
ps aux | grep strapi | grep -v grep

# 检查端口占用
lsof -i :3000
lsof -i :1337
```

### 启动服务器

```bash
# 启动 Node.js 后台服务 (端口 3000)
cd /mnt/e/D_Coding/2607_XiYunDaoJia_Web/admin
nohup node server.js > /tmp/server.log 2>&1 &

# 启动 Strapi 服务 (端口 1337)
cd /mnt/e/D_Coding/2607_XiYunDaoJia_Web/backend
nohup npm run develop > /tmp/strapi.log 2>&1 &
```

### 停止服务器

```bash
# 停止 Node.js 服务器
pkill -f "node server.js"

# 停止 Strapi 服务
pkill -f "strapi"
```

### 查看日志

```bash
# 查看 Node.js 服务器日志
tail -50 /tmp/server.log

# 查看 Strapi 日志
tail -50 /tmp/strapi.log

# 实时跟踪日志
tail -f /tmp/server.log
```

### 健康检查

```bash
# 检查服务是否响应
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
curl -s -o /dev/null -w "%{http_code}" http://localhost:1337
```

## 自动化流程

### 完整启动流程

1. 检查端口是否被占用
2. 如果占用，先停止现有进程
3. 启动新进程
4. 等待服务启动 (3-5秒)
5. 验证服务是否正常响应

### 完整停止流程

1. 发送停止信号
2. 等待进程退出
3. 验证端口已释放

## 注意事项

- WSL 环境下 better-sqlite3 需要在 Linux 下重新编译
- 使用 `nohup` 确保服务在后台持续运行
- 日志文件保存在 `/tmp/` 目录
- 服务端口: Node.js=3000, Strapi=1337
