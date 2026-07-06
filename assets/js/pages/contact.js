/**
 * ================================================================
 *  contact.js — 服务预约表单交互（提交与校验）
 * ================================================================
 * 【角色】联系页面的服务预约表单验证与提交处理
 * 【职责】
 *   1. 监听 #contactForm 的 submit 事件并阻止默认提交
 *   2. 设置 datetime-local 的 min 属性为当前时间
 *   3. 校验必填项（姓名、手机号、服务地址、服务项目、预约时间、需求描述）
 *   4. 校验手机号格式（调用 XiYun.validatePhone）
 *   5. 校验邮箱格式（调用 XiYun.validateEmail，选填项）
 *   6. 校验预约时间必须大于当前时间
 *   7. 校验通过后显示成功 Toast 并重置表单
 * 【表单字段】name, phone, email(选填), address, service, area(选填), bookingTime, message
 * 【被谁引用】仅 contact.html（联系页）
 * 【依赖】common.js（必须在之前加载，依赖 XiYun 命名空间提供 validatePhone / validateEmail / showToast）
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const bookingTimeInput = document.getElementById('bookingTime');
    if (bookingTimeInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        const minDateTime = now.toISOString().slice(0, 16);
        bookingTimeInput.min = minDateTime;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const service = document.getElementById('service').value;
        const area = document.getElementById('area').value;
        const bookingTime = document.getElementById('bookingTime').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !address || !service || !bookingTime || !message) {
            XiYun.showToast('请填写所有必填项', 'error');
            return;
        }

        if (!XiYun.validatePhone(phone)) {
            XiYun.showToast('请输入正确的手机号码', 'error');
            return;
        }

        if (email && !XiYun.validateEmail(email)) {
            XiYun.showToast('请输入正确的邮箱地址', 'error');
            return;
        }

        const bookingDateTime = new Date(bookingTime);
        const now = new Date();
        if (bookingDateTime <= now) {
            XiYun.showToast('预约时间必须大于当前时间', 'error');
            return;
        }

        const payload = { name, phone, email, address, service, area, bookingTime, message };
        const ok = await API.submitContact(payload);
        if (ok) {
            XiYun.showToast('预约成功，我们会尽快与您联系！', 'success');
            form.reset();
        } else {
            XiYun.showToast('提交失败，请稍后重试', 'error');
        }
    });
});
