/**
 * API 通信层 - 与后端 Express 服务器交互
 * 
 * 功能：
 * 1. 封装所有后端 API 调用
 * 2. 统一处理请求/响应
 * 3. 提供数据加载方法供 DataLoader 使用
 * 
 * 使用方式：
 *   const services = await API.getServices('cleaning');  // 获取清洁类服务
 *   const success = await API.submitContact(formData);   // 提交联系表单
 */

// API 服务器地址（根据端口自动判断环境）
// 如果当前页面通过 3000 端口访问（即通过后台服务器），则使用相对路径
// 否则使用完整的 localhost:3000 地址
const API_BASE = window.location.port === '3000' ? '' : 'http://localhost:3000';

const API = {
  /**
   * 获取公司信息
   * @returns {Object} 公司信息对象（公司名、标语、电话、企业文化等）
   */
  async getCompanyInfo() {
    try {
      const res = await fetch(`${API_BASE}/api/company-info`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.error('获取公司信息失败:', e);
      return null;
    }
  },

  /**
   * 获取服务列表
   * @param {string} category - 分类筛选（cleaning/repair/moving/pipeline/all）
   * @returns {Array} 服务项目数组
   */
  async getServices(category = null) {
    try {
      let url = `${API_BASE}/api/services`;
      // 如果指定了分类且不是"全部"，添加分类筛选参数
      if (category && category !== 'all') url += `?category=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.error('获取服务列表失败:', e);
      return [];
    }
  },

  /**
   * 获取案例列表（支持分页）
   * @param {number} page - 页码（从 1 开始）
   * @param {number} pageSize - 每页数量
   * @returns {Object} { items: 案例数组, pagination: 分页信息 }
   */
  async getCases(page = 1, pageSize = 6) {
    try {
      const res = await fetch(`${API_BASE}/api/cases`);
      const data = await res.json();
      const items = data.data || [];
      // 客户端分页（后端返回全部数据，前端截取）
      const start = (page - 1) * pageSize;
      return {
        items: items.slice(start, start + pageSize),
        pagination: { page, pageSize, total: items.length, pageCount: Math.ceil(items.length / pageSize) }
      };
    } catch (e) {
      return { items: [], pagination: null };
    }
  },

  /**
   * 获取新闻列表（支持分页）
   * @param {number} page - 页码
   * @param {number} pageSize - 每页数量
   * @returns {Object} { items: 新闻数组, pagination: 分页信息 }
   */
  async getNews(page = 1, pageSize = 4) {
    try {
      const res = await fetch(`${API_BASE}/api/articles`);
      const data = await res.json();
      const items = data.data || [];
      const start = (page - 1) * pageSize;
      return {
        items: items.slice(start, start + pageSize),
        pagination: { page, pageSize, total: items.length, pageCount: Math.ceil(items.length / pageSize) }
      };
    } catch (e) {
      return { items: [], pagination: null };
    }
  },

  /**
   * 获取优势特色列表
   * @returns {Array} 特色项目数组
   */
  async getFeatures() {
    try {
      const res = await fetch(`${API_BASE}/api/features`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [];
    }
  },

  /**
   * 获取页面配置（按 slug）
   * @param {string} slug - 页面标识（home/about/services 等）
   * @returns {Object} 页面配置对象
   */
  async getPage(slug) {
    try {
      const res = await fetch(`${API_BASE}/api/pages/${slug}`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  /**
   * 获取媒体文件完整 URL
   * @param {Object} media - 媒体对象，包含 url 属性
   * @returns {string} 完整的文件 URL
   */
  getMediaUrl(media) {
    if (!media?.url) return '';
    // 如果已经是完整 URL，直接返回；否则拼接 API_BASE
    return media.url.startsWith('http') ? media.url : `${API_BASE}${media.url}`;
  },

  /**
   * 提交联系表单
   * @param {Object} formData - 表单数据（name, phone, email, service, message）
   * @returns {boolean} 是否提交成功
   */
  async submitContact(formData) {
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      return res.ok;
    } catch (e) {
      console.error('提交联系表单失败:', e);
      return false;
    }
  },
};

// 挂载到全局对象，供其他脚本使用
window.API = API;
