// components/nav_tab/index.js
const globalData = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:globalData.statusBarHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pageBack:function (params) {
      console.log('bacl');
      wx.navigateBack();
  }
  },
  lifetimes:{
    attached:function (params) {
     
    }
  },
  
  
})
