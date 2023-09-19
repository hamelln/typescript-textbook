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
      //❗ Tulip 케이스 때문에 발생 가능.
      const _exhaustiveCheck: never = flower;
      return _exhaustiveCheck;
  }
};

//❗ 항상 에러로 던지기 때문에 값 return 불가.
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("시간 초과")), ms)
  );
}
