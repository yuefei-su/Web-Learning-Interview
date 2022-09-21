### 输入URL到网页呈现

## 基本步骤

1. URL解析

2. DNS查询

3. TCP连接

4. HTTP请求

5. 响应请求

6. 页面渲染

## 详细分析

### 1. URL解析

首先判断是否是合法的URL，还是一个待搜索的关键词  
如果是合法的URL，则进行URL解析   

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/27a0c690-bdf4-11eb-ab90-d9ae814b240d.png)  

### 2. DNS查询

获取到域名对应的目标服务器IP地址 

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/330fb770-bdf4-11eb-85f6-6fac77c0c9b3.png)  

### 3. TCP连接

浏览器在确定目标服务器的IP地址后，经历三次握手建立TCP连接

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/ad750790-bdf4-11eb-85f6-6fac77c0c9b3.png)

### 4. 发送http请求

建立tcp连接之后，就可以再此基础上通信了。  
**浏览器**发送http请求到目标服务器。请求内容包括：
- 请求行(请求方法get/post、请求URL、http协议及版本)
- 请求头/报文头
- 请求主体  

**常见http请求方法**
- GET: 向服务器获取数据；
- POST：将实体提交到指定的资源，通常会造成服务器资源的修改；
- PUT：上传文件，更新数据；
- DELETE：删除服务器上的对象；
- HEAD：获取报文首部，与GET相比，不返回报文主体部分；
- OPTIONS：询问支持的请求方法，用来跨域请求；
- CONNECT：要求在与代理服务器通信时建立隧道，使用隧道进行TCP通信；
- TRACE: 回显服务器收到的请求，主要⽤于测试或诊断。  

**HTTP Request Header 常见的请求头：**
- Accept:浏览器能够处理的内容类型
- Accept-Charset:浏览器能够显示的字符集
- Accept-Encoding：浏览器能够处理的压缩编码
- Accept-Language：浏览器当前设置的语言
- Connection：浏览器与服务器之间连接的类型
- Cookie：当前页面设置的任何Cookie
- Host：发出请求的页面所在的域
- Referer：发出请求的页面的URL
- **User-Agent：浏览器的用户代理字符串**

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/bbcb60f0-bdf4-11eb-ab90-d9ae814b240d.png)

### 5. 响应请求
当**服务器**接收到浏览器的请求之后，就会进行逻辑操作，处理完成之后返回一个HTTP响应消息，响应消息包括：
- 响应行/状态行
- 响应头/消息报头
- 响应正文 

**HTTP Responses Header 常见的响应头：**
- Date：表示消息发送的时间，时间的描述格式由rfc822定义
- server:服务器名称
- Connection：浏览器与服务器之间连接的类型
- Cache-Control：控制HTTP缓存
- **content-type:表示后面的文档属于什么MIME类型**

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/c5fe0140-bdf4-11eb-ab90-d9ae814b240d.png)  
在服务器响应之后，http默认开启长链接keep-alive。  
当页面关闭之后，tcp连接则会经过四次挥手完成断开

### 6. 页面渲染
当浏览器接收服务器响应的资源并进行解析：  
- 查看响应头信息，根据不同的指示做出相应的处理。比如重定向、存储cookie、解压gzip、缓存资源等等。  
- 查看响应头的Content-Type值，**根据不同的资源类型采用不同的解析方式**。

页面渲染过程：
- 解析 HTML，构建 **DOM 树**
- 解析 CSS ，生成 **CSS 规则树**
- 合并 DOM 树和 CSS 规则树，生成 **render 树**
- **布局** render 树（ Layout / reflow ），负责各元素尺寸、位置的计算
- **绘制** render 树（ paint / repaint ），绘制页面像素信息
- 浏览器会将各层的像素信息发送给 GPU，GPU 会将**各层像素信息合成**（ composite ），显示在屏幕上  


![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/db7bddd0-bdf4-11eb-85f6-6fac77c0c9b3.png)



