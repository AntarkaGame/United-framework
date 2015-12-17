class AKButtonBehavior extends Sup.Behavior {
  
  public isHover : boolean = false;
  public reseatable : { [key:string] : boolean } = {
    "sprite" : true
  }

  protected text : string;
  protected sprite : string;
  
  protected _text : string;
  protected _sprite : string;
  protected _default_sprite : string;
  protected havesprite : boolean = false;

  protected button : AK.button;

  awake() {
    this.button = AK.button.register(this.actor);
    AK.button.actions.forEach((action : string) => {
      this.actor[action] = undefined;
    });
    this.configure();
  }

  public get textContent() : string {
    return this._text;
  }

  start() {
    
    // Configure spriteRenderer :
    if(this.actor.spriteRenderer == undefined) {
      if(this.sprite && AK.tree.exist(this.sprite)) {
        new Sup.SpriteRenderer(this.actor,this.sprite);
        this.havesprite = true;
      }
    }
    else {
      this.havesprite = true;
    }
    
    if(this.havesprite) {
      if(this.sprite && AK.tree.exist(this.sprite)) {
        this._default_sprite = this.sprite;
        this._sprite = this._default_sprite;
        this.actor.spriteRenderer.setSprite(this.sprite);
      }
      else {
        this._default_sprite = this.actor.spriteRenderer.getSprite().path;
        this._sprite = this._default_sprite;
      }
    }
    
  }
  
  protected call(action: string) : void {
    if(this.actor[action] != undefined && this.actor[action] instanceof Function) { 
      this.actor[action](); 
    }
    this[action]();
  }
  
  protected hover() {}
  protected unhover() {}
  protected click() {}
  protected process() {}
  protected configure() {}

  update() {
    this.process();
    if(AK.RayIntersect(this.actor)) {
      
      // Hover action
      if(!this.isHover) {
        this.isHover = true;
        this.call("hover");
        
        if(this.sprite && this.sprite != this._sprite && this.havesprite) {
          if(AK.tree.exist(this.sprite)) {
            this.actor.spriteRenderer.setSprite(this.sprite);
            this._sprite = this.sprite;
            this.sprite = undefined;
          }
          else {
            Sup.log("Invalid sprite!");
          }
        }
        else {
          this.sprite = undefined;
        }
      }
      
      // Click action
      if(AK.Mouse.Left()) {
        this.call("click");
      }
    }
    else { 
      
      // Hover action 
      if(this.isHover) {
        this.isHover = false;
        this.call("unhover");
        
        // Sprite Reseting
        if(this._sprite != this._default_sprite && this.reseatable["sprite"] && this.havesprite) {
          this.actor.spriteRenderer.setSprite(this._default_sprite);
        }
      }
    } 
    
    if(this.text) {
      this._text = this.text;
      this.button.text = this.text;
      this.text = undefined;
    }
    
    this.button.update({
      sprite : this._sprite,
      default_sprite : this._default_sprite,
      text : this._text,
      hover : this.isHover
    });
    
  }

}
Sup.registerBehavior(AKButtonBehavior);
