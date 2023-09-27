// satisfies의 기능은 크게 세 가지로 나눌 수 있다.
// 1. 타입 체크.
// 2. 타입 체크에 기반한 안전한 업 캐스팅.
// 3. 타입 체크에 기반한 안전한 다운 캐스팅.

// 해결 1️⃣: satisfies는 타입이 만족되는지 체크하고, 만족할 경우 다운캐스팅한다.
type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// 다운캐스팅: palette는 Record<Colors, string | RGB>를 만족한다.
// 타입이 안전하다고 판단하면 palette의 타입을 실제 값에 맞춰서 다운캐스팅한다.

palette.green.toUpperCase(); // ✅ OK
palette.red = "#00ff00"; // ❌ Error(ts2322): [number, number, number] 타입만 할당하시오.

// 해결 2️⃣: typing이 광범위해도 실제 속성에만 접근하도록 제한
type Config = Record<string, string>;

const config = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
} satisfies Config;

config.name223 = "asd"; // ❌ Error(ts2551): 없는 속성에 접근 금지.

// 해결 3️⃣: 일부 타입만 체크하는 상황도 간단히 해결.
interface Data {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}

const baseData = {
  a: "A",
  b: 1,
} satisfies Partial<Data>; // 🔵 baseData: { a: "A"; b: number; }

const data1: Data = {
  ...baseData, // ✅ 통과!
  c: "foo",
  d: ["asd"],
};

// 해결 4️⃣: satisfies + as = safe type check
interface User {
  name: string;
  location: string;
  major: "frontend" | "backend"; // 📛 어느 날 추가된 속성.
}

const user = {
  name: "태현",
  location: "경기",
} satisfies User as User; // ❌ Error(ts1360): major 속성을 입력하시오.

// 해결 5️⃣: safe upcasting을 쓴다.
interface SmallNavigator {
  language?: string;
  userAgent?: string;
}

// 📘 satisfies + as = safe upcasting
// 💡 필요한 속성만 mocking
const observer = {
  navigator: window.navigator satisfies SmallNavigator as SmallNavigator,
};
