let bool = false; // bool은 선언 당시에는 boolean으로 추론하지만...

function changeBool() {
  const someCondition = 1 === 1;
  if (someCondition) bool = true;
}

changeBool();
// 🚫 ts2367 Error: 타입이 다른 것끼리는 비교하지 마시오.
// 실제로는 false 리터럴 타입으로 사용된다. false와 true는 '다른 타입'임.
if (bool === true) {
}

// 위와 같은 문제를 해결하려면 어떻게 해야 할까?
// 😞 bool을 boolean으로서 단언해야 함.
bool = false as boolean;

// 😓 통과: bool이 boolean 타입으로 다뤄지므로 비교 가능.
if (bool === true) {
}

// 🤕 아이디어: 타입이 구체적이라고 항상 좋은 건 아니다.
