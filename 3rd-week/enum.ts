//❗ reverse-mapping 같은 특수한 경우를 제외하면 Enum을 쓸 일은 거의 없다.
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

// TS 공식 문서에서 권장하는 방법. Union으로 안 되면 객체를 써보자.
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
