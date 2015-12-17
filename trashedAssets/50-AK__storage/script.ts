namespace AK {
  
  export class storage {
    
    public static load(dataName: string,backdoor?:any) : any {
      try {
        let O = localStorage.getItem(dataName);
        if(O) {
          return JSON.parse(O);
        }
        else {
          if(backdoor) {
            this.save(dataName,backdoor);
          }
        }
        return backdoor || false;
      }
      catch(Ex) {
        return backdoor || false;
      }
    }
  
    public static save(dataName: string,data: any) : boolean {
      try {
        localStorage.setItem(dataName, JSON.stringify(data));
        return true;
      }
      catch(Ex) {
        return false;
      }
    } 
  
    public static clear() : boolean {
      try {
        localStorage.clear();
        return true;
      }
      catch(Ex) {
        return false;
      }
    }
    
  }
  
}