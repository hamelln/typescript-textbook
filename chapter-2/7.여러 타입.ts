//# {}: 빈 객체 타입. nullish 제외하고 모든 타입 할당되지만 조작은 불가능.
const emptyObject: {} = 1;
emptyObject.name = "name"; // 에러

//# void: 반환이 없는 함수 타입.
//@ 이 함수가 뭔가를 return한다면 그건 void 타입이다: 말이 안 되므로 에러.
const badVoidFunc1 = (): void => 1;

//@ 이 함수는 void 함수이다.(하지만 return을 막진 않는다. 그래도 굳이 하진 말자.)
const badVoidFunc2: () => void = () => 2;

//# never: 절대 실행될 수 없는 타입.
//@ switch의 완벽성을 보장하는 등의 용도로 쓴다.
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

//# unknown: any는 "무슨 타입이든 허용", unknown은 "무슨 타입이 올 지 모르겠음"
type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);
  if (item === null) {
    return {
      success: false,
      error: new Error(`"${key}"에 맞는 아이템이 없습니다.`),
    };
  }

  let value: unknown;
  try {
    value = JSON.parse(item);
  } catch (error) {
    return {
      success: false,
      error: new Error(`JSON 평가가 실패했습니다.`),
    };
  }

  return {
    success: true,
    value,
  };
}

const result = tryDeserializeLocalStorageItem("dark_mode"); //# Result 타입 추론.
//@ unknown 타입은 유니온처럼 케이스를 좁혀나가며 사용한다.
if (result.success) {
  //? Result 타입에서 result.success가 true일 땐 value 속성이 존재.
  const darkModeEnabled: unknown = result.value;

  //? 속성 타입이 boolean인지 검사하고, 해당될 때에만 적용
  if (typeof darkModeEnabled === "boolean") {
    console.log("Dark mode enabled: " + darkModeEnabled);
  }
} else {
  //? Result 타입에서 success: false일 땐 error 속성이 존재
  console.error(result.error);
}
