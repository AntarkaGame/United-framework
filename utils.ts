interface Window {
    Math: typeof Math;
}

namespace Utils {

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

    export function objectSize(obj : any) : number {
        let size : number = 0;
        for(const key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    };

    export function generateRandomVector2(range:number) : Sup.Math.Vector2 {
        const x : number = Sup.Math.Random.float(-range, range);
        const y : number = Sup.Math.Random.float(-range, range);
        return new Sup.Math.Vector2(x, y);
    }

    export function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    export function clampNumber(number : number,clamp : [number,number]) : number {
        return Math.min(Math.max(number, clamp[0]), clamp[1]);
    }

    const _hasOwnProperty = Object.prototype.hasOwnProperty;
    export const has = function(obj: any, prop: any) : boolean {
        return _hasOwnProperty.call(obj, prop);
    }

    export function randomObject(object:any) : any {
        const keys = Object.keys(object);
        return object[keys[ keys.length * Math.random() << 0]];
    }

    export function isFunction(func: any): boolean {
        return (typeof func) === 'function';
    }

    export function isUndefined(obj: any): boolean {
        return (typeof obj) === 'undefined';
    }

    export function isString(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object String]';
    }

}
