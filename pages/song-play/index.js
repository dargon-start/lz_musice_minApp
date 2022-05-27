// pages/song-play/index.js
import {getSongInfo,getSongLyric} from '../../service/songPlay_api'
import {audioCtx} from '../../store/index'
import {parseLyric } from '../../utils/parseLyric'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songInfo:{},
    currentPage:0,
    currentTime:0,
    durationTime:0,
    sliderValue:0,

    currentLyric:'',
    issliderChanging:false,
    lyric:[],
    isPause:false
  },
// ============ 自定义函数 ============================start
  changePage:function (e) {
     this.setData({currentPage:e.detail.current})
  },
  
  //拉完进度条后
  handleSliderChange(e){
    const value = e.detail.value;
    const currentTime =  this.data.durationTime * value / 100;
    //暂停音乐，跳到点击的位置
    if(this.data.isPause){
      audioCtx.play();
    }
    audioCtx.seek(currentTime / 1000);
    this.setData({sliderValue:value,issliderChanging:false,isPause:false});
  },
  //拉进度条
  handleSliderChanging(e){
    const value = e.detail.value;
    const currentTime = value / 100 * this.data.durationTime;
    //改变进度条和时间值
    this.setData({sliderValue:value,currentTime,issliderChanging:true})
  },
  //暂停播放事件
  onPause(e){
    if(this.data.isPause){
      audioCtx.play();
      this.setData({isPause:false});
    }else{
      audioCtx.pause();
      this.setData({isPause:true});
    }
// ============ 自定义函数 ============================end
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    //获取歌曲信息
    getSongInfo(id).then(res=>{
      if(res.code==200){
       const durationTime = res.songs[0].dt;
        this.setData({songInfo:res.songs[0],durationTime});
      }
    })
    //获取歌词信息
    getSongLyric(id).then(res=>{
      if(res.code ==200){
        //处理歌词
        const lyric = parseLyric(res.lrc.lyric);
        this.setData({lyric});
      }
    })

    //创建audioContext
    audioCtx.stop();//停止上一首歌
    audioCtx.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    audioCtx.autoplay=true;
    audioCtx.onCanplay(()=>{
      audioCtx.play();
    })
    //监听歌曲播放时间变化
    audioCtx.onTimeUpdate(()=>{
      const currentTime = audioCtx.currentTime * 1000; //毫秒
      //在拉动进度条时，歌曲正常播放，但是不改变进度条和当前时间值
      if(!this.data.issliderChanging){
        const sliderValue = currentTime /this.data.durationTime * 100 ;
        //设置进度变化和播放时间变化
        this.setData({sliderValue,currentTime});
      }
      //处理歌词
      for (let i = 0; i < this.data.lyric.length; i++) {
        if(currentTime < this.data.lyric[i].time){
           //只有当歌词变化时才赋新的歌词
          if(this.data.currentLyric !== this.data.lyric[i-1].text) {
            this.setData({currentLyric:this.data.lyric[i-1].text});
          }
          break;
        }
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