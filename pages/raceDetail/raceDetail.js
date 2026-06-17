const app = getApp()
const BASE_URL = app.globalData.baseUrl
const TRACK_MAP = app.globalData.trackMap
const CAR_DISPLAY_MAP = app.globalData.carDisplayMap

const EVENT_TYPE_MAP = {
  'COLLISION_WITH_ENV': '撞墙',
  'COLLISION_WITH_CAR': '碰撞',
  'GIVE_POSITION': '让位',
  'CUT_TRACK': '切弯',
  'PITLANE_ENTRY': '进站',
  'PITLANE_EXIT': '出站',
  'SESSION_OVER': '比赛结束'
}

Page({
  data: {
    raceId: 0,
    loading: true,

    // 比赛基本信息
    trackName: '',
    sessionLabel: '',
    sessionClass: '',
    raceDate: '',
    entrantsCount: 0,

    // 参赛者排名列表
    entrants: [],

    // 事件列表
    events: [],
    eventGrouped: [],
    expandedEventDriver: -1,
    eventStats: {
      collisionEnv: 0,
      collisionCar: 0,
      cutTrack: 0,
      totalIncidents: 0
    },

    // 单圈成绩
    lapData: [],
    expandedDriver: -1
  },

  onLoad(options) {
    const raceId = options.race_id
    if (!raceId) return
    this.setData({ raceId })
    this.fetchRaceData(raceId)
  },

  fetchRaceData(raceId) {
    this.setData({ loading: true })

    // 并行请求 summary + events + laps
    let summaryDone = false
    let eventsDone = false
    let lapsDone = false
    const tryFinish = () => {
      if (summaryDone && eventsDone && lapsDone) {
        this.setData({ loading: false })
        wx.hideLoading()
      }
    }

    wx.showLoading({ title: '加载中', mask: true })

    wx.request({
      url: `${BASE_URL}/races/races/${raceId}/summary`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          const d = res.data
          const entrants = (d.entrants || [])
            .filter(e => e.laps_completed > 0)
            .sort((a, b) => a.position - b.position)
            .map((e, i) => ({
              position: e.position || (i + 1),
              driver_name: e.driver_name,
              car_model: CAR_DISPLAY_MAP[e.car_model] || this.fmtCarName(e.car_model),
              best_lap_fmt: this.formatLapTime(e.best_lap_ms),
              laps_completed: e.laps_completed || 0,
              total_time_fmt: this.formatTotalTime(e.total_time_ms),
              incidents: e.incidents_count || 0
            }))
          this.setData({
            trackName: TRACK_MAP[d.track_name] || d.track_name,
            sessionLabel: d.session_type === 'RACE' ? '正赛' : '排位',
            sessionClass: d.session_type === 'RACE' ? 'tag--race' : 'tag--quali',
            raceDate: this.formatDate(d.date),
            entrantsCount: d.entrants ? d.entrants.length : 0,
            entrants
          })
        }
      },
      complete: () => {
        summaryDone = true
        tryFinish()
      }
    })

    wx.request({
      url: `${BASE_URL}/events/race/${raceId}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const events = res.data.map(e => ({
            event_id: e.event_id,
            event_type: e.event_type,
            event_label: EVENT_TYPE_MAP[e.event_type] || e.event_type,
            driver_name: (e.extra_data && e.extra_data.Driver && e.extra_data.Driver.Name) || e.driver_name || '--',
            other_driver_name: (e.extra_data && e.extra_data.OtherDriver && e.extra_data.OtherDriver.Name) || '--',
            impact_speed: e.impact_speed ? e.impact_speed.toFixed(1) : '--',
            created_at: this.formatTime(e.created_at)
          }))

          // 按车手分组
          const groupMap = {}
          events.forEach(e => {
            const name = e.driver_name
            if (!groupMap[name]) {
              groupMap[name] = { driver_name: name, events: [], collisionEnv: 0, collisionCar: 0, cutTrack: 0, other: 0 }
            }
            groupMap[name].events.push(e)
            if (e.event_type === 'COLLISION_WITH_ENV') groupMap[name].collisionEnv++
            else if (e.event_type === 'COLLISION_WITH_CAR') groupMap[name].collisionCar++
            else if (e.event_type === 'CUT_TRACK') groupMap[name].cutTrack++
            else groupMap[name].other++
          })
          const eventGrouped = Object.values(groupMap).sort((a, b) => b.events.length - a.events.length)

          // 统计
          let collisionEnv = 0, collisionCar = 0, cutTrack = 0
          res.data.forEach(e => {
            if (e.event_type === 'COLLISION_WITH_ENV') collisionEnv++
            else if (e.event_type === 'COLLISION_WITH_CAR') collisionCar++
            else if (e.event_type === 'CUT_TRACK') cutTrack++
          })
          this.setData({
            events,
            eventGrouped,
            eventStats: {
              collisionEnv,
              collisionCar,
              cutTrack,
              totalIncidents: collisionEnv + collisionCar
            }
          })
        }
      },
      complete: () => {
        eventsDone = true
        tryFinish()
      }
    })

    // 请求单圈成绩
    wx.request({
      url: `${BASE_URL}/races/races/${raceId}/laps`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const lapData = res.data
            .sort((a, b) => a.final_position - b.final_position)
            .map(d => {
              const laps = (d.laps || []).map(lap => ({
                lap_number: lap.lap_number,
                lap_time_fmt: this.formatLapTime(lap.lap_time_ms),
                sector1_fmt: this.formatSectorTime(lap.sector1_ms),
                sector2_fmt: this.formatSectorTime(lap.sector2_ms),
                sector3_fmt: this.formatSectorTime(lap.sector3_ms),
                cuts: lap.cuts || 0,
                is_valid: lap.is_valid,
                tyre_type: lap.tyre_type || ''
              }))
              // 找最快有效圈
              let bestLapIdx = -1
              let bestLapMs = Infinity
              laps.forEach((l, i) => {
                const rawLap = (d.laps || [])[i]
                if (rawLap && rawLap.is_valid && rawLap.lap_time_ms < bestLapMs) {
                  bestLapMs = rawLap.lap_time_ms
                  bestLapIdx = i
                }
              })
              return {
                driver_id: d.driver_id,
                driver_name: d.driver_name,
                car_model: CAR_DISPLAY_MAP[d.car_model] || this.fmtCarName(d.car_model),
                final_position: d.final_position,
                laps_completed: d.laps_completed,
                total_time_fmt: this.formatTotalTime(d.total_time_ms),
                laps,
                bestLapIdx
              }
            })
          this.setData({ lapData })
        }
      },
      complete: () => {
        lapsDone = true
        tryFinish()
      }
    })
  },

  /** 格式化日期 */
  formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr.replace(' ', 'T'))
    return `${d.getMonth() + 1}月${d.getDate()}日`
  },

  /** 格式化时间戳 */
  formatTime(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr.replace(' ', 'T'))
    const h = d.getHours().toString().padStart(2, '0')
    const m = d.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
  },

  /** 毫秒 → m:ss.sss */
  formatLapTime(ms) {
    if (ms == null || ms <= 0) return '--'
    const totalSec = ms / 1000
    const min = Math.floor(totalSec / 60)
    const sec = (totalSec % 60).toFixed(3)
    return min + ':' + (sec < 10 ? '0' : '') + sec
  },

  /** ms → m:ss 或 h:mm:ss */
  formatTotalTime(ms) {
    if (!ms || ms <= 0) return '--'
    const totalSec = Math.floor(ms / 1000)
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m}:${s.toString().padStart(2, '0')}`
  },

  /** ms → s.sss（赛段时间） */
  formatSectorTime(ms) {
    if (ms == null || ms <= 0) return '--'
    return (ms / 1000).toFixed(3)
  },

  /** 车型名格式化 */
  fmtCarName(raw) {
    if (!raw) return '--'
    return raw
      .replace(/^ks_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  },

  /** 展开/收起车手单圈详情 */
  toggleDriverLaps(e) {
    const idx = e.currentTarget.dataset.index
    this.setData({
      expandedDriver: this.data.expandedDriver === idx ? -1 : idx
    })
  },

  /** 展开/收起车手事件详情 */
  toggleEventDriver(e) {
    const idx = e.currentTarget.dataset.index
    this.setData({
      expandedEventDriver: this.data.expandedEventDriver === idx ? -1 : idx
    })
  }
})