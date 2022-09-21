## flex布局

### 1.父元素属性

| 属性            | 属性值                                                         | 备注                                                             |
| --------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| display         | flex                                                           | 定义了一个flex容器，它的直接子元素会接受这个flex环境             |
| flex-direction  | row,row-reverse,column,column-reverse                          | 决定主轴排列的方向                                               |
| flex-wrap       | nowrap,wrap,wrap-reverse                                       | 如果一条轴线排列不下，如何换行                                   |
| flex-flow       | [flex-direction] , [flex-wrap]                                 | 复合属性，默认值为row nowrap                                     |
| justify-content | flex-start,flex-end,center,space-between,space-around          | 设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式             |
| align-items     | flex-start,flex-end,center,baseline,stretch                    | 设置或检索弹性盒子元素在交叉轴（纵轴）方向上的对齐方式           |
| align-content   | flex-start,flex-end,center,space-between,space-around,stretch; | 多根轴线（多行）的对齐方式。如果项目只有一根轴线，该属性不起作用 |



### 2. 子元素属性
| 属性        | 属性值                                           | 备注                                                                                                    |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| order       | [int]                                            | 默认情况下flex order会按照书写顺序呈现，可以通过order属性改变排列顺序，数值小的在前面，还可以是负数     |
| flex-grow   | [number]                                         | 设置或检索弹性盒的扩展比率,根据弹性盒子元素所设置的扩展因子作为比率来分配剩余空间。默认为0不索取放大    |
| flex-shrink | [number]                                         | 设置或检索弹性盒的收缩比率,根据弹性盒子元素所设置的收缩因子作为比率来收缩空间。默认为1，大于1按比例缩小 |
| flex-basis  | [length], auto                                   | 设置或检索弹性盒伸缩初始值                                                                              |
| flex        | [flex-grow],[flex-shrink],[flex-basis]           | 复合属性。flex:1;等价于flex:1 1 auto                                                                    |
| align-self  | auto,flex-start,flex-end,center,baseline,stretch | 设置或检索弹性盒子元素在交叉轴（纵轴）方向上的对齐方式，可以覆盖父容器align-items的设置                 |


