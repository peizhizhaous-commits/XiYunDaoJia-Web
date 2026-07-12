---
name: css-animations
description: 喜云到家官网 CSS 动画模板库 - 毛玻璃导航、浮动图形、卡片hover、入场动画等
---

# CSS 动画模板库

喜云到家官网使用的 CSS 动画效果集合，基于品牌色 #008800 (绿) 和 #FF9955 (橙)。

## 设计规范

### CSS 变量

```css
:root {
  --primary: #008800;
  --primary-light: #e6f5e6;
  --primary-dark: #006600;
  --accent: #FF9955;
  --accent-light: #fff3e6;
  --radius: 16px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.1);
  --font-heading: 'Noto Serif SC', serif;
  --font-body: 'Noto Sans SC', sans-serif;
}
```

## 动画效果

### 1. 毛玻璃导航

```css
.navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-md);
}
```

### 2. 导航下划线动画

```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

### 3. 浮动图形动画 (Hero 区域)

```css
.hero {
  position: relative;
  overflow: hidden;
}

.hero::before,
.hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.hero::before {
  width: 300px;
  height: 300px;
  background: var(--primary);
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.hero::after {
  width: 200px;
  height: 200px;
  background: var(--accent);
  bottom: -30px;
  left: -30px;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

### 4. 卡片 Hover 效果

```css
.card {
  background: white;
  border-radius: var(--radius);
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}
```

### 5. 入场动画 (fadeInUp)

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.fade-in-up:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 6. CTA 脉冲动画

```css
.cta-button {
  background: var(--accent);
  color: white;
  padding: 12px 32px;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 153, 85, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 153, 85, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 153, 85, 0); }
}
```

### 7. 按钮光效动画

```css
.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.btn-shine:hover::before {
  left: 100%;
}
```

### 8. Tab 切换动画

```css
.tab-content {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.tab-content.active {
  opacity: 1;
  transform: translateY(0);
}
```

### 9. 手风琴展开动画

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-item.active .accordion-content {
  max-height: 500px;
}

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-item.active .accordion-icon {
  transform: rotate(180deg);
}
```

### 10. 吸顶标签栏动画

```css
.sticky-tabs {
  position: sticky;
  top: 70px;
  background: white;
  z-index: 100;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 响应式断点

```css
/* 平板 */
@media (max-width: 768px) {
  .hero::before { width: 200px; height: 200px; }
  .card { padding: 16px; }
}

/* 手机 */
@media (max-width: 480px) {
  .hero::before { width: 150px; height: 150px; }
  .hero::after { display: none; }
}
```

## 使用说明

1. 根据需要选择动画效果
2. 复制对应的 CSS 代码
3. 根据实际结构调整参数
4. 确保 HTML 元素有对应的类名
5. 测试动画效果和性能
