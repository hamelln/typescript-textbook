//💡 브랜딩 기법: 유니크한 속성을 덧붙여서 유일성을 얻는다.
type Brand<K, T> = K & { __brand: T };
type Nutrient = { protein: number; carbohydrates: number; fat: number };
type Food = Brand<Nutrient, "Food">;

function calculateCalorie({ carbohydrates, protein, fat }: Food) {
  return carbohydrates * 4 + protein * 4 + fat * 9;
}

const burger1 = {
  protein: 100,
  carbohydrates: 100,
  fat: 100,
  __brand: "Food",
};

const burger2 = {
  protein: 100,
  carbohydrates: 100,
  fat: 100,
  __brand: "Food" as const, // ❓ 여기만 as const를 붙여서 작성할 일이 얼마나 있을지?
  sad: "asd",
};

calculateCalorie(burger1); // 🚫 __brand: string으로 추론해서 에러
calculateCalorie(burger2); // 통과: 브랜딩 기법을 뚫으려면 상당히 억지스러워야 함.

// 🧐 브랜딩 기법 + as 단언
type ML = Brand<number, "ml">;
type L = Brand<number, "l">;

let ml = 500 as ML; // ML 타입으로 단언하면 number가 아닌 ML 타입으로 다룬다.
ml.__brand; // undefined. 숫자면서 __brand 속성이 존재하는 특이한 타입이 된다.
ml = 20; // 🚫 Error: 일반 숫자는 할당할 수 없다.
ml = 1 as L; // 🚫 Error: L단위를 ml 단위에 할당할 수 없다.
ml = 1000 as ML; // 👌 OK: ml 단위에 한해서 할당 가능.
