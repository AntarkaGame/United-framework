namespace AK {
  
  export module utils {
    
    export function merge(o: any,source: any) : any {
      for(const i in o) {
        const env : any = o[i];
        if(typeof env == "object") {
          for(const j in env) {
            source[j] = env[j];
          }
        }
      }
      return source;
    }
    
    export function objectSize(obj : any) : any {
      let size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) 
          size++;
      }
      return size;
    };

    
  }
  
  export module math {
    
  }
  
  
}