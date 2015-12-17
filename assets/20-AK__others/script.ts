namespace AK {
  
  export type Key_entry = { [key:string] : boolean };
  
  export class charFilter {
    
    public static entry : { [key:string] : Key_entry } = {
      default : { "A" : true, "B" : true, "C" : true, "D" : true, "E" : true, "F" : true, "G" : true, "H" : true, "I" : true, "J" : true, "K" : true, "L" : true, "M" : true, "N" : true, "O": true,
                "P" : true, "Q" :true },
      number : { "1" : true , "2" : true , "3" : true, "4" : true, "5" : true, "6" : true, "7" : true, "8" : true, "9" : true, "0" : true }
    }
    
    private selected : Key_entry;
    
    constructor(entry: Key_entry) {
      this.selected = entry;
    }
  
    public check(key:string) : boolean {
      return (this.selected[key]) ? true : false;
    }
  
    public get() : boolean | string {
      const Key : string = Sup.Input.getTextEntered();
      return (this.check(Key)) ? Key : false;
    }
  
    public static add(name:string,T: Key_entry) : boolean {
      if(!this.entry[name])
        this.entry[name] = T;
        return true;
      return false;
    }
    
  }

  export class tree {
    
    public path : string;
    
    constructor(path: string) {
      this.path = path;
    }

    public exist() : boolean {
      return tree.exist(this.path);
    }

    public instanceof(type:any) {
      return tree.instanceof(this.path,type);
    }

    public type() : boolean | string {
      return tree.type(this.path);
    }
    
    public static exist(path:string) : boolean {
      try { 
        Sup.get(path);
        return true;
      } catch(Ex) { 
        return false;
      }
    }
    
    public static instanceof(path:string,type:any) : boolean {
      try { 
        let O = Sup.get(path);
        if(O instanceof type) {
          return true;
        }
        return false;
      } catch(Ex) { 
        return false;
      }
    }
    
    public static type(path:string) : boolean | string {
      try { 
        let O = Sup.get(path);
        switch(typeof O) {
          case "Sup.Sprite" : return "Sprite"; break;
          case "Sup.Font" : return "Font"; break;
          default: return "any";
        }
      } catch(Ex) { 
        return false;
      }
    }
  }
  
  export const path : string = "AK/fonts/";
  
  export class font {
    
    public static Default : string = `${path}Exo-regular`;
    public static Exo : { [key:string] : string } = {
      bold : `${path}Exo-bold`,
      regular : `${path}Exo-regular`,
      light : `${path}Exo-light`,
      black : `${path}Exo-black`,
      italic : `${path}Exo-medium-italic`,
      black_italic : `${path}Exo-black-italic`
    }
    
    public static add(name:string,font:any) : boolean {
      if(!this[name])
        this[name] = font;
        return true;
      return false;
    }
    
  }
  
}