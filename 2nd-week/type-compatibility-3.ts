//? 브랜딩 기법: 유니크한 속성을 덧붙임으로서 추가적인 속성을 엄격히 검사, 거절함.
type Brand<K, T> = K & { __brand: T };
type Nutrient = { protein: number; carbohydrates: number; fat: number };
type Food = Brand<Nutrient, "Food">;

function calculateCalorie(food: Food) {
  const { carbohydrates, protein, fat } = food;
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

const burger = {
  protein: 100,
  carbohydrates: 100,
  fat: 100,
  // __brand: "Food",
};

calculateCalorie(burger); // 에러
