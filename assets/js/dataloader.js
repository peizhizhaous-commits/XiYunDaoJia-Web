/**
 * 数据加载器 - 从后端 API 加载数据并填充到页面 DOM
 * 
 * 功能：
 * 1. 调用 API 获取数据
 * 2. 将数据渲染到页面对应位置
 * 3. 处理图片 URL（优先使用上传图片，否则使用 SVG 占位图）
 * 
 * 使用方式：
 *   DataLoader.initHomePage();      // 初始化首页
 *   DataLoader.initServicesPage();  // 初始化服务页
 */
const DataLoader = {
  /**
   * 初始化首页数据
   */
  async initHomePage() {
    const [companyInfo, features, services] = await Promise.all([
      API.getCompanyInfo(),
      API.getFeatures(),
      API.getServices(),
    ]);

    // 填充公司信息
    if (companyInfo) {
      this.fillCompanyInfo(companyInfo);
    }

    // 填充优势特色
    if (features?.length) {
      this.fillFeatures(features);
    }

    // 填充服务预览
    if (services?.length) {
      this.fillServicesPreview(services.slice(0, 4));
    }
  },

  /**
   * 初始化服务页面
   */
  async initServicesPage(category = 'all') {
    const [companyInfo, services] = await Promise.all([
      API.getCompanyInfo(),
      API.getServices(category),
    ]);

    if (companyInfo) this.fillCompanyInfo(companyInfo);
    if (services?.length) this.fillServicesList(services);
  },

  /**
   * 初始化案例页面
   */
  async initCasesPage(page = 1) {
    const [companyInfo, casesData] = await Promise.all([
      API.getCompanyInfo(),
      API.getCases(page),
    ]);

    if (companyInfo) this.fillCompanyInfo(companyInfo);
    if (casesData.items?.length) this.fillCasesList(casesData.items);
  },

  /**
   * 初始化新闻页面
   */
  async initNewsPage() {
    const [companyInfo, newsData] = await Promise.all([
      API.getCompanyInfo(),
      API.getNews(),
    ]);

    if (companyInfo) this.fillCompanyInfo(companyInfo);
    if (newsData.items?.length) this.fillNewsList(newsData.items);
  },

  /**
   * 初始化关于页面
   */
  async initAboutPage() {
    const companyInfo = await API.getCompanyInfo();

    if (companyInfo) {
      this.fillCompanyInfo(companyInfo);
      this.fillAboutPage(companyInfo);
    }
  },

  /**
   * 填充关于页面内容
   * @param {Object} info - 公司信息对象
   */
  fillAboutPage(info) {
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle && info.about_title) {
      aboutTitle.textContent = info.about_title;
    }

    const storyLead = document.querySelector('.story-lead');
    if (storyLead && info.about_lead) {
      storyLead.textContent = info.about_lead;
    }

    const storyContent = document.querySelector('.story-content .story-text');
    if (storyContent && info.about_content) {
      storyContent.innerHTML = info.about_content.replace(/\n/g, '<br>');
    }

    const storyImage = document.querySelector('.story-image img');
    const imagePlaceholder = document.querySelector('.story-image .image-placeholder');
    if (storyImage && imagePlaceholder && info.about_image) {
      storyImage.src = info.about_image;
      storyImage.style.display = 'block';
      imagePlaceholder.style.display = 'none';
    }

    const missionText = document.querySelector('.mission-card:nth-child(1) p');
    if (missionText && info.mission) {
      missionText.innerHTML = info.mission.replace(/\n/g, '<br>');
    }

    const visionText = document.querySelector('.mission-card:nth-child(2) p');
    if (visionText && info.vision) {
      visionText.innerHTML = info.vision.replace(/\n/g, '<br>');
    }

    const valuesText = document.querySelector('.mission-card:nth-child(3) p');
    if (valuesText && info.core_values) {
      valuesText.innerHTML = info.core_values.replace(/\n/g, '<br>');
    }

    const sloganEl = document.querySelector('.page-header .tagline');
    if (sloganEl && info.slogan) {
      sloganEl.textContent = info.slogan;
    }
  },

  /**
   * 填充公司信息到页面公共区域（导航栏、页脚）
   * @param {Object} info - 公司信息对象
   */
  fillCompanyInfo(info) {
    const phone = info.phone || '400-xxx-xxxx';

    document.querySelectorAll('.header-contact .phone').forEach(el => {
      el.textContent = phone;
    });

    document.querySelectorAll('.footer-contact p').forEach(el => {
      if (el.textContent.includes('服务热线')) {
        el.innerHTML = `服务热线：<a href="tel:${phone.replace(/-/g, '')}">${phone}</a>`;
      } else if (el.textContent.includes('地址')) {
        el.textContent = `服务时间：${info.work_hours || '周一至周日 8:00-20:00'}`;
      }
    });

    const sloganEl = document.querySelector('.footer-brand .slogan');
    if (sloganEl && info.slogan) {
      sloganEl.textContent = info.slogan;
    }

    document.querySelectorAll('.footer-bottom p').forEach(el => {
      if (el.textContent.includes('©')) {
        el.textContent = `© ${info.copyright || '2025 喜云到家 版权所有'}`;
      }
    });

    if (info.logo?.url) {
      const logoUrl = API.getMediaUrl({ url: info.logo.url });
      document.querySelectorAll('.logo img, .footer-logo img').forEach(el => {
        el.src = logoUrl;
      });
    }
  },

  /**
   * 填充优势特色到首页四宫格
   * @param {Array} features - 特色项目数组
   */
  fillFeatures(features) {
    const grid = document.querySelector('.features-grid');
    if (!grid) return;

    grid.innerHTML = features
      .map(f => {
        const iconUrl = f.icon_url ? API.getMediaUrl({ url: f.icon_url }) : 'assets/images/icons/service.svg';
        return `
        <div class="feature-card">
          <img src="${iconUrl}" alt="${f.title}">
          <h3>${f.title}</h3>
          <p>${f.description || ''}</p>
        </div>
      `;
      })
      .join('');
  },

  /**
   * 填充服务预览（首页，只显示前 4 项）
   * @param {Array} services - 服务项目数组
   */
  fillServicesPreview(services) {
    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    grid.innerHTML = services
      .map(s => {
        const imgUrl = s.image_url
          ? API.getMediaUrl({ url: s.image_url })
          : `assets/images/services/${s.category}.svg`;
        return `
        <div class="service-item">
          <img src="${imgUrl}" alt="${s.title}">
          <h3>${s.title}</h3>
          <p>${s.sub_items || s.description || ''}</p>
        </div>
      `;
      })
      .join('');
  },

  /**
   * 填充服务列表（服务项目页面，完整列表）
   * @param {Array} services - 服务项目数组
   */
  fillServicesList(services) {
    const list = document.querySelector('.services-list');
    if (!list) return;

    list.innerHTML = services
      .map(s => {
        const imgUrl = s.image_url
          ? API.getMediaUrl({ url: s.image_url })
          : `assets/images/services/${s.category}.svg`;
        return `
        <div class="service-card" data-category="${s.category}">
          <img src="${imgUrl}" alt="${s.title}">
          <div class="service-info">
            <h3>${s.title}</h3>
            <p>${s.description || ''}</p>
            ${s.price ? `<span class="price">${s.price}</span>` : ''}
          </div>
        </div>
      `;
      })
      .join('');
  },

  /**
   * 填充案例列表（案例展示页面）
   * @param {Array} cases - 案例数组
   */
  fillCasesList(cases) {
    const grid = document.querySelector('.cases-grid');
    if (!grid) return;

    grid.innerHTML = cases
      .map(c => {
        const imgUrl = c.image_url
          ? API.getMediaUrl({ url: c.image_url })
          : 'assets/images/cases/case1.svg';
        return `
        <div class="case-card">
          <div class="case-image">
            <img src="${imgUrl}" alt="${c.title}">
          </div>
          <div class="case-info">
            <h3>${c.title}</h3>
            <p>${c.description || ''}</p>
            <span class="date">${c.date || ''}</span>
          </div>
        </div>
      `;
      })
      .join('');
  },

  /**
   * 填充新闻列表（新闻资讯页面）
   * @param {Array} news - 新闻数组
   */
  fillNewsList(news) {
    const list = document.querySelector('.news-list');
    if (!list) return;

    list.innerHTML = news
      .map(n => {
        const imgUrl = n.image_url
          ? API.getMediaUrl({ url: n.image_url })
          : 'assets/images/news/news1.svg';
        return `
        <article class="news-item">
          <div class="news-image">
            <img src="${imgUrl}" alt="${n.title}">
          </div>
          <div class="news-content">
            <h3><a href="#">${n.title}</a></h3>
            <p>${n.summary || ''}</p>
            <div class="news-meta">
              <span class="date">${n.date || ''}</span>
              <span class="category">${n.category || ''}</span>
            </div>
          </div>
        </article>
      `;
      })
      .join('');
  },
};

window.DataLoader = DataLoader;
