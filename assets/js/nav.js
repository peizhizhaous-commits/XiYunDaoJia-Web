/**
 * ================================================================
 *  nav.js — 导航栏交互逻辑
 * ================================================================
 * 【角色】处理全站导航栏的移动端菜单开关和当前页高亮
 * 【职责】
 *   1. 移动端汉堡菜单（.menu-toggle）点击展开/收起导航
 *   2. 根据当前 URL 路径自动激活对应导航链接（添加 .active 类）
 *   3. 服务页面 page-nav 滑动显示逻辑
 * 【被谁引用】所有 HTML 页面（在 common.js 之后加载）
 * 【依赖】common.js（不强制，但通常先加载）；依赖 HTML 中存在 .main-nav 和 .menu-toggle 元素
 */

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const pageNav = document.getElementById('servicesNav');

    /** ==== 1. 移动端菜单开关 ==== */
    if (menuToggle) {
        // 创建菜单遮罩层
        let overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        // 将菜单移动到 body 直接子元素位置，避免被父元素 backdrop-filter 创建的 stacking context 裁剪
        // 仅在移动端执行此操作
        if (window.innerWidth <= 768) {
            document.body.appendChild(nav);
        }
        
        // 监听窗口大小变化，在移动端/桌面端切换时处理菜单位置
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && nav.parentNode !== document.body) {
                document.body.appendChild(nav);
            }
        });

        const toggleMenu = (isOpen) => {
            menuToggle.classList.toggle('active', isOpen);
            nav.classList.toggle('active', isOpen);
            overlay.classList.toggle('active', isOpen);
            
            document.body.style.overflow = isOpen ? 'hidden' : '';
            
            const navItems = nav.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (isOpen) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px) scale(0.95)';
                    item.style.transition = `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.06}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 80);
                } else {
                    item.style.transition = `all 0.2s ease ${(navItems.length - 1 - index) * 0.04}s`;
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-5px)';
                }
            });
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menuToggle.classList.contains('active');
            toggleMenu(!isOpen);
        });

        // 点击导航链接后自动关闭菜单
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // 点击遮罩层关闭菜单
        overlay.addEventListener('click', () => {
            toggleMenu(false);
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                const isOpen = menuToggle.classList.contains('active');
                if (isOpen) {
                    toggleMenu(false);
                }
            }
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

    /** ==== 3. 页面 page-nav 滑动显示逻辑（服务、社区、文档页面）==== */
    const pageNavs = document.querySelectorAll('.page-nav');
    
    if (pageNavs.length > 0) {
        let lastScrollY = window.scrollY;
        const showThreshold = 150;
        const hideThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // 仅在移动端生效
            if (window.innerWidth <= 768) {
                if (currentScrollY > showThreshold && currentScrollY > lastScrollY) {
                    // 向下滚动且超过阈值，显示导航
                    pageNavs.forEach(nav => nav.classList.add('visible'));
                } else if (currentScrollY < hideThreshold || (currentScrollY < lastScrollY && currentScrollY > showThreshold)) {
                    // 回到顶部或向上滚动，隐藏导航
                    pageNavs.forEach(nav => nav.classList.remove('visible'));
                }
            } else {
                // 桌面端始终显示
                pageNavs.forEach(nav => nav.classList.add('visible'));
            }
            
            lastScrollY = currentScrollY;
        });

        // 初始化时检查
        if (window.innerWidth > 768) {
            pageNavs.forEach(nav => nav.classList.add('visible'));
        }
    }
});
