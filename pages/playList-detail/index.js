// pages/playList-detail/index.js
import {getplayListDetail} from '../../service/audio_api.js'
import {newSongStore} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList:{},
    tracks:[],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //歌单逻辑
    if(options.id){
      const id = options.id;
      //请求歌单数据
      getplayListDetail(id).then(res=>{
        console.log(res);
        //作者信息
        const playList = res.playlist;
        //获取歌单列表
        const tracks = res.playlist.tracks;
        this.setData({playList:playList,tracks:tracks});
      });
    }
    
    //新歌列表，根据type从store中获取数据
    if(options.type){
      const type = options.type;
      this.setData({type:type})
      //获取歌曲列表
      newSongStore.onState('songsList', (value)=> {
        console.log(value);
        if(value){
          for(let item of value){
            if(item.sType === type){
              const list = [];
              for(let track of item.sList){
                let song = {};
                song.al = track.album;
                song.name = track.name;
                song.ar = track.artists;
                song.id = track.id;
                list.push(song);
              }
              this.setData({tracks:list});
            }
          }
        }
      })
    }

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