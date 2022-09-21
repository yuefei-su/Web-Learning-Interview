### data为什么是一个函数（复用组件）而不是对象（引用类型）

JavaScript中的对象是**引用类型的数据**，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。



而在Vue中，更多的是想要**复用组件**，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。



所以组件的数据不能写成对象的形式，而是要写成函数的形式。**数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。**



### Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？

```vue
<template> 
   <div>
      <ul>
         <li v-for="value in obj" :key="value"> {{value}} </li> 
      </ul> 
      <button @click="addObjB">添加 obj.b</button> 
   </div>
</template>

<script>
    export default { 
       data () { 
          return { 
              obj: { 
                  a: 'obj.a' 
              } 
          } 
       },
       methods: { 
          addObjB () { 
              this.obj.b = 'obj.b' 
              console.log(this.obj) 
          } 
      }
   }
</script>
```

点击 button 会发现，obj.b 已经成功添加，但是视图并未刷新。这是因为在Vue实例创建时，obj.b并未声明，因此就**没有被Vue转换为响应式的属性**，自然就不会触发视图的更新，这时就需要使用Vue的全局 api **$set()：**

```js
addObjB () (
   this.$set(this.obj, 'b', 'obj.b')
   console.log(this.obj)
}
```

$set()方法相当于手动的去把obj.b处理成一个响应式的属性，此时视图也会跟着改变了。