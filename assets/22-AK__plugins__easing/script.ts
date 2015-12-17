namespace AK {
  
  interface easing_constructor {
    points : Sup.Math.Vector3[],
    startBy : number,
    easing : any,
    dt : number
  }
  
  export class easing {
    
    constructor(conf:easing_constructor) {
      
    }
    
    public update() : Sup.Math.Vector3 {
      return new Sup.Math.Vector3();
    }
    
  }
  
}