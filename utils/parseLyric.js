function  parseLyric(rawLyric) {
  const lyrics = rawLyric.split('\n');
  //匹配时间
  let timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  let lyricList = [];
  for (let i = 0; i < lyrics.length; i++) {
    let time = timeRegex.exec(lyrics[i]);
    if(!time) continue;//如果没有匹配到，直接跳过
    //获取到时间
    const minutes = time[1] *60 *1000;
    const second = time[2] *1000;
    const milliseconed = time[3].length === 3 ? time[3] *1 : time[3] * 10;
    const resultTime = minutes + second + milliseconed;
    //获取到歌词
    const text = lyrics[i].replace(timeRegex,'');
    lyricList.push({'time':resultTime,'text':text})
  }
  return lyricList;
}
export {
  parseLyric
}