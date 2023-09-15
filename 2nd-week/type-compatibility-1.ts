interface Food {
  protein: number;
  carbohydrates: number;
  fat: number;
}

function calculateCalorie(food: Food) {
  const { carbohydrates, protein, fat } = food;
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

type Burger = Food & {
  burgerBrand: string;
};

//@ 명시적 서브타이핑: 명시한대로 충족하는지 본다.
const thighBurger: Burger = {
  carbohydrates: 60,
  protein: 28,
  fat: 27,
  burgerBrand: "Mom's Touch",
};

//@ 구조적 서브타이핑(덕 타이핑): 구조적으로 충족하는지 본다.
//@ 덕 타이핑: "어떤 새가 오리처럼 걷고, 오리처럼 날고, 오리처럼 울면 그건 오리라고 부르겠다."
const filletBurger = {
  carbohydrates: 13,
  protein: 39,
  fat: 6.4,
  burgerBrand: "Mom's Touch",
};

//? 버거 브랜드 속성이 추가됐다는 이유만으로 칼로리 계산을 못하도록 막는 건 합리적일까?
calculateCalorie(thighBurger);

//@ TypeScript는 구조적 서브타이핑을 지원한다.
calculateCalorie(filletBurger);

//@ 객체 참조값 타입 검사는 필수 속성을 충족하는지만 본다. 추가 속성이 있다고 에러를 내진 않는다.
//@ 필수 속성이 부족항 경우에는 에러를 낸다.
calculateCalorie({
  carbohydrates: 20,
  fat: 22,
});

//? '객체 리터럴'로 추가 속성을 넣을 경우엔 에러가 난다. 왜 그럴까?
calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  protein: 11,
  burgerBrand: "Mom's Touch",
});

//@ 객체 리터럴에서도 추가 속성을 허용했다간 득보다 실이 더 많다. 아래를 보자.
/** 부작용 1
 * 코드를 읽는 다른 개발자가 calculateCalorie 함수는
 * burgerBrand를 사용한다고 오해할 수 있음 */
const calorie1 = calculateCalorie({
  protein: 29,
  carbohydrates: 48,
  fat: 13,
  burgerBrand: "버거킹",
});

/** 부작용 2
 * birgerBrand 라는 오타가 발생하더라도
 * excess property이기 때문에 호환에 의해 오류가 발견되지 않음 */
const calorie2 = calculateCalorie({
  protein: 29,
  carbohydrates: 48,
  fat: 13,
  birgerBrand: "버거킹",
});
