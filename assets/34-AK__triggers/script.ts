namespace AK {
  
  export class triggers {
    
    private static instance : any = {}; 
  
    constructor(name: string,action: () => any,unique?:boolean) {
      if(!triggers.instance[name]) {
        AK.triggers.instance[name] = {
          action : action,
          unique : unique || false
        };
      }
    }
  
    public static merge(name:string,action: () => any) : boolean {
      if(this.instance[name]) {
        const callback : () => any = () => {
          this.instance[name].action();
          action();
        }
        this.instance[name].action = callback;
        return true;
      }
      return false;
    }
  
    public static call(name:string) : boolean {
      if(this.instance[name]) {
        this.instance[name].action();
        if(this.instance[name].unique) {
          this.destroy(name);
        }
        return true;
      }
      return false;
    }
  
    public static destroy(name:string) : boolean {
      if(this.instance[name]) {
        this.instance[name] = undefined;
        delete this.instance[name];
        return true;
      }
      return false;
    }
  
  }
  
}