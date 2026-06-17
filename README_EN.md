# Chaoyue Sim Racing

> 🏎️ A WeChat Mini Program for the Assetto Corsa racing community

A WeChat Mini Program built for Assetto Corsa sim racing players, providing a one-stop racing community experience with race management, rankings, driver profiles, and more.

---

## ✨ Features

- **🏠 Home** — Announcements, recent races, race calendar, one-click copy server link to join races
- **🏆 Rankings** — Multi-dimensional ranking: lap time by track, ladder score, average score ranking
- **👤 Profile** — WeChat login, Steam GUID binding, driver profile (safety score / lap times / overall rank), personal race history
- **📋 Race List** — Full race browsing with infinite scroll
- **📊 Race Detail** — Entrant rankings, per-lap results (with sector times), event details (collisions / cut tracks / pit stops, etc.)

---

## 🛠 Tech Stack

| Tech | Description |
|------|-------------|
| **Framework** | WeChat Mini Program native framework |
| **Render Engine** | Skyline |
| **Component Framework** | glass-easel |
| **Backend API** | RESTful API (`https://www.ruankun.xyz:8444`) |
| **Track Data** | Built-in 56 tracks with name mappings |
| **Car Data** | Built-in 150+ car model name mappings |

---

## 📂 Project Structure

```
cyracing2/
├── app.js                    # Global config (API base URL, track/car name maps)
├── app.json                  # Mini Program config (page routes, TabBar, Skyline rendering)
├── app.wxss                  # Global styles
├── project.config.json       # Project configuration
├── sitemap.json              # Sitemap
├── components/
│   └── navigation-bar/       # Custom navigation bar component
│       ├── navigation-bar.js
│       ├── navigation-bar.json
│       ├── navigation-bar.wxml
│       └── navigation-bar.wxss
└── pages/
    ├── index/                # Home page
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    ├── ranking/              # Rankings page
    │   ├── ranking.js
    │   ├── ranking.json
    │   ├── ranking.wxml
    │   └── ranking.wxss
    ├── mine/                 # Profile page
    │   ├── mine.js
    │   ├── mine.json
    │   ├── mine.wxml
    │   └── mine.wxss
    ├── raceList/             # Race list page
    │   ├── raceList.js
    │   ├── raceList.json
    │   ├── raceList.wxml
    │   └── raceList.wxss
    ├── raceDetail/           # Race detail page
    │   ├── raceDetail.js
    │   ├── raceDetail.json
    │   ├── raceDetail.wxml
    │   └── raceDetail.wxss
    ├── test/                 # Test page
    │   ├── test.js
    │   ├── test.json
    │   ├── test.wxml
    │   └── test.wxss
    └── assets/
        └── icon/             # TabBar icon assets
            ├── index1.png
            ├── index2.png
            ├── ranking1.png
            ├── ranking2.png
            ├── mine1.png
            └── mine2.png
```

---

## 🚀 Getting Started

### Prerequisites

- [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- WeChat Mini Program AppID (configured: `wx5fc776fc4b05b1a2`)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cyracing2.git
   ```

2. **Open with WeChat DevTools**
   - Launch WeChat DevTools
   - Import project and select the `cyracing2` directory
   - Enter your AppID or use a test account

3. **Configure backend URL** (optional)
   - Update `globalData.baseUrl` in `app.js` to your own backend API address

4. **Compile and run**
   - Click the "Compile" button in DevTools to preview

---

## 📡 API Reference

The Mini Program depends on the following backend API endpoints:

| Endpoint | Method | Description |
|---------|--------|-------------|
| `/users/login` | POST | WeChat login |
| `/users/{openid}/driver` | GET | Get bound driver info |
| `/users/bind` | POST | Bind Steam GUID |
| `/announcements/` | GET | Get announcement list |
| `/races/` | GET | Get race list |
| `/races/races/{race_id}/summary` | GET | Get race summary |
| `/races/races/{race_id}/laps` | GET | Get race lap data |
| `/races/summaries` | GET | Get race summaries (for rankings) |
| `/events/race/{race_id}` | GET | Get race event data |
| `/drivers/{steam_guid}/races` | GET | Get driver race records |
| `/driver_profiles/profiles/{driver_id}` | GET | Get driver profile |
| `/driver_profiles/profiles/{driver_id}/refresh` | POST | Refresh driver profile |
| `/driver_profiles/profiles` | GET | Get ranking data |

---

## 🏎️ Supported Tracks

Built-in name mappings for 56 Assetto Corsa tracks, including:

- Classic circuits: Monza, Spa-Francorchamps, Silverstone, Nürburgring, Imola, Suzuka, etc.
- Chinese tracks: Shanghai NFS, China 2022, Yongcheng, Goldenport 2010, Macau GP, etc.
- Drift tracks: Drift, Drift Playground, AC Drift Park, etc.

See `trackMap` in `app.js` for the full list.

---

## 🚗 Supported Cars

Built-in 150+ car model name mappings covering Ferrari, Porsche, Lamborghini, McLaren, BMW, Lotus, Ford, Toyota, and more. See `CAR_DISPLAY_MAP` in the page files for the full list.

---

## 🙏 Acknowledgments

- **[CodeBuddy](https://codebuddy.tencent.com/)** — AI-powered coding assistant that boosted development efficiency
- **[esports podium team](https://space.bilibili.com/23046921?spm_id_from=333.337.search-card.all.click)** — Inspiration and atmosphere (bilibili: EktarTee Sim Racing)
- **[Assetto Corsa Server Manager](https://emperorservers.com/assetto-corsa-server-manager/)** — Assetto Corsa server management tool
- **[Content Manager](https://assettocorsa.club/content-manager.html)** — The essential PC launcher / content manager for Assetto Corsa
- **[Low Fuel Motorsports](https://lowfuelmotorsport.com/)** — LFM比赛平台提供设计灵感
---

## 📄 License

Free to use

---

## 👤 Author

### [bilibili: 阮超越咦](https://space.bilibili.com/14785225?spm_id_from=333.337.0.0)
