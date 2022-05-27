import lzRequest from './index';
export function getSongInfo(id) {
  return lzRequest.get(`/song/detail?ids=${id}`);
}
//获取歌词
export function  getSongLyric(id) {
    return lzRequest.get(`/lyric?id=${id}`);
}