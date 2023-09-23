/**
 * private: 컴파일 중에만 은폐
 * => 따라서 자식 클래스에서 같은 이름 사용 불가능.
 * */
class PrivateKeyword {
  private value = 1;
}
// emitted 이후 런타임엔 private가 해제된다.
class PrivateKeywordWithRuntime {
  value = 1;
}

class PrivateKeyword2 extends PrivateKeyword {
  constructor() {
    super();
  }
  say() {
    // @ts-expect-error
    console.log(this.value); // 런타임에선 실행 가능한 코드.
  }
}

const testClass = new PrivateKeyword2();
testClass.say(); // 1

/**
 * #: 런타임에도, 인스턴스나 자식 클래스에게도 완전 은폐(철저한 캡슐화).
 * hasOwn()으로 조회 불가능 & JSON.stringify으로 직렬화하는 것도 불가능.
 * */
class PrivateFieldClass {
  #value = 1;
  value2 = 2;
  say() {
    console.log(this.#value);
  }
}

class B extends PrivateFieldClass {
  #value = 2;
}

// #표시한 속성과 메소드는 상속이 안 된다.
class Class extends PrivateFieldClass {
  constructor() {
    super();
  }
  say() {
    console.log(this.#value); // #value는 상속되지 않아서 에러
    console.log(this.value2); // value2는 상속됐으므로 정상 실행.
  }
}

const c = new Class();
c.say();

// 결론: 런타임에도 + 철저한 은폐를 하고 싶다면 #을 이용. 그 외에는 private
