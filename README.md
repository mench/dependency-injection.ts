# dependency-injection.ts

dependency-injection.ts is a dependency injection library for Node.js and Javascript environments where TypeScript is supported.

Dependency injection is a software design pattern that implements inversion of control for resolving dependencies. A dependency is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it.

## Installation

```sh
$ npm install --save dependency-injection.ts
```

## Requirements

dependency-injection.ts requires a TypeScript environment with classes and  decorators.

### Note.
To get use of lib please include  **"experimentalDecorators": true**   and **"emitDecoratorMetadata": true** in tsconfig.json file

## Getting Started 

For resolving dependencies of classes you will need to use @inject decorator and  container class to resolve instance  

```typescript
import {container,inject,singleton} from 'dependency-injection.ts';

class SameClass {}

class App {

    @inject
    public config:SameClass;
}
```

### Example

#### Service Classes

```typescript

abstract class MessageService {

    abstract sendMessage(msg:string);
  
}
```

```typescript
import {singleton} from 'dependency-injection.ts';

@singleton
class EmailService extends MessageService {
    
    public sendMessage(msg:string){
        console.info("Email Message sent from EmailService");
    }
}
```

EmailService is one of the implementations of MessageService. Notice that class is annotated with 
@singleton annotation. Since service objects will be created through injector classes, this annotation is provided to let them know that the service classes are singleton objects.

We have another service implementation to send facebook messages.

```typescript
import {inject} from 'dependency-injection.ts';

class FacebookService extends MessageService {
    
    public sendMessage(msg:string){
        console.info("Message sent to Facebook user from FacebookService");
    }
}
```

#### Consumer Class

```typescript
import {inject} from 'dependency-injection.ts';
import MessageService from './MessageService';

class MyApplication {

    @inject
    private service:MessageService;
  
    constructor(){
        console.info("will be injected",this.service);
    }
}
```

#### Bindings

```typescript
import {container} from 'dependency-injection.ts';

//bind the service to implementation class
container.bind(MessageService,EmailService);

//or bind MessageService to Facebook Message implementation 
//container.bind(MessageService,FacebookService);

//make a singleton with option {singleton:true}
//container.bind(MessageService,MessageService,{singleton:true});


```

#### Resolve instance
You can get injected class instance by calling getInstanceOf() method.
```typescript

var instance = container.getInstanceOf(MyApplication);
instance.service.sendMessage("Hello");

```



```typescript
import {container,inject} from 'dependency-injection.ts';

class Config {
    get(){ return {/** .. **/}}
}

class Service {

    @inject
    public config:Config;
}

class App{
    
    @inject
    public service:Service;
}

var service = container.getInstanceOf(Service);
console.info(service);

```

#### Inject with constructor.

```typescript
import {container,inject} from 'dependency-injection.ts';
import {MyDependency1} from './my-dependency1';
import {MyDependency2} from './my-dependency2';

@inject(MyDependency1,MyDependency2)
class MyApplication {
    constructor(myDependency1,myDependency2) {
        this.myDependency1 = myDependency1;
        this.myDependency2 = myDependency2;
    }
}

```
Dependencies of a class are injected through the constructor.