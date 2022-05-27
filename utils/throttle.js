export function throttle(
  fn,
  interval=1000,
  options = {
    leading: true,
    trailing: false,
  },
) {
  let timer = null;
  //leading第一次是否触发，trailing最后一次是否触发
  const {leading, trailing} = options;
  let lastTime = 0;
  const _throttel = function (...args) {
    return new Promise((resolve,reject)=>{
          //在一段时间内最后一次触发的时间
        let nowTime = new Date().getTime();
        //如果leading=true 并且 lastTime = 0时，使第一次不触发
        if (!leading && !lastTime) lastTime = nowTime;
        //需要等待多少时间执行
        let remainTime = interval - (nowTime - lastTime);

        if (remainTime <= 0) {
          clearTimeout(timer);
          const result = fn.apply(this, args);
          resolve(result);
          lastTime = nowTime;
        } else {
          //最后一次执行
          if (trailing) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              const result = fn.apply(this, args);
              resolve(result);
              lastTime = new Date().getTime();
              timer = null;
            }, remainTime);
          }
        }
    })
  };

  _throttel.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };
  return _throttel;
}
