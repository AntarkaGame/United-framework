namespace AK {
  
  export class playlist {
    
    private static tracks : any = {};
    public static started : boolean = false;
    private static instance : Sup.Audio.SoundPlayer;
  
    public static active_track : string;
    public static active_playlist : string;
  
    constructor(name:string,tracks: any) {
      if(!AK.playlist.tracks[name])
        
        // Define default value!
        if(!AK.playlist.active_playlist) {
          AK.playlist.active_playlist = name;
        }
      
        if(!AK.playlist.active_track) {
          for(const k in tracks) {
            AK.playlist.active_track = k;
            break;
          }
        }
      
        AK.playlist.tracks[name] = tracks;
    }
  
    public static startWith(playlist:string,track?:string) : boolean {
      const PL = this.tracks[playlist];
      if(PL) {
        this.active_playlist = playlist;
        if(track) {
          if(PL[track]) {
            this.active_track = track;
            return true;
          }
          return false;
        }
        
        for(const k in PL) {
          this.active_track = k;
          return true;
        }
      }
      return false;
    }
  
    public static play() : void {
      if(!this.started)
          this.started = true;
    }
  
    public static start() : void {
      const focus = this.tracks[this.active_playlist][this.active_track];
      this.instance = new Sup.Audio.SoundPlayer(focus[0],focus[1] || 1,{loop: false});
      this.instance.play();
    }
  
    private static redefine(focus) : void {
      this.instance.stop();
      this.instance = new Sup.Audio.SoundPlayer(focus[0],focus[1] || 1,{loop: false});
      this.instance.play();
    }
  
    public static next(track?:string) : any {
      const trackLength : number = AK.utils.objectSize(this.tracks[this.active_playlist]);
      if(trackLength == 1) {
        this.instance.play();
        return null;
      }
  
      if(track == undefined) {
        let first : any = false;
        let next : boolean = false;
        let focus;
        let passaway : boolean = false;
        let i : number = 1;
      
        for(let k in this.tracks[this.active_playlist]) {
          if(!first) 
            first = k;
          
          if(k == this.active_track || passaway) {
            if(!passaway) 
              passaway = true;
            
            if(i == trackLength) {
              this.active_track = first;
              focus = this.tracks[this.active_playlist][first];
              break;
            }
            else if(next) {
              this.active_track = k;
              focus = this.tracks[this.active_playlist][k];
              break;
            }
            else {
              next = true;
            }
          }
          i++;
        }
      
        this.redefine(focus);        
      }
      else {
        const focus = this.tracks[this.active_playlist][track];
        if(focus) {
          this.redefine(focus);
        }
      }
    }
  
    public static prev() : void {
      
    }
  
    public static change(playlist:string,track?:string): boolean {
      if(this.tracks[playlist] && this.active_playlist != playlist) {
        this.active_playlist = playlist;
      }
      return false;
    }
  
    public static update() : void {
      if(this.started) {
        if(this.instance) {
          if(this.instance.getState() == Sup.Audio.SoundPlayer.State.Stopped) {
            this.next();
          }
        }
        else {
          this.start();
        }
      }
    }
    
  }
  
  export class soundController {
    
  }
  
}