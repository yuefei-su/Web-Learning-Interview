cookie的secure这个属性是干啥的

cookie的httpOnly是干啥的


## 数据存储方式（cookie, localStorage, sessionStorage）

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220314161224.png)

### 1. cookie（七天免登录）
- cookie指某些网站为了辨别用户身份而储存在用户本地终端上的数据。  
- 大小限制为4KB左右，它由一个名称（Name）、一个值（Value）和其它几个用于控制 cookie有效期、安全性、使用范围的可选属性组成。
- cookie在每次请求中都会被发送，如果不使用 HTTPS并对其加密，其保存的信息很容易被窃取，导致安全风险。

### 2. localStorage（浏览器保存账户密码等信息，一键输入）
- HTML5新增的，用于本地数据存储，保存的数据没有过期时间，一般浏览器大小限制在5MB。
- 无法像Cookie一样设置过期时间
- 只能存入**字符串**，无法直接存对象

使用方法：  
- 保存数据：`localStorage.setItem(key,value);`  
- 读取数据：`localStorage.getItem(key);`  
- 删除单个数据：`localStorage.removeItem(key);`  
- 删除所有数据：`localStorage.clear();`  
- 得到某个索引的key：`localStorage.key(index);`  


### 3. sessionStorage（校园教务系统，登录信息浏览器关闭后失效）
sessionStorage接口方法和localStorage类似，但保存的数据的只会在当前会话中保存下来，页面关闭后会被清空。


### 4. 总结
|名称|生命期|大小限制|与服务器通信|
|---|---|---|---|
|cookie|一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效|4KB|每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题|
|localStorage|除非被清除，否则永久保存|5MB|仅在浏览器中保存，不与服务器通信|
|sessionStorage|仅在当前会话下有效，关闭页面或浏览器后被清除|5MB|仅在浏览器中保存，不与服务器通信|

使用场景：
- 标记用户与跟踪用户行为的情况，推荐使用cookie
- 适合长期保存在本地的数据token（令牌），推荐使用localStorage
- 敏感账号一次性登录，推荐使用sessionStorage
- 存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用indexedDB