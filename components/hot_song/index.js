// components/hot_song/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotList:{
      type:Object,
      value:[1,2,3]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPlayListPage(event){
      console.log(event);
      const id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/playList-detail/index?id=${id}`,
      })
    }
  }
})
