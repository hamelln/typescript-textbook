//@ 필수 속성 외에 어떤 추가 속성이 들어오더라도 허용.
interface Food {
  protein: number;
  carbohydrates: number;
  fat: number;
  [K: string]: any;
}

function calculateCalorie(food: Food) {
  const { carbohydrates, protein, fat } = food;
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

calculateCalorie({
  carbohydrates: 20,
  fat: 22,
  protein: 11,
  burgerBrand: "Mom's Touch",
});
