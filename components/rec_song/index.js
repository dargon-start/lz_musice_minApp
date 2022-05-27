// components/rec_song/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songlist:{
      type:Array,
      value:[]
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
    toPlaylistPage(event){
      console.log(event);
      const type = event.currentTarget.dataset.type;
      wx.navigateTo({
        url: `/pages/playList-detail/index?type=${type}`,
      })
    },
    toPlayPage(e){
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/song-play/index?id=${id}`,
      })
    }
  }
})
