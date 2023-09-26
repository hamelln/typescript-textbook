interface TheData {
  a: "A" | "B" | "C";
  b: number;
  c: string;
  d: string[];
}
// 「TheData」の一部を定義
const baseData1: Partial<TheData> = {
  a: "A",
  b: 1,
};

const baseData2 = {
  a: "A",
  b: 1,
} satisfies Partial<TheData>;
// baseData의 타입이 Partial이라서 a?:"A" | "B"| "C", b?string으로 인식한다.
// 따라서 data1은 a와 b가 존재하지 않을 수 있다고 판단하고 에러.
const data1: TheData = {
  ...baseData1,
  c: "foo",
  d: ["asd"],
};

// baseData의 타입은 Partial이지만 실제 값이 존재하기 때문에 a:"A", b:number로 인식.
// 따라서 data2는 a와 b가 확실히 있다고 판단하고 타입 체크 통과.
const data2 = {
  ...baseData2,
  c: "foo",
  d: ["asd"],
};
