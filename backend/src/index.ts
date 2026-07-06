"use strict";

/** @type {import('@strapi/strapi').Strapi} */
module.exports = {
  async bootstrap({ strapi }: any) {
    const existingInfo = await strapi.documents("api::company-info.company-info").findMany();
    if (existingInfo.length > 0) {
      strapi.log.info("Database already seeded, skipping...");
      return;
    }

    strapi.log.info("Seeding database with initial content...");

    await strapi.documents("api::company-info.company-info").create({
      data: {
        companyName: "喜云到家",
        slogan: "家更干净，心更轻松",
        phone: "400-xxx-xxxx",
        email: "service@xiyun.com",
        address: "XX市XX区XX路XX号",
        workHours: "周一至周日 8:00-20:00",
        aboutTitle: "关于喜云到家",
        aboutLead: "我们坚信，洁净之家，是心灵最好的栖息与疗愈。",
        aboutContent: "作为智净优邸旗下专注家庭深度保洁与到家服务的品牌，喜云到家以专业、真诚、靠谱为核心，致力于让每一个家庭更干净、更安心，让每一份劳动被看见、被尊重。",
        mission: "每一份劳动都有价值，每一个家庭都更安心",
        vision: "做您身边值得信赖的生活伙伴",
        values: "至诚至信，匠心笃行",
        copyright: "2025 喜云到家 版权所有",
      },
    });

    const features = [
      { title: "专业服务", description: "高标准服务体系，持证上岗", order: 1 },
      { title: "品质保障", description: "至诚至信，匠心笃行", order: 2 },
      { title: "便捷预约", description: "在线预约，快速响应", order: 3 },
      { title: "值得信赖", description: "百万用户的共同选择", order: 4 },
    ];
    for (const f of features) {
      await strapi.documents("api::feature.feature").create({ data: f });
    }

    const services = [
      { title: "家政清洁", description: "专业清洁团队，提供日常家庭清洁服务", price: "¥99起", category: "cleaning" as const, subItems: "日常保洁、深度清洁、开荒保洁", order: 1 },
      { title: "深度清洁", description: "全方位深度清洁，让家焕然一新", price: "¥199起", category: "cleaning" as const, order: 2 },
      { title: "空调维修", description: "专业空调维修、清洗、加氟", price: "¥80起", category: "repair" as const, order: 3 },
      { title: "洗衣机维修", description: "各品牌洗衣机维修服务", price: "¥100起", category: "repair" as const, order: 4 },
      { title: "家庭搬家", description: "一站式搬家服务，省心省力", price: "¥300起", category: "moving" as const, order: 5 },
      { title: "下水道疏通", description: "快速解决各类管道堵塞问题", price: "¥120起", category: "pipeline" as const, order: 6 },
    ];
    for (const s of services) {
      await strapi.documents("api::service.service").create({ data: s });
    }

    const cases = [
      { title: "李女士家庭深度清洁", description: "120平米住宅全屋深度清洁，服务时长4小时", date: "2024-03-15", order: 1 },
      { title: "王先生空调维修", description: "格力中央空调维修保养，恢复制冷效果", date: "2024-03-12", order: 2 },
      { title: "张先生搬家服务", description: "三室两厅搬家，全程专业打包搬运", date: "2024-03-10", order: 3 },
      { title: "赵女士管道疏通", description: "厨房下水道堵塞疏通，快速解决问题", date: "2024-03-08", order: 4 },
      { title: "刘先生家电清洗", description: "油烟机、冰箱、洗衣机全套清洗", date: "2024-03-05", order: 5 },
      { title: "陈女士家庭保洁", description: "日常保洁服务，每周定期上门", date: "2024-03-01", order: 6 },
    ];
    for (const c of cases) {
      await strapi.documents("api::case.case").create({ data: c });
    }

    const articles = [
      { title: "喜云到家完成A轮融资，加速全国布局", summary: "近日，喜云到家宣布完成A轮融资，将用于技术研发、市场拓展和团队建设。", date: "2024-03-20", category: "公司动态", order: 1 },
      { title: "喜云到家服务标准升级", summary: "为提供更优质的服务，喜云到家正式发布新版服务标准。", date: "2024-03-15", category: "服务升级", order: 2 },
      { title: "家庭服务行业趋势分析", summary: "随着科技发展和消费升级，智能化、标准化成为行业发展新趋势。", date: "2024-03-10", category: "行业资讯", order: 3 },
      { title: "喜云到家荣获年度最佳称号", summary: "喜云到家凭借优质服务和创新模式，荣获年度最佳家庭服务平台称号。", date: "2024-03-05", category: "荣誉奖项", order: 4 },
    ];
    for (const a of articles) {
      await strapi.documents("api::article.article").create({ data: a });
    }

    await strapi.documents("api::page.page").create({
      data: {
        title: "首页",
        slug: "home",
        metaDescription: "喜云到家 - 您身边值得信赖的生活伙伴",
        heroTitle: "喜云到家",
        heroTagline: "家更干净，心更轻松",
        heroButtonText: "了解服务",
        heroButtonLink: "/pages/services.html",
        brandStoryTitle: "关于喜云到家",
        brandStoryLead: "我们坚信，洁净之家，是心灵最好的栖息与疗愈。",
        brandStoryContent: "作为智净优邸旗下专注家庭深度保洁与到家服务的品牌，喜云到家以专业、真诚、靠谱为核心。",
        ctaTitle: "立即预约服务",
        ctaContent: "专业团队，让家更干净，心更轻松",
        ctaButtonText: "联系我们",
        ctaButtonLink: "/pages/contact.html",
      },
    });

    strapi.log.info("Database seeded successfully!");
  },
};
