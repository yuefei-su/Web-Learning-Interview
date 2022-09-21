
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

- Proxy

Reflect 对象上面的方法和 Proxy 上面都是一一对应的，参数也是完全相同的，因此在 Proxy 中可以使用 Reflect 来操作对象：

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