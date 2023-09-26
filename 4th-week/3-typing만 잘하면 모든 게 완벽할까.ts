// 문제1: 철저히 명시된 타입에만 의거하기 때문에 때때로 까다로움.
type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette1: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
};

palette1.red.map(0); // ❗Error: red는 배열이지만 string이 올 수도 있다며 에러.
palette1.green.toUpperCase(); // ❗Error: green은 string이지만 배열이 올 수도 있다며 에러.

// 문제2: typing이 엄격하지 않을 경우엔 side effect가 발생할 수 있다.
type Config = Record<string, string>;

const config: Config = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
};

// 😰 통과. 타입 명세대로면 이래도 문제는 없다...이래도 되나?
config.name223 = "asd";

// 문제3: typing으로 해결하지 어려운 문제도 있다.
interface Data {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}

const baseData: Partial<Data> = {
  a: "A",
  b: 1,
};

// Error: baseData의 타입이 Partial이라서 a와 b가 없을 수 있다고 판단.
// Pick<Data, "a" | "b">으로 해결할 수는 있다. 하지만 변경될 때마다 늘리고 바꿔야 한다.
// 더 간단하고 똑똑하게 해결할 방법은 없을까?
const data1: Data = {
  ...baseData,
  c: "foo",
  d: ["asd"],
};

// 문제4: 직접 typing을 못하는 경우.

interface User {
  name: string;
  location: string;
}

// 아주 가끔, 타입 점검을 하고 as로 타입을 단언할 상황도 있다.
// fetch로 가져온 결과가 User인지 확인하는 로직을 거치고 아래의 결과를 return한다고 가정해보자.
const user1 = {
  name: "태현",
  location: "경기",
} as User;

// 문제. 어느 날 User에 속성이 추가됐다면?
interface User {
  major: "frontend" | "backend"; // 속성 추가.
}

// 에러를 내야 할 상황인데 as는 그냥 통과시켜버린다!
const user2 = {
  name: "태현",
  location: "경기",
} as User;

// 문제5: typing은 때때로 피곤하다.

// '정상적인 환경'이라면 Navigator 타입에는 문제가 없다.
const observer = {
  navigator: window.navigator,
};
// 😱 하지만 Jest 같은 비브라우저 환경에선 BOM 속성을 Mocking해야 할 때도 있다.
// 이런 상황이 올 때마다 upcasting 함수를 작성하거나, mocking하는 등의 방법을 쓰는 건 불편하다.
