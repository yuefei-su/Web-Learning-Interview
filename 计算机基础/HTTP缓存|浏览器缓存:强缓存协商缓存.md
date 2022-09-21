## HTTP缓存|浏览器缓存:强缓存协商缓存

![强缓存协商缓存.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103203818-deacfda5-df48-4749-bbb4-5074e058dc70.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=493&id=u02ca88e1&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98.png&originHeight=1280&originWidth=1738&originalType=binary&ratio=1&rotation=0&showTitle=false&size=285107&status=error&style=none&taskId=u4b01529b-ee56-4fad-b86c-0921d7f27e7&title=&width=670)

[推荐阅读连接](https://juejin.cn/post/6947936223126093861)

[https://www.cnblogs.com/chenhuichao/p/14325953.html](https://www.cnblogs.com/chenhuichao/p/14325953.html)

### 一、是什么

所谓的**浏览器缓存**指的是**浏览器将用户请求过的静态资源，存储到电脑本地磁盘中**，当浏览器再次访问时，就可以直接从本地加载，不需要再去服务端请求了。（**网站资源更新了，但是本地页面没更新，需要强制刷新**）

使用浏览器缓存，有以下优点：

- 减少了服务器的负担，提高了网站的性能
- 加快了客户端网页的加载速度
- 减少了多余网络数据传输

**浏览器缓存**可以分为两大类，强缓存和协商缓存。

- 强缓存，在缓存数据未失效的情况下，不需要再和服务器发生交互。
- 协商缓存，需要进行比较判断是否可以使用缓存。
- 两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

![强缓存协商缓存2.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103232571-e0dd24dc-0052-4edc-9c92-e93b932c3bd2.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=726&id=uc86cf8a8&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%982.png&originHeight=835&originWidth=807&originalType=binary&ratio=1&rotation=0&showTitle=false&size=216416&status=error&style=none&taskId=u48e963b8-13d2-42cf-9a81-124cd082c13&title=&width=701.5)

### 二、强缓存

**强缓存：浏览器不会像服务器发送任何请求，直接从本地缓存中读取文件并返回Status Code: 200 OK**

![image.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655104257042-d0fcfcbd-ed39-48a1-a9f1-6e17b60fbeb9.png#clientId=u5ad27c81-ad6c-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=96&id=u16cb01b4&name=image.png&originHeight=96&originWidth=280&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10314&status=error&style=none&taskId=u9f915e28-2582-4bee-8ac8-d210b9f704d&title=&width=279)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655104274336-67ee371e-5042-44bb-a02a-ed5c0519ba8c.png#clientId=u5ad27c81-ad6c-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=98&id=u302c2f51&name=image.png&originHeight=112&originWidth=317&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12389&status=error&style=none&taskId=u49f2d4e8-c7f0-4f73-bb2d-2f3fdf31738&title=&width=278.5)

200 form memory cache : 不访问服务器，一般已经加载过该资源且缓存在了**内存**当中，直接从内存中读取缓存。浏览器关闭后，数据将不存在（资源被释放掉了），再次打开相同的页面时，不会出现from memory cache。
200 from disk cache： 不访问服务器，已经在之前的某个时间加载过该资源，直接从**硬盘**中读取缓存，关闭浏览器后，数据依然存在，此资源不会随着该页面的关闭而释放掉下次打开仍然会是from disk cache。

优先访问memory cache,其次是disk cache，最后是请求网络资源

**强缓存是利用 _http 响应头_中的**`**Cache-Control**`**（缓存控制时间）或**`**Expires**`**（到期时间）实现的。【重要】**

浏览器第一次请求一个资源时，服务器在返回该资源的同时，会把上面这两个属性放在response header中。比如：

![强缓存协商缓存3.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103256327-4fc02c1a-f268-4981-887b-c684e97b4fba.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=221&id=u5738f384&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%983.png&originHeight=194&originWidth=491&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17510&status=error&style=none&taskId=uc14b6b26-1ded-47cc-baba-c6497e615ba&title=&width=558.5)

**注意**：这两个response header属性可以只启用一个，也可以同时启用。当response header中，Expires和Cache-Control同时存在时，Cache-Control的优先级高于Expires。

#### `Expires`，`Cache-Control`（优先级高）的区别：

**1、**`**Expires**`：服务器返回的**绝对时间**。**（绝对时间是不可靠的）**

是较老的强缓存管理 response header。浏览器再次请求这个资源时，先从缓存中寻找，找到这个资源后，拿出它的Expires跟当前的请求时间比较，如果请求时间在Expires的时间之前，就能命中缓存，否则就不行。

**如果缓存没有命中，浏览器直接从服务器请求资源时，Expires Header在重新请求的时候会被更新。**

**缺点：**

由于`Expires`是服务器返回的一个绝对时间，存在的问题是：**服务器的事件和客户端的时间可能不一致**。在服务器时间与客户端时间相差较大时，缓存管理容易出现问题，比如随意修改客户端时间，就能影响缓存命中的结果。

**2、**`**Cache-Control**`：服务器返回的**相对时间（max-age=3153600000）**。

http1.1中新增的 response header。浏览器第一次请求资源之后，在接下来的相对时间之内，都可以利用本地缓存。超出这个时间之后，则不能命中缓存。**重新请求时，**`**Cache-Control**`**会被更新**。

### 三、协商缓存

**协商缓存：向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；**

![image.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655104487940-7bd5ae19-a011-4472-8872-1cb2d894db5c.png#clientId=u5ad27c81-ad6c-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=53&id=u31f99259&name=image.png&originHeight=47&originWidth=293&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6370&status=error&style=none&taskId=u1f8ee558-7c26-4089-84bb-3665bc94dcd&title=&width=333.5)

当浏览器对某个资源的请求没有命中强缓存（也就是说超出时间了），就会发一个请求到服务器，验证协商缓存是否命中。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1663743735385-ac4ff884-45d3-4c20-ba66-28802d020a1c.png#clientId=u6bc7dd0b-19e2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=511&id=u8c71f676&name=image.png&originHeight=528&originWidth=554&originalType=binary&ratio=1&rotation=0&showTitle=false&size=110979&status=done&style=none&taskId=u065db29f-3e4b-4c32-a4e8-abb57cb6c99&title=&width=536)
#### 
#### 协商缓存的两对Header

-  第一对：`Last-Modified`响应头、`If-Modified-Since`请求头 **（绝对时间是不可靠的）**
-  第二对：`ETag`响应头、`If-None-Match`请求头 （随机生成的唯一标识ID）（优先级高）

ETag（Entity Tag）：被请求变量的实体值”。

**1、**`**Last-Modified**`**、**`**If-Modified-Since**`。过程如下：

（1）浏览器第一次请求一个资源，服务器在返回这个资源的同时，会加上`Last-Modified`这个** response header**，这个header表示这**该资源在服务器上的最后修改时间**

![强缓存协商缓存5.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103306269-5cc989a1-4206-437a-94c1-f18d450ab5f2.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=213&id=u2850d727&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%985.png&originHeight=173&originWidth=418&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14100&status=error&style=none&taskId=u573be355-0f23-4fa2-b627-02913efa4e5&title=&width=515)

（2）**浏览器再次请求这个资源时**，会加上`If-Modified-Since`这个 **request header**，**这个header的值就是上一次返回的**`**Last-Modified**`**的值**

![强缓存协商缓存6.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103319824-74fb3813-9301-4f24-8082-08eeabf9056d.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=198&id=ubf42aa1c&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%986.png&originHeight=226&originWidth=844&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28041&status=error&style=none&taskId=ub0e7d928-ad19-4ac0-8ca5-f7ddff6d15a&title=&width=740)

（3）服务器收到第二次请求时，会比对浏览器传过来的`If-Modified-Since`和资源在服务器上的最后修改时间`Last-Modified`，判断资源是否有变化。如果没有变化则返回304 Not Modified，但不返回资源内容（此时，服务器不会返回 Last-Modified 这个 response header）；如果有变化，就正常返回资源内容（继续重复整个流程）。这是服务器返回304时的response header：

![强缓存协商缓存7.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103337069-c9957822-4017-41ca-a169-e2812f6cd542.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=119&id=ue26b38e2&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%987.png&originHeight=104&originWidth=380&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8945&status=error&style=none&taskId=u8268a242-951b-44e6-9b50-202c69e1df0&title=&width=434)

（4）浏览器如果收到**304**的响应，就会从缓存中加载资源。

**缺点：**

`Last-Modified`、`If-Modified-Since`一般来说都是非常可靠的，但面临的问题是：

-  服务器上的资源变化了，但是最后的修改**时间**却没有变化。 
-  如果服务器端在一秒内修改文件两次，但产生的`Last-Modified`却只有一个值。 

这一对header就无法解决这种情况。于是，下面这一对header出场了。


**2、**`**ETag**`**、**`**If-None-Match**`。过程如下：

（1）浏览器第一次请求一个资源，服务器在返回这个资源的同时，会加上`ETag`这个** response header**，这个header是**服务器根据此次请求的资源生成的唯一标识**。这个唯一标识是一个字符串，只要资源有变化这个串就不同，跟最后修改时间无关，所以也就很好地补充了`Last-Modified`的不足。如下：

![强缓存协商缓存8.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103354292-eb8b452d-347d-4730-b471-5d55dc312a52.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=223&id=u02899790&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%988.png&originHeight=173&originWidth=398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14346&status=error&style=none&taskId=u77101732-105c-43ed-81be-c17387d8bc2&title=&width=512)

（2）浏览器再次请求这个资源时，会加上`If-None-Match`这个** request header**，这个header的值就是上一次返回的`ETag`的值：

![强缓存协商缓存9.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103369689-3dd8d828-1867-4f5a-a8ad-c861ff231d8d.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=193&id=ud697448f&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%989.png&originHeight=220&originWidth=822&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28888&status=error&style=none&taskId=u4bb422e8-4e47-4559-8d4c-419cba4259f&title=&width=722)

3）服务器第二次请求时，会对比浏览器传过来的`If-None-Match`和服务器重新生成的一个新的`ETag`，判断资源是否有变化。如果没有变化则返回**304 Not Modified**，但不返回资源内容（此时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag并无变化）。如果有变化，就正常返回资源内容（继续重复整个流程）。这是服务器返回304时的response header：

![强缓存协商缓存10.png](https://cdn.nlark.com/yuque/0/2022/png/23091980/1655103387502-e777029f-384a-435d-ab36-f6a2fb4d8e4d.png#clientId=uf532ca43-46c2-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=141&id=uf539d7d8&name=%E5%BC%BA%E7%BC%93%E5%AD%98%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%9810.png&originHeight=108&originWidth=374&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9148&status=error&style=none&taskId=u79da2488-ed91-4c4b-9dbc-510fdfa9c23&title=&width=490)

（4）浏览器如果收到304的响应，就会从缓存中加载资源。

提示：如果面试官问你：与浏览器缓存相关的http header有哪些？你能写出来吗？这是一个亮点。
