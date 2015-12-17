class GamecoreBehavior extends Sup.Behavior {

  awake() {
    AK.Game = new AK.game("HUD");
    //AK.Game.loadDep(AK.hud,this.actor,"home");
    AK.UI = new AK.hud(this.actor,"home");
    AK.playlist.play();
  }

  update() {
    AK.Game.update();
    AK.UI.update();
    
    if(Sup.Input.wasKeyJustPressed("A")) {
      AK.playlist.next("Jazz");
    }
    
    if(Sup.Input.wasKeyJustPressed("B")) {
      AK.playlist.next("Bomber");
    }
  }
}
Sup.registerBehavior(GamecoreBehavior);
