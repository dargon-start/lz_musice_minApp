import lzrequest from './index'
//轮播图
export function getAudioBanner() {
  return lzrequest.get('/banner?type=2');
}
//推荐列表
export function getRecommendList() {
  return lzrequest.get('/top/playlist');
}
//新歌速递
export function  getBangList (type) {
  return lzrequest.get(`/top/song?type=${type}`);
}

//获取歌单详情
export function  getplayListDetail (id) {
  return lzrequest.get(`/playlist/detail?id=${id}`)
}