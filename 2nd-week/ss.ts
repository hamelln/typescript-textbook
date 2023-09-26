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

const foodBurger = upcast<Food>(thighBurger);
