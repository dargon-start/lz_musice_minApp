// pages/home-music/index.js
import {recommnedStore,newSongStore} from '../../store/index'

import {getAudioBanner,getBangList} from '../../service/audio_api';
import {selectorQuery} from '../../utils/query';
import {throttle} from '../../utils/throttle';
const throttleQuery = throttle(selectorQuery);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:0,
    banners:[],
    recommnedList:[],
    hotList:[],
    newSongs:[]
  },

  // 搜索框点击函数
  onClickInput:function() {
    wx.navigateTo({
      url: '/pages/home-search/index',
    })
  },
  //图片加载完成后
  imgLoaded:function(e) {
    throttleQuery('.swiper_image').then(res=>{
      this.setData({swiperHeight:res[0].height})
    })
  },
  //跳转到歌单页面
  toPlaylistPage:function(event) {
    console.log(event.currentTarget.dataset.id);
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/playList-detail/index?id=${id}`,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad:async function(options) {

    //获取轮播图数据
    const resbanner = await getAudioBanner();
    this.setData({banners:resbanner.banners})
    
    //获取共享数据
    //推荐歌单
    recommnedStore.dispatch('getRecommend');

    //监听数据变化
    recommnedStore.onState("recList", (value) => {
       if(value.length){
        const list = value.slice(0,6);
        const songList = value.slice(10,16);
        this.setData({recommnedList:list,hotList:songList});
       }
    })
    //新歌速递
    newSongStore.onState('songsList',(value)=>{
      if(value.length){
        let showList = [];
        for(let i in value){
          showList.push({
            sType:value[i].sType,
            sList:value[i].sList.slice(0,6)
          });
        }
        this.setData({newSongs:showList});
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})