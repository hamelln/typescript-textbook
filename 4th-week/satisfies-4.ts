interface User {
  name: string;
  location: string;
  age: number | null; // 追加
}

interface Group {
  name: string;
  users: User[];
}

type UserOrGroup = User | Group;

// 응답 결과를 가져온다던지, 식별자에 typing할 수 없는 상황도 있다.
// 그럴 땐 타입 점검 로직을 통과시키고 as로 타입을 명시해서 return하기도 한다.
// 그런데, '타입 점검 로직은 그대로'인데 '타입이 변경'됐다면?
const user1 = {
  name: "Taro",
  location: "Tokyo",
  // 타입이 변경되어도 as 연산자는 타입 체크를 안 하므로 에러를 안 낸다!
} as UserOrGroup;

const user2 = {
  name: "Taro",
  location: "Tokyo",
  // ↓ satisfies는 타입 체크를 하므로 ts1360 에러를 낸다.
} satisfies UserOrGroup as UserOrGroup;
