namespace AK {
  
  export type watcher_Callback = (newValue: string,oldValue: string) => void;
  
  interface watcher_constructor {
    watch : any
    action : watcher_Callback
  }
  
  export class watcher {
    
    public static instance : watcher[] = [];
    
    private saved : any;
    private origin : any;
    private action : watcher_Callback;
  
    constructor(toWatch:any,action: watcher_Callback) {
      this.origin = toWatch;
      this.saved = toWatch.valueOf();
      this.action = action;
      AK.watcher.instance.push(this);
    }
  
    public destroy() : void {
      worker.instance.splice(watcher.instance.indexOf(this),1);
      delete this;
    }
  
    public static add(conf : watcher_constructor) : watcher {
      return new AK.watcher(conf.watch,conf.action);
    }
    
    public static work() : void {
      this.instance.forEach((toWatch : watcher) => {
        if(toWatch.origin == undefined) {
          toWatch.destroy();
        }
        if(toWatch.origin != toWatch.saved) {
          Sup.log("changed");
          toWatch.action(toWatch.origin,toWatch.saved);
          toWatch.saved = toWatch.origin.valueOf();
        }
      });
    }
    
  }
  
}
