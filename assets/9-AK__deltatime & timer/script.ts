namespace AK {
  
  interface dt_constructor {
    dt : number
    auto? : boolean
    while? : boolean
  }
  
  export class dt {
    
    public static default_start : boolean = true;
    public static default_while : boolean = true;
    
    private started : boolean = false;
    private dt : number;
    private tick : number;
    private while : boolean;
    
    constructor(conf : dt_constructor) {
      this.dt = conf.dt;
      this.started = conf.auto || AK.dt.default_start;
      this.while = conf.while || AK.dt.default_while;
      this.tick = 0;
    }
    
    public start() : void {
      this.started = true;
    }
    
    public stop() : void {
      this.started = false;
    }
    
    public switches() : void {
      this.started = !this.started;
    }
    
    public get() : number {
      return this.tick;
    }
    
    public set(dt : number,reset?: boolean) : void {
      this.dt = dt;
      if(reset) 
        this.tick = 0;
    }
    
    walk() : boolean {
      if(this.started) {
        if(this.tick >= this.dt) {
          this.tick = 0;
          if(!this.while) {
            this.started = false;
          }
          return true;
        }
        this.tick++;
        return false;
      }
      return false;
    }
    
  }

  export class timer {
    
    private tick : number = 0;
    private max : number; 
    private action : () => void;

    private started : boolean = true;
    
    public get(format:string) : string {
      let seconde : number  = this.seconde();
      let seconde_0 : string = (seconde < 10) ? "0" : "";
      let minute : number   = this.minute();
      let minute_0 : string = (minute < 10) ? "0" : "";
      let hours : number    = Math.floor(minute / 60);
      
      format = format.replace("$s",seconde.toString());
      format = format.replace("$S",seconde_0+seconde.toString());
      format = format.replace("$m",minute.toString());
      format = format.replace("$M",minute_0+minute.toString());
      format = format.replace("$h",hours.toString());
      
      return format;
    }

    public start() : void {
      this.started = true;
    }

    public stop() : void {
      this.started = false;
    }

    public setMax(temp: number,action: () => void) : void {
      this.max = temp;
      this.action = action;
    }

    public seconde() : number {
      return Math.floor(this.tick / 60) % 60;
    }

    public minute() : number {
      const seconde : number = Math.floor(this.tick / 60);
      return Math.floor(seconde / 60) % 60;
    }

    public reset() : void {
      this.tick = 0;
    }
    
    public update() : void {
      this.tick++;
      if(this.max != undefined) {
        if(this.tick > this.max) {
          this.action();
          this.stop();
        }
      }
    }
  }
  
}