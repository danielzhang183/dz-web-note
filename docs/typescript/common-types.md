# Common Types

## Union Types 联合类型

基于已经存在的类型构建新的类型

```ts
type union = string | number
```

使用时注意用代码收窄联合类型

```ts
function print(id: string[] | string) {
  if (Array.isArray(id))
    console.log(id.join(','))
  else
    console.log(id)

}
```

## Type alias 类型别名

一个类型会被使用多次，此时我们更希望通过一个单独的名字来引用它。

```ts
interface Point {
  x: number
  y: number
}
```

## Interfaces 接口

接口声明（interface declaration）是命名对象类型的另一种方式：

```ts
interface Point {
  x: number
  y: number
}
```

### Type alias vs Interface

类型别名和接口非常相似，大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 type 中使用，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。

- 类型别名也许不会实现声明合并，但是接口可以
- 接口可能只会被用于声明对象的形状，不能重命名原始类型
- 在 TypeScript 4.2 以前，类型别名的名字可能会出现在报错信息中 (opens new window)，有时会替代等价的匿名类型（也许并不是期望的）。接口的名字则会始终出现在错误信息中

## Type Assertions 类型断言

因为类型断言会在编译的时候被移除，所以运行时并不会有类型断言的检查，即使类型断言是错误的，也不会有异常或者 null 产生。

```ts
const canvas1 = document.getElementById('canvas') as HTMLCanvasElement
// or
const canvas2 = <HTMLCanvasElement>document.getElementById('canvas')
```

TypeScript 仅仅允许类型断言转换为一个更加具体或者更不具体的类型。这个规则可以阻止一些不可能的强制类型转换，比如：

```ts
const a = 'hello' as number
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

```

有的时候，这条规则会显得非常保守，阻止了你原本有效的类型转换。如果发生了这种事情，你可以使用双重断言，先断言为 any （或者是 unknown），然后再断言为期望的类型：

```ts
const b = (expr as any) as T
```

## Non-null Assertion Operator 非空断言操作符

可以在不做任何检查的情况下，从类型中移除 `null` 和 `undefined`，这就是在任意表达式后面写上 `!`， 表示它的值不可能是 null 或者 undefined。

只有当你明确的知道这个值不可能是 `null` 或者 `undefined` 时才使用 `!`

```ts
function fixed(x?: number | null) {
  // No error
  console.log(x!.toFixed())
}
```

## Literal Types 字面量类型

将类型声明为更具体的数字或者字符串。

字面量类型本身并没有什么太大用，结合联合类型，可以限制成一些固定的字符串

```ts
type direct = 'up' | 'down' | 'left' | 'right'
```

### Literal Inference 字面量推断

```ts
declare function handleRequest(url: string, method: 'GET' | 'POST'): void

const req = { url: 'https://example.com', method: 'GET' }
handleRequest(req.url, req.method)
```
req.method 被推断为 `string` ，而不是 `"GET"`，如何解决？

1. 添加一个类型断言改变推断结果：

```ts
// option1:
const req = { url: 'https://example.com', method: 'GET' as const }
// option2
handleRequest(req.url, req.method as 'GET')
```

2. 使用 `as const` 把整个对象转为一个类型字面量：

```ts
const req = { url: 'https://example.com', method: 'GET' } as const
handleRequest(req.url, req.method)
```


## Enums 枚举

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```
