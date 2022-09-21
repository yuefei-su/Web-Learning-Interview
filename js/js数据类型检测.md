## js数据类型检测

### 1. typeof
```JavaScript
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof Symbol()) ;               // symbol
console.log(typeof 'str');           // string
console.log(typeof []);              // object    
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object
```
**其中数组、对象、null都会被判断为object，其他判断都正确。**


```JavaScript
typeof NaN; // "number"

NaN !== NaN //true

//NaN为“执行数学运算没有成功，这是失败后返回的结果”

//函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。
```



### 2. instanceof
`instanceof`可以正确判断**引用数据类型**，**其内部运行机制是判断构造函数（后者）的prototype属性是否出现在某个实例对象（前者）的原型链（\_\_proto\_\_）上**
```JavaScript
//手撕instanceof
function myInstanceof(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if(typeof left !== 'object' || left === null) return false;
    // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {                  
        if(proto === null) return false;
        if(proto === right.prototype) return true;//找到相同原型对象，返回true
        proto = Object.getPrototypeof(proto);
    }
}
```

```JavaScript
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 

let str = new String('xxx')
console.log(str instanceof String);                  // true 

console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

### 3. constructor
`constructor`有两个作用，一是判断数据的类型，二是实例对象通过 `constructor` 访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了.
```JavaScript
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```

### 4. Object.prototype.toString.call()
调用`Object.prototype.toString.call()`方法，统一返回格式`“[object Xxx]”`的字符串。toString是Object的原型方法，而Array、function等**类型作为Object的实例，都重写了toString方法**。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型.
```JavaScript
var a = Object.prototype.toString;
 
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));
```

### 5. 判断数组的方法
- 通过`Object.prototype.toString.call()`做判断

```javascript
Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
```

- 通过原型链做判断

```javascript
obj.__proto__ === Array.prototype;
```

- 通过instanceof做判断

```javascript
obj instanceof Array
```

- 通过constructor做判断
```JavaScript
(obj).constructor === Array 
```

- 通过`Array.prototype.isPrototypeOf`

```javascript
Array.prototype.isPrototypeOf(obj)
```

- 通过ES6的`Array.isArray()`做判断

```JavaScript
Array.isArray(obj);
```
