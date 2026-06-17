const BASE_URL = getApp().globalData.baseUrl

// 赛道名映射
const TRACK_MAP = {
  'spa': 'Spa-Francorchamps',
  'monza': 'Monza',
  'silverstone': 'Silverstone',
  'nurburgring': 'Nürburgring GP',
  'red_bull_ring': 'Red Bull Ring',
  'ac_drift_park': 'AC Drift Park',
  'acf_shanghainfs': 'Shanghai NFS',
  'china_2021_fab': 'China FAB 2021',
  'china_2022': 'China 2022',
  'dm_redline_bay_drift_park': 'Redline Bay Drift Park',
  'dream_circuit_v0.9': 'Dream Circuit',
  'drift': 'Drift',
  'drift_prac': 'Drift Practice',
  'driftplayground': 'Drift Playground',
  'edn_brasiliaautodromo_2026': 'Brasilia Autodromo',
  'esda_mamini': 'Mamini',
  'goldenport2010': 'Goldenport 2010',
  'hako': 'Hako',
  'happogahara_full': 'Happogahara Full',
  'hipole_sdky_sh_kart_track': 'Hipole Shanghai Kart Track',
  'imola': 'Imola',
  'jy_stc': 'JY STC',
  'ks_barcelona': 'Barcelona',
  'ks_black_cat_county': 'Black Cat County',
  'ks_brands_hatch': 'Brands Hatch',
  'ks_drag': 'Drag Strip',
  'ks_highlands': 'Highlands',
  'ks_laguna_seca': 'Laguna Seca',
  'ks_monza66': 'Monza 66',
  'ks_nordschleife': 'Nordschleife',
  'ks_nurburgring': 'Nürburgring',
  'ks_red_bull_ring': 'Red Bull Ring (KS)',
  'ks_silverstone': 'Silverstone (KS)',
  'ks_silverstone1967': 'Silverstone 1967',
  'ks_vallelunga': 'Vallelunga',
  'ks_zandvoort': 'Zandvoort',
  'magione': 'Magione',
  'mugello': 'Mugello',
  'nevadadrift': 'Nevada Drift',
  'pc_keizer': 'Keizer',
  'pc_wantrack': 'WanTrack',
  'rally_kenya_circle': 'Rally Kenya Circle',
  'rmi_dirt3_finlandtrail': 'Dirt3 Finland Trail',
  'rt_macau': 'Macau GP',
  'rt_suzuka': 'Suzuka',
  'skidpad05': 'Skidpad 05',
  'st_hongkong': 'Hong Kong Street',
  'st_kartgold': 'Kart Gold',
  'tcs_omuro': 'Omuro',
  'trento-bondone': 'Trento-Bondone',
  'xgs_qy_kart': 'QY Kart',
  'yongcheng': 'Yongcheng',
  'zs_goldcsk': 'Gold CSK'
}

// 车型名简化映射
const CAR_DISPLAY_MAP = {
  // 原有
  'ks_ferrari_488_gt3': 'Ferrari 488 GT3',
  'ks_nissan_gtr_gt3': 'Nissan GTR GT3',
  'mclaren_mp412c_gt3': 'McLaren MP4-12C GT3',
  'ks_mclaren_650_gt3': 'McLaren 650S GT3',
  'bmw_z4_gt3': 'BMW Z4 GT3',
  'ks_mercedes_amg_gt3': 'Mercedes AMG GT3',
  'ks_porsche_911_gt3_cup_2017': 'Porsche 911 GT3 Cup',
  'ks_porsche_911_gt3_r_2016': 'Porsche 911 GT3 R',
  'ks_lamborghini_huracan_gt3': 'Lambo Huracan GT3',
  'ks_audi_r8_lms_2016': 'Audi R8 LMS',
  // Abarth
  'abarth500': 'Abarth 500',
  'abarth500_s1': 'Abarth 500 S1',
  'actk_abarth_124_2016': 'Abarth 124 Spider 2016',
  'ks_abarth_595ss': 'Abarth 595 SS',
  'ks_abarth_595ss_s1': 'Abarth 595 SS S1',
  'ks_abarth500_assetto_corse': 'Abarth 500 Assetto Corse',
  // Alfa Romeo
  'alfa_romeo_giulietta_qv': 'Alfa Romeo Giulietta QV',
  'alfa_romeo_giulietta_qv_le': 'Alfa Romeo Giulietta QV LE',
  'ks_alfa_33_stradale': 'Alfa Romeo 33 Stradale',
  'ks_alfa_giulia_qv': 'Alfa Romeo Giulia QV',
  'ks_alfa_mito_qv': 'Alfa Romeo MiTo QV',
  'ks_alfa_romeo_4c': 'Alfa Romeo 4C',
  'ks_alfa_romeo_155_v6': 'Alfa Romeo 155 V6 Ti',
  'ks_alfa_romeo_gta': 'Alfa Romeo GTA',
  // Audi
  'ks_audi_a1s1': 'Audi A1 S1',
  'ks_audi_r8_lms': 'Audi R8 LMS (UFG)',
  'ks_audi_r8_plus': 'Audi R8 Plus',
  'ks_audi_r18_etron_quattro': 'Audi R18 e-tron quattro',
  'ks_audi_sport_quattro': 'Audi Sport Quattro',
  'ks_audi_sport_quattro_rally': 'Audi Sport Quattro Rally',
  'ks_audi_sport_quattro_s1': 'Audi Sport Quattro S1',
  'ks_audi_tt_cup': 'Audi TT Cup',
  'ks_audi_tt_vln': 'Audi TT VLN',
  // BMW
  'bmw_1m': 'BMW 1M',
  'bmw_1m_s3': 'BMW 1M S3',
  'bmw_m3_e30': 'BMW M3 E30',
  'bmw_m3_e30_drift': 'BMW M3 E30 Drift',
  'bmw_m3_e30_dtm': 'BMW M3 E30 DTM',
  'bmw_m3_e30_gra': 'BMW M3 E30 Gr.A',
  'bmw_m3_e30_s1': 'BMW M3 E30 S1',
  'bmw_m3_e92': 'BMW M3 E92',
  'bmw_m3_e92_drift': 'BMW M3 E92 Drift',
  'bmw_m3_e92_s1': 'BMW M3 E92 S1',
  'bmw_m3_gt2': 'BMW M3 GT2',
  'bmw_z4': 'BMW Z4 sDrive35is',
  'bmw_z4_drift': 'BMW Z4 Drift',
  'bmw_z4_s1': 'BMW Z4 S1',
  'ks_bmw_m4': 'BMW M4 F82',
  'ks_bmw_m4_akrapovic': 'BMW M4 Akrapovic',
  'ks_bmw_m235i_racing': 'BMW M235i Racing',
  // Corvette
  'ks_corvette_c7_stingray': 'Corvette C7 Stingray',
  'ks_corvette_c7r': 'Corvette C7.R',
  // Drift
  'drifttime_s14_send_it': 'Drift Time S14',
  'dtd_nissan_gts_r32': 'Nissan Skyline GTS R32',
  'dtp_nissan_s13_missile_streeter': 'Nissan S13 Missile Streeter',
  // Ferrari
  'f1_2021_mercedes': 'Mercedes F1 W12',
  'faz_mercedes_s500': 'Mercedes-Benz S500',
  'ferrari_312t': 'Ferrari 312T',
  'ferrari_458': 'Ferrari 458 Italia',
  'ferrari_458_gt2': 'Ferrari 458 GT2',
  'ferrari_458_s3': 'Ferrari 458 S3',
  'ferrari_599xxevo': 'Ferrari 599XX Evo',
  'ferrari_f40': 'Ferrari F40',
  'ferrari_f40_s3': 'Ferrari F40 S3',
  'ferrari_laferrari': 'Ferrari LaFerrari',
  'idm_cross_gazoo_suv': 'Toyota Cross Gazoo Racing SUV',
  'ks_ferrari_250gto': 'Ferrari 250 GTO',
  'ks_ferrari_288gto': 'Ferrari 288 GTO',
  'ks_ferrari_312_67': 'Ferrari 312/67',
  'ks_ferrari_330_p4': 'Ferrari 330 P4',
  'ks_ferrari_488_challenge_evo': 'Ferrari 488 Challenge Evo',
  'ks_ferrari_488gt3_2020': 'Ferrari 488 GT3 Evo',
  'ks_ferrari_488_gtb': 'Ferrari 488 GTB',
  'ks_ferrari_812_superfast': 'Ferrari 812 Superfast',
  'ks_ferrari_f138h': 'Ferrari F138',
  'ks_ferrari_f2004': 'Ferrari F2004',
  'ks_ferrari_fxx_k': 'Ferrari FXX K',
  'ks_ferrari_sf15t': 'Ferrari SF15-T',
  'ks_ferrari_sf70h': 'Ferrari SF70H',
  // Ford
  'ks_ford_escort_mk1': 'Ford Escort Mk1 RS1600',
  'ks_ford_gt40': 'Ford GT40',
  'ks_ford_mustang_2015': 'Ford Mustang 2015',
  // Glickenhaus
  'ks_glickenhaus_scg003': 'Glickenhaus SCG 003',
  // Lamborghini
  'ks_lamborghini_aventador_sv': 'Lamborghini Aventador SV',
  'ks_lamborghini_countach': 'Lamborghini Countach',
  'ks_lamborghini_countach_s1': 'Lamborghini Countach S1',
  'ks_lamborghini_gallardo_sl': 'Lamborghini Gallardo SL',
  'ks_lamborghini_gallardo_sl_s3': 'Lamborghini Gallardo SL S3',
  'ks_lamborghini_huracan_st': 'Lamborghini Huracan ST',
  'ks_lamborghini_huracan_performante': 'Lambo Huracan Performante',
  'ks_lamborghini_miura_sv': 'Lamborghini Miura SV',
  'ks_lamborghini_sesto_elemento': 'Lamborghini Sesto Elemento',
  // Lotus
  'ks_lotus_3_eleven': 'Lotus 3-Eleven',
  'ks_lotus_25': 'Lotus Type 25',
  'ks_lotus_72d': 'Lotus 72D',
  'lotus_2_eleven': 'Lotus 2-Eleven',
  'lotus_2_eleven_gt4': 'Lotus 2-Eleven GT4',
  'lotus_49': 'Lotus 49',
  'lotus_98t': 'Lotus 98T',
  'lotus_elise_sc': 'Lotus Elise SC',
  'lotus_elise_sc_s1': 'Lotus Elise SC S1',
  'lotus_elise_sc_s2': 'Lotus Elise SC S2',
  'lotus_evora_gtc': 'Lotus Evora GTC',
  'lotus_evora_gte': 'Lotus Evora GTE',
  'lotus_evora_gte_carbon': 'Lotus Evora GTE Carbon',
  'lotus_evora_gx': 'Lotus Evora GX',
  'lotus_evora_s': 'Lotus Evora S',
  'lotus_evora_s_s2': 'Lotus Evora S S2',
  'lotus_exige_240': 'Lotus Exige 240',
  'lotus_exige_240_s3': 'Lotus Exige 240 S3',
  'lotus_exige_s': 'Lotus Exige S',
  'lotus_exige_s_roadster': 'Lotus Exige S Roadster',
  'lotus_exige_scura': 'Lotus Exige Scura',
  'lotus_exige_v6_cup': 'Lotus Exige V6 Cup',
  'lotus_exos_125': 'Lotus Exos T125',
  'lotus_exos_125_s1': 'Lotus Exos T125 S1',
  // Maserati
  'ks_maserati_250f_6cyl': 'Maserati 250F (L6)',
  'ks_maserati_250f_12cyl': 'Maserati 250F (V12)',
  'ks_maserati_alfieri': 'Maserati Alfieri',
  'ks_maserati_gt_mc_gt4': 'Maserati MC GT4',
  'ks_maserati_levante': 'Maserati Levante',
  'ks_maserati_mc12_gt1': 'Maserati MC12 GT1',
  'ks_maserati_quattroporte': 'Maserati Quattroporte',
  // Mazda
  'ks_mazda_787b': 'Mazda 787B',
  'ks_mazda_mx5_cup': 'Mazda MX-5 Cup',
  'ks_mazda_miata': 'Mazda Miata',
  'ks_mazda_mx5_nd': 'Mazda MX-5 ND',
  'ks_mazda_rx7_spirit_r': 'Mazda RX-7 Spirit R',
  'ks_mazda_rx7_tuned': 'Mazda RX-7 Tuned',
  // McLaren
  'ks_mclaren_570s': 'McLaren 570S',
  'ks_mclaren_f1_gtr': 'McLaren F1 GTR',
  'ks_mclaren_p1': 'McLaren P1',
  'ks_mercedes_190_evo2': 'Mercedes 190E Evo II',
  'ks_mercedes_c9': 'Sauber Mercedes C9',
  'mclaren_mp412c': 'McLaren MP4-12C',
  // Mercedes
  'mercedes_sls': 'Mercedes SLS AMG',
  'mercedes_sls_gt3': 'Mercedes SLS AMG GT3',
  // Nissan
  'ks_nissan_370z': 'Nissan 370Z',
  'ks_nissan_gtr': 'Nissan GT-R',
  'ks_nissan_skyline_r34': 'Nissan Skyline R34',
  // Pagani
  'ks_pagani_huayra_bc': 'Pagani Huayra BC',
  'pagani_huayra': 'Pagani Huayra',
  'pagani_zonda_r': 'Pagani Zonda R',
  // Porsche
  'ks_porsche_718_boxster_s': 'Porsche 718 Boxster S',
  'ks_porsche_718_boxster_s_pdk': 'Porsche 718 Boxster S PDK',
  'ks_porsche_718_cayman_s': 'Porsche 718 Cayman S',
  'ks_porsche_718_spyder_rs': 'Porsche 718 Spyder RS',
  'ks_porsche_908_lh': 'Porsche 908 LH',
  'ks_porsche_911_carrera_rsr': 'Porsche 911 Carrera RSR',
  'ks_porsche_911_rsr_2017': 'Porsche 911 RSR 2017',
  'ks_porsche_917_30': 'Porsche 917/30',
  'ks_porsche_917_k': 'Porsche 917K',
  'ks_porsche_918_spyder': 'Porsche 918 Spyder',
  'ks_porsche_919_hybrid_2013': 'Porsche 919 Hybrid 2013',
  'ks_porsche_919_hybrid_2016': 'Porsche 919 Hybrid 2016',
  'ks_porsche_935_78_moby_dick': 'Porsche 935/78 Moby Dick',
  'ks_porsche_962c_longtail': 'Porsche 962C Longtail',
  'ks_porsche_962c_shorttail': 'Porsche 962C Shorttail',
  'ks_porsche_991_carrera_s': 'Porsche 991 Carrera S',
  'ks_porsche_991_turbo_s': 'Porsche 991 Turbo S',
  'ks_porsche_cayenne': 'Porsche Cayenne',
  'ks_porsche_cayman_gt4_clubsport': 'Porsche Cayman GT4 Clubsport',
  'ks_porsche_cayman_gt4_std': 'Porsche Cayman GT4',
  'ks_porsche_macan': 'Porsche Macan',
  'ks_porsche_panamera': 'Porsche Panamera Turbo',
  'ks_praga_r1': 'Praga R1',
  // RUF
  'ks_ruf_rt12r': 'RUF RT12R',
  'ks_ruf_rt12r_awd': 'RUF RT12R AWD',
  'ruf_yellowbird': 'RUF Yellowbird CTR',
  // Toyota
  'ks_toyota_ae86': 'Toyota AE86 Sprinter Trueno',
  'ks_toyota_ae86_drift': 'Toyota AE86 Drift',
  'ks_toyota_ae86_tuned': 'Toyota AE86 Tuned',
  'ks_toyota_celica_st185': 'Toyota Celica ST185',
  'ks_toyota_gt86': 'Toyota GT86',
  'ks_toyota_supra_mkiv': 'Toyota Supra MKIV',
  'ks_toyota_supra_mkiv_drift': 'Toyota Supra MKIV Drift',
  'ks_toyota_supra_mkiv_tuned': 'Toyota Supra MKIV Tuned',
  'ks_toyota_ts040': 'Toyota TS040 Hybrid',
  // Others
  'ktm_xbow_r': 'KTM X-Bow R',
  'legion_kart': 'Legion Kart',
  'legion_shifter_kart': 'Legion Shifter Kart',
  'p4-5_2011': 'Pininfarina P4/5',
  'shelby_cobra_427sc': 'Shelby Cobra 427SC',
  'subaru_wrx_2022': 'Subaru WRX 2022',
  'tesla_model_3': 'Tesla Model 3',
  'teslamodel3mpp': 'Tesla Model 3 MPP',
  'tatusfa1': 'Tatus FA1',
  'gokart270': 'GoKart 270'
}

Page({
  data: {
    activeTab: '0',

    // 圈速排名
    tracks: [],               // 可选赛道列表 [{key, name}]
    selectedTrackIdx: 0,
    selectedTrackKey: '',
    lapTimeRanks: [],         // 圈速排名数据
    loadingLapTime: false,

    // 积分排名
    pointsRanks: [],
    loadingPoints: true,

    // 平均积分
    averageRanks: [],
    loadingAverage: false
  },

  onLoad() {
    this.fetchTracksAndPoints()
  },

  /** 获取赛道列表 和 积分/平均积分数据 */
  fetchTracksAndPoints() {
    // 并行请求：赛道列表 + 积分数据
    wx.request({
      url: `${BASE_URL}/races/`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.buildTracks(res.data)
        }
      }
    })
    wx.request({
      url: `${BASE_URL}/driver_profiles/profiles?order_by=ladder_score`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.buildPointsRanks(res.data)
          this.buildAverageRanks(res.data)
        }
        this.setData({ loadingPoints: false })
      },
      fail: () => {
        this.setData({ loadingPoints: false })
      }
    })
  },

  /** 从赛事列表中提取唯一赛道 */
  buildTracks(races) {
    const seen = {}
    const tracks = []
    races.forEach(r => {
      if (r.track_name && !seen[r.track_name]) {
        seen[r.track_name] = true
        tracks.push({
          key: r.track_name,
          name: TRACK_MAP[r.track_name] || r.track_name
        })
      }
    })
    this.setData({
      tracks,
      selectedTrackKey: tracks.length ? tracks[0].key : ''
    })
    if (tracks.length) {
      this.fetchLapTimeRanks(tracks[0].key)
    }
  },

  /** Tab 切换 */
  switchTab(e) {
    const idx = e.currentTarget.dataset.index
    console.log('switchTab', idx)
    if (idx == null) return
    this.setData({ activeTab: idx })
  },

  // ===================== 圈速排名 =====================

  /** 赛道选择器点击 */
  onTrackSelectTap() {
    const { tracks, selectedTrackIdx } = this.data
    const names = tracks.map(t => t.name)
    wx.showActionSheet({
      itemList: names,
      success: (res) => {
        const idx = res.tapIndex
        const track = this.data.tracks[idx]
        if (!track) return
        this.setData({ selectedTrackIdx: idx, selectedTrackKey: track.key })
        this.fetchLapTimeRanks(track.key)
      }
    })
  },

  /** 获取某赛道的圈速排名 */
  fetchLapTimeRanks(trackKey) {
    this.setData({ loadingLapTime: true })
    wx.showLoading({ title: '加载中', mask: true })

    wx.request({
      url: `${BASE_URL}/races/summaries`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode !== 200 || !Array.isArray(res.data)) {
          this.setData({ lapTimeRanks: [], loadingLapTime: false })
          return
        }
        const driverBest = {}
        res.data
          .filter(r => r.track_name === trackKey && Array.isArray(r.entrants))
          .forEach(r => {
            r.entrants.forEach(ent => {
              if (ent.best_lap_ms == null || ent.best_lap_ms <= 0) return
              const did = ent.driver_id
              if (!driverBest[did] || ent.best_lap_ms < driverBest[did].best_lap_ms) {
                driverBest[did] = {
                  driver_id: did,
                  driver_name: ent.driver_name,
                  best_lap_ms: ent.best_lap_ms,
                  car_model: ent.car_model,
                  tyre_type: ent.tyre_type || ''
                }
              }
            })
          })
        const ranks = Object.values(driverBest)
          .sort((a, b) => a.best_lap_ms - b.best_lap_ms)
          .map((d, i) => ({
            rank: i + 1,
            driver_name: d.driver_name,
            car_model: CAR_DISPLAY_MAP[d.car_model] || this.fmtCarName(d.car_model),
            tyre_type: d.tyre_type,
            best_lap_fmt: this.formatLapTime(d.best_lap_ms)
          }))
        this.setData({ lapTimeRanks: ranks, loadingLapTime: false })
      },
      fail: () => {
        this.setData({ lapTimeRanks: [], loadingLapTime: false })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // ===================== 积分排名 =====================

  buildPointsRanks(profiles) {
    const ranks = profiles.map((p, i) => ({
      rank: i + 1,
      driver_name: p.driver_name,
      total_races: p.total_races || 0,
      ladder_score: p.ladder_score || 0
    }))
    this.setData({ pointsRanks: ranks })
  },

  // ===================== 平均积分 =====================

  buildAverageRanks(profiles) {
    const withAvg = profiles
      .filter(p => (p.total_races || 0) > 0)
      .map(p => ({
        driver_name: p.driver_name,
        total_races: p.total_races,
        ladder_score: p.ladder_score,
        avg_score: p.total_races > 0 ? p.ladder_score / p.total_races : 0
      }))
      .sort((a, b) => b.avg_score - a.avg_score)
      .map((d, i) => ({
        rank: i + 1,
        driver_name: d.driver_name,
        total_races: d.total_races,
        avg_score: d.avg_score.toFixed(1)
      }))
    this.setData({ averageRanks: withAvg, loadingAverage: false })
  },

  // ===================== 工具方法 =====================

  /** 毫秒 → m:ss.sss */
  formatLapTime(ms) {
    if (ms == null || ms === 0) return '--'
    const totalSec = ms / 1000
    const min = Math.floor(totalSec / 60)
    const sec = (totalSec % 60).toFixed(3)
    return min + ':' + (sec < 10 ? '0' : '') + sec
  },

  /** 车型名格式化（去掉 ks_ 前缀，替换下划线） */
  fmtCarName(raw) {
    if (!raw) return '--'
    return raw
      .replace(/^ks_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  }
})
