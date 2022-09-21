## Map和Set

### 1. Set集合

无序、不重复的多个value的集合体`[value,value]`

```js
const s = new Set();
```
- `size`：长度
- `add(value)`：尾部添加
- `delete(value)`：删除
- `has(value)`：是否含有value
- `clear()`：清空
- `values()`：返回键值的遍历器
- `forEach(callback([value][,key][,map])[, thisArg])`：使用回调函数遍历每个成员
- `entries()`：返回键值对的遍历器
```js
// 数组
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 字符串
let str = "352255";
let unique = [...new Set(str)].join(""); 
// "352"
```
### 2. Map字典

无序、不重复的多个key-value的集合体`[key,value]`

```js
const m = new Map()
```

- `size`：长度
- `set(key, value)`：**添加或更新一个指定了键（key）和值（value）的（新）键值对**
- `get(key)`：**返回某个 Map 对象中key的value**
- `has(key)`：**是否含有key**
- `delete(key)`：删除
- `clear()`：清空
- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach(callback([value][,key][,map])[, thisArg])`：使用回调函数遍历每个成员
