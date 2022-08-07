# Typescript

> A programming language to built top of javascript, to address shortcomings of javascript.
You can also say typescript is javascript with type checking.

## Why do we need it?

### Benefits

- Static typing  静态检查
- Code completion 代码编译
- Refactoring
- Shorthand Notation

### Drawbacks

- Compilation(编译)
  - .ts->compiler->.js
  - this process is called transpilation(转译)
  - browser don't understand typescript code, it need typescript compiler to compile and translate into javascript.
- Discipline(严格) in coding

## Primitive Types

javascript

- number
- string
- boolean
- null
- undefined
- object

typescript extension

- any can represent any kind of values
- unknown
- never values that never occur
- enum
- tuple a fixed length array where each element has a particular type

## Advanced Types

- type alias 类型别名 type
- type assertion 类型断言 as
- union types 联合类型 a | b
- optional chaining  ?.
- nullish coalescing operator a ?? 10 (null, undefined)
- literal type 字面量类型 50

## Object-Oriented Programming

### Access Modifiers

- public
- private
- protect

```ts
class Account {
  readonly id: number
  owner: string
  private _balance: number
  nikename?: string

  constructor(
    id: number,
    owner: string,
    _balance: number,
  ) {
    this.id = id
    this.owner = owner
    this._balance = _balance
  }
}

// equals

class Account {
  nikename?: string

  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number,
  ) {}

  deposit(amount: number): void {
    if (amount <= 0)
      throw new Error('Invalid amount')
    this._balance += amount
  }

  get balance(): number {
    return this._balance
  }

  set balance(val: number) {
    if (val < 0)
      throw new Error('Invalid value')
    this._balance = val
  }
}
```

### Index signature property

``` ts
class SeatAssignment {
  [seatNumber: string]: string;
}

const seats = new SeatAssignment()
seats.A1 = 'Dylan'
seats.A2 = 'Daniel'
```
