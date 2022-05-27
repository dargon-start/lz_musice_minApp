import {HYEventStore} from 'hy-event-store';
import {getRecommendList} from '../service/audio_api'
const  recommnedStore = new HYEventStore({
  state:{
    recList:[]
  },
  actions:{
    getRecommend(ctx){
      getRecommendList().then((res)=>{
        ctx.recList = res.playlists;
      })
    }
  }
})
export {
  recommnedStore
}