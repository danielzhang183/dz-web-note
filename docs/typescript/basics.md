# Basics

My Repo link is [here](https://github.com/danielzhang183/dz-ts-basics).

## Primitive Type

### Javascript

- string
- number
- bool
- null
- undefined
- symbol
- bigint
- object

### Typescript

- any, can represent any kind of values
- unknown, 有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的：
- never, values that never occur
- enum
- tuple, a fixed length array where each element has a particular type
- void

## Object-oriented Programming

### Optional Properties 可选属性

### `readonly` Properties 只读属性

### Index Signatures 索引签名

### Extending Types 属性继承

### Intersection Types 交叉类型

### Interfaces vs Intersections

### Generic Object Types 泛型对象类型

```ts
interface Box<Type> {
  contents: Type
}
```

we can use `Generic Object Types` to avoid overloads
