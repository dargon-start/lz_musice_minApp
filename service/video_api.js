import lzRequest from './index';
export function getVideo(offset,limit=10){
  return  lzRequest.get('/top/mv',{
    offset,
    limit
  })
}
/**
 * @param {number} vId mv的id
 */
//获取mv详情
export function  getVideoDetail (vId) {
  return lzRequest.get(`/mv/detail?mvid=${vId}`);
}
/**
 * @param {number} vId mv的id
 */
//获取mv播放地址
export function  getVideoPath(vId) {
  return lzRequest.get(`/mv/url?id=${vId}`);
}
/**
 * @param {number} vId mv的id
 */
//获取相关视频
export function getRelatedVido(vId) {
  return lzRequest.get(`/related/allvideo?id=${vId}`);
}