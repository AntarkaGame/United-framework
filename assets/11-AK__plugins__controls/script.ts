namespace AK {
  
  namespace Input {
    export interface ActionConstructor {
      keyboard?: string[];
      mButton?: number[];
      gamepad?: number[];
      gButton?: number[];
      gAxis?: number[];
      gTrigger?: number[];
    }

    export class Action {
      keyboard : string[];
      mButton : number[];
      gamepad : number[];
      gButton : number[];
      gAxis : number[];
      gTrigger : number[];

      constructor(touches : ActionConstructor) {
        this.keyboard = touches.keyboard ? touches.keyboard : [];
        this.mButton = touches.mButton ? touches.mButton : [];
        this.gamepad = touches.gamepad ? touches.gamepad : [];
        this.gButton = touches.gButton ? touches.gButton : [];
        this.gAxis = touches.gAxis ? touches.gAxis : [];
        this.gTrigger = touches.gTrigger ? touches.gTrigger : [];
      }

      isDown() : boolean {
        if (this.keyboard) {
          let klength = this.keyboard.length;
          for (let i = 0; i < klength; i++)
            if (Sup.Input.isKeyDown(this.keyboard[i])) return true;
        }

        if (this.gamepad) {
          let gplength = this.gamepad.length;
          for (let i = 0; i < gplength; i++) {
            if (this.gButton) {
              let gblength = this.gButton.length;
              for (let j = 0; j < gblength; j++)
                if (Sup.Input.isGamepadButtonDown(this.gamepad[i], this.gButton[j])) return true;
            }
          }
        }

        if (this.mButton) {
          let mlength = this.mButton.length;
          for (let i = 0; i < mlength; i++)
            if (Sup.Input.isMouseButtonDown(this.mButton[i])) return true;
        }

        return false;
      }

      wasJustPressed(options?: { autoRepeat?: boolean; }) : boolean {
        if (this.keyboard) {
          let klength = this.keyboard.length;
          for (let i = 0; i < klength; i++)
            if (Sup.Input.wasKeyJustPressed(this.keyboard[i], options)) return true;
        }

        if (this.gamepad) {
          let gplength = this.gamepad.length;
          for (let i = 0; i < gplength; i++) {
            if (this.gButton) {
              let gblength = this.gButton.length;
              for (let j = 0; j < gblength; j++)
                if (Sup.Input.wasGamepadButtonJustPressed(this.gamepad[i], this.gButton[j])) return true;
            }
          }
        }

        if (this.mButton) {
          let mlength = this.mButton.length;
          for (let i = 0; i < mlength; i++)
            if (Sup.Input.wasMouseButtonJustPressed(this.mButton[i])) return true;
        }

        return false;
      }

      wasJustReleased() : boolean {
        if (this.keyboard) {
          let klength = this.keyboard.length;
          for (let i = 0; i < klength; i++)
            if (Sup.Input.wasKeyJustReleased(this.keyboard[i])) return true;
        }

        if (this.gamepad) {
          let gplength = this.gamepad.length;
          for (let i = 0; i < gplength; i++) {
            if (this.gButton) {
              let gblength = this.gButton.length;
              for (let j = 0; j < gblength; j++)
                if (Sup.Input.wasGamepadButtonJustReleased(this.gamepad[i], this.gButton[j])) return true;
            }
          }
        }

        if (this.mButton) {
          let mlength = this.mButton.length;
          for (let i = 0; i < mlength; i++)
            if (Sup.Input.wasMouseButtonJustReleased(this.mButton[i])) return true;
        }

        return false;
      }

      getAxisValues() : number[][] {
        if (this.gamepad) {
          let ret = []
          let gplength = this.gamepad.length;
          for (let i = 0; i < gplength; i++) {
            ret[i] = [];
            if (this.gButton) {
              let galength = this.gAxis.length;
              for (let j = 0; j < galength; j++)
                ret[i][j] = Sup.Input.getGamepadAxisValue(this.gamepad[i], this.gAxis[j]);
            }
          }
          return ret;
        }
        return undefined;
      }

      getTriggersValues() : any {
        if (this.gamepad) {
          let ret = []
          let gplength = this.gamepad.length;
          for (let i = 0; i < gplength; i++) {
            ret[i] = [];
            if (this.gTrigger) {
              let gtlength = this.gTrigger.length;
              for (let j = 0; j < gtlength; j++)
                ret[i][j] = Sup.Input.getGamepadAxisValue(this.gamepad[i], this.gTrigger[j]);
            }
          }
          return ret;
        }
        return undefined;
      }

      addKey(periphType : string, newKey : string | number) {
        this[periphType].push(newKey);
      }

      editKey(periphType : string, oldKey : string | number, newKey : string | number) {
        let indexKey = this[periphType].indexOf(oldKey);
        this[periphType][indexKey] = newKey;
      }

      removeKey(periphType : string, oldKey : string | number) {
        let indexKey = this[periphType].indexOf(oldKey);
        delete this[periphType][indexKey];
      }
    }

 }

  abstract class Controls {

      constructor (ctrl : { [key:string] : Input.Action }) {
        for (const key in ctrl) {
          this[key.toUpperCase()] = ctrl[key];
        }
      }

      addKey(actionName : string, periphType : string, newKey : string | number) {
        actionName = actionName.toUpperCase();
        this[actionName].addKey(periphType, newKey);
      }

      editKey(actionName : string, periphType : string, oldKey : string | number, newKey : string | number) {
        actionName = actionName.toUpperCase();
        this[actionName].editKey(periphType, oldKey, newKey);
      }

      removeKey(actionName : string, periphType : string, oldKey : string | number) {
        actionName = actionName.toUpperCase();
        this[actionName].removeKey(periphType, oldKey);
      }

      addAction(actionName : string, action : Input.Action) {
        actionName = actionName.toUpperCase();
        this[actionName] = action;
      }

      editAction(actionName : string, action : string[]) {
        actionName = actionName.toUpperCase();
        this[actionName] = action;
      }

      renameAction(oldName : string, newName : string) {
        oldName = oldName.toUpperCase();
        newName = newName.toUpperCase();
        this[newName] = this[oldName];
        delete this[oldName];
      }

      removeAction(actionName : string) {
        actionName = actionName.toUpperCase();
        delete this[actionName];
      }

    }

  export class controlSample extends Controls {
    UP : Input.Action = new Input.Action({
      keyboard: ["Z", "W", "UP"]
    });
    LEFT : Input.Action = new Input.Action({
      keyboard: ["Q", "A", "LEFT"]
    });
    DOWN : Input.Action =  new Input.Action({
      keyboard: ["S", "DOWN"]
    });
    RIGHT : Input.Action =  new Input.Action({
      keyboard: ["D", "RIGHT"]
    });
    CROUCH : Input.Action =  new Input.Action({
      keyboard: ["CONTROL"]
    });
    WALK : Input.Action = new Input.Action({
      keyboard: ["SHIFT"]
    });
    JUMP : Input.Action = new Input.Action({
      keyboard: ["SPACE"]
    });
    RELOAD : Input.Action = new Input.Action({
      keyboard: ["R"]
    })

    constructor(){super(null)}
  }
}
