// @errors: 2345
type sides = "left" | "right" | "center";

type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const newBear: Bear = { name: '', honey: true } 

interface Animal2 {
  name: string;
}

interface Bear2 extends Animal2 {
  honey: boolean;
}

const newBear2: Bear2 = {
  honey: false,
  name: 'Yogui'
}


function printText(s: string, alignment: sides) {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "left");

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) { //'strs' is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

printAll(["hola", "Hi"])

console.log(typeof [], typeof {}, typeof null, typeof undefined, typeof NaN) 
console.log(Boolean ([]), Boolean ({}), Boolean(null), Boolean(undefined), Boolean(NaN)) 
console.log(Boolean ("hola")) 

// ====================================== Check Types ======================================

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal ; // (parameter) animal: Fish | Human
  } else {
    animal; // (parameter) animal: Bird | Human
  }
}

console.log(move({ swim: () => console.log('Exec') }) );


function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // (parameter) x: Date
  } else {
    console.log(x.toUpperCase()); // (parameter) x: string
  }
}

function isFish(pet: Fish | Bird): pet is Fish{
  return (pet as Fish ).swim !== undefined;
}

const res = isFish({ swim: () => console.log('Exec') });

// ====================================== Handle interfaces ======================================

//  Bad
interface Shape1 {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// Good
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
        return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

// ====================================== never type ======================================

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape2 = Circle | Square | Triangle;
// add a new member to the Shape union, will cause a typeScript error
function getArea2(shape: Shape2) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// Algunas funciones nunca devuelven un valor:

function fail(msg: string): never {
  throw new Error(msg);
}

// ====================================== Call signatures ======================================

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
 
doSomething(myFunc);

// Build signatures
type SomeConstructor = {
  new (s: string): string;
};

function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}


// ====================================== Generic Functions ======================================
// RECUERDA QUE LOS GENERICOS SE BASAN EN LA RELACION ENTRE DOS O MAS VALORES DE UN MISMO TIPO

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func)
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
const parsed2 = map(["1", "2", "3"], (n) => n.toLowerCase());

function longest<Type extends { length: number, concat: () => void  }>(a: Type, b: Type): Type {
  if (a.length >= b.length) {
    return a;
  }else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(100, 100);

// Especificacion de argumentos de TIPO
function combine<Type> (arr: Type[], arr2: Type[]): Type[] {
  return arr.concat(arr2);
}

const arr = combine([1,2,3], [5,6]);
const arr2 = combine<string | number>(["hello"], [5,6]);

//* si un parámetro de tipo solo aparece en una ubicación, reconsidere seriamente si realmente lo necesita

function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);





interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}
 
interface StringArray {
  [index: number]: string;
}

// const myArray: StringArray = getStringArray();
// const secondItem = myArray[1];


// interface GenericIdentityFn {
//   <Type>(arg: Type): Type;
// }
 
// function identity<Type>(arg: Type): Type {
//   return arg;
// }
 
// let myIdentity: GenericIdentityFn = identity;


interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;


class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal3 {
  numLegs: number = 4;
}
 
class Bee extends Animal3 {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal3 {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<T extends Animal3>(c: new () => T): T {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;


//   "([)]"

function isValid(value: string): boolean {
  const stack = [];
  const pairs: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (const char of value ) {
    
  }
}




























