type A = { name: string };
type B = { name: string };
let a: A = { name: "현" };
let b: B = { name: "원" };
a = b; //👌 타입 이름이 다르지만 구조가 같으니 OK
