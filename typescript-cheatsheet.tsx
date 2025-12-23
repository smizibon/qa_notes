import { useState } from 'react';
import { FileCode, ChevronDown, ChevronUp } from 'lucide-react';

export default function TypeScriptCheatsheet() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileCode className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">TypeScript Beginner Cheatsheet</h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg">Complete guide with explanations, examples, and best practices</p>
        </div>

        <div className="space-y-6">
          {/* Getting Started */}
          <ExpandableSection 
            title="Getting Started" 
            id="getting-started"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              TypeScript is JavaScript with syntax for types. It helps catch errors early and makes code more maintainable.
            </Explanation>
            <CodeBlock title="Installation & Setup">
{`# Install TypeScript globally
npm install -g typescript

# Check version
tsc --version

# Create a TypeScript file
touch index.ts

# Compile TypeScript to JavaScript
tsc index.ts

# Watch mode (auto-compile on save)
tsc index.ts --watch

# Initialize tsconfig.json
tsc --init`}
            </CodeBlock>
            <TipBox>
              Always use a tsconfig.json for projects. It centralizes compiler options and makes your project more maintainable.
            </TipBox>
          </ExpandableSection>

          {/* Basic Types - Extended */}
          <ExpandableSection 
            title="Basic Types (Primitives)" 
            id="basic-types"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              TypeScript has several built-in types. These are the building blocks of your type system.
            </Explanation>
            <CodeBlock title="String, Number, Boolean">
{`// String - for text
let userName: string = "Alice";
let greeting: string = \`Hello, \${userName}\`; // template literals work
userName = "Bob"; // ✓ OK
// userName = 123; // ✗ Error: Type 'number' is not assignable to 'string'

// Number - for all numbers (integers, floats, etc.)
let age: number = 25;
let price: number = 19.99;
let hex: number = 0xf00d; // hexadecimal
let binary: number = 0b1010; // binary
let octal: number = 0o744; // octal

// Boolean - true or false
let isActive: boolean = true;
let hasPermission: boolean = false;
// let maybe: boolean = "yes"; // ✗ Error`}
            </CodeBlock>

            <CodeBlock title="Arrays - Two Syntaxes">
{`// Syntax 1: Type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let mixed: (string | number)[] = [1, "two", 3]; // union type array

// Syntax 2: Array<Type>
let scores: Array<number> = [95, 87, 92];
let items: Array<string> = ["apple", "banana"];

// Array methods work as expected
numbers.push(6); // ✓ OK
// numbers.push("7"); // ✗ Error: Argument of type 'string' is not assignable

// Multi-dimensional arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];`}
            </CodeBlock>

            <CodeBlock title="Tuples - Fixed Length Arrays">
{`// Tuple: array with fixed length and known types at each position
let person: [string, number] = ["Alice", 30];
let point: [number, number] = [10, 20];

// Access by index
console.log(person[0]); // "Alice"
console.log(person[1]); // 30

// Destructuring works
let [name, age] = person;

// Optional tuple elements
let optional: [string, number?] = ["Bob"]; // age is optional
optional = ["Charlie", 25]; // both values also OK

// Rest elements in tuples
let scores: [string, ...number[]] = ["Alice", 95, 87, 92, 88];

// Readonly tuples
let coordinate: readonly [number, number] = [10, 20];
// coordinate[0] = 15; // ✗ Error: Cannot assign to '0' because it is a read-only property`}
            </CodeBlock>

            <CodeBlock title="Any, Unknown, Void, Null, Undefined">
{`// Any - turns off type checking (avoid when possible!)
let anything: any = "hello";
anything = 42;
anything = true;
anything.someMethod(); // No error, but might crash at runtime!

// Unknown - safer version of any (requires type checking before use)
let uncertain: unknown = "hello";
// uncertain.toUpperCase(); // ✗ Error: Object is of type 'unknown'
if (typeof uncertain === "string") {
  console.log(uncertain.toUpperCase()); // ✓ OK after type guard
}

// Void - absence of a return value (used for functions)
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement
}

// Null and Undefined
let empty: null = null;
let notDefined: undefined = undefined;

// With strictNullChecks enabled, these are separate types
let maybeString: string | null = null;
maybeString = "hello"; // ✓ OK

// Never - for functions that never return
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {}
}`}
            </CodeBlock>

            <TipBox>
              Use 'unknown' instead of 'any' when you don't know the type. It forces you to check the type before using it, making your code safer.
            </TipBox>
          </ExpandableSection>

          {/* Type Inference */}
          <ExpandableSection 
            title="Type Inference" 
            id="type-inference"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              TypeScript can often figure out types automatically. You don't always need to explicitly write them.
            </Explanation>
            <CodeBlock title="When TypeScript Infers Types">
{`// TypeScript infers type from initial value
let message = "Hello"; // inferred as string
let count = 42; // inferred as number
let isComplete = false; // inferred as boolean

// message = 123; // ✗ Error: Type 'number' is not assignable to 'string'

// Arrays are also inferred
let nums = [1, 2, 3]; // inferred as number[]
let mixed = [1, "two", true]; // inferred as (string | number | boolean)[]

// Function return types are inferred
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}

// When to be explicit
let value; // inferred as 'any' - not helpful!
let betterValue: string; // explicit is better here

// Const vs Let
let flexible = "hello"; // type: string (can be reassigned)
const fixed = "hello"; // type: "hello" (literal type, cannot be reassigned)`}
            </CodeBlock>
            <TipBox>
              Let TypeScript infer when it's obvious. Be explicit when initialization is separate from declaration, or when you want to be extra clear.
            </TipBox>
          </ExpandableSection>

          {/* Functions - Deep Dive */}
          <ExpandableSection 
            title="Functions" 
            id="functions"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Functions in TypeScript can have typed parameters and return types. This prevents bugs and improves code documentation.
            </Explanation>
            <CodeBlock title="Function Basics">
{`// Named function with types
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number => {
  return a + b;
};

// Shorter arrow function (implicit return)
const multiply = (a: number, b: number): number => a * b;

// Void return type (no return value)
function logError(message: string): void {
  console.error(message);
}

// Function expressions
const divide: (a: number, b: number) => number = function(a, b) {
  return a / b;
};`}
            </CodeBlock>

            <CodeBlock title="Optional & Default Parameters">
{`// Optional parameters (use ?)
function greet(name: string, age?: number): string {
  if (age !== undefined) {
    return \`Hello, \${name}. You are \${age} years old.\`;
  }
  return \`Hello, \${name}!\`;
}

greet("Alice"); // ✓ OK
greet("Bob", 30); // ✓ OK

// Default parameters
function createUser(name: string, role: string = "user"): void {
  console.log(\`\${name} is a \${role}\`);
}

createUser("Alice"); // role defaults to "user"
createUser("Bob", "admin"); // role is "admin"

// Optional must come after required
// function bad(age?: number, name: string) {} // ✗ Error!`}
            </CodeBlock>

            <CodeBlock title="Rest Parameters">
{`// Rest parameters - collect multiple arguments into array
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mixing regular and rest parameters
function announce(message: string, ...names: string[]): void {
  console.log(\`\${message}: \${names.join(", ")}\`);
}

announce("Winners", "Alice", "Bob", "Charlie");
// Output: "Winners: Alice, Bob, Charlie"`}
            </CodeBlock>

            <CodeBlock title="Function Overloads">
{`// Function overloads - same function, different signatures
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// Implementation (must handle all cases)
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "YES" : "NO";
  }
}

console.log(format("hello")); // "HELLO"
console.log(format(42)); // "42.00"
console.log(format(true)); // "YES"`}
            </CodeBlock>

            <TipBox>
              Always type your function parameters. Return types can often be inferred, but being explicit helps with documentation and catches errors.
            </TipBox>
          </ExpandableSection>

          {/* Objects & Interfaces */}
          <ExpandableSection 
            title="Objects & Interfaces" 
            id="interfaces"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Interfaces define the structure of objects. They're like contracts that objects must follow.
            </Explanation>
            <CodeBlock title="Basic Interface">
{`// Define an interface
interface User {
  name: string;
  age: number;
  email: string;
}

// Create an object following the interface
const user: User = {
  name: "Alice",
  age: 30
}; // ✓ OK`}
            </CodeBlock>

            <CodeBlock title="Optional & Readonly Properties">
{`interface Product {
  id: number;           // required
  name: string;         // required
  description?: string; // optional (may be undefined)
  readonly price: number; // cannot be changed after creation
}

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 1999
  // description is optional, so we can omit it
};

// laptop.price = 1500; // ✗ Error: Cannot assign to 'price' because it is read-only
laptop.description = "Powerful laptop"; // ✓ OK

// Checking optional properties
if (laptop.description) {
  console.log(laptop.description.toUpperCase());
}`}
            </CodeBlock>

            <CodeBlock title="Method Signatures">
{`interface Calculator {
  // Method syntax 1
  add(a: number, b: number): number;
  
  // Method syntax 2 (property with function type)
  subtract: (a: number, b: number) => number;
}

const calc: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract: (a, b) => a - b
};

console.log(calc.add(5, 3)); // 8
console.log(calc.subtract(10, 4)); // 6`}
            </CodeBlock>

            <CodeBlock title="Extending Interfaces">
{`// Base interface
interface Person {
  name: string;
  age: number;
}

// Extended interface (inherits from Person)
interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: 12345,
  department: "Engineering"
};

// Multiple inheritance
interface ContactInfo {
  email: string;
  phone: string;
}

interface FullEmployee extends Person, ContactInfo {
  employeeId: number;
}

const fullEmployee: FullEmployee = {
  name: "Bob",
  age: 28,
  email: "bob@company.com",
  phone: "555-1234",
  employeeId: 67890
};`}
            </CodeBlock>

            <CodeBlock title="Index Signatures">
{`// Index signature - for objects with dynamic keys
interface StringDictionary {
  [key: string]: string;
}

const colors: StringDictionary = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
};

// Can add any string key
colors.yellow = "#FFFF00";

// Mixing index signature with known properties
interface UserDatabase {
  admin: string; // specific known property
  [username: string]: string; // other usernames
}

const users: UserDatabase = {
  admin: "Alice",
  bob: "Bob Smith",
  charlie: "Charlie Brown"
};`}
            </CodeBlock>
            <TipBox>
              Use interfaces for object shapes. They're great for defining data structures and can be extended or implemented by classes.
            </TipBox>
          </ExpandableSection>

          {/* Type Aliases */}
          <ExpandableSection 
            title="Type Aliases" 
            id="type-aliases"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Type aliases create a new name for a type. They're more flexible than interfaces but can't be extended the same way.
            </Explanation>
            <CodeBlock title="Basic Type Aliases">
{`// Alias for primitive types
type ID = string | number;
type Username = string;
type Age = number;

let userId: ID = "abc123"; // ✓ OK
userId = 12345; // ✓ OK

// Alias for object types
type Point = {
  x: number;
  y: number;
};

const origin: Point = { x: 0, y: 0 };

// Alias for function types
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;`}
            </CodeBlock>

            <CodeBlock title="Union Types">
{`// Union type - value can be one of several types
type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending";
orderStatus = "approved"; // ✓ OK
// orderStatus = "cancelled"; // ✗ Error: not in union

// Union with different types
type Result = string | number | boolean;

function process(value: Result): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    console.log(value ? "TRUE" : "FALSE");
  }
}

// Discriminated unions (powerful pattern!)
type Success = { status: "success"; data: string };
type Error = { status: "error"; message: string };
type ApiResponse = Success | Error;

function handleResponse(response: ApiResponse): void {
  if (response.status === "success") {
    console.log(response.data); // TypeScript knows it has 'data'
  } else {
    console.log(response.message); // TypeScript knows it has 'message'
  }
}`}
            </CodeBlock>

            <CodeBlock title="Intersection Types">
{`// Intersection type - combines multiple types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

// Combine both types
type EmployeePerson = Person & Employee;

const worker: EmployeePerson = {
  name: "Alice",
  age: 30,
  employeeId: 12345,
  department: "IT"
};

// Useful for mixing capabilities
type Printable = { print: () => void };
type Saveable = { save: () => void };
type Document = Printable & Saveable;

const doc: Document = {
  print() { console.log("Printing..."); },
  save() { console.log("Saving..."); }
};`}
            </CodeBlock>

            <CodeBlock title="Type vs Interface - When to Use Which">
{`// Use INTERFACE for:
// - Object shapes and class contracts
// - When you need to extend/inherit
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// Use TYPE for:
// - Unions and intersections
type StringOrNumber = string | number;

// - Primitives and tuples
type Coordinate = [number, number];

// - Complex type manipulations
type ReadonlyPerson = Readonly<Person>;

// Both work for objects, but interface is preferred
interface Config1 { theme: string; }
type Config2 = { theme: string; };`}
            </CodeBlock>
            <TipBox>
              Use 'interface' for object shapes. Use 'type' for unions, intersections, and when you need more flexibility.
            </TipBox>
          </ExpandableSection>

          {/* Classes */}
          <ExpandableSection 
            title="Classes" 
            id="classes"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Classes in TypeScript add type annotations and access modifiers to JavaScript classes.
            </Explanation>
            <CodeBlock title="Basic Class">
{`class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): string {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
}

const person = new Person("Alice", 30);
console.log(person.greet());`}
            </CodeBlock>

            <CodeBlock title="Access Modifiers">
{`class BankAccount {
  public accountNumber: string;    // accessible everywhere
  private balance: number;          // only inside this class
  protected owner: string;          // this class and subclasses

  constructor(accountNumber: string, owner: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = initialBalance;
  }

  // Public method
  public getBalance(): number {
    return this.balance;
  }

  // Private method
  private calculateInterest(): number {
    return this.balance * 0.05;
  }

  // Protected method
  protected logTransaction(amount: number): void {
    console.log(\`Transaction: \${amount}\`);
  }

  public deposit(amount: number): void {
    this.balance += amount;
    this.logTransaction(amount);
  }
}

const account = new BankAccount("123456", "Alice", 1000);
console.log(account.accountNumber); // ✓ OK (public)
// console.log(account.balance); // ✗ Error (private)
// console.log(account.owner); // ✗ Error (protected)`}
            </CodeBlock>

            <CodeBlock title="Readonly & Static">
{`class User {
  readonly id: number; // can only be set in constructor
  static userCount: number = 0; // shared across all instances

  constructor(public name: string) {
    this.id = Date.now();
    User.userCount++;
  }

  // Static method
  static getUserCount(): number {
    return User.userCount;
  }
}

const user1 = new User("Alice");
const user2 = new User("Bob");

// user1.id = 999; // ✗ Error: Cannot assign to 'id' because it is read-only
console.log(User.getUserCount()); // 2`}
            </CodeBlock>

            <CodeBlock title="Inheritance">
{`class Animal {
  constructor(public name: string) {}

  makeSound(): string {
    return "Some generic sound";
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // call parent constructor
  }

  // Override parent method
  makeSound(): string {
    return "Woof! Woof!";
  }

  // New method specific to Dog
  fetch(): string {
    return \`\${this.name} is fetching the ball\`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.makeSound()); // "Woof! Woof!"
console.log(dog.fetch()); // "Buddy is fetching the ball"`}
            </CodeBlock>

            <CodeBlock title="Abstract Classes">
{`// Abstract class - cannot be instantiated directly
abstract class Shape {
  constructor(public color: string) {}

  // Abstract method - must be implemented by subclasses
  abstract calculateArea(): number;

  // Concrete method - inherited by subclasses
  describe(): string {
    return \`A \${this.color} shape with area \${this.calculateArea()}\`;
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

// const shape = new Shape("red"); // ✗ Error: Cannot create instance of abstract class
const circle = new Circle("red", 5);
const rect = new Rectangle("blue", 10, 5);

console.log(circle.describe());
console.log(rect.describe());`}
            </CodeBlock>

            <CodeBlock title="Implementing Interfaces">
{`interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

// Class can implement multiple interfaces
class Document implements Printable, Saveable {
  constructor(public content: string) {}

  print(): void {
    console.log(\`Printing: \${this.content}\`);
  }

  save(): void {
    console.log(\`Saving: \${this.content}\`);
  }
}

const doc = new Document("Hello World");
doc.print();
doc.save();`}
            </CodeBlock>
            <TipBox>
              Use 'private' for internal implementation details, 'protected' for things subclasses need, and 'public' for the class's API.
            </TipBox>
          </ExpandableSection>

          {/* Generics */}
          <ExpandableSection 
            title="Generics" 
            id="generics"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Generics allow you to write reusable code that works with multiple types while maintaining type safety.
            </Explanation>
            <CodeBlock title="Generic Functions">
{`// Without generics - separate functions needed
function identityNumber(arg: number): number {
  return arg;
}

function identityString(arg: string): string {
  return arg;
}

// With generics - one function for all types
function identity<T>(arg: T): T {
  return arg;
}

// TypeScript infers the type
let num = identity(42); // T is number
let str = identity("hello"); // T is string

// Explicit type
let bool = identity<boolean>(true);

// Generic with arrays
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirst([1, 2, 3]); // number | undefined
const firstName = getFirst(["Alice", "Bob"]); // string | undefined`}
            </CodeBlock>

            <CodeBlock title="Generic Interfaces & Types">
{`// Generic interface
interface Box<T> {
  value: T;
  getValue: () => T;
}

const numberBox: Box<number> = {
  value: 42,
  getValue() {
    return this.value;
  }
};

const stringBox: Box<string> = {
  value: "hello",
  getValue() {
    return this.value;
  }
};

// Generic type alias
type Pair<T, U> = {
  first: T;
  second: U;
};

const pair: Pair<string, number> = {
  first: "age",
  second: 30
};

// Generic with default type
type Container<T = string> = {
  content: T;
};

const defaultContainer: Container = { content: "hello" }; // defaults to string
const numberContainer: Container<number> = { content: 42 };`}
            </CodeBlock>

            <CodeBlock title="Generic Classes">
{`class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  getAll(): T[] {
    return [...this.data];
  }
}

// Use with numbers
const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);
console.log(numberStore.getAll()); // [1, 2]

// Use with strings
const stringStore = new DataStore<string>();
stringStore.add("hello");
stringStore.add("world");
console.log(stringStore.getAll()); // ["hello", "world"]`}
            </CodeBlock>

            <CodeBlock title="Generic Constraints">
{`// Constrain T to types that have a length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}

logLength("hello"); // ✓ OK - string has length
logLength([1, 2, 3]); // ✓ OK - array has length
// logLength(42); // ✗ Error - number doesn't have length

// Constrain to object with specific property
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // ✓ OK - returns string
const age = getProperty(person, "age"); // ✓ OK - returns number
// const invalid = getProperty(person, "email"); // ✗ Error - 'email' not in person

// Multiple constraints
interface Comparable {
  compareTo(other: Comparable): number;
}

function max<T extends Comparable & HasLength>(a: T, b: T): T {
  return a.compareTo(b) > 0 ? a : b;
}`}
            </CodeBlock>
            <TipBox>
              Use generics when you want type safety across different types without duplicating code. They're perfect for containers, utilities, and reusable components.
            </TipBox>
          </ExpandableSection>

          {/* Enums */}
          <ExpandableSection 
            title="Enums" 
            id="enums"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Enums allow you to define a set of named constants, making code more readable and less error-prone.
            </Explanation>
            <CodeBlock title="Numeric Enums">
{`// Numeric enum (default starts at 0)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let move: Direction = Direction.Up;
console.log(move); // 0

// Custom starting value
enum Status {
  Pending = 1,
  Approved,  // 2
  Rejected   // 3
}

// Custom values
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

function handleStatus(status: HttpStatus): void {
  if (status === HttpStatus.OK) {
    console.log("Success!");
  }
}`}
            </CodeBlock>

            <CodeBlock title="String Enums">
{`// String enum (recommended for most cases)
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let favorite: Color = Color.Red;
console.log(favorite); // "RED"

// More readable in logs and debugging
enum LogLevel {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG"
}

function log(level: LogLevel, message: string): void {
  console.log(\`[\${level}] \${message}\`);
}

log(LogLevel.Error, "Something went wrong"); // [ERROR] Something went wrong`}
            </CodeBlock>

            <CodeBlock title="Const Enums">
{`// Const enum - removed during compilation for performance
const enum Size {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE"
}

let shirtSize: Size = Size.Medium;

// Regular enums vs const enums:
// Regular: generates JavaScript object
// Const: inlines values directly (no runtime object)`}
            </CodeBlock>
            <TipBox>
              Prefer string enums over numeric enums for better debugging. The values are more meaningful in logs and error messages.
            </TipBox>
          </ExpandableSection>

          {/* Type Guards */}
          <ExpandableSection 
            title="Type Guards & Narrowing" 
            id="type-guards"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Type guards help TypeScript narrow down types within conditional blocks, making your code safer.
            </Explanation>
            <CodeBlock title="typeof Type Guards">
{`function process(value: string | number): void {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}

// Works with: "string", "number", "boolean", "object", "function", "undefined"
function example(x: string | number | boolean | undefined): void {
  if (typeof x === "string") {
    console.log(x.length);
  } else if (typeof x === "number") {
    console.log(x.toFixed());
  } else if (typeof x === "boolean") {
    console.log(x ? "true" : "false");
  } else {
    console.log("undefined");
  }
}`}
            </CodeBlock>

            <CodeBlock title="instanceof Type Guards">
{`class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}

// Works with built-in types too
function processValue(value: Date | string): void {
  if (value instanceof Date) {
    console.log(value.getFullYear());
  } else {
    console.log(value.toUpperCase());
  }
}`}
            </CodeBlock>

            <CodeBlock title="in Operator">
{`interface Bird {
  fly(): void;
  wings: number;
}

interface Fish {
  swim(): void;
  fins: number;
}

function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    animal.fly(); // TypeScript knows it's a Bird
  } else {
    animal.swim(); // TypeScript knows it's a Fish
  }
}

// Useful for checking optional properties
interface User {
  name: string;
  email?: string;
}

function displayContact(user: User): void {
  console.log(user.name);
  if ("email" in user && user.email) {
    console.log(user.email);
  }
}`}
            </CodeBlock>

            <CodeBlock title="Custom Type Guards">
{`// User-defined type guard with 'is' keyword
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

// Type predicate: 'pet is Cat'
function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

function makeSound(pet: Cat | Dog): void {
  if (isCat(pet)) {
    pet.meow(); // TypeScript knows it's a Cat
  } else {
    pet.bark(); // TypeScript knows it's a Dog
  }
}

// Another example
interface Success {
  success: true;
  data: string;
}

interface Failure {
  success: false;
  error: string;
}

type Response = Success | Failure;

function isSuccess(response: Response): response is Success {
  return response.success === true;
}

function handleResponse(response: Response): void {
  if (isSuccess(response)) {
    console.log(response.data); // has data property
  } else {
    console.log(response.error); // has error property
  }
}`}
            </CodeBlock>

            <CodeBlock title="Discriminated Unions">
{`// Use a common property to discriminate
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
  // TypeScript narrows based on 'kind'
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// Exhaustiveness checking
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}

function getAreaSafe(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      return assertNever(shape); // Error if we miss a case
  }
}`}
            </CodeBlock>
            <TipBox>
              Discriminated unions with a common 'kind' or 'type' property are one of TypeScript's most powerful patterns for type safety.
            </TipBox>
          </ExpandableSection>

          {/* Utility Types */}
          <ExpandableSection 
            title="Utility Types" 
            id="utility-types"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              TypeScript provides built-in utility types that transform existing types. These save time and make code more maintainable.
            </Explanation>
            <CodeBlock title="Partial, Required, Readonly">
{`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;
// Same as: { id?: number; name?: string; email?: string; age?: number; }

function updateUser(user: User, updates: PartialUser): User {
  return { ...user, ...updates };
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
const updated = updateUser(user, { age: 31 }); // only update age

// Required - makes all properties required
interface OptionalConfig {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<OptionalConfig>;
// Same as: { host: string; port: number; }

// Readonly - makes all properties readonly
type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = { id: 1, name: "Bob", email: "bob@example.com", age: 25 };
// readonlyUser.name = "Charlie"; // ✗ Error: Cannot assign to 'name'`}
            </CodeBlock>

            <CodeBlock title="Pick, Omit">
{`interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

// Pick - select specific properties
type ProductPreview = Pick<Product, "id" | "name" | "price">;
// Same as: { id: number; name: string; price: number; }

const preview: ProductPreview = {
  id: 1,
  name: "Laptop",
  price: 999
};

// Omit - exclude specific properties
type ProductWithoutId = Omit<Product, "id">;
// Same as: { name: string; description: string; price: number; stock: number; category: string; }

const newProduct: ProductWithoutId = {
  name: "Mouse",
  description: "Wireless mouse",
  price: 29.99,
  stock: 100,
  category: "Accessories"
};

// Omit multiple properties
type ProductSummary = Omit<Product, "description" | "stock">;`}
            </CodeBlock>

            <CodeBlock title="Record">
{`// Record - create object type with specific keys and value type
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, string[]>;
// Same as: { admin: string[]; user: string[]; guest: string[]; }

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// Another example
type ProductId = "product1" | "product2" | "product3";
type ProductPrices = Record<ProductId, number>;

const prices: ProductPrices = {
  product1: 19.99,
  product2: 29.99,
  product3: 39.99
};

// Dynamic keys
type StringDictionary = Record<string, number>;

const scores: StringDictionary = {
  alice: 95,
  bob: 87,
  charlie: 92
};`}
            </CodeBlock>

            <CodeBlock title="ReturnType, Parameters">
{`// ReturnType - extract return type of function
function getUser() {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  };
}

type User = ReturnType<typeof getUser>;
// Same as: { id: number; name: string; email: string; }

// Parameters - extract parameter types of function
function createProduct(name: string, price: number, inStock: boolean) {
  return { name, price, inStock };
}

type ProductParams = Parameters<typeof createProduct>;
// Same as: [name: string, price: number, inStock: boolean]

// Use it to create functions with same signature
function logProductCreation(...args: ProductParams): void {
  console.log("Creating product with:", args);
}`}
            </CodeBlock>

            <CodeBlock title="Exclude, Extract, NonNullable">
{`// Exclude - remove types from union
type AllTypes = string | number | boolean | null;
type WithoutNull = Exclude<AllTypes, null>;
// Same as: string | number | boolean

type Status = "pending" | "approved" | "rejected" | "cancelled";
type ActiveStatus = Exclude<Status, "cancelled">;
// Same as: "pending" | "approved" | "rejected"

// Extract - keep only specific types from union
type Numbers = Extract<string | number | boolean, number>;
// Same as: number

type AdminRoles = "admin" | "superadmin" | "user" | "guest";
type AdminOnly = Extract<AdminRoles, "admin" | "superadmin">;
// Same as: "admin" | "superadmin"

// NonNullable - remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// Same as: string

function process(value: string | null | undefined): NonNullable<typeof value> {
  if (value === null || value === undefined) {
    throw new Error("Value is required");
  }
  return value; // guaranteed to be string
}`}
            </CodeBlock>
            <TipBox>
              Utility types help you transform and manipulate types without duplication. Use Partial for update functions, Pick for API responses, and Record for dictionaries.
            </TipBox>
          </ExpandableSection>

          {/* Advanced Patterns */}
          <ExpandableSection 
            title="Advanced Patterns" 
            id="advanced"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              These patterns combine multiple TypeScript features to solve complex typing problems.
            </Explanation>
            <CodeBlock title="Mapped Types">
{`// Create new types by transforming properties
type User = {
  id: number;
  name: string;
  email: string;
};

// Make all properties optional
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type OptionalUser = Optional<User>;
// Same as: { id?: number; name?: string; email?: string; }

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Add null to all properties
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// Same as: { id: number | null; name: string | null; email: string | null; }

// Getters for all properties
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// Same as: { getId: () => number; getName: () => string; getEmail: () => string; }`}
            </CodeBlock>

            <CodeBlock title="Conditional Types">
{`// Type depends on condition
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// More practical example
type NonArray<T> = T extends any[] ? never : T;

type Str = NonArray<string>; // string
type Num = NonArray<number>; // number
type Arr = NonArray<string[]>; // never

// Extract array element type
type Flatten<T> = T extends (infer U)[] ? U : T;

type Num = Flatten<number[]>; // number
type Str = Flatten<string>; // string

// Real-world example: API response
type ApiResponse<T> = T extends { success: true }
  ? { data: T; error: null }
  : { data: null; error: string };`}
            </CodeBlock>

            <CodeBlock title="Template Literal Types">
{`// Create types from string templates
type Color = "red" | "blue" | "green";
type Shade = "light" | "dark";

type ColorShade = \`\${Shade}-\${Color}\`;
// "light-red" | "light-blue" | "light-green" | "dark-red" | "dark-blue" | "dark-green"

// Event names
type EventName = "click" | "focus" | "blur";
type EventHandler = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

// CSS properties
type Size = "sm" | "md" | "lg";
type Spacing = \`m-\${Size}\` | \`p-\${Size}\`;
// "m-sm" | "m-md" | "m-lg" | "p-sm" | "p-md" | "p-lg"

interface Events {
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

type EventKeys = keyof Events; // "onClick" | "onFocus" | "onBlur"`}
            </CodeBlock>

            <CodeBlock title="Index Access Types">
{`interface User {
  id: number;
  profile: {
    name: string;
    age: number;
    address: {
      street: string;
      city: string;
    };
  };
}

// Access nested types
type UserId = User["id"]; // number
type UserProfile = User["profile"]; // { name: string; age: number; address: {...} }
type UserName = User["profile"]["name"]; // string
type UserAddress = User["profile"]["address"]; // { street: string; city: string }

// Access all property types
type UserValues = User[keyof User]; // number | { name: string; age: number; ... }

// Array element type
type Roles = ["admin", "user", "guest"];
type Role = Roles[number]; // "admin" | "user" | "guest"

const roleArray = ["admin", "user", "guest"] as const;
type RoleFromArray = typeof roleArray[number]; // "admin" | "user" | "guest"`}
            </CodeBlock>
            <TipBox>
              These advanced patterns become essential as your codebase grows. Mapped types help transform types, conditional types add logic, and template literals create string type combinations.
            </TipBox>
          </ExpandableSection>

          {/* tsconfig.json */}
          <ExpandableSection 
            title="tsconfig.json Configuration" 
            id="tsconfig"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              The tsconfig.json file controls how TypeScript compiles your code. These settings affect type checking strictness and output.
            </Explanation>
            <CodeBlock title="Essential tsconfig.json">
{`{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2020",              // JavaScript version to compile to
    "lib": ["ES2020", "DOM"],        // Built-in type definitions to include
    
    /* Modules */
    "module": "commonjs",            // Module system (commonjs, es2015, esnext)
    "moduleResolution": "node",      // How to resolve modules
    "esModuleInterop": true,         // Better interop with CommonJS
    
    /* Type Checking */
    "strict": true,                  // Enable all strict type checking (RECOMMENDED!)
    "noImplicitAny": true,           // Error on implied 'any' type
    "strictNullChecks": true,        // null/undefined handled separately
    "strictFunctionTypes": true,     // Strict function type checking
    "noUnusedLocals": true,          // Error on unused local variables
    "noUnusedParameters": true,      // Error on unused function parameters
    
    /* Emit */
    "outDir": "./dist",              // Output directory for compiled files
    "rootDir": "./src",              // Root directory of source files
    "removeComments": true,          // Remove comments from output
    "sourceMap": true,               // Generate .map files for debugging
    
    /* Interop Constraints */
    "skipLibCheck": true,            // Skip type checking of .d.ts files
    "forceConsistentCasingInFileNames": true // Ensure consistent file casing
  },
  
  "include": [
    "src/**/*"                       // Files to include
  ],
  
  "exclude": [
    "node_modules",                  // Files to exclude
    "dist"
  ]
}`}
            </CodeBlock>

            <CodeBlock title="Strict Mode Options">
{`{
  "compilerOptions": {
    // Instead of "strict": true, you can enable individually:
    
    "noImplicitAny": true,
    // let value; // ✗ Error: Variable has an implicit 'any' type
    
    "strictNullChecks": true,
    // let name: string = null; // ✗ Error
    // Use: let name: string | null = null; // ✓ OK
    
    "strictFunctionTypes": true,
    // Ensures function parameter types are checked correctly
    
    "strictBindCallApply": true,
    // Strict checking for bind, call, apply methods
    
    "strictPropertyInitialization": true,
    // Class properties must be initialized
    // class User {
    //   name: string; // ✗ Error: not initialized
    //   age: number = 0; // ✓ OK
    // }
    
    "noImplicitThis": true,
    // Error when 'this' has implicit 'any' type
    
    "alwaysStrict": true
    // Emit "use strict" in all files
  }
}`}
            </CodeBlock>

            <CodeBlock title="Project References">
{`// For monorepos or multi-package projects
{
  "compilerOptions": {
    "composite": true,               // Enable project references
    "declaration": true,             // Generate .d.ts files
    "declarationMap": true          // Generate .d.ts.map files
  },
  "references": [
    { "path": "../shared" },        // Reference other projects
    { "path": "../utils" }
  ]
}`}
            </CodeBlock>
            <TipBox>
              Start with "strict": true for maximum type safety. It catches bugs early and helps you write better code. Only relax specific options if absolutely necessary.
            </TipBox>
          </ExpandableSection>

          {/* Common Patterns & Best Practices */}
          <ExpandableSection 
            title="Common Patterns & Best Practices" 
            id="patterns"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              These patterns solve real-world problems and represent TypeScript best practices used in production codebases.
            </Explanation>
            <CodeBlock title="API Response Handling">
{`// Type-safe API responses
type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: {
    message: string;
    code: number;
  };
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: { message: "Failed to fetch user", code: 500 }
    };
  }
}

// Type-safe handling
const result = await fetchUser(1);

if (result.success) {
  console.log(result.data.name); // TypeScript knows 'data' exists
} else {
  console.error(result.error.message); // TypeScript knows 'error' exists
}`}
            </CodeBlock>

            <CodeBlock title="Builder Pattern">
{`// Type-safe builder pattern
class UserBuilder {
  private user: Partial<{
    name: string;
    email: string;
    age: number;
    role: string;
  }> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setAge(age: number): this {
    this.user.age = age;
    return this;
  }

  setRole(role: string): this {
    this.user.role = role;
    return this;
  }

  build(): Required<typeof this.user> {
    if (!this.user.name || !this.user.email) {
      throw new Error("Name and email are required");
    }
    return this.user as Required<typeof this.user>;
  }
}

// Usage
const user = new UserBuilder()
  .setName("Alice")
  .setEmail("alice@example.com")
  .setAge(30)
  .setRole("admin")
  .build();`}
            </CodeBlock>

            <CodeBlock title="Const Assertions">
{`// const assertions preserve literal types
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
}; // Type: { apiUrl: string; timeout: number; retries: number }

const configConst = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
} as const; // Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; ... }

// Useful for arrays
const colors = ["red", "green", "blue"]; // Type: string[]
const colorsConst = ["red", "green", "blue"] as const; // Type: readonly ["red", "green", "blue"]

type Color = typeof colorsConst[number]; // "red" | "green" | "blue"

// Useful for configuration objects
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const;

type RoutePath = typeof routes[keyof typeof routes]; // "/" | "/about" | "/contact"`}
            </CodeBlock>

            <CodeBlock title="Type-safe Event Emitters">
{`// Type-safe event emitter
type Events = {
  userLogin: { userId: number; timestamp: Date };
  userLogout: { userId: number };
  dataUpdate: { id: string; data: any };
};

class TypedEventEmitter {
  private listeners: {
    [K in keyof Events]?: Array<(data: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(event: K, callback: (data: Events[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

// Usage - fully type-safe!
const emitter = new TypedEventEmitter();

emitter.on("userLogin", (data) => {
  console.log(\`User \${data.userId} logged in\`); // data is typed!
});

emitter.emit("userLogin", { userId: 123, timestamp: new Date() }); // Type-checked!

// emitter.emit("userLogin", { wrong: "data" }); // ✗ Error: wrong shape`}
            </CodeBlock>

            <CodeBlock title="Branded Types">
{`// Create distinct types from primitives
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;

// Helper functions to create branded types
function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

// These are NOT compatible even though both are numbers!
function getUser(id: UserId): void {
  console.log(\`Getting user \${id}\`);
}

function getProduct(id: ProductId): void {
  console.log(\`Getting product \${id}\`);
}

const userId = createUserId(123);
const productId = createProductId(456);

getUser(userId); // ✓ OK
// getUser(productId); // ✗ Error: ProductId is not assignable to UserId
// getUser(123); // ✗ Error: number is not assignable to UserId`}
            </CodeBlock>
            <TipBox>
              Use discriminated unions for complex state, const assertions for configuration, and branded types to prevent mixing similar primitives like different ID types.
            </TipBox>
          </ExpandableSection>

          {/* Common Errors & Solutions */}
          <ExpandableSection 
            title="Common Errors & How to Fix Them" 
            id="errors"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <Explanation>
              Learn to recognize and fix the most common TypeScript errors you'll encounter.
            </Explanation>
            <CodeBlock title="Type 'X' is not assignable to type 'Y'">
{`// Problem: Assigning wrong type
let name: string = "Alice";
// name = 123; // ✗ Error: Type 'number' is not assignable to type 'string'

// Solution 1: Use correct type
name = "Bob"; // ✓ OK

// Solution 2: Use union type if needed
let value: string | number = "Alice";
value = 123; // ✓ OK

// Problem: Missing properties
interface User {
  name: string;
  age: number;
}

// const user: User = { name: "Alice" }; // ✗ Error: Property 'age' is missing

// Solution: Provide all required properties
const user: User = { name: "Alice", age: 30 }; // ✓ OK

// Or make properties optional
interface FlexibleUser {
  name: string;
  age?: number;
}

const flexUser: FlexibleUser = { name: "Bob" }; // ✓ OK`}
            </CodeBlock>

            <CodeBlock title="Object is possibly 'undefined' or 'null'">
{`// Problem: Not handling null/undefined
interface User {
  name: string;
  email?: string;
}

function sendEmail(user: User): void {
  // console.log(user.email.toLowerCase()); // ✗ Error: Object is possibly 'undefined'
}

// Solution 1: Optional chaining
function sendEmailSafe1(user: User): void {
  console.log(user.email?.toLowerCase()); // Returns undefined if email is undefined
}

// Solution 2: Type guard
function sendEmailSafe2(user: User): void {
  if (user.email) {
    console.log(user.email.toLowerCase()); // ✓ OK - TypeScript knows it's defined
  }
}

// Solution 3: Nullish coalescing
function sendEmailSafe3(user: User): void {
  const email = user.email ?? "no-email@example.com";
  console.log(email.toLowerCase());
}

// Solution 4: Non-null assertion (use carefully!)
function sendEmailDangerous(user: User): void {
  console.log(user.email!.toLowerCase()); // ! tells TS it's definitely not null/undefined
}`}
            </CodeBlock>

            <CodeBlock title="Cannot find name 'X'">
{`// Problem: Using undeclared variable or wrong import
// console.log(userName); // ✗ Error: Cannot find name 'userName'

// Solution 1: Declare the variable
let userName = "Alice";
console.log(userName); // ✓ OK

// Problem: Missing import
// const result = someLibrary.get('/api/data'); // ✗ Error: Cannot find name 'someLibrary'

// Solution 2: Import what you need
import someLibrary from 'some-library';
const result = someLibrary.get('/api/data'); // ✓ OK

// Problem: Missing type declaration file
// For third-party libraries without types, install @types package:
// npm install --save-dev @types/lodash`}
            </CodeBlock>

            <CodeBlock title="Type 'X' has no properties in common with type 'Y'">
{`// Problem: Object shape doesn't match interface
interface User {
  name: string;
  age: number;
}

// const user: User = {
//   username: "Alice", // ✗ Error: 'username' does not exist in type 'User'
//   yearsOld: 30
// };

// Solution: Use correct property names
const user: User = {
  name: "Alice",
  age: 30
};`}
            </CodeBlock>

            <CodeBlock title="Implicit 'any' type">
{`// Problem: TypeScript can't infer type
// function process(data) { // ✗ Error: Parameter 'data' implicitly has an 'any' type
//   return data.value;
// }

// Solution 1: Add explicit type
function process(data: { value: string }): string {
  return data.value;
}

// Solution 2: Use interface
interface Data {
  value: string;
}

function processData(data: Data): string {
  return data.value;
}

// Problem: Uninitialized variable
// let value; // Type is 'any'

// Solution: Initialize or type explicitly
let value: string;
let value2 = "hello"; // inferred as string`}
            </CodeBlock>
            <TipBox>
              Most errors are TypeScript protecting you from runtime bugs. Read the error message carefully - it usually tells you exactly what's wrong and where.
            </TipBox>
          </ExpandableSection>

          {/* Quick Reference */}
          <ExpandableSection 
            title="Quick Reference & Cheat Codes" 
            id="quick-ref"
            expanded={expandedSections}
            toggle={toggleSection}
          >
            <CodeBlock title="Type Keywords Cheat Sheet">
{`// Type annotation
let name: string = "Alice";

// Type alias
type ID = string | number;

// Interface
interface User { name: string; }

// Union (OR)
type Result = string | number;

// Intersection (AND)
type Combined = TypeA & TypeB;

// Optional property
interface Config { timeout?: number; }

// Readonly property
interface Point { readonly x: number; }

// Generic
function identity<T>(arg: T): T { return arg; }

// Type assertion
let value = someValue as string;

// Non-null assertion
let name = user!.name;

// Type guard
if (typeof value === "string") { }

// Keyof (keys of object)
type Keys = keyof User;

// Typeof (get type)
const obj = { a: 1 };
type ObjType = typeof obj;

// Indexed access
type Age = User["age"];

// Conditional type
type Check<T> = T extends string ? true : false;

// Infer type
type Flatten<T> = T extends (infer U)[] ? U : T;

// Template literal
type EventName = \`on\${string}\`;`}
            </CodeBlock>

            <CodeBlock title="Common Utility Types Quick Reference">
{`// Make all properties optional
Partial<User>

// Make all properties required
Required<User>

// Make all properties readonly
Readonly<User>

// Pick specific properties
Pick<User, "name" | "email">

// Omit specific properties
Omit<User, "password">

// Create object type with keys
Record<string, number>

// Extract function return type
ReturnType<typeof func>

// Extract function parameters
Parameters<typeof func>

// Remove types from union
Exclude<T, U>

// Keep only types from union
Extract<T, U>

// Remove null and undefined
NonNullable<T>

// Awaited type from Promise
Awaited<Promise<string>> // string`}
            </CodeBlock>

            <CodeBlock title="tsconfig Quick Snippets">
{`// Strict configuration
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}

// React configuration
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM"],
    "target": "ES2020"
  }
}

// Node.js configuration
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "esModuleInterop": true,
    "types": ["node"]
  }
}`}
            </CodeBlock>
          </ExpandableSection>

          {/* Resources */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Next Steps & Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Official Resources</h3>
                <ul className="space-y-2 text-purple-100">
                  <li>• TypeScript Handbook: typescriptlang.org/docs</li>
                  <li>• TypeScript Playground: typescriptlang.org/play</li>
                  <li>• DefinitelyTyped: github.com/DefinitelyTyped</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Practice Tips</h3>
                <ul className="space-y-2 text-purple-100">
                  <li>• Start with strict mode enabled</li>
                  <li>• Use TypeScript with your next project</li>
                  <li>• Read error messages carefully</li>
                  <li>• Explore type definitions of libraries you use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandableSection({ title, id, children, expanded, toggle }: any) {
  const isExpanded = expanded[id];
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => toggle(id)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left">{title}</h2>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-blue-600 flex-shrink-0" />
        )}
      </button>
      {isExpanded && (
        <div className="p-6 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

function Explanation({ children }: any) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
      <p className="text-gray-700">{children}</p>
    </div>
  );
}

function CodeBlock({ title, children }: any) {
  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>}
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function TipBox({ children }: any) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <span className="text-green-600 font-bold text-lg flex-shrink-0">💡</span>
        <p className="text-green-800 text-sm">{children}</p>
      </div>
    </div>
  );
}