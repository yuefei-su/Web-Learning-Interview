## BFC
### 1. 是什么
BFC（Block Formatting Context），即块级格式化上下文，**目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素**，**即浮动**。  
浮动和清除浮动时，只会应用于同一个BFC内的元素。浮动不会影响其他BFC中的元素布局，**清除浮动（clear：both|left|right）只能清除同一BFC中在它前面的元素浮动**。
```html
<!-- 利用伪元素清除浮动，不会在页面新增div，文档结构更加清晰  -->
<style>
.clearfix{
    zoom: 1; /*IE6*/
}
.clearfix:after{
    content: ".";
    height: 0;
    clear: both;
    display: block;
    visibility: hidden;
}
</style>
<div class="container clearfix">
    <div class="left"></div>
    <div class="right"></div>
</div>
```
### 2. 触发BFC的条件
- 根元素：body；
- **元素设置浮动：float：left|right** 除 none 以外的值；
- **元素设置绝对定位：position:absolute|fixed；**
- display 值为：inline-block、flex、grid、table、table-cell、table-caption、等；
- **overflow 值为：hidden**、auto、scroll，不为visible。


### 3. 应用场景
#### 防止margin塌陷（兄弟之间）
在 同一个BFC 中相邻的两个容器的 margin 会重叠。  
由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题。
```html
<style>
    .wrap {
        overflow: hidden;/* 新的BFC*/
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p >
    <div class="wrap">
        <p>Hehe</p >
    </div>
</body>
```

#### 解决父元素高度塌陷的问题（父子之间）
在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变成一个 BFC。常用的办法是给父元素设置`overflow:hidden`。  
**计算BFC高度时，浮动子元素也要参与计算** 。
```html
<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;
        overflow: hidden;
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

#### 创建自适应两栏布局（兄弟之间）
每个元素的左 margin 值和容器的左 border 相接触，可以利用此特性来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```html
<style> 
    .aside {
        width: 100px;
        height: 150px;
        float: left;/*左边浮动*/
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;
        overflow: hidden;/*新的BFC*/
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```
新的BFC不会与浮动的.aside元素重叠。因此会根据包含块的宽度，和.aside的宽度，自动变窄



