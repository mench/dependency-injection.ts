export default class Container {
    static bind(iClass: Function, Class: Function, options?: any): void;
    static getInstanceOf(clazz: any): any;
    private static resolve(clazz);
    private static resolveInstance(clazz);
    static registerAsSingleton(clazz: any): void;
    private static resolveSingleton(clazz);
    static registerDependencies(clazz: any, ...dependencies: any[]): void;
    static registerDependency(clazz: Function, key: string, Interface: Function): void;
    private static inject(clazz, dependencies);
}
