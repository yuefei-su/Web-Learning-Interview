
## CDN


CDN (全称 Content Delivery Network)，即内容分发网络


CDN是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的**负载均衡、内容分发、调度**等功能模块，使用户**就近**获取所需内容，**降低网络拥塞，提高用户访问响应速度和命中率**。CDN的关键技术主要有内容存储和分发技术。  

[推荐链接🔗](https://cloud.tencent.com/developer/article/1798110)

### 加速原理

CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

**加速过程**：

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220314201824.png)

1. 当终端用户向www.aliyundoc.com下的指定资源发起请求时，首先向Local DNS（本地DNS）发起请求域名www.aliyundoc.com对应的IP。
2. Local DNS检查缓存中是否有www.aliyundoc.com的IP地址记录。如果有，则直接返回给终端用户；如果没有，则向网站授权DNS请求域名www.aliyundoc.com的解析记录。
3. 当网站授权DNS解析www.aliyundoc.com后，返回域名的CNAME www.aliyundoc.com.example.com。
4. Local DNS向阿里云CDN的DNS调度系统请求域名www.aliyundoc.com.example.com的解析记录，阿里云CDN的DNS调度系统将为其分配最佳节点IP地址。
5. Local DNS获取阿里云CDN的DNS调度系统返回的最佳节点IP地址。
6. Local DNS将最佳节点IP地址返回给用户，用户获取到最佳节点IP地址。
7. 用户向最佳节点IP地址发起对该资源的访问请求。
8. 如果该最佳节点已缓存该资源，则会将请求的资源直接返回给用户（步骤8），此时请求结束。
9. 如果该最佳节点未缓存该资源或者缓存的资源已经失效，则节点将会向源站发起对该资源的请求。获取源站资源后结合用户自定义配置的缓存策略，将资源缓存到CDN节点并返回给用户（步骤8），此时请求结束。