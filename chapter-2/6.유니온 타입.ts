//# 예시 1: 유니온 타입은 주어진 케이스만 사용 가능하다.
export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
const day: Day = "monday"; // 에러

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
  //? 키의 유무 확인
  if ("name" in e.target && "value" in e.target) {
    //! 가급적 e.target.name!, e.target.name as string 등으로 단정하는 건 자제.
    const key = e.target.name;
    const value = e.target.value;
    //? 타입 확인
    if (typeof key === "string" && typeof value === "string") {
      switch (key) {
        case "breweryDescription":
          //? 인스턴스 확인: 통과하면 textarea 객체의 속성, 메소드를 참조할 수 있다.
          if (e.target instanceof HTMLTextAreaElement) {
          }
      }
    }
  }
};
