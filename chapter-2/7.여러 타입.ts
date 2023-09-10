const emptyObject: {} = 1;
// {}는 빈 객체를 가리키는 타입이라 nullish만 아니면 다 할당되지만 직접 조작은 할 게 없음.
emptyObject.name = "name";

// void
// 이 함수가 뭔가를 return한다면 그건 void 타입이다: 말이 안 됨.
const badVoidFunc1 = (): void => {
  return 1;
};

// 이 함수는 void 함수이다. 하지만 return을 막진 않는다.
const badVoidFunc2: () => void = () => {
  return 2;
};

// unknown
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

const result = tryDeserializeLocalStorageItem("dark_mode"); // Result로 타입 추론. 함수에서 반환값을 명시했기 때문.
// result.success가 true인지 타입 체크
if (result.success) {
  // result.success가 true이므로 value 속성이 존재.
  const darkModeEnabled: unknown = result.value;

  if (typeof darkModeEnabled === "boolean") {
    // 속성 타입이 boolean인지 검사하고, 해당될 때에만 적용
    console.log("Dark mode enabled: " + darkModeEnabled);
  }
} else {
  // success 값이 false이므로 error 속성이 존재.
  console.error(result.error);
}

// never
enum Flower {
  Rose,
  Rhododendron,
  Violet,
  Daisy,
  Tulip,
}

const flowerLatinName = (flower: Flower) => {
  switch (flower) {
    case Flower.Rose:
      return "Rosa rubiginosa";
    case Flower.Rhododendron:
      return "Rhododendron ferrugineum";
    case Flower.Violet:
      return "Viola reichenbachiana";
    case Flower.Daisy:
      return "Bellis perennis";
    default:
      const _exhaustiveCheck: never = flower; // Tulip 케이스에 대한 처리가 없어서 에러 발생.
      return _exhaustiveCheck;
  }
};
