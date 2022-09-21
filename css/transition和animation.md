
## transition和animation

1. animation 其实也叫**关键帧**，通过和 keyframe 结合可以设置中间帧的一个状态；transition 是**过渡**，是样式值的变化的过程，只有开始和结束；
2. animation配合 @keyframe 可以不触发事件就触发这个过程，而 **transition 需要通过 hover 或者 js 事件来配合触发**；
3. animation 可以设置很多的属性，比如循环次数，动画结束的状态等等，**transition 只能触发一次**；
4. animation 可以结合 keyframe 设置每一帧，但是 **transition 只有两帧**；

Animation和transition大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是transition需要触发一个事件才能改变属性，而animation不需要触发任何事件的情况下才会随时间改变属性值，并且transition为2帧，从from .... to，而animation可以一帧一帧的。
