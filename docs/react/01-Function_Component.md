# Function component

## 类组件的不足（Hooks要解决的问题）

1. 缺少逻辑复用机制

- 为了复用逻辑增加无实际渲染效果的组件，增加了组件层级，增加了调试的难度以及运行效率的降低

2. 类组件经常会变得复杂难以维护

- 将一组相干的业务逻辑拆分到多个生命周期函数中
在一个生命周期函数内存在多个不相干的业务逻辑

3. 类成员方法不能保证this指向的正确性

## React Hooks使用

> Hooks意为钩子，React Hooks就是一堆钩子函数，React通过这些钩子函数对函数型组件进行增强，不同的钩子函数提供了不同的功能

- useState()
- useEffects()
- useReducer()
- useCallback()
- useContext()
- useMemo()
