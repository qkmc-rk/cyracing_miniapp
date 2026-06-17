const app = getApp()
const BASE_URL = app.globalData.baseUrl
const TRACK_MAP = app.globalData.trackMap

const PAGE_SIZE = 20

Page({
  data: {
    races: [],
    loading: true,
    loadingMore: false,
    noMore: false
  },

  // 全量数据（前端分批展示）
  _allRaces: [],
  _displayCount: 0,

  onLoad() {
    this.fetchAllRaces()
  },

  /** 一次性获取全量数据，再前端分批展示 */
  fetchAllRaces() {
    this.setData({ loading: true })
    wx.request({
      url: `${BASE_URL}/races/`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this._allRaces = (res.data || []).map(item => ({
            race_id: item.race_id,
            session_type: item.session_type,
            session_label: item.session_type === 'RACE' ? '正赛' : '排位',
            session_class: item.session_type === 'RACE' ? 'race-tag--main' : 'race-tag--quali',
            track_name: TRACK_MAP[item.track_name] || item.track_name,
            date: this.formatDate(item.date),
            entrants_count: item.entrants ? item.entrants.length : 0
          }))
          this._displayCount = Math.min(PAGE_SIZE, this._allRaces.length)
          this.setData({
            races: this._allRaces.slice(0, this._displayCount),
            loading: false,
            noMore: this._displayCount >= this._allRaces.length
          })
        } else {
          this.setData({ loading: false })
        }
      },
      fail: () => {
        this.setData({ loading: false })
      }
    })
  },

  /** 滚动到底部，展示更多 */
  onScrollToLower() {
    if (this.data.noMore || this.data.loadingMore) return

    const nextCount = Math.min(this._displayCount + PAGE_SIZE, this._allRaces.length)
    if (nextCount === this._displayCount) {
      this.setData({ noMore: true })
      return
    }

    this.setData({ loadingMore: true })
    // 模拟短暂加载动画
    setTimeout(() => {
      this._displayCount = nextCount
      this.setData({
        races: this._allRaces.slice(0, this._displayCount),
        loadingMore: false,
        noMore: this._displayCount >= this._allRaces.length
      })
    }, 300)
  },

  /** 格式化日期 */
  formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr.replace(' ', 'T'))
    return `${d.getMonth() + 1}月${d.getDate()}日`
  },

  /** 点击比赛条目跳转详情 */
  onRaceTap(e) {
    const raceId = e.currentTarget.dataset.raceId
    if (!raceId) return
    wx.navigateTo({ url: `/pages/raceDetail/raceDetail?race_id=${raceId}` })
  }
})