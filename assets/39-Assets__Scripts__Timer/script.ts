class TimerBehavior extends Sup.Behavior {
  
  private timer : AK.timer = new AK.timer();

  update() {
    this.actor.textRenderer.setText(this.timer.get("$M:$S"));
    this.timer.update();
  }
}
Sup.registerBehavior(TimerBehavior);
