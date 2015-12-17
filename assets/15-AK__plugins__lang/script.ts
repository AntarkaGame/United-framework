namespace AK {
  
  export class lang {
    
    public static active : string;
    public static store : any = {};
  
    private store : any;
    public name : string;
  
    constructor(langName:string,keys: any) {
      if(lang.active == undefined) {
        lang.active = langName;
      }
      this.name = langName;
      this.store = keys;
      lang.store[langName] = keys;
    }
  
    public add(key : any) {
      for(const k in key) {
        if(this.store[k] == undefined) {
          const v = key[k];
          this.store[k] = v;
        }
      }
    }
  
    public drop(key: string | string[]) : void | boolean {
      if(typeof key == "string") {
        if(this.store[<string>key]) {
          this.store[<string>key] = undefined;
          delete this.store[<string>key];
          return true;
        }
        return false;
      }
      else {
        const T : string[] = <string[]>key;
        T.forEach((v) => {
          if(this.store[v]) {
            this.store[v] = undefined;
            delete this.store[v];
          }
        });
        return true;
      }
    }
  
    public static get(key:string) : string {
      if(this.store[this.active][key]) {
        return this.store[this.active][key];
      }
      return "ERR | not found";
    }
  
  }
  
}