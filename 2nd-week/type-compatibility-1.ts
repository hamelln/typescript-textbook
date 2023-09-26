type Food = { carbohydrates: number; protein: number; fat: number };
type Burger = Food & { burgerBrand: string };

function calculateCalorie({ carbohydrates, protein, fat }: Food) {
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

const upcast = <Type>(implementation: Type): Type => implementation;

const thighBurger: Burger = {
  carbohydrates: 60,
  protein: 28,
  fat: 27,
  burgerBrand: "Mom's Touch",
};

const filletBurger = {
  carbohydrates: 13,
  protein: 39,
  fat: 6.4,
  burgerBrand: "Mom's Touch",
};

const thigghBurger = thighBurger satisfies Food;
console.log(thigghBurger.burgerBrand);

const foodBurger = upcast<Food>(thighBurger);

// ❓ 탄단지 속성이 있는데 버거 브랜드가 추가됐다고 칼로리 계산을 막는 게 합리적일까?
// 📒 TypeScript는 덕 타이핑 지원: 추론된 타입이든, 확정된 타입이든, 최소 구조만 만족하면 통과
calculateCalorie(thighBurger);
calculateCalorie(filletBurger);

// ❗ 객체 리터럴 타입 체크는 속성이 부족해도 에러, 넘쳐나도 에러를 낸다.
calculateCalorie({
  carbohydrates: 20,
  fat: 22,
}); //🚫 Error: 단백질 속성이 없음.

calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  protein: 11,
  burgerBrand: "Mom's Touch", //🚫 Error: 잉여 속성이 존재함.
});

// 📒 객체 리터럴도 잉여 속성을 허용한다면?
// 😡 부작용 1: 다른 개발자는 burgerBrand가 필수 속성이라고 오해할 수 있음.
const calorie1 = calculateCalorie({
  protein: 29,
  carbohydrates: 48,
  fat: 13,
  burgerBrand: "버거킹", //🚫 Error: 잉여 속성이 존재함.
});

// 🤬 부작용 2: 오타가 있어도 잉여 속성이라고 제대로 검사가 안 됨.
const calorie2 = calculateCalorie({
  protein: 29,
  carbohydrates: 48,
  fat: 13,
  birgerBrand: "버거킹", //🚫 Error: 잉여 속성이 존재함.
});
