## scoped属性

scoped:当一个style标签拥有scoped属性时候，它的**css样式只能用于当前的Vue组件**，可以使组件的样式不相互污染。如果一个项目的所有style标签都加上了scoped属性，相当于实现了样式的模块化。  


### scoped属性的实现原理
给每一个dom元素添加了一个独一无二的动态属性，**给css选择器额外添加一个对应的属性选择器**，来选择组件中的dom。

```vue
<template>
    <div class="box">dom</div>
</template>

<style lang="scss" scoped>
.box{
    background:red;
}
</style>
```

vue将代码转译成如下：
```html
.box[data-v-11c6864c]{
    background:red;
}

<template>
    <div class="box" data-v-11c6864c>dom</div>
</template>
```


### scoped样式穿透
scoped虽然避免了组件间样式污染，但是很多时候我们需要修改父组件和子组件中的某个样式，但是又不想去除scoped属性。

1. 使用/deep/

```vue
//Parent
<template>
<div class="wrap">
    <Child />
</div>
</template>

<style lang="scss" scoped>
.wrap /deep/ .box{
    background: red;
}
</style>

//Child
<template>
    <div class="box"></div>
</template>
```

2. 使用两个style标签

```vue
//Parent
<template>
<div class="wrap">
    <Child />
</div>
</template>

<style lang="scss" scoped>
//其他样式
</style>
<style lang="scss">
.wrap .box{
    background: red;
}
</style>

//Child
<template>
    <div class="box"></div>
</template>
```