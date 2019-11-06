const app = getApp();



Component({
  properties: {
    bg_opacity:{
      type: Number,
      value: 0
    },
    color: {
      type: String,
      value: "#ffffff"
    },
    icon_type: {
      type: String,
      value: "#back"
    },
    back: { // 是否显示后退按钮            
      type: String,
      value: "true"
    },
    title_height: { //             
      type: String,
      value: app.config.title_height,
    },
    titleIcon_height: {
      type: String,
      value: app.config.titleIcon_height,
    },
    titleIcon_width: {
      type: String,
      value: app.config.titleIcon_width,
    },
    statusbarHeight: {
      type: String,
      value: app.config.statusbarHeight,
    },
    title_top: {
      type: String,
      value: app.config.title_top,
    },
  },
  methods: {
    _goBack: function () {
      wx.navigateBack({
        delta: 1
      });
    },
    _goHome: function () {
      wx.switchTab({
        url: "/pages/index/index"
      });
    }
  },

})