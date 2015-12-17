class AKButton extends Sup.Behavior {
  
  public isHover : boolean = false;

  protected hover() : void {
    
  }

  protected unhover() : void {
    
  }

  protected click() : void {
    
  }

  update() {
    if(AK.RayIntersect(this.actor)) {
      
      // Hover action
      if(!this.isHover) {
        this.isHover = true;
        this.hover();
      }
      
      // Click action
      if(AK.Mouse.Left()) {
        this.click();
      }
    }
    else { 
      
      // Hover action 
      if(this.isHover) {
        this.isHover = false;
        this.unhover();
      }
    } 
  }
}
Sup.registerBehavior(AKButton);
