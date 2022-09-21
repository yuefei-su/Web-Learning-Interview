
## 布局方法

### 0. display和position
#### display 的属性

| **属性值**   | **作用**                                                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| none         | 元素不显示，并且会从文档流中移除。                                                                                                                                   |
| block        | 块类型。会独占一行，多个元素会另起一行，默认宽度为父元素宽度，可以设置 width、height、margin 和 padding 属性。                                                       |
| inline       | 行内元素类型。元素不会独占一行，默认宽度为内容宽度，设置 width、height 属性无效。但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin。 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示。                                                                                                                         |
| list-item    | 像块类型元素一样显示，并添加样式列表标记。                                                                                                                           |
| table        | 此元素会作为块级表格来显示。                                                                                                                                         |
| inherit      | 规定应该从父元素继承 display 属性的值。                                                                                                                              |

##### 行内元素和块级元素特点

**（1）行内元素**

- **设置宽高无效；**（由内容撑开）
- **可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；**
- 不会自动换行；
- 如：a,span,**img**,label,input,textarea,select,strong,u,em等等

**（2）块级元素**

- 可以设置宽高；
- 设置 margin 和 padding 都有效；
- 可以自动换行；
- 多个块状，默认排列从上到下。
- 如：h1-h6,p,**div**,hr,,ol,ul,li等等

##### display:inline-block 什么时候会显示间隙？
- 有空格时会有间隙，可以删除空格解决；
- `margin`正值时，可以让`margin`使用负值解决；
- 使用`font-size`时，可通过设置`font-size:0`、`letter-spacing`、`word-spacing`解决；

#### position属性

| 属性值   | 概述                                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| absolute | 生成绝对定位的元素，相对于 static 定位以外的一个父元素进行定位。元素的位置通过 left、top、right、bottom 属性进行规定。                          |
| relative | 生成相对定位的元素，相对于其原来的位置进行定位。元素的位置通过 left、top、right、bottom 属性进行规定。                                          |
| fixed    | 生成绝对定位的元素，指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如回到顶部的按钮⼀般都是⽤此定位⽅式。 |
| static   | 默认值，没有定位，元素出现在正常的文档流中，会忽略 top, bottom, left, right 或者 z-index 声明，块级元素从上往下纵向排布，⾏级元素从左向右排列。  |
| inherit  | 规定从父元素继承 position 属性的值                                                                                                    |
| sticky   | 粘滞定位。当页面要划走时，相对页面的定位方式（通讯录字母顶端定位）（absolute+fixed）                                                            |

前面三者的定位方式如下：

- **relative**：元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素。

![img](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694939-58dfe7f7-2fc9-45e5-9961-a953f95496a7.png#align=left&display=inline&height=105&margin=%5Bobject%20Object%5D&originHeight=105&originWidth=448&size=0&status=done&style=stroke&width=447)

- **fixed**：元素的定位是相对于 window （或者 iframe）边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化。

![img](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694841-89472ba9-b236-4098-802f-c3c26ff49466.png#align=left&display=inline&height=117&margin=%5Bobject%20Object%5D&originHeight=135&originWidth=516&size=0&status=done&style=stroke&width=446)

- **absolute**：元素的定位相对于前两者要复杂许多。如果为 absolute 设置了 top、left，浏览器会根据什么去确定它的纵向和横向的偏移量呢？答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了`position:relative/absolute/fixed`的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。如下两个图所示：

![img](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694882-589670e0-cd52-41d4-a3ed-4ebbdfc88f32.png#align=left&display=inline&height=142&margin=%5Bobject%20Object%5D&originHeight=183&originWidth=576&size=0&status=done&style=stroke&width=446)

![img](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694842-2764d9ed-d5fe-45f4-8ede-34a73d237f94.png#align=left&display=inline&height=118&margin=%5Bobject%20Object%5D&originHeight=137&originWidth=516&size=0&status=done&style=stroke&width=446)


### 1. 两栏布局(左float:left定宽+右margin-left/overflow:hidden)（左定宽+右flex:1）（左父相子绝定宽+ margin-left、左定宽+右父相子绝absolute的left）

一般两栏布局指的是**左边一栏宽度固定，右边一栏宽度自适应**，两栏布局的具体实现：

- 利用浮动，将左边元素宽度设置为 200px，并且设置向左浮动`float: left;`。将右边元素的 **margin-left** 设置为 200px，宽度为 auto（默认为 auto，撑满整个父元素）。

```html
<style>
.box{
    overflow: hidden;/* 为父级元素添加BFC，防止下方元素飞到上方内容 */
}
.left {
    float: left;
    width: 200px;
    background: tomato;
}
.right {
    margin-left: 200px;/*左外边距200px*/
    /* width: auto; */
    background: gold;
}
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

- 利用浮动，左侧元素设置固定大小，并左浮动`float: left;`，右侧元素设置 overflow: hidden; 这样右边就触发了 BFC，**BFC 的区域不会与浮动元素发生重叠**，所以两侧就不会发生重叠。

```html
<style>
.box{
   overflow: hidden; /* 为父级元素添加BFC，防止下方元素飞到上方内容 */
}
.left {
  float: left;
  width: 200px;
  background: tomato;
}
.right {
    overflow: hidden;/*设置浮动*/
    background: gold;
}
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

- 利用 flex 布局，将左边元素设置为固定宽度 100px，将右边的元素设置为 flex:1。

```html
<style>
    .box{
        display: flex;/*flex 布局*/
    }
    .left {
        width: 100px;
        background: tomato;
    }
    .right {
        flex: 1;/* width:100%;flex:1 1 auto;*/
        /* 默认为flex:0不索取扩大 1不缩小 auto自动宽度 */
        background: gold;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

- 利用绝对定位，将父级元素设置为relative定位。左边元素设置为 absolute 定位，并且宽度设置为 100px。将右边元素的 **margin-left** 的值设置为 100px。(父相子绝,绝对定位的子元素脱离文档流独立出来)

```html
<style>
    .box{
        position:relative;
    }
    .left {
        position:absolute;
        width: 100px;
        background: tomato;
    }
    .right {
        margin-left:100px;/*左外边距100px*/
        background: gold;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

- 利用绝对定位，将父级元素设置为relative定位。左边元素宽度设置为100px;右边元素设置为absolute定位，left为100px，其余方向定位为 0。(父相子绝,绝对定位的子元素脱离文档流独立出来)

```html
<style>
    .box{
        position:relative;
    }
    .left {
        width: 100px;
        background: tomato;
    }
    .right {
        position:absolute;
        top:0;
        bottom:0;
        right:0;
        left:100px;/*离左边间隔100px*/
        background: gold;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```


### 2. 三栏布局

三栏布局一般指的是页面中一共有三栏，**左右两栏宽度固定，中间自适应的布局**，三栏布局的具体实现：

- 利用**绝对定位**+margin，左右两栏设置为绝对定位和宽度，中间设置对应方向大小的 margin 的值。

```html
<style>
  .container {
    position: relative;
  }
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    background: gold;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    background: gold;
  }
  .main {
    margin: 0 200px;
    background: lightgreen;
  }
</style>

<div class="container">
    <!-- 每一栏顺序可以任意放 -->
  <div class="left">左边固定宽度</div>
  <div class="main">中间自适应</div>
  <div class="right">右边固定宽度</div>
</div>
```

- 利用浮动+margin-left,margin-right，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的 margin 值，注意这种方式**中间一栏必须放到最后**

```html
<style>
    .left {
        float: left;
        width: 200px;
        background: coral;
    }
    .right {
        float: right;
        width: 100px;
        background: lightblue;
    }
    .middle {
        margin-left: 200px;
        margin-right: 100px;
        background: lightpink;
    }
</style>
<div class="wrap">
    <!-- 中间一栏必须放到最后 -->
    <div class="left">左侧</div>
    <div class="right">右侧</div>
    <div class="middle">中间</div>
</div>
```

- 利用 flex 布局，左右两栏设置固定大小，中间一栏设置为 flex:1;(width:100%;)。

```html
<style>
    .wrap {
        display: flex;
    }
    .left {
        width: 200px;
        background: coral;
    }
    .right {
        width: 120px;
        background: lightblue;
    }
    .middle {
        background: #555;
        flex:1;/* width: 100%; */
    }
</style>
<div class="wrap">
    <!-- 每一栏按顺序放 -->
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>
```

- grid网格布局

```html
<style>
	.wrap {
		display: grid;
		grid-template-columns: 200px auto 120px;
	}
	.left {
		background: coral;
	}
	.right {
		background: lightblue;
	}
	.middle {
		background: #555;
	}
</style>
<div class="wrap">
	<div class="left">左侧</div>
	<div class="middle">中间</div>
	<div class="right">右侧</div>
</div>
```