import container from './container';
import "reflect-metadata";

export function inject(...args):any {
    let target = args[0];
    let key = args[1];
    if( typeof target =='object' ){
        let Interface:Function = Reflect.getMetadata("design:type", target, <string>key);
        container.registerDependency(target.constructor,key,Interface);
    }else{
        let args = arguments;
        return (clazz,name) =>{
            container.registerDependencies.apply(container, [clazz].concat(Array.prototype.slice.call(args)));
        }
    }


}