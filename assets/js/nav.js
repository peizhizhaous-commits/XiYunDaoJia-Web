/**
 * ================================================================
 *  nav.js — 导航栏交互逻辑
 * ================================================================
 * 【角色】处理全站导航栏的移动端菜单开关和当前页高亮
 * 【职责】
 *   1. 移动端汉堡菜单（.menu-toggle）点击展开/收起导航
 *   2. 根据当前 URL 路径自动激活对应导航链接（添加 .active 类）
 * 【被谁引用】所有 HTML 页面（在 common.js 之后加载）
 * 【依赖】common.js（不强制，但通常先加载）；依赖 HTML 中存在 .main-nav 和 .menu-toggle 元素
 */

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');

    /** ==== 1. 移动端菜单开关 ==== */
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    /** ==== 2. 当前页高亮 ==== */
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 匹配当前页面：路径以 href 结尾，或首页匹配根路径
        if (currentPath.endsWith(href) || (href === 'index.html' && currentPath.endsWith('/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
