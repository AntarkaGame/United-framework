namespace AK {
  
  export type WK_Callback = (info?: any) => boolean | void;
  
  interface worker_constructor {
    duration? : number
    auto? : boolean
    action : WK_Callback
  }
  
  export class worker {
    
    public static instance : worker[] = [];
    public static default_start : boolean = true;
    
    private started : boolean = false;
    public duration : number;
    private tick : number;
    private callback : WK_Callback;
    private step : boolean = false;
    
    constructor(conf : worker_constructor) {
      this.tick = 0;
      this.started = conf.auto || worker.default_start;
      this.duration = conf.duration || 0;
      if(this.duration == 0) {
        this.step = true;
      }
      this.callback = conf.action;
    }
    
    public start() : void {
      this.started = true;
    }
    public resume = this.start; 
  
    public stop() : void {
      this.started = false;
    }
  
    public get() : number {
      return this.tick;
    }
  
    public kill() : void {
      worker.instance.splice(worker.instance.indexOf(this),1);
      delete this;
    }
  
    public static next(action: WK_Callback,tick?:number) : worker {
      const O : WK_Callback = (info) => {
        action(info);
        return true;
      }
      return this.add({action:O});
    }
  
    public static add(conf: worker_constructor) : worker {
      const wk : AK.worker = new worker(conf);
      this.instance.push(wk);
      return wk;
    }
    
    public static work() : void {
      this.instance.forEach((wk : AK.worker) => {
        const info : { tick : number , duration: number } = {
          tick : wk.tick,
          duration : wk.duration
        }
        if(wk.step) {
          if(wk.callback(info)) 
            wk.kill();
        }
        else {
          wk.callback(info);
          if(wk.tick == wk.duration) 
            wk.kill();
          wk.tick++;
        }
      });
    }
    
  }
  
}
