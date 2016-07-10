namespace United {

    export class HUD extends United.Addon {

        static active_container: Sup.Math.Vector3   = new Sup.Math.Vector3(0,0,0);
        static inactive_container: Sup.Math.Vector3 = new Sup.Math.Vector3(200,0,0);

        Rayon: Sup.Math.Ray;
        private CameraActor: Sup.Actor;
        private ActiveContainer: Sup.Actor;
        private Containers: Sup.Actor[];

        constructor(CameraActor: Sup.Actor) {
            super({
                defaultName: "HUD"
            });
            if(CameraActor == null) {
                throw new United.Exception.InternalError("Wrong HUD CameraActor");
            }
            this.CameraActor = CameraActor;
            this.Rayon = new Sup.Math.Ray(CameraActor.getPosition(),new Sup.Math.Vector3(0,0,-1));
            this.Rayon.setFromCamera(this.CameraActor.camera,Sup.Input.getMousePosition());
            United.Addons.HUD = this;
        }

        addContainer(containers: Sup.Actor[]) : void {
            if(containers.length == 0) {
                throw new United.Exception.InternalError("Impossible to add empty HUD containers");
            }
            this.Containers = containers;
            this.Containers.forEach( (Actor: Sup.Actor) => {
                Actor.setPosition(HUD.inactive_container);
            });
            if(!this.ActiveContainer) {
                this.ActiveContainer = containers[0];
                this.ActiveContainer.setPosition(HUD.active_container);
            }
        }

        setContainer(Actor: Sup.Actor) : boolean {
            if(this.Containers.indexOf(Actor) != -1 && Actor !== this.ActiveContainer) {
                this.ActiveContainer.setPosition(HUD.inactive_container);
                Actor.setPosition(HUD.active_container);
                this.ActiveContainer = Actor;
                return true;
            }
            return false;
        }

        update() : void {
            this.Rayon.setFromCamera(this.CameraActor.camera,Sup.Input.getMousePosition());
        }

    }

    export class Button extends United.Addon {

        actor: Sup.Actor;
        private hover: boolean = false;
        private asset: string;

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
        }

        setSprite(asset: string) : void {
            if(United.Tree.exist(asset) && asset != this.asset) {
                this.actor.spriteRenderer.setSprite(asset);
                this.asset = asset;
            }
        }

        update() : void {

            if(United.Addons.HUD.Rayon.intersectActor(this.actor,false).length > 0) {
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
