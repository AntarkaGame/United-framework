namespace AK {
  
  export class stylesheets {
    
    private css : any;
  
    private button : AK.button[] = [];
    private ui : any[] = [];
    private input : AK.input[] = [];
    
    constructor(Stylesheets: (CSS: any) => any) {
      this.css = Stylesheets({});
      this.forEach();
    }
  
    private forEach() : void {
      
    }
  
    private build() : void {
      
    }
    
  }
  
}