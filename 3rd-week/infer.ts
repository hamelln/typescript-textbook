//❓ case1: T에 (number|string)[]가 입력될 때 number|string를 반환하는 방법?
//👉 T만으로는 해결할 수 없는 상황일 때 infer 필요.
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
type item1 = ArrayElementType<number[]>; // number
type item2 = ArrayElementType<{ name: string }>; // { name: string }

//❓ case2: 함수의 반환 타입만 알고 싶을 땐 어떻게 해야?
async function fetchData(uri: string, options: RequestInit) {
  const response = await fetch(uri, options);
  if (response.ok) {
    const data = response.json();
    if (typeof data === "number") return data;
    if (typeof data === "string") return Number(data);
    else throw new Error("형식에 안 맞음.");
  } else {
    throw new ReferenceError("뭔가 잘못됨.");
  }
}

//💡 '함수의 반환 타입을 알아내는' 타입.
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;
type ResultType = ReturnType<typeof fetchData>; //🥳 Promise<number> 정답!

/**
 * 예1: 테스트할 때 모킹한 함수의 return type 확인.
 * 예2: Promise요청할 때 예상할 반환 타입.
 * */
