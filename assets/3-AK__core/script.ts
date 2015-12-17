declare var window;
declare var localStorage;
let THREE = window.SupEngine.THREE;

namespace AK {
  
  export var debug : boolean = true;
  
  export var UIRay : Sup.Math.Ray;
  export var Game : AK.game;
  export var UI : AK.hud;
  
  // Framework shortcut
  export var V3 = Sup.Math.Vector3;
  export var V2 = Sup.Math.Vector2;
  export var RAY = Sup.Math.Ray;
  
  // Mouse shortcut
  export var Mouse = {
    Left : () => {
      return Sup.Input.wasMouseButtonJustPressed(0);
    },
    Middle : () => {
      return Sup.Input.wasMouseButtonJustPressed(1);
    },
    Right : () => {
      return Sup.Input.wasMouseButtonJustPressed(2);
    }
  }
  
  // Framework sample function
  export var get : (actor: string) => Sup.Actor = function(actor) {
    return Sup.getActor(actor);
  }
  
  export var log = function(msg: any) {
    if(debug) Sup.log(msg)
  }
  
  export var RayIntersect = function(actor: Sup.Actor) : boolean {
    return AK.UIRay.intersectActor(actor,false).length > 0;
  }
  
  export class core {
    
    public static registered : any[] = [];
  
    public static register(dep: any) : void {
      this.registered.push(dep);
    }
  }
  
  export class game {
    
    public static timeMouseInactive : number = 15;
    
    public pause : boolean = false;
    public step : number = 0;
    public name : string;
    public mouseActive : boolean = true;
    public windowFocus : boolean = true;

    private inactive_tick : number = 0;
    private mouseDelta : Sup.Math.Vector2 = Sup.Input.getMouseDelta();
    private mousePosition : Sup.Math.Vector2 = Sup.Input.getMousePosition();

    private memory : any[] = [];
    
    constructor(name : string) {
      this.name = name;
    }

    public loadDep(instance:any,...Args) : void {
      Sup.log(Args);
    }
    
    public update() : void {
      const mouseDelta : Sup.Math.Vector2 = Sup.Input.getMouseDelta();
      if(mouseDelta.x != this.mouseDelta.x || mouseDelta.y != this.mouseDelta.y) {
        this.mouseDelta = mouseDelta;
        this.inactive_tick = 0;
        if(!this.mouseActive) {
          this.mouseActive = true;
        }
      }
      else {
        this.inactive_tick++;
      }
      
      if(this.inactive_tick >= game.timeMouseInactive && !this.mouseActive) {
        this.mouseActive = false;
      }
      
      const mousePosition : Sup.Math.Vector2 = Sup.Input.getMousePosition();
      
      AK.playlist.update();
      if(AK.worker.instance.length > 0)
        AK.worker.work();
    }
    
  }
  
}