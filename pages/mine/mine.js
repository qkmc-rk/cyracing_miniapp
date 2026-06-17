const app = getApp()
const BASE_URL = app.globalData.baseUrl
const TRACK_MAP = app.globalData.trackMap
const CAR_DISPLAY_MAP = app.globalData.carDisplayMap

// 许可证等级颜色映射
const LICENSE_COLORS = {
  'R': '#ff0000',    // Red - Rookie
  'D': '#a05000',    // D class - brown/orange
  'C': '#d4a017',    // C class - gold
  'B': '#17a0d4',    // B class - blue
  'A': '#7b17d4',    // A class - purple
  'P': '#17d468'     // Pro - green
}

Page({
  data: {
    isLoggedIn: false,
    openid: '',
    steamGuid: '',
    driver: null,
    binding: false,
    showTooltip: false,

    // 已登录已绑定车手 — 画像数据
    profile: null,
    loadingProfile: true,

    // 比赛记录
    raceRecords: [],
    loadingRaces: true
  },

  onLoad() {
    this.restoreSession()
  },

  onShow() {
    this.restoreSession()
  },

  /** 恢复本地会话 */
  restoreSession() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.setData({ isLoggedIn: true, openid })
      const cachedDriver = wx.getStorageSync('driverInfo')
      if (cachedDriver) { this.setData({ driver: cachedDriver }) }
      this.fetchUserDriver(openid)
    } else {
      this.setData({ isLoggedIn: false, openid: '', driver: null })
    }
  },

  /** 获取已绑定的车手信息，成功后拉取画像和比赛记录 */
  fetchUserDriver(openid) {
    wx.request({
      url: `${BASE_URL}/users/${openid}/driver`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.driver) {
          const driver = res.data.driver
          this.setData({ driver })
          wx.setStorageSync('driverInfo', driver)
          // 拉取画像 + 比赛记录
          this.fetchDriverProfile(driver.driver_id)
          this.fetchDriverRaces(driver.steam_guid)
        } else {
          this.setData({ driver: null })
        }
      },
      fail: () => {
        const cached = wx.getStorageSync('driverInfo')
        if (cached) {
          this.setData({ driver: cached })
          this.fetchDriverProfile(cached.driver_id)
          this.fetchDriverRaces(cached.steam_guid)
        }
      }
    })
  },

  /** 获取车手画像数据 */
  fetchDriverProfile(driverId) {
    this.setData({ loadingProfile: true })
    //首先通过接口刷新画像数据
    const that = this
    wx.request({
      url: `${BASE_URL}/driver_profiles/profiles/${driverId}/refresh`,
      method: 'POST',
      success: (res) => {
        console.log('refresh success', res)
        wx.request({
          url: `${BASE_URL}/driver_profiles/profiles/${driverId}`,
          method: 'GET',
          success: (res) => {
            if (res.statusCode === 200 && res.data) {
              const p = res.data
              // 预计算展示用字段（WXML不能调用page方法）
              p.safety_score_fmt = (p.safety_score || 0).toFixed(2)
              p.rank_display = p.rank_overall != null ? '#' + p.rank_overall : '--'
              p.drive_time_fmt = that.formatDriveTime(p.total_drive_time_ms)
              that.setData({ profile: p, loadingProfile: false })
              wx.setStorageSync('profileData', p)
            } else {
              that.setData({ loadingProfile: false })
            }
          },
          fail: () => {
            console.log('heiheiheiheih')
            const cached = wx.getStorageSync('profileData')
            if (cached) { that.setData({ profile: cached }) }
            that.setData({ loadingProfile: false })
          }
        })
      },
      fail: (res) => {
        console.log('refresh fail', res)
      }
    })
  },

  /** 获取车手比赛记录 */
  fetchDriverRaces(steamGuid) {
    if (!steamGuid) return
    this.setData({ loadingRaces: true })
    wx.request({
      url: `${BASE_URL}/drivers/${steamGuid}/races`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const records = res.data.map(item => ({
            race_id: item.race_id,
            session_type: item.session_type,
            session_label: item.session_type === 'RACE' ? '正赛' : '排位',
            session_class: item.session_type === 'RACE' ? 'race-tag--main' : 'race-tag--quali',
            track_name: TRACK_MAP[item.track_name] || item.track_name,
            car_model: CAR_DISPLAY_MAP[item.car_model] || this.fmtCarName(item.car_model),
            position: item.position,
            position_display: item.position != null
              ? item.position + (item.position === 1 ? 'st' : item.position === 2 ? 'nd' : item.position === 3 ? 'rd' : 'th')
              : '--',
            best_lap_fmt: this.formatLapTime(item.best_lap_ms),
            total_time_ms: item.total_time_ms,
            laps_completed: item.laps_completed || 0,
            date: this.formatDate(item.date)
          }))
          this.setData({ raceRecords: records, loadingRaces: false })
        } else {
          this.setData({ loadingRaces: false })
        }
      },
      fail: () => {
        this.setData({ loadingRaces: false })
      }
    })
  },

  /** 车型名格式化 */
  fmtCarName(raw) {
    if (!raw) return '--'
    return raw
      .replace(/^ks_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  },

  /** 格式化日期 */
  formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr.replace(' ', 'T'))
    return `${d.getMonth() + 1}月${d.getDate()}日`
  },

  /** 格式化时间 ms → m:ss.sss */
  formatLapTime(ms) {
    if (!ms || ms <= 0) return '--'
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const remainS = s % 60
    const remainMs = ms % 1000
    if (m > 0) {
      return `${m}:${remainS.toString().padStart(2, '0')}.${remainMs.toString().padStart(3, '0')}`
    }
    return `${remainS}.${remainMs.toString().padStart(3, '0')}`
  },

  /** 格式化总时间 ms → HH:MM:SS */
  formatTotalTime(ms) {
    if (!ms || ms <= 0) return '--'
    const s = Math.floor(ms / 1000)
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }
    return `${m}:${sec.toString().padStart(2, '0')}`
  },

  /** 格式化驾驶时长 */
  formatDriveTime(ms) {
    if (!ms || ms <= 0) return '--'
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    if (h > 0) { return `${h}h ${m}m` }
    return `${m}m`
  },

  /** 微信登录 */
  handleWxLogin() {
    wx.showLoading({ title: '登录中…' })

    wx.login({
      success: (loginRes) => {
        if (!loginRes.code) {
          wx.hideLoading()
          wx.showToast({ title: '获取登录凭证失败', icon: 'none' })
          return
        }

        wx.request({
          url: `${BASE_URL}/users/login`,
          method: 'POST',
          data: { code: loginRes.code },
          success: (res) => {
            wx.hideLoading()
            const data = res.data

            if (res.statusCode === 200 && data.openid) {
              wx.setStorageSync('openid', data.openid)
              this.setData({ isLoggedIn: true, openid: data.openid })
              wx.showToast({ title: '登录成功', icon: 'success' })
              this.fetchUserDriver(data.openid)
            } else {
              wx.showToast({ title: data.detail || '登录失败', icon: 'none' })
            }
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({ title: '网络异常', icon: 'none' })
          }
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '登录取消', icon: 'none' })
      }
    })
  },

  onSteamInput(e) {
    this.setData({ steamGuid: e.detail.value })
  },

  onBindTap() {
    const guid = (this.data.steamGuid || '').trim()
    if (!guid) {
      wx.showToast({ title: '请输入 Steam GUID', icon: 'none' })
      return
    }
    this.bindSteamGuid(guid)
  },

  bindSteamGuid(steamGuid) {
    if (!steamGuid || !this.data.openid) return

    this.setData({ binding: true })
    wx.request({
      url: `${BASE_URL}/users/bind`,
      method: 'POST',
      data: {
        openid: this.data.openid,
        steam_guid: steamGuid
      },
      success: (res) => {
        this.setData({ binding: false })
        if (res.statusCode === 200 && res.data.driver) {
          const driver = res.data.driver
          this.setData({ driver })
          wx.setStorageSync('driverInfo', driver)
          wx.showToast({ title: '绑定成功', icon: 'success' })
          this.fetchDriverProfile(driver.driver_id)
          this.fetchDriverRaces(driver.steam_guid)
        } else {
          wx.showToast({ title: res.data.detail || '未找到车手', icon: 'none' })
        }
      },
      fail: () => {
        this.setData({ binding: false })
        wx.showToast({ title: '网络异常', icon: 'none' })
      }
    })
  },

  onTooltipTap() {
    this.setData({ showTooltip: !this.data.showTooltip })
  },

  onCopySteamIdUrl() {
    wx.setClipboardData({
      data: 'https://steamid.io/',
      success: () => {
        wx.showToast({ title: '链接已复制', icon: 'success' })
      }
    })
  },

  onRaceRecordTap(e) {
    const raceId = e.currentTarget.dataset.raceId
    if (!raceId) return
    wx.navigateTo({ url: `/pages/raceDetail/raceDetail?race_id=${raceId}` })
  }
})
