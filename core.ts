declare var window: any;
declare var console: any;

namespace United {

    export module Collections {

        export class Chunk<I> {

            public static safeMode : boolean = false;

            public $ : I;
            private defaultValues : I;
            private _auth : boolean;

            constructor(defaultValues?: I) {
                this._auth = true;
                this.$ = <I>{};
                this.defaultValues = <I>{};
                if(defaultValues != undefined) {
                    this.declare(defaultValues);
                }
            }

            clone() : United.Collections.Chunk<I> {
                return new United.Collections.Chunk<I>(this.$);
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
                    for(const key in this.$) this.$[key] = this.defaultValues[key];
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
        window.requestAnimationFrame(United.Main);
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

    export namespace Exception {

        declare class Error {
            public name: string;
            public message: string;
            public stack: string;
            constructor(message ? : string);
        }

        export class InternalError extends Error {

            constructor(message: string = "United internal error") {
                super(message);
                United.Engine.events.emit("InternalError",message);
                this.name = 'InternalError';
                this.message = message;
                this.stack = (<any>new Error()).stack;
            }

            public toString(): string {
                return this.name + ': ' + this.message;
            }

        }

        export class NotImplemented extends Error {

            constructor(message: string = "Method is not implemented!") {
                super(message);
                United.Engine.events.emit("NotImplemented",message);
                this.name = 'NotImplementedException';
                this.message = message;
                this.stack = (<any>new Error()).stack;
            }

            public toString(): string {
                return this.name + ': ' + this.message;
            }

        }

    }

    export class Font {
        public static Default : string = `${Path}Exo-regular`;
        public static Exo : { [key:string] : string } = {
            regular :       `${Path}Exo-regular`
        }

        public static add(name:string, asset:Sup.Asset) : boolean {
            if(!this[name]) {
                this[name] = asset;
                return true;
            }
            return false;
        }

        public static get(fontName: string) : string {
            return this[fontName];
        }

    }

    export namespace Tree {

        export function exist(path: string) : boolean {
            try {
                const Asset : Sup.Asset = Sup.get(path);
                return true;
            }
            catch(Err) {
                return false;
            }
        }
    }

    export namespace Log {

        export let level: number = 0;
        export let debug: boolean = true;

        export enum Severity {
            critical = 0,
                major = 1,
                minor = 2,
                debug = 3,
                information = 4
        }

        export interface Message {
            severity ? : United.Log.Severity;
            message: string;
        }

        export class Main {

            private level: number;
            private store: United.Collections.PriorityQueue<United.Log.Message>;

            constructor(level ? : number) {
                this.level = level || United.Log.level;
                this.store = new United.Collections.PriorityQueue < United.Log.Message > ((node: United.Log.Message) => node.severity);
            }

            print(object: United.Log.Message) {
                if (object.severity == undefined) {
                    object.severity = United.Log.Severity.information;
                }
                this.store.enqueue(object);
                if (object.severity == United.Log.Severity.critical) {
                    throw new Error(object.message);
                } else if (object.severity == United.Log.Severity.major) {
                    console.warn(object.message);
                } else {
                    console.log(object.message);
                }
            }

            get(): void {
                throw new United.Exception.NotImplemented();
            }
        }
    }

    /*
        Addons abstract class (auto-register to the active scene and auto update the addon).
    */
    interface AddonConstructor {
        defaultName: string;
        global?: boolean;
        lockingScene?: string;
        parentAddon ?: United.Addon;
    }

    export abstract class Addon extends EventEmitter {

        public __name: string = "Undefined_plugin";
        private __lockName: string;
        private __parentAddon: United.Addon;
        protected log: United.Log.Main;

        constructor(constructorOpt: AddonConstructor) {
            super();
            if (constructorOpt.lockingScene) this.__lockName = constructorOpt.lockingScene;
            if (constructorOpt.defaultName) this.__name = constructorOpt.defaultName;
            if (constructorOpt.parentAddon) this.__parentAddon = constructorOpt.parentAddon;
            const opts = {
                addon: this,
                globalRegistering: constructorOpt.global ? true : false,
                sceneName: constructorOpt.lockingScene,
                parentAddon: constructorOpt.parentAddon ? true : false,
            }
            if (!United.Engine.registerAddon(opts)) {
                Sup.setTimeout(1000, () => {
                    if (!United.Engine.registerAddon(opts)) {
                        console.warn("Failed to register a new Addon!");
                        delete this;
                    }
                });
            }
        }

        get lockingName(): string {
            return this.__lockName;
        }

        get parent(): United.Addon {
            return this.__parentAddon;
        }

        abstract update();
    }

    export class Addons {
        static HUD: United.HUD;

        static isDeclared(addonName: string) : boolean {
            return this[addonName] ? true : false;
        }

        static declare<T extends United.Addon>(addonName: string,instance: T) : boolean {
            if(!this[addonName]) {
                this[addonName] = instance;
                return true;
            }
            return false;
        }
    }

    /*
        United Behavior ! (Behavior linked to the United Engine).
    */
    export class Behavior<T> extends Sup.Behavior {

        private __timer: United.Timer;
        protected __emitter: EventEmitter;

        constructor(actor: Sup.Actor) {
            super(actor);
            this.__emitter  = new EventEmitter();
            this.__timer    = new United.Timer(true);
            actor["events"] = this.__emitter;
        }

        awake() {}
        start() {}
        onDestroy() {}
        update() {}

        public get events(): EventEmitter {
            return this.__emitter;
        }

        protected get $(): T {
            return United.Engine.$<T>();
        }

        protected walk(interval: number): boolean {
            return this.__timer.walk(interval);
        }

        protected elapsed(elapsedTime: number): boolean {
            return this.__timer.elapsed(elapsedTime);
        }

    }

    /*
        United Scene
    */
    export class Scene<T> extends EventEmitter {

        public name: string;
        public asset: string;
        public self: United.Collections.Chunk<T>;
        public chunks: United.Collections.Chunk<any>[];
        public addons: United.Addon[];

        constructor(arg: sceneRegistering<T>) {
            super();
            if (!United.Tree.exist(arg.asset)) {
                throw new United.Exception.InternalError(`Impossible de charger la scène ${arg.name} à partir de l'arbre superpowers !! Chemin => ${arg.asset}`);
            }
            this.reset();
            this.name   = arg.name;
            this.asset  = arg.asset;
            this.self   = arg.chunk ? arg.chunk : new United.Collections.Chunk<T>();
            United.Engine.registerScene<T>(this);
        }

        reset() : void {
            this.addons = [];
            this.chunks = [];
        }
    }

    /*
        United Engine
    */
    interface registeringAddon<T extends United.Addon> {
        addon: T;
        sceneName?: string;
        globalRegistering?: boolean;
        parentAddon?: boolean;
    }

    export interface sceneRegistering<T> {
        name: string;
        asset: string;
        chunk?: United.Collections.Chunk<T> ;
    }

    export class Engine {

        public static running: boolean = true;
        public static events: EventEmitter = new EventEmitter();

        private static scenes: United.Collections.Map<United.Scene<any>> = new United.Collections.Map<United.Scene<any>>();
        private static addons: United.Addon[] = [];
        private static __activeScene: string;

        public static $<T>(): T {
            return this.scenes.get(this.activeScene).self.$ as T;
        }

        public static get activeScene(): string {
            return this.__activeScene;
        }

        public static set activeScene(name: string) {
            this.loadScene(name);
        }

        public static ifAddonRegistered<T extends United.Addon> (addon: T): boolean {
            if (this.addons.indexOf(addon) != -1) return true;
            for (let value of this.scenes.values())
                if (value.addons.indexOf(addon) != -1) return true;
            return false;
        }

        public static registerAddon<T extends United.Addon> (option: registeringAddon<T>): boolean {
            const activeScene: string = option.sceneName || this.__activeScene;
            if ((typeof activeScene) === "undefined") {
                throw new United.Exception.InternalError(`Impossible d'enregister un addon alors qu'il n'existe aucune scène courante!`);
            }

            if (option.parentAddon) {
                if (!this.ifAddonRegistered(option.addon.parent)) {
                    return false;
                }
            }

            if (option.addon.lockingName) {
                if (activeScene != option.addon.lockingName) {
                    console.warn(`explicit addon ${option.addon.__name} registering out of authorized locking => ${option.addon.lockingName}`)
                    return false;
                }
            }
            this.events.emit("registeringAddon",option.addon);
            this.scenes.get(activeScene).addons.push(option.addon);
            return true;
        }

        public static restrictChunk<T>(chunk: United.Collections.Chunk<T> , sceneName: string) : void {
            if (this.scenes.has(sceneName)) {
                if (this.__activeScene != sceneName) {
                    chunk.authentification = true;
                }
                this.scenes.get(sceneName).chunks.push(chunk);
            }
        }

        public static registerScene<T>(scene: United.Scene<T>): boolean {
            if (!this.scenes.has(scene.name)) {
                if (this.__activeScene == undefined) {
                    this.activeScene = scene.name;
                }
                this.scenes.add(scene.name, scene);
                return true;
            }
            return false;
        }

        public static startupScene(name: string) : void {
            if(!this.scenes.has(name)) {
                throw new United.Exception.InternalError(`No game scene with the name => ${name}`);
            }
            Sup.setTimeout(10,() => {
                this.activeScene = name;
            });
        }

        protected static loadScene(name: string): void {
            if (this.scenes.has(name)) {
                if(this.__activeScene != undefined) {
                    const oldScene: United.Scene<any> = this.scenes.get(this.__activeScene);
                    oldScene.reset();
                    oldScene.emit("die");
                }
                this.__activeScene = name;
                const focusedScene: United.Scene<any> = this.scenes.get(name);
                focusedScene.emit("load");
                this.events.emit("loadingScene");
                Sup.loadScene(focusedScene.asset);
            }
        }

        public static stopExecution(sleepTime: number = 0) : void {
            this.running = false;
            this.events.emit("stopExecution");
            if(sleepTime > 0) {
                Sup.setTimeout(sleepTime * 1000,() => this.running = true);
            }
        }

        public static clean() : void {
            this.addons = [];
        }

        public static update() {
            if (this.running && this.__activeScene) {
                this.addons.forEach((addon: United.Addon) => {
                    addon.update();
                });
                this.scenes.get(this.__activeScene).addons.forEach((addon: United.Addon) => {
                    if (addon.lockingName === undefined || this.activeScene == addon.lockingName) {
                        addon.update();
                    }
                });
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

    export class Timer extends United.Addon {

        private elapsedFrame: number;
        private started: boolean;

        constructor(autoStart: boolean = true) {
            super({
                defaultName: "Timer"
            });
            this.reset();
            this.started = autoStart;
        }

        public start() : void {
            this.emit("start");
            this.started = true;
            this.reset();
        }

        public stop() : void {
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

        public elapsed(elapsedFrame: number) : boolean {
            return (this.started && this.elapsedFrame == elapsedFrame) ? true : false;
        }

    }

}
import U = United;
if(window.requestAnimationFrame) {
    window.requestAnimationFrame(United.Main);
}
else {
    United.Main();
    Sup.setInterval(1000/U.FPS,United.Main);
}
