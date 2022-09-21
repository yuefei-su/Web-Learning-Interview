## 普通函数、箭头函数this指向和call、apply、bind



- 普通函数是调用的时候决定this值，this指向可改变
- 箭头函数是定义的时候决定this值，this指向固定

### 1. 常规this指向

this 是**执行上下文**中的一个**属性**，它指向**最后一次调用**这个方法的**对象**。

```js
const name="lucy";
const obj={
    name:"martin",
    say:function () {
        console.log(this.name);
    }
};

obj.say(); //martin，this指向obj对象

//在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的
setTimeout(obj.say,0); //lucy，this指向window对象
```
回调函数：dom事件回调函数，定时器回调函数，ajax请求回调函数，生命周期回调函数等等。  

在实际开发中，this 的指向可以通过四种调用模式来判断。

- 第一种是**函数调用模式**，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
```js
test()  //this指向window
```
- 第二种是**方法调用模式**，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
```js
p.test() //this指向p
p1.p2.test() //this指向p2

var b = b1.b2.test()
b() //this指向b
```
- 第三种是**构造器调用模式**，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
```js
var p = new test() //this指向p
```
- 第四种是 **apply 、 call 和 bind 调用模式**，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。
```js
p.call(obj) //this指向obj
```

优先级：new构造器调用模式>apply、call 和 bind 调用模式>方法调用模式>函数调用模式

### 2. 箭头函数及其this指向
- 箭头函数没有自己的this
- 箭头函数的this在函数定义的时候，继承于该函数**外部非箭头函数**的this值
- 箭头函数继承来的this永远不能改变
- 箭头函数没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能作为构造函数使用

```js
let obj = {
    name:"kobe"
    getName(){
        return () => {
            console.log(this)
        }
    }
}
obj.getName()  //obj
```

```js
let obj = {
    name:"kobe"
    getName: () => {
        return () => {
            console.log(this)
        }
    }
}
obj.getName()  //window
```

### 3. apply(),call()和bind() 的区别？

它们的作用一模一样，区别仅在于传入参数的形式的不同。

- `apply(thisArg,[argArray])` 立即调用。apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合为**数组或类数组**，apply 方法把这个集合中的元素作为参数传递给被调用的函数。

```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.apply(obj,[1,2]); // > {"myname":"张三"},[1,2]
fn(1,2) // this指向window

fn.apply(null,[1,2]); // this指向window
fn.apply(undefined,[1,2]); // this指向window
```
- `call(thisArg,arg1,arg2,···)` 立即调用。call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。

```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // > {"myname":"张三"},[1,2]
fn(1,2) // this指向window

fn.call(null,[1,2]); // this指向window
fn.call(undefined,[1,2]); // this指向window
```


- `bind(thisArg,arg1,arg2,···)` **改变this指向后不会立即执行**，而是返回一个永久改变this指向的函数。参数可以多次传入。

```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // > {"myname":"张三"},[1,2]
fn(1,2) // this指向window
```

```js
//参数可以多次传入
// 方式一：只在bind中传递函数参数
fn.bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.bind(obj,1)(2)
```
