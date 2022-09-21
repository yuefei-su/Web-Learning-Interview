==操作符的强制类型转换

## js数据类型转换
### 1. 显示转换

#### (1).  Number()：将任意类型转换为数值

Number转换的时候是很严格的，只要有一个字符（字符串、undefined、对象）无法转成数值，整个字符串就会被转为NaN
```javascript
// null：转成0
Number(null) // 0

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

//数字
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// undefined：转成 NaN
Number(undefined) // NaN

// 对象：通常转换成NaN(除了只包含单个数值的数组)
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

#### (2).  parseInt()：逐个解析字符，遇到不能转换的字符就停下来
```javascript
parseInt('32a3') //32
```

#### (3).  String()：将任意类型的值转化成字符串
```javascript
// 数值：转为相应的字符串
String(1) // "1"

//字符串：转换后还是原来的值
String("a") // "a"

//布尔值：true转为字符串"true"，false转为字符串"false"
String(true) // "true"

//undefined：转为字符串"undefined"
String(undefined) // "undefined"

//null：转为字符串"null"
String(null) // "null"

//对象
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

#### (4).  Boolean()：将任意类型的值转为布尔值
```javascript
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false，空字符串


Boolean({}) // true，任意对象均为true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

### 2. 隐式转换
两种情况发生隐式转换的场景：
- 比较运算（==、!=、>、<）、if、while需要布尔值地方
- 算术运算（+、-、*、/、%）

#### （1）.自动转换为布尔值
在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用Boolean函数
#### （2）.自动转换为字符串
常发生在`+`运算中，一旦存在字符串，则会进行字符串拼接操作
```javascript
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```
#### （3）.自动转换为数值
除了`+`有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值
```javascript
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN-1=>NaN
null + 1 // 1
undefined + 1 // NaN
```
null转为数值时，值为0 ;`undefined`转为数值时，值为`NaN`
