// case1: T에 (number|string)[]가 입력될 때 number|string를 반환하는 방법?
// T만으로는 해결할 수 없는 상황일 때 infer 필요.
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
type item1 = ArrayElementType<number[]>; // number
type item2 = ArrayElementType<{ name: string }>; // { name: string }

// case2: 어떤 함수의 반환 타입만 가져오는 방법?
function add(a: number, b: number) {
  return a + b;
}

// 함수의 반환 타입을 알아내는 타입.
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;

type Add = (a: number, b: number) => number;
let addMock: jest.Mock<ReturnType<Add>>;
addMock = jest.fn((a, b) => a + b);

type CP = ReturnType<typeof add>;
