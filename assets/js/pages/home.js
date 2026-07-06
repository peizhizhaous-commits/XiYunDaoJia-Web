/**
 * ================================================================
 *  home.js — 首页专属交互
 * ================================================================
 * 【角色】首页 Hero 区域的入场动画
 * 【职责】
 *   1. 页面加载后对 .hero 区域执行淡入+上移动画
 * 【被谁引用】仅 index.html（首页）
 * 【依赖】无；纯 DOM 操作，不依赖 common.js
 */

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;       // 防御：非首页无 .hero 时静默退出

    // 初始状态：透明 + 下移 20px
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(20px)';

    // 延迟 100ms 触发过渡动画（确保初始状态已渲染）
    setTimeout(() => {
        heroSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 100);
});
