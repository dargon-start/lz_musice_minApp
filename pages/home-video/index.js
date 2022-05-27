// pages/home-video/index.js
import {getVideo} from '../../service/video_api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[],
    hasMore:true
  },


 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getTopData(0);
  },
   //获取数据
   getTopData:async function (offset) {
    // 判断是否可以请求
    if (!this.data.hasMore) return
    // 展示加载动画
    wx.showNavigationBarLoading()

    // 真正请求数据
    
    const res = await getVideo(offset)
    let newData = this.data.videoList
    if (offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }

    // 设置数据
    this.setData({ videoList: newData })
    this.setData({ hasMore: res.hasMore })
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
 },
  handleVideoItemClick:function (event) {
     // 获取id
     const id = event.currentTarget.dataset.item.id;
     // 页面跳转
     wx.navigateTo({
       url: `/pages/detail-video/index?id=${id}`,
     })
  },
  onPullDownRefresh:function(){
    this.setData({hasMore:true});
    this.getTopData(0);
  },
  onReachBottom:function (params) {
    console.log('fewa');
    this.getTopData(this.data.videoList.length);
  }
  
})