namespace AK {
  
  export class scanner {
    
    private stored : any;
    
    constructor(container: Sup.Actor,prefix? : string[]) {
      this.stored = {
        ext : {}
      };
      if(prefix) 
        this.scan(container,prefix);
    }
  
    public scan(container: Sup.Actor,prefix : string[]) : void {
      const Recursive : (T : Sup.Actor[]) => void = (T) => {
        if(T.length > 0) {
          T.forEach((v : Sup.Actor) => {
            let find : number = 0;
            const actorName : string = v.getName().toLowerCase();
            prefix.forEach( (name : string) => {
              name = name.toLowerCase();
              if( actorName.slice(0, name.length) == name ) {
                find = 1;
                if(this.stored[name] == undefined) 
                  this.stored[name] = {};
                this.stored[name][actorName] = v;
              }
            });
            if(!find) 
              this.stored.ext[actorName] = v;
            Recursive(v.getChildren());
          });
        }
      }
      Recursive(container.getChildren());
    }
  
    public get(group: string) : { [key:string] : Sup.Actor } | boolean {
      return (this.stored[group]) ? this.stored[group] : false;
    }
  
    public forEach(group: string,callback: (actor : Sup.Actor) => void) : boolean {
      if(this.stored[group]) {
        for(const k in this.stored[group]) {
          callback(this.stored[group][k]);
        }
        return true;
      }
      return false;
    }
  
    public update(group : string[]) : void {
      group.forEach((prefix : string) => {
        for(const k in this.stored.ext) {
          const actor : Sup.Actor = this.stored.ext[k];
          const actorName : string = actor.getName().toLowerCase();
          if( actorName.slice(0, prefix.length) == prefix ) {
            if(!this.stored[prefix]) {
              this.stored[prefix] = {};
            }
            this.stored[prefix][actorName] = actor;
            this.stored.ext[k] = undefined;
            delete this.stored.ext[k];
          }
        }
      });
    }
  
  }
  
}