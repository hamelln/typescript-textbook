// satisfies의 기능은 크게 세 가지로 나눌 수 있다.
// 1. 타입 체크.
// 2. 타입 체크에 기반한 안전한 업 캐스팅.
// 3. 타입 체크에 기반한 안전한 다운 캐스팅.

// 해결1: satisfies는 타입이 만족되는지 체크하고, 만족할 경우 다운캐스팅한다.
type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// 다운캐스팅: palette는 Record<Colors, string | RGB>를 만족한다.
// 타입이 안전하다고 판단하면 palette의 타입을 실제 값에 맞춰서 다운캐스팅한다.
// palette: {
// red: [number, number, number];
// green: string;
// blue: [number, number, number];
// }

palette.green.toUpperCase(); // 👌OK
palette.red = "#00ff00"; // Error(ts2322): [number, number, number] 타입만 할당하시오.

// 해결2: typing이 광범위해도 실제 속성에만 접근하도록 제한한다.
type Config = Record<string, string>;

const config = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
} satisfies Config;

config.name223 = "asd"; // Error(ts2551): 없는 속성에 접근 금지.

// 해결3: 다운 캐스팅은 일부 타입만 체크하는 상황도 간단히 해결.
interface Data {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}

const baseData = {
  a: "A",
  b: 1,
} satisfies Partial<Data>; // Partial<Data>를 만족하므로 다운 캐스팅: { a: "A"; b: number; }

const data1: Data = {
  ...baseData, // 통과!
  c: "foo",
  d: ["asd"],
};

// 해결4: satisfies + as = safe type check
interface User {
  name: string;
  location: string;
  major: "frontend" | "backend"; // 속성 추가.
}

// User라고 typing하기 어려운 상황이라면 satisfies를 써보자.
const user = {
  name: "태현",
  location: "경기",
} satisfies User as User; // Error(ts1360): major 속성을 입력하시오.

// 해결5: safe upcasting을 쓴다.
interface SmallNavigator {
  language?: string;
  userAgent?: string;
}

// satisfies + as = safe upcasting.
// 필요한 속성들만 mocking해서 사용한다.
const observer = {
  navigator: window.navigator satisfies SmallNavigator as SmallNavigator,
};

// upcasting에 관한 추가.
class Product {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Book extends Product {
  author: string;
  constructor(name: string, author: string) {
    super(name);
    this.author = author;
  }
}

const book = new Book(
  "타입스크립트 교과서",
  "제로초"
) satisfies Product as Product;

book.author; // Error(ts2339): 업캐스팅했기 때문에 author 속성은 없는 것으로 취급.
(book as Book).author; // as로 다운 캐스팅을 하면 사용 가능함.
