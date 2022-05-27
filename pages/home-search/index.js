// pages/home-search/index.js
import {getSearchHot,getSearchSuggest,getSearchResult} from '../../service/search_api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    hotList:[],
    suggestList:[],
    searchResult:[]
  },
  //获取搜索建议
  getSuggest:function (e) {
    this.setData({keyword:e.detail});
    this.setData({suggestList:[],searchResult:[]});
    if(this.data.keyword){
      getSearchSuggest(e.detail).then(res=>{
        if(res.code==200){
          //活接搜索建议后，查看关键字是否为空,只有
          if(this.data.keyword){
            this.setData({suggestList:res.result.allMatch});
          }
        }
      })
    }
  },
  //获取搜索结果
  getResult:function (e) {
    console.log(e);
    const keyword = e.currentTarget.dataset.key || e.detail;
    getSearchResult(keyword).then(res=>{
      if(res.code==200){
        const list = [];
        for(let track of res.result.songs){
          let song = {};
          song.al = track.album;
          song.name = track.name;
          song.ar = track.artists;
          song.id = track.id;
          list.push(song);
        }
        this.setData({searchResult:list})
      }
    })
  },
  //获取焦点，清楚数据
  clearInfo(){
    this.setData({suggestList:[],searchResult:[]});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //热门搜索
    getSearchHot().then(res=>{
      if(res.code==200){
        this.setData({hotList:res.result.hots});
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