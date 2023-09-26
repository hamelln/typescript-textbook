type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// 👌OK: 원론적으론 green에 배열이 올 수 있지만 실제 값인 string으로 다운 캐스팅.
palette.green.toUpperCase();
palette.red = "#00ff00"; // Error: red는 [number, number, number]로 다운캐스팅됐기 때문에 에러.
palette.rred = "asd"; // Error: 없는 속성에 접근 금지.
