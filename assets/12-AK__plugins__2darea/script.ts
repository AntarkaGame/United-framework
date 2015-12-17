namespace AK {
  
  export class area {
  
    private myactor : Sup.Actor;
    private target : Sup.Actor;
    private area: number;

    constructor(actor: Sup.Actor,target: Sup.Actor,area?: number) {
      this.myactor = actor;
      this.target = target;
      this.area = area || 2;
    }
  
    private calc() : number {
      const x = this.myactor.getX() - this.target.getX();
      const y = this.myactor.getY() - this.target.getY();
      return Math.abs(x) + Math.abs(y);
    }

    public in() : boolean {
      const distance = this.calc();   
      if(distance <= this.area) {
        return true;
      }
      return false;
    }
  
    public out() : boolean {
      const distance = this.calc();   
      if(distance > this.area) {
        return true;
      }
      return false;
    }

  }

  
}