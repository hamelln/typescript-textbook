type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette1: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
};

const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// Typing: 명시된 타입만 보고 에러 가능성을 판단.
// satisfies: 명시된 타입에 맞는지 확인 & 실제 값에 맞춰서 다운캐스팅.

palette1.red.map(0); // ❗Error: red는 배열이지만 string이 올 수도 있다며 에러.
palette1.green.toUpperCase(); // ❗Error: green은 string이지만 배열이 올 수도 있다며 에러.
palette2.green.toUpperCase(); // 👌OK: 원론적으론 배열이 올 수 있지만 실제 값인 string으로 다운 캐스팅.
