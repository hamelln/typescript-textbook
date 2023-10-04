// 문제 1️⃣: 명시된 타입에만 의거하기 때문에 때때로 까다로움.
type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette1: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
};

palette1.red.map(0); // 🚫 Error(ts2339): 타입이 배열로 확정되지 않음. (string 가능성)
palette1.green.toUpperCase(); // 🚫 Error(ts2339): 타입이 string으로 확정되지 않음 (배열 가능성)

// 해결 1️⃣: satisfies는 타입이 만족되는지 체크하고, 만족할 경우 다운캐스팅한다.
const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// 타입이 안전하다고 판단하면 실제 값에 맞춰서 다운캐스팅한다.
palette2.green.toUpperCase(); // ✅ OK: green은 string 타입으로 다운캐스팅 됐으므로 가능.
palette2.red = "#00ff00"; // ❌ Error(ts2322): red은 [number, number, number] 타입으로 다운캐스팅돼서 불가능.

// 문제 2️⃣: 엄격한 typing이 아닐 땐 side effect가 발생할 수 있다.
type Config = Record<string, string>;

const config: Config = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
};

config.name223 = "asd"; // 😰 통과. 타입 명세에 따르면 문제는 없다...이래도 되나?

// 해결 2️⃣: satisfies는 실제로 있는 속성에만 접근하도록 제한
const config2 = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
} satisfies Config;

config2.name223 = "asd"; // ❌ Error(ts2551): 없는 속성에 접근 금지.

// 문제 3️⃣: typing으론 해결이 어려운 문제
interface Data {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}

const baseData1: Partial<Data> = {
  a: "A",
  b: 1,
};

const data1: Data = {
  ...baseData1, // 🚫 Error(ts2322): 입력된 값이 타입과 정확히 부합하지 않는다. (baseTata의 타입은 옵셔널)
  c: "foo",
  d: ["asd"],
};

// 🙄 Pick<Data, "a" | "b">으로 해결할 수는 있지만 변경될 때마다 늘리고 바꿔야 한다.
// ❓ 더 간단하고 똑똑하게 해결할 방법은 없을까?

// 해결 3️⃣: satisfies의 다운 캐스팅은 부분적인 타입 체크도 깔끔하게 해결.
const baseData2 = {
  a: "A",
  b: 1,
} satisfies Partial<Data>;

const data2: Data = {
  ...baseData2, // ✅ 통과! baseData: { a: "A"; b: number; }
  c: "foo",
  d: ["asd"],
};

// 문제 4️⃣: 직접 typing을 못하는 경우.
interface User {
  name: string;
  location: string;
}

// 👀 타입 점검을 하고 as로 타입을 단언해야 할 상황도 있다.
// 🔛 fetch 응답이 User인지 검증하고 아래의 결과를 return한다고 가정해보자.
const user1 = {
  name: "태현",
  location: "경기",
} as User;

// ❓ 어느 날 User에 속성이 추가됐다면?
interface User {
  major: "frontend" | "backend"; // 속성 추가.
}

// ❗ 에러가 날 상황인데 as는 그냥 통과시켜버린다!
const user2 = {
  name: "태현",
  location: "경기",
} as User;

// 해결 4️⃣: satisfies + as를 쓰면 타입이 안전한지 체크하고서 단언한다.
const user = {
  name: "태현",
  location: "경기",
} satisfies User as User; // ❌ Error(ts1360): major 속성을 입력하시오.

// 문제 5️⃣: typing은 때때로 피곤하다.
// '정상적인 환경'이라면 Navigator 타입에는 문제가 없다.
const observer = {
  navigator: window.navigator,
};

// 😱 하지만 Jest 같은 비브라우저 환경에선 BOM 속성을 Mocking해야 할 때도 있다.
// 이런 상황이 올 때마다 upcasting 함수를 작성하거나, mocking하는 등의 방법을 써야만 하나?

// 해결 5️⃣: satisfies + as = safe upcasting
interface SmallNavigator {
  language?: string;
  userAgent?: string;
}

// 💡 필요한 속성만 mocking
// Navigator는 language: string, userAgent:string을 만족한다.
// 안 쓰는 속성들까지 mocking하는 대신 as를 써서 업캐스팅하고 끝낸다.
const observer = {
  navigator: window.navigator satisfies SmallNavigator as SmallNavigator,
};
