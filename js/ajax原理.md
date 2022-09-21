## ajax原理

### 一、是什么

AJAX全称(Async Javascript and XML)，即异步的JavaScript 和XML，是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页。

Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面  

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/af42de10-7b2a-11eb-85f6-6fac77c0c9b3.png)



### 二、实现步骤

创建AJAX请求的步骤：

1. **创建`XMLHttpRequest`对象**

```js
const xhr = new XMLHttpRequest();
```

2. 通过 `XMLHttpRequest` 对象的 `open()` 方法**创建一个 HTTP 请求，与服务端建立连接**。open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。

```js
xhr.open(method, url, [async][, user][, password])

// method：表示当前的请求方式，常见的有GET、POST
// url：服务端地址
// async：布尔值，表示是否异步执行操作，默认为true
// user: 可选的用户名用于认证用途；默认为`null
// password: 可选的密码用于认证用途，默认为`null
```

3. 通过 `XMLHttpRequest` 对象提供的 `onreadystatechange` 事件**监听服务器端的通信状态**。主要监听的为`XMLHttpRequest.readyState`属性的五个状态，如下图显示。`XMLHttpRequest.responseText`属性用于**接收服务器端的响应结果**。

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/9782fc90-7b31-11eb-ab90-d9ae814b240d.png)

当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
```js
const request = new XMLHttpRequest()
request.onreadystatechange = function(e){
    if(request.readyState === 4){ // 整个请求过程完毕
        if(request.status >= 200 && request.status <= 300){
            console.log(request.responseText) // 服务端返回的结果
        }else if(request.status >=400){
            console.log("错误信息：" + request.status)
        }
    }
}
request.open('POST','http://xxxx')
request.send()
```

4. 设置错误监听函数，设置响应的数据类型，设置请求头信息(setRequestHeader)

5. 当对象的属性和监听函数设置完成后，最后调用 XMLHttpRequest 对象的 `send()`方法**向服务器发起请求**，可以传入参数作为发送的数据体。
```js
xhr.send([body])

// body: 在 XHR 请求中要发送的数据体，如果不传递数据则为 null

// 如果使用GET请求发送数据的时候，需要注意
// 1.将请求数据添加到open()方法中的url地址中;
// 2.发送请求数据中的send()方法中参数设置为null
```

6. 接受并处理服务端向客户端响应的数据结果,将处理结果更新到 HTML页面中



### 三、封装

```js
const SERVER_URL = "/server";

//创建XMLHttpRequest对象
let xhr = new XMLHttpRequest();

// 创建 Http 请求
xhr.open("GET", url, true);

// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};

// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
//设置响应的数据类型
xhr.responseType = "json";
// 设置请求头信息
xhr.setRequestHeader("Accept", "application/json");

// 发送 Http 请求
xhr.send(null);
```


```js
// promise 封装实现：
function getJSON(url) {
  let promise = new Promise(function(resolve, reject) {
    //创建XMLHttpRequest对象
    let xhr = new XMLHttpRequest();

    // 新建一个 http 请求
    xhr.open("GET", url, true);

    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");

    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}
```