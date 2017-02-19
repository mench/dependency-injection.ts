const bindings = new Map();
const singletons = new Map();
const DEPENDENCIES = Symbol('DEPENDENCIES');
const INJECT = Symbol('INJECT');

export default class Container {

    public static bind(iClass:Function,Class:Function,options?){
        Object.setPrototypeOf(Class,iClass);
        bindings.set(iClass,Class);
        if(options && options.singleton){
            this.registerAsSingleton(Class);
        }
    }
    public static getInstanceOf(clazz):any{
        if(bindings.has(clazz)){
            clazz = bindings.get(clazz);
        }
        return this.resolve(clazz);
    }
    private static resolve(clazz){
        if(singletons.has(clazz)) {
            return this.resolveSingleton(clazz);
        }
        return this.resolveInstance(clazz);
    }
    private static resolveInstance(clazz){
        if(typeof clazz !="function") throw new Error(`${clazz} must be class not a ${typeof clazz}`);
        let classes = clazz[DEPENDENCIES] || [];
        let dependencies = classes.map(this.getInstanceOf.bind(this));
        return this.inject(clazz,dependencies);
    }
    public static registerAsSingleton(clazz) {
        if(!singletons.has(clazz)) {
            singletons.set(clazz, null);
        }
    }
    private static resolveSingleton(clazz) {
        if(singletons.get(clazz) === null) {
            singletons.set(clazz, this.resolveInstance(clazz));
        }
        return singletons.get(clazz);
    }
    public static registerDependencies(clazz, ...dependencies) {
        clazz[DEPENDENCIES] = dependencies
    }
    public static registerDependency(clazz:Function,key:string,Interface:Function){
        let inject = clazz[INJECT];
        if( !inject ){
            inject = clazz[INJECT] = {};
        }
        inject[key] = Interface;
    }
    private static inject(clazz,dependencies:Array<any>){
        let injectors = clazz[INJECT] || {};
        let instance = Object.create(null);
        Object.keys(injectors)
            .forEach(key=>{
                instance[key] = this.getInstanceOf(injectors[key]);
            });
        Object.setPrototypeOf(instance,clazz.prototype);
        clazz.apply(instance,dependencies);
        return instance;
    }
}
