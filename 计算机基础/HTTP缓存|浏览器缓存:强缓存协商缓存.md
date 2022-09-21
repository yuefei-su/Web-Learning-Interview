## HTTP缓存|浏览器缓存:强缓存协商缓存

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220314161224.png)

[推荐阅读连接](https://juejin.cn/post/6947936223126093861)

### 一、是什么
所谓的**浏览器缓存**指的是浏览器将用户请求过的静态资源，存储到电脑本地磁盘中，当浏览器再次访问时，就可以直接从本地加载，不需要再去服务端请求了。

使用浏览器缓存，有以下优点：
- 减少了服务器的负担，提高了网站的性能
- 加快了客户端网页的加载速度
- 减少了多余网络数据传输

**HTTP缓存**可以分为两大类，强缓存和协商缓存。两类缓存规则不同，强制缓存在缓存数据未失效的情况下，不需要再和服务器发生交互；而协商缓存，顾名思义，需要进行比较判断是否可以使用缓存。两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220314154543.png)


### 二、强缓存（200）

**强缓存**：不用请求服务器，直接使用本地的缓存。

**强缓存是利用 http 响应头中的`Expires`或`Cache-Control`实现的。【重要】**

浏览器第一次请求一个资源时，服务器在返回该资源的同时，会把上面这两个属性放在response header中。比如：  

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180310_2310.png)

**注意**：这两个response header属性可以只启用一个，也可以同时启用。当response header中，Expires和Cache-Control同时存在时，**Cache-Control的优先级高于Expires**。

下面讲一下二者的区别。

**1、`Expires`**：服务器返回的**绝对时间**。

是较老的强缓存管理 response header。浏览器再次请求这个资源时，先从缓存中寻找，找到这个资源后，拿出它的Expires跟当前的请求时间比较，如果请求时间在Expires的时间之前，就能命中缓存，否则就不行。

如果缓存没有命中，浏览器直接从服务器请求资源时，Expires Header在重新请求的时候会被更新。

**缺点：**

由于`Expires`是服务器返回的一个**绝对时间**，存在的问题是：服务器的事件和客户端的事件可能不一致。在服务器时间与客户端时间相差较大时，缓存管理容易出现问题，比如随意修改客户端时间，就能影响缓存命中的结果。所以，在http1.1中，提出了一个新的response header，就是Cache-Control。


**2、`Cache-Control`**：服务器返回的**相对时间**。

http1.1中新增的 response header。浏览器第一次请求资源之后，在接下来的**相对时间**之内，都可以利用本地缓存。超出这个时间之后，则不能命中缓存。重新请求时，`Cache-Control`会被更新。

### 三、协商缓存（304）

**协商缓存**：浏览器发现本地有资源的副本，但是不太确定要不要使用，于是去问问服务器。

当浏览器对某个资源的请求没有命中强缓存（也就是说超出时间了），就会发一个请求到服务器，验证协商缓存是否命中。

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220314154131.png)

**协商缓存是利用的是两对Header：【重要】**

- 第一对：`Last-Modified`、`If-Modified-Since`

- 第二对：`ETag`、`If-None-Match`

ETag（Entity Tag）：被请求变量的实体值”。


**1、`Last-Modified`、`If-Modified-Since`**。过程如下：

（1）浏览器第一次请求一个资源，服务器在返回这个资源的同时，会加上`Last-Modified`这个 response header，这个header表示这该资源在服务器上的最后修改时间：  

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180311_1715.png)


（2）浏览器再次请求这个资源时，会加上`If-Modified-Since`这个 request header，这个header的值就是上一次返回的`Last-Modified`的值：  

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180311_1716.png)


（3）服务器收到第二次请求时，会比对浏览器传过来的`If-Modified-Since`和资源在服务器上的最后修改时间`Last-Modified`，判断资源是否有变化。如果没有变化则返回304 Not Modified，但不返回资源内容（此时，服务器不会返回 Last-Modified 这个 response header）；如果有变化，就正常返回资源内容（继续重复整个流程）。这是服务器返回304时的response header：  

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180311_1720.png)


（4）浏览器如果收到**304**的响应，就会从缓存中加载资源。

**缺点：**

`Last-Modified`、`If-Modified-Since`一般来说都是非常可靠的，但面临的问题是：

- **服务器上的资源变化了，但是最后的修改时间却没有变化**。


- 如果服务器端在一秒内修改文件两次，但产生的`Last-Modified`却只有一个值。

这一对header就无法解决这种情况。于是，下面这一对header出场了。



**2、`ETag`、`If-None-Match`**。过程如下：

（1）浏览器第一次请求一个资源，服务器在返回这个资源的同时，会加上`ETag`这个 response header，这个header是服务器根据当前请求的资源生成的**唯一标识**。这个唯一标识是一个字符串，只要资源有变化这个串就不同，跟最后修改时间无关，所以也就很好地补充了`Last-Modified`的不足。如下：

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180311_1735.png)

（2）浏览器再次请求这个资源时，会加上`If-None-Match`这个 request header，这个header的值就是上一次返回的`ETag`的值：

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180311_1737.png)

3）服务器第二次请求时，会对比浏览器传过来的`If-None-Match`和服务器重新生成的一个新的`ETag`，判断资源是否有变化。如果没有变化则返回304 Not Modified，但不返回资源内容（此时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag并无变化）。如果有变化，就正常返回资源内容（继续重复整个流程）。这是服务器返回304时的response header：

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20180311_1740.png)

（4）浏览器如果收到304的响应，就会从缓存中加载资源。

提示：如果面试官问你：与浏览器缓存相关的http header有哪些？你能写出来吗？这是一个亮点。