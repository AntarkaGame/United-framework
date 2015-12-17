namespace AK {

  export class hud {
    
    public static container_on : Sup.Math.Vector3 = new Sup.Math.Vector3(0,0,-10);
    public static container_off : Sup.Math.Vector3 = new Sup.Math.Vector3(100,0,-10);
    
    private camera : Sup.Actor;
    private scanner : AK.scanner;
    private containers = {};
  
    private screenSize : Sup.Math.Vector2 = Sup.Input.getScreenSize();
    private screenSizeTopixels : Sup.Math.Vector2;
    private screenCenterTopixels : Sup.Math.Vector2;
  
    private sss : number;
    private pixeltounits : number;  
    
    private mousePosition : Sup.Math.Vector2 = Sup.Input.getMousePosition();
    private mouseToPixels : Sup.Math.Vector2;
    private mouseToScreen : Sup.Math.Vector2;

    private elementsStore : any[] = [];
    
    public container : string;
    
    constructor(cameraActor: Sup.Actor,defaultContainer?: string) {
      this.camera = cameraActor;
      this.scanner = new AK.scanner(cameraActor,["text_","container_","button_","input_"]);
      
      if(AK.lang != undefined) {
        this.scanner.forEach("text_",(actor: Sup.Actor) => {
          actor.addBehavior(AKTextBehavior);
        });
      }
      
      this.scanner.forEach("container_",(actor: Sup.Actor) => {
        const name : string = actor.getName().substr(10);
        
        if(this.container == undefined && defaultContainer == undefined) {
          this.container = name;
          actor.setLocalPosition(hud.container_on);
        }
        else if(name == defaultContainer && defaultContainer != undefined) {
          this.container = defaultContainer;
          actor.setLocalPosition(hud.container_on);
        }
        else {
          actor.setLocalPosition(hud.container_off);
        }
        
        if(this.containers[name] == undefined)
          this.containers[name] = actor;
      });
      
      this.scanner.forEach("button_",(actor: Sup.Actor) => {
        new AK.button(actor.getName());
      });
      
      AK.UIRay = new AK.RAY(cameraActor.getPosition(),new AK.V3(0,0,-1));
      
      this.resize();    
    }
  
    public loadCSS() : void {
      
    }

    public resize() : void {
      this.sss = this.screenSize.y;
      this.pixeltounits = this.camera.camera.getOrthographicScale() / this.sss;
      
      this.screenSizeTopixels = new Sup.Math.Vector2(this.screenSize.x * this.pixeltounits,this.screenSize.y * this.pixeltounits);
      this.screenCenterTopixels = new Sup.Math.Vector2(this.screenSizeTopixels.x / 2,this.screenSizeTopixels.y / 2);
    }

    public move(containerName: string) : void {
      if(this.container != containerName && this.containers[containerName]) {
        const prevActor : Sup.Actor = this.containers[this.container];
        const nextActor : Sup.Actor = this.containers[containerName];
        
        prevActor.setLocalPosition(hud.container_off);
        nextActor.setLocalPosition(hud.container_on);
        
        this.container = containerName;
      }
    }
  
    public followMouse(actor: Sup.Actor) : void {
      const decalPos : Sup.Math.Vector3 = actor.getLocalPosition().clone().subtract(new Sup.Math.Vector3(this.mouseToScreen.x,this.mouseToScreen.y,0));
      //Sup.log(decalPos);
      actor.setLocalPosition(new Sup.Math.Vector3(decalPos.x,decalPos.y,actor.getZ()));
    }

    public update() {
      AK.UIRay.setFromCamera(this.camera.camera,Sup.Input.getMousePosition());
      const ScreenSize : Sup.Math.Vector2 = Sup.Input.getScreenSize();
      if(this.screenSize.x != ScreenSize.x || this.screenSize.y != ScreenSize.y) {
        this.screenSize = ScreenSize;
        this.resize();
      }
      this.mousePosition = Sup.Input.getMousePosition();
      this.mouseToPixels = new Sup.Math.Vector2( this.mousePosition.x * this.pixeltounits, this.mousePosition.y * this.pixeltounits);
      this.mouseToScreen = new Sup.Math.Vector2( this.mouseToPixels.x - this.screenCenterTopixels.x, this.mouseToPixels.y + this.screenCenterTopixels.y);
    }
    
  }
  AK.core.register(hud);
  
}