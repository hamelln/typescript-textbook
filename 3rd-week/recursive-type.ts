// 재귀 타입은 내부에 똑같은 형식의 값이 들어올 경우에 유용하다.
// 예: 배열[값 | 배열], 객체{값 | 객체}, 트리, JSON 등등...
type ValueOrArray<T> = T | ArrayOfValueOrArray<T>;
type ArrayOfValueOrArray<T> = Array<ValueOrArray<T>>;

const arr: ArrayOfValueOrArray<string> = ["a", ["b", ["c"]]];

// JSON 안에 JSON이 있을 수 있다.
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const exampleStatusJSON: Json = {
  available: true,
  username: "Jean-loup",
  room: {
    name: "Highcrest",
  },
};
