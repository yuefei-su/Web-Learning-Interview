## Promise的理解

### 1. 介绍

Promise链式操作，降低编码难度，提高代码可读性，解决回调地域。

Promise三种状态：
- `pending`（进行中）
- `fulfilled`（已完成），通过resolve()函数来实现
- `rejected`（已失败），通过reject()函数来实现

Promise特点：
- 一旦状态改变（从pending变为fulfilled和从pending变为rejected，这时就称为resolved（已定型）），就不能再更改状态了。
- 任何时候都可以进行状态改变。
- 在使用 `new Promise()`创建Promise对象的时候，构造函数内部的代码是立即执行的，且中途无法取消

Promise流程：  

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/1b02ae90-58a9-11eb-85f6-6fac77c0c9b3.png)

### 2. 用法

#### 构造方法

当Promise执行的内容符合成功条件时，调用`resolve`函数，失败就调用`reject`函数。
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
- 一个函数作为参数：Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`
- resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”
- reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”
- `new Promise()`是同步代码。定时器和ajax请求是异步任务。


#### 实例方法

##### 1）.then()

- 两个函数作为参数：`then`方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为`resolved`时调用，第二个回调函数是Promise对象的状态变为`rejected`时调用。其中第二个参数可以省略。
```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

- 链式调用：`then`方法返回的是一个新的Promise实例（不是原来那个Promise实例）。因此可以采用链式写法，即`then`方法后面再调用另一个then方法。传的arg参数为上一个`resolve(arg)`中arg的值。

```js
let promise = new Promise((resolve,reject)=>{
    ajax('first').success(function(res){
        resolve(res);
    })
})
promise.then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    
})
```

##### 2）.catch() 
- catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名。用于在执行`resolve`回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入`catch`方法中。
- 一般来说，使用catch方法代替then()第二个参数

promise.catch后 后面的.then还会执行吗？？
解：catch也会返回一个promise 所以可以继续then
从语义上也很好理解 都被捕获处理过了就不是error了 所以可以继续

```js
p.then((data) => {
     console.log('resolved',data);
},(err) => {
     console.log('rejected',err);
     }
); 
p.then((data) => {
    console.log('resolved',data);
}).catch((err) => {
    console.log('rejected',err);
});
```

##### 3）.finally()  
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```


#### 构造函数方法


##### 1）.all() 
- 参数是一个数组：`all`方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个`promise`对象。
- 返回值：数组中所有的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`。

```javascript
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(1);
    },2000)
});
let promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(2);
    },1000)
});
let promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(3);
    },3000)
});
Promise.all([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果为：[1,2,3] 
})
```


##### 2）.race()  
- 参数是一个数组：`race`方法接受的参数是一个每项都是`promise`的数组
- 返回值：如果其中一个`promise`对象状态率先变成`resolved`，那自身的状态变成了`resolved`；如果其中一个`promise`率先变成`rejected`，那自身状态就会变成`rejected`。
```js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       reject(1);
    },2000)
});
let promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(2);
    },1000)
});
let promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(3);
    },3000)
});
Promise.race([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果：2
},rej=>{
    console.log(rej)};
)
```

那么`race`方法有什么实际作用呢？当要做一件事，超过多长时间就不做了，可以用这个方法来解决：

```js
Promise.race([promise1,timeOutPromise(5000)]).then(res=>{})
```
### 3. 使用场景


- `then`链式操作请求渲染（下个异步请求依赖上个请求结果）
```js
// 各司其职
getInfo().then(res=>{
    let { bannerList } = res
    //渲染轮播图
    console.log(bannerList)
    return res
}).then(res=>{
    
    let { storeList } = res
    //渲染店铺列表
    console.log(storeList)
    return res
}).then(res=>{
    let { categoryList } = res
    console.log(categoryList)
    //渲染分类列表
    return res
})
```


- `all()`实现多个请求合并在一起，汇总所有请求结果
```js
function initLoad(){
    // loading.show() //加载loading
    Promise.all([getBannerList(),getStoreList(),getCategoryList()]).then(res=>{
        console.log(res)
        loading.hide() //关闭loading
    }).catch(err=>{
        console.log(err)
        loading.hide()//关闭loading
    })
}
//数据初始化    
initLoad()
```

- `race()`可以设置图片请求超时

```js
//请求某个图片资源
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
           resolve(img);
        }
        //img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
        img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1";
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});
```









