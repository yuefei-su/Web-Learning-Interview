## 响应式px,em,rem等适配问题

### 1. px,em,rem,vh,vw区别

**浏览器默认font-size大小16px**

| 属性 | CSS单位  | 描述                                                         |
| ---- | -------- | ------------------------------------------------------------ |
| px   | 绝对单位 | 固定像素，一般用于元素的边框和定位                           |
| %    | 相对单位 | 占用父元素宽度或高度的比例                                   |
| em   | 相对单位 | 相对于**当前对象内font-size**的大小。如当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（1em = 16px） |
| rem  | 相对单位 | 相对于**html根元素font-size**的大小，通常给html设置一个字体大小，其他元素可用rem |
| vh   | 相对单位 | 相对于视图窗口的高度，视窗高度是 100vh；                     |
| vw   | 相对单位 | 相对于视图窗口的宽度，视窗宽度是 100vw；                     |
| vmin | 相对单位 | 相对于视图窗口高度和宽度中较小的一个                         |
| vmax | 相对单位 | 相对于视图窗口高度和宽度中较大的一个                         |

**使用场景：**

- 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用 px 即可 。
- 对于需要适配各种移动设备，使用 rem，例如需要适配 iPhone 和 iPad 等分辨率差别比较挺大的设备。



### 2. 响应式设计

响应式网站设计`（Responsive Web design`）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

**(1) 原理**： 基本原理是通过媒体查询`（@media）`查询检测不同的设备屏幕尺寸做处理。（媒体查询、%、vm/vh，rem）  

当视图窗口在375px - 600px之间，设置特定字体大小18px
```css
@media screen (min-width: 375px) and (max-width: 600px) {
  body {
    font-size: 18px;
  }
}
```

**(2) 兼容**： 页面头部必须有 meta 声明的`viewport`。

```html
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
```
- width=device-width: 是自适应手机屏幕的尺寸宽度

- maximum-scale:是缩放比例的最大值

- inital-scale:是缩放的初始化

- user-scalable:是用户的可以缩放的操作



