class AKInputBehavior extends AKButtonBehavior {
  
  // Behavior & Actions property
  public isFocus : boolean = false; 

  // Input property
  public placeholder : string = "";
  public value : string = "";

  awake() {
    AK.input.actions.forEach((action : string) => {
      this.actor[action] = undefined;
    });
  }
  
  protected focus() {}
  protected unfocus() {}
  protected enter() {}

  update() {
    this.process();
    if(AK.RayIntersect(this.actor)) {
      
      // Hover action
      if(!this.isHover) {
        this.isHover = true;
        this.call("hover");
      }
      
      // LeftClick action
      if(AK.Mouse.Left()) {
        
        // Focus Action
        if(!this.isFocus) {
          this.isFocus = true;
          this.call("focus");
        }
        
        // Left click Action
        this.call("click");
      }
      
      // Enter action
      if(this.isFocus) {
        
        if(Sup.Input.wasKeyJustPressed("ENTER")) {
          this.call("enter");
        }
        
        // Input interaction here ! 
        
      }
    }
    else { 
      
      // Hover action 
      if(this.isHover) {
        this.isHover = false;
        this.call("unhover");
      }
      
      // Unfocus action 
      if(this.isFocus) {
        this.isFocus = false;
        this.call("unfocus");
      }
      
    } 
  }
  
}
Sup.registerBehavior(AKInputBehavior);
