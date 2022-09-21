## 对象的创建和继承

### 1. 对象的创建：构造函数＋原型的组合模式

#### （1）new操作符的实现步骤

1. 创建一个新的空对象
2. 将构造函数的作用域赋给新对象（也就是将实例对象的__proto__属性指向构造函数的prototype属性）
3. 指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）
4. 根据构建函数返回类型作判断，如果是原始值则被忽略；如果是返回对象，需要正常处理

注意：箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。

```js
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
t.sayName() // 'Tom
```
![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/b429b990-7a39-11eb-85f6-6fac77c0c9b3.png)

#### （2）手写new操作符
```js
//手写mynew
function mynew(Func, ...args) {
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}

//以下为测试
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.name)
}

let p = mynew(Person, "huihui", 123)
console.log(p) // Person {name: "huihui", age: 123}
p.say() // huihui
```


### 2. 对象的继承

ES6:利用babel工具进行转换，我们会发现extends实际采用的也是寄生组合继承方式，因此也证明了这种方式是较优的解决继承的方式
```js
class Person {
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    return this.name
  }
}

class Gamer extends Person {
  constructor(name, age) {
    super(name)//调用父类的constructor方法，子类得到“this”
    this.age = age//添加新属性，也可以覆盖父属性
  }
  getName(){
    return super.getName()+''+this.age //调用父类的getName 
  }
}

const asuna = new Gamer('Asuna', 20)
console.log(asuna.getName())
```

寄生组合式继承：`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

```js
function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function Parent6() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
    return this.name;
}
function Child6() {
    Parent6.call(this);
    this.friends = 'child5';
}

clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
    return this.friends;
}

let person6 = new Child6(); 
console.log(person6); //{friends:"child5",name:"child5",play:[1,2,3],__proto__:Parent6}
console.log(person6.getName()); // parent6
console.log(person6.getFriends()); // child5
```