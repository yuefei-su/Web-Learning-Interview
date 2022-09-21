### v-if和v-show的区别

- **手段**：v-if是动态的向**DOM树**内添加或者删除DOM元素；v-show是通过设置DOM元素的**display样式属性**控制显隐；
- **编译过程**：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
- **编译条件**：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；
- **性能消耗**：v-if有更高的**切换**消耗；v-show有更高的初始渲染消耗；
- **使用场景**：v-if适合运行条件不大可能改变；v-show适合频繁**切换**。


### v-if、v-show、v-html 的原理

- **v-if会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染**；
- v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display； 
- v-html会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值。