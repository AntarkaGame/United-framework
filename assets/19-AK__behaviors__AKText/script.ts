class AKTextBehavior extends Sup.Behavior {
  
  private key : string;
  private active_lang : string;

  awake() {
    this.key = this.actor.getName().substr(5);
    this.set();
  }

  private set() : void {
    this.active_lang = AK.lang.active;
    this.actor.textRenderer.setText(AK.lang.get(this.key));
  }

  update() {
    if(AK.lang.active != this.active_lang) {
      this.set();
    }
  }
}
Sup.registerBehavior(AKTextBehavior);
