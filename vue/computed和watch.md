## Computed 和 Watch 的区别（缓存和异步监听）

### **对于Computed：**

- **支持缓存**，只有依赖的数据发生了变化，才会重新计算
- **不支持异步监听，当Computed中有异步操作时，无法监听数据的变化
- computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed  
- 如果computed属性的**属性值是函数，那么默认使用get方法**，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。



### **对于Watch：**

- **不支持缓存**，数据变化时，它就会触发相应的操作
- **支持异步监听**
- 监听函数handler接收两个参数，第一个参数是newValue，第二个是oldValue
- 监听数据必须是data中声明的或者父组件传递过来的props中的数据，当监听的数据发生变化时，就需要执行相应的操作。  
  配置项：
  - immediate：组件加载立即触发回调函数
  - deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。


### **运用场景：** 

- 当需要进行数值计算,并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。 

  ![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220317190708.png)

- 当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作 ( 访问一个 API )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。 
  ![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/20220317190750.png)