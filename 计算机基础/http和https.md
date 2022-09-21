## http和https
### 1. http
HTTP (HyperText Transfer Protocol)，即**超文本传输协议**，是实现网络通信的一种规范

- 传输的数据不是计算机底层二进制包，而是完整有意义、能被上层应用识别的数据，如HTML 文件, 图片文件等超文本。（传输请求方法和路径）
- 数据在A和B之间传输，之间可存在很多第三方，如：A<=>X<=>Y<=>Z<=>B
- 实际应用中，http被用于浏览器和服务器之间传递信息（**以明文方式传递信息**，不提供任何方式的数据加密）

特点：协议简单通信快速、数据类型多样、无连接请求（连接-一个请求-断开）、无状态请求  

### 2. https
https即http运行在安全的SSL/TLS协议上，即HTTPS = HTTP + SSL/TLS。通过 SSL证书来**验证服务器的身份**，并为浏览器和服务器之间的通信进行加密。  
https特点：  
![信息加密、完整性校验、身份验证](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/cb559400-b2ff-11eb-85f6-6fac77c0c9b3.png)
![image](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603965685769-63a91dae-936d-42d3-8571-577cefa11e33.png)  
https流程：  
![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/0e409fc0-b20c-11eb-85f6-6fac77c0c9b3.png)  
1. 客户端通过URL访问服务器并建立SSL连接  
2. 服务端接受客户端的请求后，将自己的证书（包含**公钥**）传送给客户端
3. 客户端和服务器协商SSL连接的安全等级，即信息加密的等级
4. 客户端建立**会话密钥/对称密钥**，然后利用网站的**公钥加密**会话密钥/对称密钥，并发送给服务器
5. 服务器利用自己的**私钥解密**出会话密钥/对称密钥
6. 服务器可以利用会话密钥/对称密钥与客户端进行通信了

### 3. 总结
- HTTPS是HTTP协议的**安全**版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理，相对更安全
- HTTP 和 HTTPS 使用连接方式不同，默认**端口**也不一样，HTTP是80，HTTPS是443
- HTTPS 由于需要设计加密以及多次握手，**性能**方面不如 HTTP
- HTTPS需要SSL，SSL 证书需要钱，功能越强大的证书**费用**越高  

### 4. 补充
#### 对称加密：采用协商的密钥对数据加密，密钥不安全  
![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/e3f040f0-b2ff-11eb-ab90-d9ae814b240d.png)  
#### 非对称加密：实现身份认证和密钥协商，私钥公钥相互加密解密。  
![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/d9603e60-b2ff-11eb-ab90-d9ae814b240d.png)  
#### 混合加密：确保交换的密钥是安全的前提下，使用对称加密方式进行通信。对会话密钥进行加密解密。   
![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/f375f290-b2ff-11eb-85f6-6fac77c0c9b3.png)  

#### 摘要算法：验证信息的完整性，保障传递的**信息**未被黑客修改（明文和摘要使用会话密钥加密）（摘要为明文的压缩版）  
![摘要算法图](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/023790e0-b300-11eb-ab90-d9ae814b240d.png)  
#### 数字签名：身份验证，**确认消息的发送者身份**，不是仿冒者（私钥加密摘要成为数字签名，数字签名只能被公钥解密，公钥和数字签名是公开的）  
![数字签名图](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/21aa6880-b300-11eb-85f6-6fac77c0c9b3.png)  

#### CA验证机构：**确认公钥的发送者身份**，不是仿冒者（私钥在CA机构中，返回给服务器数字签名+公钥）  
流程如下：  
- 服务器的运营人员向数字证书认证机构提出公开密钥的申请
- 数字证书认证机构在判明提出申请者的身份之后，会对已申请的公开密钥做数字签名
然后分配这个已签名的公开密钥，并将该公开密钥放入公钥证书（密钥+数字签名为公钥证书）后绑定在一起
- 服务器会将这份由数字证书认证机构颁发的公钥证书发送给客户端，以进行非对称加密方式通信
- 接到证书的客户端可使用数字证书认证机构的公开密钥，对那张证书上的数字签名进行验证，验证通过则证明公开密钥是数字证书认证机构真实有效、值得姓赖的。
