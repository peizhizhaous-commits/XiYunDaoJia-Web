/**
 * ================================================================
 *  services.js — 服务页交互（分类筛选）
 * ================================================================
 * 【角色】服务列表页的分类过滤功能
 * 【职责】
 *   1. 监听 .filter-btn 点击，切换 active 状态
 *   2. 根据 data-filter 属性显示/隐藏对应分类的 .service-card
 * 【被谁引用】仅 services.html（服务列表页）
 * 【依赖】HTML 中需存在 .filter-btn（带 data-filter 属性）和 .service-card（带 data-category 属性）
 */

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            /** ==== 切换筛选按钮 active 状态 ==== */
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;   // 'all' 或具体分类名

            /** ==== 按分类显示/隐藏服务卡片 ==== */
            serviceCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
