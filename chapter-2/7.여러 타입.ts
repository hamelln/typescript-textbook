//# {}: 빈 객체 타입. nullish 제외하고 모든 타입 할당되지만 조작은 불가능.
const emptyObject: {} = 1;
emptyObject.name = "name"; // 에러

//# void: '명시적인 반환'이 없는 함수의 '반환 타입'
//@ 모든 함수는 return 문이 없을 땐 자동으로 undefined를 반환한다.
const voidFunc = (): void => {};

//! 따라서 undefined를 반환해도 에러는 안 난다. 그러나 이렇게 사용 X.
const badVoidFunc1 = (): void => undefined;

//! 아래와 같이 작성하면 명시적인 return이 가능하지만 이것도 나쁜 짓이니 사용 X.
const badVoidFunc2: () => void = () => 2;

//# never: 절대 실행될 수 없는 타입.
//@ switch의 완벽성을 보장하는 용도 등으로 쓴다.
enum Flower {
  Rose,
  Daisy,
  Tulip,
}

const flowerLatinName = (flower: Flower) => {
  switch (flower) {
    case Flower.Rose:
      return "Rosa rubiginosa";
    case Flower.Daisy:
      return "Bellis perennis";
    default:
      //? Tulip 케이스 때문에 발생이 가능하므로 Error
      const _exhaustiveCheck: never = flower;
      return _exhaustiveCheck;
  }
};

//@ 에러를 던지는 코드와 무한 실행 코드도 비슷한 원리다.
//? 절대로 뭔가를 return할 일이 없음. 그러므로 반환 타입이 never
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("fetching 허용 시간 초과")), ms)
  );
}

function keepProcessing(): never {
  while (true) {} // return에 다다를 수 없다.
}

//# unknown: "무슨 타입인지 아직 모른다."
type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);
  if (item === null) {
    return { success: false, error: new Error(`"${key}"를 못 찾음`) };
  }

  let value: unknown;
  try {
    value = JSON.parse(item);
  } catch (error) {
    return { success: false, error: new Error(`JSON 평가 실패`) };
  }

  return { success: true, value };
}

const result = tryDeserializeLocalStorageItem("dark_mode");
//@ unknown은 무슨 타입인지 확실히 지정하면 사용할 수 있다.
if (result.success) {
  const darkModeEnabled: unknown = result.value;
  if (typeof darkModeEnabled === "boolean") {
  }
} else {
  //? Result 타입에서 success: false일 땐 error 속성이 존재
  console.error(result.error);
}
