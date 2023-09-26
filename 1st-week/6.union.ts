//❗ 아래와 같은 케이스는 enum으로 작성할 필요가 없다.
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

//📘 대안1: 유니온으로 작성.
type UDirection = "Up" | "Down" | "Left" | "Right";

//📘 대안2: TS 공식 문서에서 권장하는 방법. 유니온 타입만으로 어렵다면 객체 사용.
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

//# 예시 2: 유니온 타입은 각자 속성이 다르므로 케이스를 좁힌다.
export type ChangeEvent<T extends HTMLElement> = Event & {
  target: T & {
    name?: string;
    value?: string;
  };
};

export type FormEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

const handleFormData = (e: FormEvent) => {
  //? 키의 유무 체크
  if ("name" in e.target && "value" in e.target) {
    //! as string, !으로 타입 단정하는 건 자제.
    const key = e.target.name;
    const value = e.target.value;
    //? 타입 체크
    if (typeof key === "string" && typeof value === "string") {
      switch (key) {
        case "breweryDescription":
          //? 인스턴스 체크: 통과하면 textarea 객체의 속성, 메소드 참조 가능.
          if (e.target instanceof HTMLTextAreaElement) {
          }
      }
    }
  }
};
