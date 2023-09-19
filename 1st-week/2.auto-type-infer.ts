let hello1 = "hello"; // string
const hello2 = "hello"; // "hello"
let hello3 = "hello" as const; // "hello"

const user1 = {
  name: "John", // name: string
  age: 30, // age: number
};

const user2 = {
  name: "Doe", // readonly name: "Doe"
  age: 22, // readonly age: 22
} as const;
