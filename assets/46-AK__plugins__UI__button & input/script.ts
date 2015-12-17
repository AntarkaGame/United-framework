namespace AK {
  
  export interface button_update {
    sprite: string
    default_sprite: string
    text: string
    hover : boolean
  }
  
  export class button {
    
    public static actions : string[] = ["click","hover","unhover"];
    private static instances : any = {};
  
    private _sprite : string;
    private _default_sprite : string;
    private _text : string;
    private _hover : boolean;
  
    public static register(actor: Sup.Actor) : AK.button {
      const actorName : string = actor.getName();
      const button : AK.button = new AK.button(actorName,true);
      this.instances[actorName] = button;
      return button;
    }
  
    public static get(actorName : string) : AK.button {
      if(this.instances[actorName]) {
        return this.instances[actorName];
      }
      return null;
    }
  
    private text_instance : Sup.Actor;
    public actor : Sup.Actor;

    constructor(actorName: string,ignore?:boolean) {
      ignore = ignore || false;
      this.actor = Sup.getActor(actorName);
      if(!ignore) {
        const behavior : AKButtonBehavior = this.actor.getBehavior(AKButtonBehavior);
        if(!behavior) {
          this.actor.addBehavior(AKButtonBehavior);
        }
      }
    }

    public getBehavior() : AKButtonBehavior | boolean {
      const behavior : AKButtonBehavior = this.actor.getBehavior(AKButtonBehavior);
      if(behavior) {
        return behavior;
      }
      return false;
    }
  
    public set text(text:string) {
      if(this.text_instance) {
        this.text_instance.textRenderer.setText(text);
      }
      else {
        const children : Sup.Actor[] = this.actor.getChildren();
        if(children.length > 0) {
          const focus : Sup.TextRenderer = children[0].textRenderer;
          if(focus) {
            focus.setText(text);
            this.text_instance = children[0];
          }
        }
        else {
          const textActor : Sup.Actor = new Sup.Actor("child_text",this.actor);
          textActor.setLocalPosition(new Sup.Math.Vector3(0,0,0.1));
          new Sup.TextRenderer(textActor,text,AK.font.Default);
        }
      }
    }
  
    public get text() : string {
      return this._text;
    }
  
    public set sprite(sprite: string) {
      const behavior : any = this.getBehavior();
      behavior._default_sprite = sprite;
      behavior.sprite = sprite;
    }
  
    public get sprite() : string {
      return this._sprite;
    }
  
    public get defaultSprite() : string {
      return this._default_sprite;
    }
  
    public get isHover() : boolean {
      return this._hover;
    }
  
    public on(actionName:string,action: () => void) : boolean {
      const self : any = this.getBehavior();
      if(self) {
        if(self[actionName]) {
          self[actionName] = action;
          return true;
        }
        return false;
      }
      return false;
    }

    public set click(action: () => void) {
      this.actor["click"] = action;
    }

    public set hover(action: () => void) {
      this.actor["hover"] = action;
    }

    public set unhover(action: () => void) {
      this.actor["unhover"] = action;
    }
    
    public update(self: button_update) {
      this._sprite = self.sprite;
      this._default_sprite = self.default_sprite;
      this._text = self.text;
      this._hover = self.hover;
    }

  }
  
  export interface input_option {
    placeholder? : string,
    value? : string
  }

  export class input extends AK.button {
    
    public static actions : string[] = ["focus","unfocus","enter"];
    
    constructor(actorName: string,opts?:AK.input_option) {
      super(actorName);
      
      opts = opts || {};
      const temp_opt = {
        placeholder : opts.placeholder || "",
        value : opts.value || ""
      }
      
      const behavior : AKInputBehavior = this.actor.getBehavior(AKInputBehavior);
      if(!behavior) {
        this.actor.addBehavior(AKInputBehavior,temp_opt);
      }
    }

    public getBehavior() : AKInputBehavior | boolean {
      const behavior : AKInputBehavior = this.actor.getBehavior(AKInputBehavior);
      if(behavior) {
        return behavior;
      }
      return false;
    }

    public isFocus() : boolean {
      const behavior : any = this.getBehavior();
      return (behavior) ? behavior.isFocus : false;
    }

    public getFocus() : void {
      
    }

    public focus(action: () => void,overwrite?:boolean) {
      overwrite = overwrite || false;
      if(this.actor["focus"] instanceof Function && !overwrite) {
        const old : () => void = this.actor["focus"];
        this.actor["focus"] = () => {
          old();
          action();
        }
      }
      else {
        this.actor["focus"] = action;
      }
    }
    
    public unfocus(action: () => void,overwrite?:boolean) {
      overwrite = overwrite || false;
      if(this.actor["unfocus"] instanceof Function && !overwrite) {
        const old : () => void = this.actor["unfocus"];
        this.actor["unfocus"] = () => {
          old();
          action();
        }
      }
      else {
        this.actor["unfocus"] = action;
      }
    }
    
    public enter(action: () => void,overwrite?:boolean) {
      overwrite = overwrite || false;
      if(this.actor["enter"] instanceof Function && !overwrite) {
        const old : () => void = this.actor["enter"];
        this.actor["enter"] = () => {
          old();
          action();
        }
      }
      else {
        this.actor["enter"] = action;
      }
    }
    
  }
  
}