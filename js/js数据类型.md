## JavaScript数据类型
### 1.JavaScript有八种数据类型（7个基本数据类型+1（3）引用数据类型）
- Undefined（变量没有初始化，未定义）
- Null（null 值表示一个空对象指针）
- Boolean（true|false）
- Number(八进制（零开头）、十六进制（0x开头）,科学计数法e，NaN“不是数值”)
- String
- Object（Object,Array,Function）
- Symbol(ES6:代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。)
- BigInt(一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。)

### 2. 基本数据类型和引用数据类型

#### （1） 基本数据类型：Undefined、Null、Boolean、Number、String、Symbol、BigInt
- 简单类型的值存放在**栈（stack）**中，在栈中存放的是对应的**值**，赋值传值。   
- 存储在栈中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。栈内存由编译器自动分配释放。


#### （2） 引用数据类型：Object（Object,Array,Function）
- 引用类型对应的值存储在**堆（heap）**中，在栈中存放的是指向堆**内存的地址**，赋值传地址。   
- 存储在堆中的对象，占据空间大、大小不固定。**引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址**。堆内存由开发者分配释放，若开发者不释放，程序结束时可能由**垃圾回收机制**回收。

##### Object
```js
let person = {
    name: "Nicholas",
    "age": 29,//属性名可以是字符串或数值
    5: true
};
```
##### Array
```js
let colors = ["red", 2, {age: 20 }]
colors.push(2)
```
##### Function
```js
//函数声明式
function sum1 (num1, num2) {
    return num1 + num2;
}

//函数表达式
let sum2 = function(num1, num2) {
    return num1 + num2;
};

//箭头函数
let sum3 = (num1, num2) => {
    return num1 + num2;
};
```