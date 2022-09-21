

### 链接
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

[掘金](https://juejin.cn/post/6995548370706104350)

### 实例

#### 浅拷贝
```js
const target = { a: 1, b: 2 }
const source = { b: 3, c: 4 }

const result = Object.assign(target, source)

console.log(target)  //  { a: 1, b: 3, c: 4 }
console.log(result)  // { a: 1, b: 3, c: 4 }

console.log(target === result) // true
```


#### 判断
```js
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25);                // true
Object.is('foo', 'foo');          // true
Object.is('foo', 'bar');          // false
Object.is(null, null);            // true
Object.is(undefined, undefined);  // true
Object.is(window, window);        // true
Object.is([], []);                // false
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);              // true
Object.is(foo, bar);              // false

// Case 2: Signed zero
Object.is(0, -0);                 // false
Object.is(+0, -0);                // false
Object.is(0, +0)                  // true
Object.is(-0, -0);                // true
Object.is(0n, -0n);               // true

// Case 3: NaN
Object.is(NaN, 0/0);              // true
Object.is(NaN, Number.NaN)        // true

```

#### 键值对
```js
let obj = {
    name: 'ruovan',
    age: 24
}
Object.entries(obj) // [['name', 'ruovan'], ['age', 24]]
```

```js
let arr = [['name', 'ruovan'], ['age', 24]]
Object.fromEntries(arr) // { name: 'ruovan', age: 24 }

const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
Object.fromEntries(map);// { foo: "bar", baz: 42 }
```

#### 获取属性
```js
const obj = {};
obj.number = 24

console.log(obj.hasOwnProperty('number')) // true

// 不包括从原型链上继承的属性
console.log(obj.hasOwnProperty('toString')) // false
console.log(obj.hasOwnProperty('hasOwnProperty')) //false
```

#### 枚举
```js
let numbers = {
  one: 1, 
  two: 2,
};
let key = Object.keys(numbers); // key = [ 'one', 'two' ]
let value = Object.values(numbers);  // value = [ 1, 2 ]
let entry = Object.entries(numbers); // entry = [['one' , 1], ['two' , 2]]

let fromEntrie = Object.fromEntries(entry);//fromEntrie = { "one": 1, "two": 2}
```

#### 字符串
```js
let obj = { a: 1, b: 2 }
let arr = [1,2,3]
let str = '123'

obj.toString() // [object Objetc]
arr.toString() // 1,2,3
str.toString() // 123
```

```js
let num = 123456789
num.toLocaleString() // '123,456,789'

let date = new Date()
date.toString() // '...' (省略了)
date.toLocaleString() // '2021/8/12 下午11:00:00'
```
