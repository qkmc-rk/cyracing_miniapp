const app = getApp()
const BASE_URL = app.globalData.baseUrl

Page({
  data: {
    modFiles: [],
    loading: true
  },

  onLoad() {
    this.fetchModList()
  },

  onShow() {
    this.fetchModList()
  },

  /** 获取 Mod 文件列表（从服务器 API 拉取，若无 API 则使用硬编码列表） */
  fetchModList() {
    this.setData({ loading: true })

    wx.request({
      url: `${BASE_URL}/api/mods`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const modFiles = res.data.map(item => ({
            name: item.name,
            size: item.size || '',
            url: BASE_URL + item.url
          }))
          this.setData({ modFiles, loading: false })
        } else {
          // API 不可用时，使用硬编码列表
          this.useDefaultList()
        }
      },
      fail: () => {
        // 网络请求失败，使用硬编码列表
        this.useDefaultList()
      }
    })
  },

  /** 硬编码默认文件列表（可直接修改这个数组添加文件） */
  useDefaultList() {
    const modFiles = [
      // { name: 'ExampleMod.zip', size: '12.5 MB' },
      // 在此添加你的 Mod 文件，例如：
      // { name: 'car_mod_1.zip', size: '52.3 MB' },
      // { name: 'track_mod_1.zip', size: '128.7 MB' },
    ]
    this.setData({ modFiles, loading: false })
  },

  /** 格式化文件大小 */
  formatSize(bytes) {
    if (!bytes || bytes === 0) return ''
    const units = ['B', 'KB', 'MB', 'GB']
    let i = 0
    let size = bytes
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024
      i++
    }
    return size.toFixed(1) + ' ' + units[i]
  },

  /** 点击复制下载链接 */
  onDownloadTap(e) {
    const { name, url } = e.currentTarget.dataset
    const serverUrl = url || `${BASE_URL}/static/mod/${name}`

    wx.setClipboardData({
      data: serverUrl,
      success: () => {
        wx.showModal({
          title: '链接已复制',
          content: `下载链接已复制到剪贴板：\n\n${serverUrl}\n\n请在 PC 浏览器中打开此链接进行下载`,
          confirmText: '知道了',
          showCancel: false
        })
      },
      fail: () => {
        wx.showToast({
          title: '复制失败，请重试',
          icon: 'none'
        })
      }
    })
  }
})
