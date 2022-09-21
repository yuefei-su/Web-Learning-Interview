## object.is()，==和===

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化（布尔值，数值，原始值）后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如`-0`和`+0`不再相等，两个`NaN`是相等的。


```js
//==相当于约等于
true == 1;//true，转为布尔值

'55' == 55;//true，转为数值

{valueOf:function(){return 1}} == 1;//true，转为原始值

null == undefined;//true

NaN == NaN;//false重点重点重点

let obj1 = {name:"xxx"}
let obj2 = {name:"xxx"}
let result1 = (obj1 == obj2 ); // false

//常见练习：操作符两边的值都尽量转成number
'' == '0' // false，类型相同，不存在类型转换
0 == '' // true，转为数值
0 == '0' // true，转为数值

false == 'false' // false
false == '0' // true
false == undefined // false重点
false == null // false重点
null == undefined // true重点重点重点

' \t\r\n' == 0 // true
```