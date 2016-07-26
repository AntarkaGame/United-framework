namespace United {

    export class HUD extends United.Addon {

        static CS_on:  Sup.Math.Vector3  = new Sup.Math.Vector3(0,0,-1.5);
        static CS_off: Sup.Math.Vector3  = new Sup.Math.Vector3(200,0,-1.5);

        Rayon: Sup.Math.Ray;

        cameraActor: Sup.Actor;
        activeContainer: string;
        private containers: United.Collections.Map<Sup.Actor>;

        constructor(CameraActor: Sup.Actor) {
            super({
                defaultName: "HUD"
            });
            if(!CameraActor) {
                throw new United.Exception.InternalError("Wrong HUD CameraActor");
            }
            this.cameraActor = CameraActor;
            this.Rayon = new Sup.Math.Ray(CameraActor.getPosition(),new Sup.Math.Vector3(0,0,-1));
            this.Rayon.setFromCamera(this.cameraActor.camera,Sup.Input.getMousePosition());
            this.containers = new United.Collections.Map<Sup.Actor>();
            United.Addons.HUD = this;
        }

        addContainers(containersName: string[]) : void {
            containersName.forEach( (name: string) => {
                const Actor: Sup.Actor = Sup.getActor(name);
                if(Actor) {
                    this.containers.add(name,Actor);
                    if(!this.activeContainer) {
                        this.activeContainer = name;
                        Actor.setLocalPosition(HUD.CS_on);
                    }
                    else {
                        Actor.setLocalPosition(HUD.CS_off);
                    }
                }
                else {
                    console.warn("ContainersActor doesn't exist!");
                }
            });
        }

        setContainer(containerName: string) {
            if(this.activeContainer != containerName && this.containers.has(containerName)) {
                this.containers.get(this.activeContainer).setLocalPosition(HUD.CS_off);
                this.containers.get(containerName).setLocalPosition(HUD.CS_on);
                this.activeContainer = containerName;
            }
        }

        update() : void {
            // HUD Rayon.
            this.Rayon.setFromCamera(this.cameraActor.camera,Sup.Input.getMousePosition());
        }

    }

    export namespace UI {

        export class Window extends United.Addon {
            constructor(actor: Sup.Actor) {
                super({
                    defaultName : "Window"
                });
            }

            update() : void {

            }
        }

        export class ScrollBar extends United.Addon {
            constructor(containerName: string,scrollHeight: number,scrollVelocity: number) {
                super({
                    defaultName : "ScrollBar"
                });
            }

            update() : void {

            }
        }

        export class ProgressionBar extends United.Addon {

            private progression: number;

            constructor() {
                super({
                    defaultName: "progressionBar"
                });
                this.progression = 0;
            }

            set(progression: number) : void {

            }

            update() : void {

            }
        }

        export class Input extends United.Addon {

            private focus: boolean;

            constructor() {
                super({
                    defaultName: "input"
                });
            }

            update() : void {

            }
        }

        export class Button extends United.Addon {

            static __inner: United.Collections.Map<United.UI.Button> = new United.Collections.Map<United.UI.Button>();

            actor: Sup.Actor;
            private hover: boolean = false;
            private asset: string;
            private keybind: string;
            private text: Sup.Actor;

            static get(buttonName: string) : United.UI.Button {
                return this.__inner.has(buttonName) ? this.__inner.get(buttonName) : undefined;
            }

            constructor(actor: Sup.Actor) {
                super({
                    defaultName: "Button"
                });
                this.actor = actor;
                if(this.actor.spriteRenderer == undefined) {
                    throw new United.Exception.InternalError("Fail to define a button with no spriteRenderer on the actor!");
                }
                else {
                    this.asset = this.actor.spriteRenderer.getSprite().path;
                }
                if(United.Addons.HUD == undefined) {
                    throw new United.Exception.InternalError("You cannot declare button without HUD class.");
                }
                const TEXT : Sup.Actor = this.actor.getChild("TEXT");
                if(TEXT) {
                    this.text = TEXT;
                }
                if(!Button.__inner.has(actor.getName())) {
                    Button.__inner.add(actor.getName(),this);
                }
            }

            bind(key: string) : void {
                this.keybind = key;
            }

            setSprite(asset: string) : void {
                if(asset != this.asset && United.Tree.exist(asset)) {
                    this.actor.spriteRenderer.setSprite(asset);
                    this.asset = asset;
                }
            }

            setOpacity(opacity: number) : void {
                this.actor.spriteRenderer.setOpacity(opacity);
            }

            textColor(color: Sup.Color) : void {
                if(this.text) {
                    this.text.textRenderer.setColor(color);
                }
            }

            update() : void {

                let breakAction : boolean = false;
                if(this.keybind != undefined && Sup.Input.wasKeyJustPressed(this.keybind)) {
                    this.emit("click");
                    breakAction = true;
                }

                if(United.Addons.HUD.Rayon.intersectActor(this.actor,false).length > 0 && !breakAction) {
                    if(Sup.Input.wasMouseButtonJustPressed(0)) {
                        this.emit("click");
                    }
                    if(!this.hover) {
                        this.hover = true;
                        this.emit("hover");
                    }
                }
                else {
                    if(this.hover) {
                        this.hover = false;
                        this.emit("unhover");
                    }
                }

            }

        }

    }

}
