
## Proxy
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
const p = new Proxy(target, handler)
```
Proxy是构造函数，它有两个参数target和handler。
Proxy只有一个静态方法`Proxy.revocable(target, handler)`：创建一个可撤销的Proxy对象。

- target是用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

- handler是一个对象，其属性是当执行一个操作时定义代理的行为的函数。

### handler对象的方法
```js
get(target,propKey,receiver)：拦截对象属性的读取
set(target,propKey,value,receiver)：拦截对象属性的设置
has(target,propKey)：拦截propKey in proxy的操作，返回一个布尔值
deleteProperty(target,propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值
ownKeys(target)：拦截Object.keys(proxy)、for...in等循环，返回一个数组
getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc），返回一个布尔值
preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值
getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值
setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值
apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作
construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作
```

## Reflect内置对象

### Reflect的方法
Reflect内置对象,提供了一系列操作**对象**的静态方法。（类似Math）
```js
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
```

### Reflect 和 Object 的区别
[MDN:比较 Reflect 和 Object 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods)

#### 1. 获取Object上的所有key
- 使用Object方法

`Object.keys(obj);`或者`Object.getOwnPropertyNames(obj);`然而获取只能到key为字符串的属性，key为Symbol类型的属性获取不到。因此需要拼接。
```js
Object.getOwnPropertyNames(obj)
    .concat(Object.getOwnPropertySymbols(obj));
```

- 使用Reflect方法

```js
Reflect.ownKeys(obj);
```


#### 2.为Object添加或者删除属性（key-value）
如果我想要异常我可以自己判断在失败时抛出异常，而不是你直接给我一个异常我原本处理失败的逻辑现在都要写 catch 块中。
- 使用Object方法

```js
try {
    Object.defineProperty(obj, prop, attr);
    // success
} catch (e) {
    // fail
}
```
Object.defineProperty() 返回传递给函数的对象。如果未在对象上成功定义属性，则返回TypeError。

- 使用Reflect方法

```js
if (Reflect.defineProperty(obj, prop, attr)) {
  // success
} else {
  // fail
}
```
如果在对象上定义了属性，则Reflect.defineProperty()返回true，否则返回false。  

---

再比如删除属性，在不使用 Reflect 时需要使用 delete 关键字，而使用 Reflect 可以调用上面的 deleteProperty 方法来实现功能，其中的区别和添加属性类似，在实际开发中可以有更明显的感受。   

--- 


### Reflect的应用

#### Proxy  
若需要在Proxy内部调用对象的默认行为，**建议使用Reflect来操作对象**，其是ES6中操作对象而提供的新 API。  

建议使用Reflect来操作对象的原因：
- Reflect 对象上面的方法和 Proxy 上面都是一一对应的，参数也是完全相同的。
- 修改某些Object方法的返回结果，让其变得更合理（定义不存在属性行为的时候不报错而是返回false）
- 让Object操作都变成函数行为

```js
new Proxy(obj, {
  set(...args) {
    return Reflect.set(...args)
  },
  get(...args) {
    return Reflect.get(...args);
  },
  deleteProperty(...args) {
    return Reflect.deleteProperty(...args);
  },
  has(...args) {
    return Reflect.has(...args);
  }
}
```


[掘金参考1](https://juejin.cn/post/6844903790739456013)

[面试官参考2](https://vue3js.cn/interview/es6/proxy.html)