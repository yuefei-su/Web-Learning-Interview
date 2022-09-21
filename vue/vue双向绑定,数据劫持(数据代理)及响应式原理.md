
### v-model双向绑定原理

v-model本质上是**v-bind**（单向数据绑定（data绑页面），页面数据改变不影响data内数据）和**v-on**（绑定methods，函数方法修改data，然后v-bind来data修改页面）语法糖。这个语法糖必须是固定的，也就是说属性必须为value，方法名必须为：input。

```html
<input v-model="sth" />
//  等同于
<input :value="sth" @input="sth = $event.target.value" />
```

在自定义组件上实现v-model
```html
//Parent
<template>
    {{num}}
    <Child v-model="num">
</template>
export default {
    data(){
        return {
            num: 0
        }
    }
}

//Child
<template>
    <div @click="add">Add</div>
</template>
export default {
    props: ['value'],
    methods:{
        add(){
            this.$emit('input', this.value + 1)
        }
    }
}
```

v-model 在内部为不同的输入元素使用不同的**属性**并抛出不同的**事件**。

- text 和 textarea 元素使用 `value` 属性和 `input` 事件  
- checkbox 和 radio 使用 `checked` 属性和 `change` 事件  
- select 字段将 `value` 作为 prop 并将 `change` 作为事件

### Vue2.0 实现数据双向绑定的方法

**vue2.0采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()劫持data属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调**。  

缺点：但是它并不算是实现数据的响应式的完美方案，某些情况下需要对其进行修补或者hack这也是它的缺陷，主要表现在两个方面：

- vue 实例创建后，无法检测到**对象属性**的新增或删除，只能追踪到数据是否被修改
- 不能监听**数组**的变化

![](https://raw.githubusercontent.com/yuefei-su/My-DrawingBed/main/notes/%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%93%8D%E5%BA%94%E5%BC%8F.jpg)

#### vue给对象新增属性页面没有响应
由于Vue会在初始化实例时对属性执行getter/setter转化，所以属性必须在data对象上存在才能让Vue将它转换为响应式的。Vue提供了$set方法用来触发视图更新。

```js
export default {
    data(){
        return {
            obj: {
                name: 'fei'
            }
        }
    },
    mounted(){
        this.$set(this.obj, 'sex', 'man')
    }

}
```
解决方案：
- 如果为对象添加少量的新属性，可以直接采用**Vue.set()**
- 如果需要为新对象添加大量的新属性，则通过Object.assign()创建新对象
- 如果你实在不知道怎么操作时，可采取$forceUpdate()进行强制刷新 (不建议)  
PS：vue3是用过proxy实现数据响应式的，直接动态添加新属性仍可以实现数据响应式


#### 使用 Object.defineProperty() 来进行数据劫持有什么缺点？
数据劫持：在访问或修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或修改并返回结果。  
数据代理：vm对象实例内的name代理vm对象实例内_data{}对象里的实际name  
数据监测：vm对象实例内的name的getter和setter。     

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法。

### Vue3.0 实现数据双向绑定的方法

vue3.0 实现数据双向绑定是通过Proxy

- Proxy是 ES6 中新增的一个特性，翻译过来意思是"代理"，用在这里表示由它来“代理”某些操作。 Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。
- Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
- 使用 Proxy 的核心优点是可以交由它来处理一些非核心逻辑（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）。 从而可以让对象只需关注于核心逻辑，达到关注点分离，降低对象复杂度等目的。

扩展：  
使用proxy实现，双向数据绑定，相比2.0的Object.defineProperty()优势：
- 可以劫持整个对象，并返回一个新对象
- 有13种劫持操作

###  双向数据绑定的原理

vue2.0采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()劫持data属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是: ①在自身实例化时往属性订阅器(dep)里面添加自己 ②自身必须有一个update()方法 ③待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

![image](https://cdn.nlark.com/yuque/0/2021/png/1500604/1618656573096-ebdc520c-5d60-4d12-ad04-5df4ebbb5fe7.png)
