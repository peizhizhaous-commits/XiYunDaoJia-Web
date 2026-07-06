/**
 * ================================================================
 *  common.js — 喜云到家全局公共模块
 * ================================================================
 * 【角色】提供全站共享的工具函数和初始化入口，挂载在全局 XiYun 命名空间下
 * 【职责】
 *   1. 页面初始化（XiYun.init）
 *   2. 日期格式化（formatDate）
 *   3. 邮箱 / 手机号校验（validateEmail / validatePhone）
 *   4. Toast 消息提示（showToast）
 * 【被谁调用】所有 HTML 页面（应在页面 JS 之前加载），pages/contact.js 直接调用 XiYun.validatePhone 等
 * 【依赖】无外部依赖，纯 Vanilla JS
 */

/** ==== 全局命名空间 XiYun ==== */
const XiYun = {

    /**
     * 初始化入口 — 注册事件监听
     */
    init() {
        this.setupEventListeners();
        console.log('喜云到家 initialized');
    },

    /**
     * 设置全局事件监听（DOM 就绪后自动 init）
     */
    setupEventListeners() {
        // 仅在需要时注册额外事件监听
    },

    /**
     * 日期格式化：Date 对象 / 时间戳 → "YYYY-MM-DD"
     * @param {Date|number|string} date - 日期
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },

    /**
     * 邮箱格式校验
     * @param {string} email
     * @returns {boolean}
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * 中国大陆手机号校验（1 开头的 11 位数字）
     * @param {string} phone
     * @returns {boolean}
     */
    validatePhone(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    },

    /**
     * 简易 Toast 消息提示（自动消失）
     * @param {string} message - 提示文本
     * @param {string} [type='info'] - 类型：'info' | 'success' | 'error'
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // 下一帧添加 show 类触发 CSS 过渡
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // 3 秒后淡出并移除 DOM
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

/** ==== 自动初始化 ==== */
document.addEventListener('DOMContentLoaded', () => {
    XiYun.init();
});
