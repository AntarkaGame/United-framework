namespace United {

    export module Collections {

        export class Chunk<I> {

            public static safeMode : boolean = false;

            public $ : I;
            private defaultValues : I;
            private _auth : boolean;

            constructor() {
                this._auth = true;
                this.$ = <I>{};
                this.defaultValues = <I>{};
            }

            public set authentification(value: boolean) {
                if(!value) {
                    Sup.log("Info :: authentification false is set on one chunk!");
                }
                this._auth = value;
            }

            public clear() : boolean {
                if(!United.Collections.Chunk.safeMode && this._auth) {
                    this.$ = <I>{};
                    this.defaultValues = <I>{};
                    return true;
                }
                return false;
            }

            declare(Object: I) : boolean {
                if(this._auth) {
                    for(const varName in <I>Object) {
                        this.defaultValues[varName] = Object[varName];
                        this.$[varName] = Object[varName];
                    }
                    return true;
                }
                return false;
            }

            public remove(varName: string | string[]) : boolean {
                if(this._auth) {
                    if(typeof varName == "string") {
                        const castVarName : string = <string>varName;
                        if(this.has(castVarName)) {
                            delete this.defaultValues[castVarName];
                            delete this.defaultValues[castVarName];
                            return true;
                        }
                        return false;
                    }
                    const Vars : string[] = <string[]>varName;
                    Vars.forEach( (variableName: string) => {
                        if(this.has(variableName)) {
                            delete this.defaultValues[variableName];
                            delete this.defaultValues[variableName];
                        }
                    });
                    return true;
                }
                return false;
            }

            public has(varName: string) : boolean {
                return this.defaultValues[varName] && this.$[varName] && this._auth ? true : false;
            }

            public resetVar(varName: string) : boolean {
                if(this.has(varName)) {
                    this.$[varName] = this.defaultValues[varName];
                    return true;
                }
                return false;
            }

            public resetAll() : void {
                if(this._auth) {
                    for(const key in this.$)
                        this.$[key] = this.defaultValues[key];
                }
            }

            public rename(varName: string,newName: string) : boolean {
                if(this.has(varName)) {
                    this.defaultValues[newName] = this.defaultValues[varName];
                    this.$[newName] = this.$[varName];
                    delete this.defaultValues[varName];
                    delete this.$[varName];
                    return true;
                }
                return false;
            }

        }

        export class List<T> {

            protected __inner : T[];

            constructor(List?: T[]) {
                this.__inner = List ? List : [];
            }

            add(value: T | T[]) : void {
                if(value instanceof Array)
                    (value as T[]).forEach( (e: T ) => this.add(e));
                else
                    this.__inner.push(<T>value);
            }
            push = this.add;

            del(value : T | T[]) : void {
                if(value instanceof Array) {
                    (value as T[]).forEach( (element: T ) => {
                        if(this.has(element)) this.__inner.splice(this.__inner.indexOf(element),1);
                    });
                }
                else if(this.has(<T>value)) {
                    this.__inner.splice(this.__inner.indexOf(<T>value),1);
                }
            }
            remove = this.del;

            // Generic containing!
            has(value: T | T[]) : boolean {
                if(value instanceof Array) {
                    for(const k in value)
                        if(this.__inner.indexOf(value[k]) == -1)
                            return false;
                    return true;
                }
                return this.__inner.indexOf(<T>value) != -1 ? true : false;
            }
            contains = this.has;

            // Extract data!
            shift() : T {
                return this.__inner.shift();
            }

            pop() : T {
                return this.__inner.pop();
            }
            first = this.pop;

            peek() : T {
                return this.__inner[0];
            }

            last() : T {
                return this.__inner[this.count];
            }

            reverse() : void {
                this.__inner.reverse();
            }

            sort() : T[] {
                return this.__inner.sort();
            }

            includes(element: T) : boolean {
                let O = Object(this);
                const len : number = parseInt(O.length, 10) || 0;
                if (len === 0) return false;
                const n : number = parseInt(arguments[1], 10) || 0;
                let k : number;
                if (n >= 0) {
                    k = n;
                } else {
                    k = len + n;
                    if (k < 0) {
                        k = 0;
                    }
                }
                let currentElement : T;
                while (k < len) {
                    currentElement = O[k];
                    if (element === currentElement) {
                        return true;
                    }
                    k++;
                }
                return false;
            }

            unshift(...args : T[]) : void {
                args.forEach( (e: T) => this.__inner.unshift(e) );
            }

            map(action: (value : T) => T) : void {
                let ret : T;
                this.forEach( (element : T, key : number ) => {
                    ret = action(element);
                    if(ret) this.__inner[key] = ret;
                });
            }

            intersection(CompareList: List<T>) : void {
                this.forEach( (element: T) => {
                    if(!CompareList.has(element)) this.del(element);
                });
            }

            difference(CompareList: List<T>) : void {
                CompareList.forEach( (element: T) => this.del(element) );
            }

            union(compareList: List<T>) : void {
                compareList.forEach( (element: T) => {
                    if(!compareList.has(element)) this.add(element);
                });
            }

            clone() : List<T> {
                const temp : List<T> = new List<T>();
                this.forEach( (element: T) => temp.add(element) );
                return temp;
            }

            isSubsetOf(compareList: List<T>) : boolean {
                if(this.size != compareList.size)
                    return false;
                for(const k in this.__inner)
                    if(!compareList.has(this.__inner[k]))
                        return false;
                return true;
            }

            forEach(callback: (value?: T,key?: number,array?: T[]) => void ) : void {
                this.__inner.forEach(callback);
            }

            get size() : number {
                return this.__inner.length;
            }
            length = this.size;

            get count() : number {
                return this.size - 1;
            }

            isEmpty() : boolean {
                return this.__inner.length <= 0;
            }

            clear() : void {
                this.__inner = [];
            }

            freeze() : void {
                Object.freeze(this.__inner);
            }

            toString    = () : string => this.__inner.toString();
            toArray     = () : T[] => this.__inner;
            join        = (separator?: string) : string => this.__inner.join(separator);
        }

        export class Set<T> extends List<T> {

            constructor(Set? : T[]) {
                super(Set);
            }

            set(element: T,value: T) : boolean {
                if(this.has(element)) {
                    this.__inner[this.__inner.indexOf(element)] = value;
                    return true;
                }
                return false;
            }

        }

        export class Stack<T> extends List<T> {

            constructor(Stack? : T[]) {
                super(Stack);
            }

            peek() : T {
                return this.last();
            }

            pop() : T {
                return this.shift();
            }

            shift() : T {
                return this.pop();
            }

        }

        export class Queue<T> extends List<T> {

            private _max : number;

            constructor(max?: number) {
                super();
                this._max = max || 0;
            }

            enqueue(item: T | T[]) : void {
                if(this._max == 0 || this.count < this._max ) this.add(item);
            }

            dequeue() : T {
                return this.length > 0 ? this.shift() : undefined;
            }
        }

        export class PriorityQueue<T> {

            private heap : United.Collections.BinaryHeap<T>;

            constructor(compareFunction) {
                this.heap = new United.Collections.BinaryHeap<T>(compareFunction);
            }

            enqueue(element: T) : void {
                this.heap.push(element);
            }

            dequeue() : T {
                if(this.heap.size() !== 0) {
                    return this.heap.pop();
                }
                return undefined;
            }
        }

        export class BinaryHeap<T> {

            private content: T[];
            private compareFunction;

            constructor(compareFunction) {
                this.content = [];
                this.compareFunction = compareFunction;
            }

            push(node : T) : void {
                this.content.push(node);
                this.siftDown(this.content.length - 1);
            }
            add = this.push;

            clear() : void {
                this.content = [];
            }

            isEmpty() : boolean {
                return this.content.length <= 0;
            }

            pop() : T {
                const result : T = this.content[0];
                const end : T = this.content.pop();
                if (this.content.length > 0) {
                    this.content[0] = end;
                    this.siftUp(0);
                }
                return result;
            }

            peek() : T {
                return this.size() > 0 ? this.content[0] : undefined;
            }

            remove(node: T) : void {
                const nodeIndex : number = this.content.indexOf(node);
                const end : T = this.content.pop();

                if (nodeIndex !== this.content.length - 1) {
                    this.content[nodeIndex] = end;
                    if (this.compareFunction(end) < this.compareFunction(node)) {
                        this.siftDown(nodeIndex);
                    } else {
                        this.siftUp(nodeIndex);
                    }
                }
            }

            size = () : number => this.content.length;

            resetNode(node : T) : void {
                this.siftDown(this.content.indexOf(node));
            }

            private siftDown(n : number) : void {
                const element : T = this.content[n];
                while (n > 0) {
                    const parentN : number = ((n + 1) >> 1) - 1;
                    const parent : T = this.content[parentN];
                    if (this.compareFunction(element) < this.compareFunction(parent)) {
                        this.content[parentN] = element;
                        this.content[n] = parent;
                        n = parentN;
                    }
                    else {
                        break;
                    }
                }
            }

            private siftUp(n : number) : void {
                const element : T = this.content[n];
                const elemScore : any = this.compareFunction(element);

                while (true) {
                    const child2N : number = (n + 1) << 1;
                    const child1N : number = child2N - 1;
                    let swap : number,child1Score : any;

                    if (child1N < this.size()) {
                        child1Score = this.compareFunction(this.content[child1N]);
                        if (child1Score < elemScore) swap = child1N;
                    }

                    if (child2N < this.size() && this.compareFunction(this.content[child2N]) < (swap == undefined ? elemScore : child1Score)) {
                        swap = child2N;
                    }

                    if (swap == undefined) break;
                    this.content[n] = this.content[swap];
                    this.content[swap] = element;
                    n = swap;
                }
            }
        }

    }

    export const FPS : number = Sup.Game.getFPS();
    export type callback<T> = () => T;
    export const Path : string = "United/fonts/";
    export const Main : () => void  = function() {
        United.Engine.update();
    }

    export namespace Utils {

        export function clampNumber(number : number,clamp : [number,number]) : number {
            return window.Math.min(window.Math.max(number, clamp[0]), clamp[1]);
        }

        export const has = function(obj: any, prop: any) : boolean {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        export function randomObject(object:any) : any {
            const keys = Object.keys(object);
            return object[keys[ keys.length * window.Math.random() << 0]];
        }

        export function merge(obj1, obj2) {
            for (const p in obj2) {
                try {
                    obj1[p] = ( obj2[p].constructor==Object ) ? merge(obj1[p], obj2[p]) : obj2[p];
                }
                catch(e) {
                    obj1[p] = obj2[p];
                }
            }
            return obj1;
        }

        export function objectSize(obj) : number {
            let size : number = 0;
            for(const key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        }

        export function generateRandomVector2(range:number) : Sup.Math.Vector2 {
            const x : number = Sup.Math.Random.float(-range, range);
            const y : number = Sup.Math.Random.float(-range, range);
            return new Sup.Math.Vector2(x, y);
        }

        export function getRandom(min: number, max: number) : number {
          return window.Math.random() * (max - min) + min;
        }

    }

    export class Font {
        public static Default : string = `${Path}Exo-regular`;
        public static Exo : { [key:string] : string } = {
            regular :       `${Path}Exo-regular`
        }

        public static add(name:string, font:Sup.Asset) : boolean {
            if(!this[name]) {
                this[name] = font;
                return true;
            }
            return false;
        }

    }

    export module Tree {

        export function exist(path: string) : boolean {
            try {
                const Asset : Sup.Asset = Sup.get(path);
                return true;
            }
            catch(Err) {
                return false;
            }
        }

        export function is(path: string,type: string) {
            if(United.Tree.exist(path)) {
                if(typeof Sup.get(path) === type) return true;
            }
            return false;
        }
    }

    /*
        Addons abstract class (auto-register to the active scene and auto update the addon).
    */
    export abstract class Addons extends EventEmitter {
        constructor() {
            super();
            United.Engine.registerAddon(this);
        }
        abstract update();
    }

    /*
        United Behavior ! (Behavior linked to the United Engine).
    */
    export class Behavior extends Sup.Behavior {

        private __timer: United.Timer;
        protected __emitter : EventEmitter;

        constructor(actor: Sup.Actor) {
            super(actor);
            this.__emitter = new EventEmitter();
            this.__timer = new United.Timer(true);
        }

        awake() {}
        start() {}
        onDestroy() {}
        update() {}

        public get events() : EventEmitter {
            return this.__emitter;
        }

        protected get $() {
            return United.Engine.$;
        }

        protected walk(interval: number) : boolean {
            return this.__timer.walk(interval);
        }

        protected elapsed(elapsedTime: number) : boolean {
            return this.__timer.elapsed(elapsedTime);
        }

    }

    export interface Scenes_Storages {
        name: string;
        scenePath: string;
        addons?: United.Addons[];
    }

    export class Engine {

        public static activeScene: string;
        public static active: boolean = true;

        private static updated: boolean = false;
        private static storageScenes : { [key:string] : United.Scenes_Storages } = {};

        public static chunk : United.Collections.Chunk<any> = new United.Collections.Chunk<any>();
        public static get $() {
            return this.chunk.$;
        }

        public static registerAddon<T extends United.Addons>(addon: T,scene?: string) : boolean {
            let ActiveScene : string = scene || this.activeScene;
            if(!ActiveScene) {
                throw new Error(`Impossible d'enregister un addon alors qu'il n'existe aucune scène courante!`);
            }
            if(ActiveScene != this.activeScene) {
                console.warn("Impossible de charger un addon sur une scène non-courante!");
                return false;
            }
            this.storageScenes[ActiveScene].addons.push(addon);
            return true;
        }

        public static addScene(name: string,assetPath: string) : boolean {
            if(!United.Tree.exist(assetPath)) {
                throw new Error(`Impossible de charger la scène ${name} à partir de l'arbre superpowers !! Chemin => ${assetPath}`);
            }

            if(!this.storageScenes[name] ) {
                if(!this.activeScene) {
                    this.activeScene = name;
                }
                this.storageScenes[name] = {
                    name: name,
                    scenePath: assetPath,
                    addons: []
                }
                return true;
            }
            return false;
        }

        public static loadScene(name: string) : boolean {
            if(this.storageScenes[name]) {
                this.storageScenes[this.activeScene].addons = [];
                this.activeScene = name;
                Sup.loadScene(this.storageScenes[name].scenePath);
                return true;
            }
            return false;
        }

        public static break(sleepTime?:number) {
            this.active = false;
            if(sleepTime) setTimeout(() => this.active = true,sleepTime*1000);
        }

        public static update() {
            if(this.active && this.activeScene) {
                this.storageScenes[this.activeScene].addons.forEach( (addon: United.Addons) => addon.update());
            }
        }

    }

    export class Scanner {

        private stored: any;

        constructor(container: Sup.Actor, prefix ? : string[]) {
            this.stored = {
                ext: {}
            };
            if (prefix)
                this.scan(container, prefix);
        }

        public scan(container: Sup.Actor, prefix: string[]): void {
            const Recursive: (T: Sup.Actor[]) => void = (T) => {
                if (T.length > 0) {
                    T.forEach((v: Sup.Actor) => {
                        let find: number = 0;
                        const actorName: string = v.getName().toLowerCase();
                        prefix.forEach((name: string) => {
                            if (actorName.slice(0, name.length) == name.toLowerCase()) {
                                find = 1;
                                if (this.stored[name] == undefined)
                                    this.stored[name] = {};
                                this.stored[name][actorName] = v;
                            }
                        });
                        if (!find)
                            this.stored.ext[actorName] = v;
                        Recursive(v.getChildren());
                    });
                }
            }
            Recursive(container.getChildren());
        }

        public get(group: string): { [key: string]: Sup.Actor } | boolean {
            return (this.stored[group]) ? this.stored[group] : false;
        }

        public forEach(group: string, callback: (actor: Sup.Actor) => void): boolean {
            if (this.stored[group]) {
                for (const k in this.stored[group])
                    callback(this.stored[group][k]);
                return true;
            }
            return false;
        }

        public update(group: string[]): void {
            group.forEach((prefix: string) => {
                for (const k in this.stored.ext) {
                    const actor: Sup.Actor = this.stored.ext[k];
                    const actorName: string = actor.getName().toLowerCase();
                    if (actorName.slice(0, prefix.length) == prefix) {
                        if (!this.stored[prefix]) {
                            this.stored[prefix] = {};
                        }
                        this.stored[prefix][actorName] = actor;
                        this.stored.ext[k] = undefined;
                        delete this.stored.ext[k];
                    }
                }
            });
        }

    }

    export class Timer extends United.Addons {

        private elapsedFrame: number;
        private started: boolean;

        constructor(autoStart?: boolean) {
            super();
            this.reset();
            this.started = autoStart || true;
        }

        public start() {
            this.emit("start");
            this.started = true;
            this.reset();
        }

        public stop() {
            this.emit("stop");
            this.started = false;
        }

        public reset() : void {
            this.emit("reset");
            this.elapsedFrame = 0;
        }

        public toFormat(format: string) : number {
            return 0;
        }

        public update() : void {
            if(this.started) this.elapsedFrame++;
        }

        public walk(interval: number) : boolean {
            return (this.started && this.elapsedFrame % interval == 0) ? true : false;
        }

        public elapsed(elapsedFrame: number) {
            return (this.started && this.elapsedFrame >= elapsedFrame) ? true : false;
        }

    }

}
import U = United;
