# 超越模拟竞速

> 🏎️ Chaoyue Sim Racing - Assetto Corsa 超越模拟竞速微信小程序

一款为 Assetto Corsa 赛车模拟器玩家打造的微信小程序，提供赛事管理、排名查看、车手画像等一站式竞速社区体验。

---

## ✨ 功能特性

- **🏠 首页** — 公告展示、最近比赛一览、赛历查看、"立即比赛"一键复制服务器链接加入对战
- **🏆 排名** — 多维度排名系统：按赛道圈速排名、积分排名（Ladder Score）、平均积分排名
- **👤 我的** — 微信登录、Steam GUID 绑定、车手画像（安全分 / 圈速 / 综合排名）、个人比赛记录
- **📋 比赛列表** — 全量赛事浏览，支持滚动加载更多
- **📊 比赛详情** — 参赛者排名、每圈成绩（含赛段时间）、事件详情（碰撞 / 切弯 / 进站等统计）

---

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| **框架** | 微信小程序原生框架 |
| **渲染引擎** | Skyline |
| **组件框架** | glass-easel |
| **后端 API** | RESTful API（`https://www.ruankun.xyz:8444`） |
| **赛道数据** | 内置 56 条赛道中英文名映射 |
| **车型数据** | 内置 150+ 车型名映射 |

---

## 📂 项目结构

```
cyracing2/
├── app.js                    # 全局配置（API 地址、赛道/车型映射表）
├── app.json                  # 小程序配置（页面路由、TabBar、Skyline 渲染）
├── app.wxss                  # 全局样式
├── project.config.json       # 项目配置文件
├── sitemap.json              # 站点地图
├── components/
│   └── navigation-bar/       # 自定义导航栏组件
│       ├── navigation-bar.js
│       ├── navigation-bar.json
│       ├── navigation-bar.wxml
│       └── navigation-bar.wxss
└── pages/
    ├── index/                # 首页
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    ├── ranking/              # 排名页
    │   ├── ranking.js
    │   ├── ranking.json
    │   ├── ranking.wxml
    │   └── ranking.wxss
    ├── mine/                 # 我的（个人中心）
    │   ├── mine.js
    │   ├── mine.json
    │   ├── mine.wxml
    │   └── mine.wxss
    ├── raceList/             # 比赛列表
    │   ├── raceList.js
    │   ├── raceList.json
    │   ├── raceList.wxml
    │   └── raceList.wxss
    ├── raceDetail/           # 比赛详情
    │   ├── raceDetail.js
    │   ├── raceDetail.json
    │   ├── raceDetail.wxml
    │   └── raceDetail.wxss
    ├── test/                 # 测试页
    │   ├── test.js
    │   ├── test.json
    │   ├── test.wxml
    │   └── test.wxss
    └── assets/
        └── icon/             # TabBar 图标资源
            ├── index1.png
            ├── index2.png
            ├── ranking1.png
            ├── ranking2.png
            ├── mine1.png
            └── mine2.png
```

---

## 🚀 快速开始

### 环境要求

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 微信小程序 AppID（已配置：`wx5fc776fc4b05b1a2`）

### 运行步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/cyracing2.git
   ```

2. **用微信开发者工具打开项目**
   - 打开微信开发者工具
   - 导入项目，选择 `cyracing2` 目录
   - 填入 AppID 或选择测试号

3. **配置后端地址**（可选）
   - 在 `app.js` 中修改 `globalData.baseUrl` 为你的后端 API 地址

4. **编译运行**
   - 点击开发者工具中的「编译」按钮即可预览

---

## 📡 API 接口

小程序依赖以下后端 API 接口：

| 接口路径 | 方法 | 说明 |
|---------|------|------|
| `/users/login` | POST | 微信登录 |
| `/users/{openid}/driver` | GET | 获取绑定的车手信息 |
| `/users/bind` | POST | 绑定 Steam GUID |
| `/announcements/` | GET | 获取公告列表 |
| `/races/` | GET | 获取赛事列表 |
| `/races/races/{race_id}/summary` | GET | 获取赛事摘要 |
| `/races/races/{race_id}/laps` | GET | 获取赛事圈速数据 |
| `/races/summaries` | GET | 获取赛事汇总（用于排名） |
| `/events/race/{race_id}` | GET | 获取赛事事件数据 |
| `/drivers/{steam_guid}/races` | GET | 获取车手比赛记录 |
| `/driver_profiles/profiles/{driver_id}` | GET | 获取车手画像 |
| `/driver_profiles/profiles/{driver_id}/refresh` | POST | 刷新车手画像 |
| `/driver_profiles/profiles` | GET | 获取积分排名数据 |

---

## 🙏 鸣谢

- **[CodeBuddy](https://codebuddy.tencent.com/)** — AI 智能编程助手，助力本项目高效开发
- **[esports podium team](https://space.bilibili.com/23046921?spm_id_from=333.337.search-card.all.click)** — 提供灵感和氛围（bilibili up主:EktarTee模拟赛车）
- **[Assetto Corsa Server Manager](https://emperorservers.com/assetto-corsa-server-manager/)** — Assetto Corsa 服务器管理工具
- **[Content Manager](https://assettocorsa.club/content-manager.html)** — Assetto Corsa 内容管理器，PC 端必备神器
- **[Low Fuel Motorsports](https://lowfuelmotorsport.com/)** — LFM比赛平台提供设计灵感
---

## 📄 许可证

随便玩

---

## 👤 作者
## [bilibili up主: 阮超越咦](https://space.bilibili.com/14785225?spm_id_from=333.337.0.0)
