```js
while(line = readline()){
    let arr = line.split(' ');
    let a = parseInt(arr[0]);
    let b = parseInt(arr[1]);
    console.log(a+b);
}
```


```js
//获得输入行数
let K = parseInt(readline());

for(let i=0; i<K; i++){
    let a = readline().split(' ');
    let arr = [];
    arr.push(parseInt(a[0]));
    arr.push(parseInt(a[1]));
    let res = arr.reduce((a,b) => a+b);
    console.log(res);
}
```