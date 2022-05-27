class lzReques{
  base_url = 'https://netease-cloud-music-api-9pdbb7xzh-dargon-start.vercel.app'
  request(url,method,params){
    return new Promise((reslove,reject)=>{
      wx.request({
        url:this.base_url+url,
        method:method,
        data:params,
        success(res){
          reslove(res.data);
        },
        fail:function(err){
          reject(err);
          console.log(err);
        }
      })
    }) 
  }
  get(url,params){
    return this.request(url,'GET',params);
  }
  post(url,params){
    return this.request(url,'POST',params);
  }
}

export default new lzReques();