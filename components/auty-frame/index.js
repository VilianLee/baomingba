// components/auty-frame/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    autyShow:{
      type: Boolean,
      value: false
    },
    autyContent:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _hideFrame(){
      this.triggerEvent('hideauty', {}, {})
    },
  }
})
