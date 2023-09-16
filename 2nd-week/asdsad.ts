type BurgerBrand = "Burger_King" | "Mom's_Touch" | "McDonald" | "Lotteria";
type BurgerReview = { brand: BurgerBrand; review: string };
const burgerReview = { brand: "Mom's_Touch", review: "감튀 맛있음" };
const writeBurgerReview = (review: BurgerReview) => {};
writeBurgerReview(burgerReview);

function logText<T>(text: T): T {
  return text;
}

const t = "Hello Generic";
const text = logText(t);
