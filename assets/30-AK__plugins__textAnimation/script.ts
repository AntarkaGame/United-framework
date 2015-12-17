namespace AK {
  
  export interface textAnimation_constructor {
    actor : Sup.Actor
    text? : string
    speed? : number
  }
  
  export class textAnimation {
    
    public static instances : textAnimation[] = [];
    
    public speed : number = 4;
    public text : string = "";
  
    private state : boolean = true;
    private playing : boolean = false;

    constructor(conf : textAnimation_constructor) {
      if(conf.actor.textRenderer) {
        if(conf.text) {
          this.text = conf.text;
        }
        else {
          this.text = conf.actor.textRenderer.getText();
        }
      }
      this.speed = conf.speed || 4;
    }
  
    public show() : void {
      
    }
  
    public hide() : void {
      
    }
  
    public update() : void {
      
    }

  }

}