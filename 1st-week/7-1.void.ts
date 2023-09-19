//❓ return 문이 없는 함수는 기본값 undefined를 반환.
const goodVoidFunc = (): void => {
  // 함수 실행...
};

const badVoidFunc1 = (): void => {
  // 함수 실행...
  return undefined; // 정상 작동하지만 이런 작성 🚫
};

const badVoidFunc2: () => void = () => {
  // 함수 실행...
  return 2; // 정상 작동하지만 이런 작성 🚫
};
