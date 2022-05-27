import {HYEventStore} from 'hy-event-store';
import {getBangList} from '../service/audio_api'
const newSongStore = new HYEventStore({
  state:{
    songsList:[]
  },
  actions:{
    getSongsList(ctx){
      let req = [];
      //华语，欧美，日本，韩国
      const type = [7,96,8,16];
      for(let t of type){
        req.push(getBangList(t));
      }
      //等待所有的结果都返回后，赋值给songsList
      Promise.all(req).then(resAll=>{
        let songType = ['华语','欧美','日本','韩国'];
        let list = [];
        for(let i in resAll){
          list.push({
            sType:songType[i],
            sList:resAll[i].data
          });
        }
        ctx.songsList = list;
      })

      
    }
  }
})
export {
  newSongStore
}