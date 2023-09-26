interface TheData {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}
// 「TheData」の一部を定義
const baseData: Partial<TheData> = {
  a: "A",
  b: 1, // 誤って文字列を指定
}; // satisfies Partial<TheData>;
// baseData を使いまわしてデータを作るがエラーになる
const data1: TheData = {
  ...baseData,
  c: "foo",
  d: ["asd"],
};
