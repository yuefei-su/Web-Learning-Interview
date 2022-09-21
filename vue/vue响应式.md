
### 名词概念
- 数据劫持：在访问或修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或修改并返回结果。
- 数据代理：vm对象实例内的name代理vm对象实例内_data{}对象里的实际name
- 数据监测：vm对象实例内的name的getter和setter。


### Vue2.0 实现数据双向绑定的方法

**vue2.0采用数据劫持结合发布者-订阅者模式的方式：通过Object.defineProperty()对data属性的setter（修改），getter（访问）进行拦截，并发布消息给订阅者，触发相应的监听回调**。

- get  
属性的 getter 函数，**当访问该属性时，会调用此函数**。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值

- set  
属性的 setter 函数，**当属性值被修改时，会调用此函数**。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined

#### 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

只有get和set的缺点：
- vue 实例创建后，无法检测到**对象内属性**的新增或删除(因为添加的属性没有get和set，所以不是响应式，只能追踪到数据是否被访问和修改)
- 不能监听**数组**的变化（比如通过下标方式修改数组数据），（使用splice修改原数组的方法可以监听，forEach方法监听不到）

#### vue给对象新增属性并加上get、set使之成为响应式

由于Vue会在初始化实例时对属性执行getter/setter转化，所以**属性必须在data对象上存在才能让Vue将它转换为响应式**。

```javascript
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

- 直接使用该对象的`$set` `$delete`方法用来触发视图更新。
- 如果为对象添加、删除少量的新属性，可以直接采用`Vue.set()` `Vue.delete()`
- 如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象
- 如果你实在不知道怎么操作时，可采取$forceUpdate()进行强制刷新 (不建议)  
PS：vue3是用proxy实现数据响应式的，直接动态添加新属性仍可以实现数据响应式

![双向绑定响应式.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/23091980/1655090876189-eaf1ee52-70c5-47d2-9b29-20a81888ed38.jpeg#clientId=ube1f6bb9-0ee7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=894&id=ufb5b651b&name=%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%93%8D%E5%BA%94%E5%BC%8F.jpg&originHeight=1788&originWidth=1516&originalType=binary&ratio=1&rotation=0&showTitle=false&size=494519&status=done&style=none&taskId=ua34c1346-700a-433b-8c47-d0f7a0987f5&title=&width=758)

### Vue3.0 实现数据双向绑定的方法

vue3.0 实现数据双向绑定是通过Proxy  

Proxy 是创建对象的虚拟表示，并提供 set 、get 和 deleteProperty 等处理器，这些处理器可在访问或修改原始对象上的属性时进行拦截

```js
function reactive(obj) {
    if (typeof obj !== 'object' && obj != null) {
        return obj
    }
    // Proxy相当于在对象外层加拦截
    const observed = new Proxy(obj, {
        //读取某个属性时调用        
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`读取${key}:${res}`)
            return res
        },
        //修改或者增加某个属性时调用
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log(`修改或增加${key}:${value}`)
            return res
        },
        //删除某个属性时调用
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除${key}:${res}`)
            return res
        }
    })
    return observed
}
```

Proxy可以直接监听数组的变化（push、shift、splice）

```js
const obj = [1,2,3]
const proxtObj = reactive(obj)
obj.psuh(4) // ok
```

#### 使用proxy实现，双向数据绑定，相比2.0的Object.defineProperty()优势
- Proxy 直接代理**整个对象**而非对象属性，这样只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性。（不需要使用 `Vue.$set` 或 `Vue.$delete` 触发响应式）
- 全方位的**监听数组**的变化，消除了Vue2 无效的边界情况
- 有13种劫持操作,不限于apply、ownKeys、deleteProperty、has等等

