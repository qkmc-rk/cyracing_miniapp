const app = getApp()
const BASE_URL = app.globalData.baseUrl
const TRACK_MAP = app.globalData.trackMap

Page({
  data: {
    videoSrc: BASE_URL + '/static/banner_video.mp4',
    announcements: [],
    races: [],
    loadingAnnouncements: true,
    loadingRaces: true,
    showModal: false,
    modalTitle: '',
    modalContent: ''
  },

  onLoad() {
    this.fetchAnnouncements()
    this.fetchRaces()
  },

  onShow() {
    this.fetchAnnouncements()
    this.fetchRaces()
  },

  /** 获取公告列表 */
  fetchAnnouncements() {
    this.setData({ loadingAnnouncements: true })
    wx.request({
      url: `${BASE_URL}/announcements/`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const announcements = (res.data || []).map(item => ({
            announcement_id: item.announcement_id,
            title: item.title,
            content: item.content,
            date: this.formatDate(item.published_at || item.created_at)
          }))
          this.setData({ announcements, loadingAnnouncements: false })
        }
      },
      fail: () => {
        this.setData({ loadingAnnouncements: false })
      }
    })
  },

  /** 获取最近比赛列表 */
  fetchRaces() {
    this.setData({ loadingRaces: true })
    wx.request({
      url: `${BASE_URL}/races/`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const races = (res.data || []).slice(0, 5).map(item => ({
            race_id: item.race_id,
            session_type: item.session_type,
            session_label: item.session_type === 'RACE' ? '正赛' : '排位',
            session_class: item.session_type === 'RACE' ? 'race-tag--main' : 'race-tag--quali',
            track_name: TRACK_MAP[item.track_name] || item.track_name,
            date: this.formatDate(item.date),
            entrants_count: item.entrants ? item.entrants.length : 0
          }))
          this.setData({ races, loadingRaces: false })
        }
      },
      fail: () => {
        this.setData({ loadingRaces: false })
      }
    })
  },

  /** 格式化日期: "2026-06-06 13:40:00" 或 "2026-05-31T00:17:14" → "5月31日" */
  formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr.replace(' ', 'T'))
    return `${d.getMonth() + 1}月${d.getDate()}日`
  },

  /** 点击公告条目 */
  onAnnouncementTap(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.announcements.find(a => a.announcement_id === id)
    if (item) {
      this.setData({
        showModal: true,
        modalTitle: item.title,
        modalContent: item.content
      })
    }
  },

  /** 关闭弹窗 */
  onCloseModal() {
    this.setData({ showModal: false })
  },
  onRace() {
    //将 https://acstuff.club/s/q:race/online/join?ip=8.137.114.18&httpPort=8081  复制到剪切板 然后提示
    wx.setClipboardData({
      data: 'https://acstuff.club/s/q:race/online/join?ip=8.137.114.18&httpPort=8081',
      showToast: false,
      success: () => {
        this.setData({
          showModal: true,
          modalTitle: '链接已复制',
          modalContent: '服务器链接已复制到剪贴板，请在PC端浏览器中粘贴打开即可加入Asseto Corsa对战'
        })
      }
    })
  },

  onRaceTap(e) {
    const raceId = e.currentTarget.dataset.raceId
    if (!raceId) return
    wx.navigateTo({ url: `/pages/raceDetail/raceDetail?race_id=${raceId}` })
  },

  onRaceMore() {
    wx.navigateTo({ url: '/pages/raceList/raceList' })
  }
})
