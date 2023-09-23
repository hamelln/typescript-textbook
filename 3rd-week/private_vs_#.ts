//❗ private: '컴파일'에서만 은폐.
class PrivateKeyword {
  private value = 1;
}

//❗ 컴파일이 끝나고 런타임엔 아래와 같이 public으로 변환된다.
class PrivateKeywordWithRuntime {
  value = 1;
}

/**
 * 🔖 즉, 자식 클래스는 private 속성도 상속받는다.
 * 🚫 그래서 자식 클래스에선 똑같은 이름의 속성을 선언할 수 없다.
 */
class PrivateKeyword2 extends PrivateKeyword {
  //❗ Error: 부모 클래스에서 value를 상속받았기 때문에 value는 선언 불가.
  // value = 1;
}

const testClass = new PrivateKeyword2();
/**
 * ❗ 아래 코드는 컴파일 에러가 난다.
 * 그러나 ts 무시를 하고 실행해보면 조회가 된다! (런타임에서 public 속성으로 변환됐음을 의미)
 */
// @ts-expect-error
testClass.value; // 1

/**
 * 📘 #: 런타임에도 완전 은폐(철저한 캡슐화).
 * 🧐 hasOwn()으로 속성 조회 불가능
 * 🧐 JSON.stringify으로 직렬화할 때에도 제외됨.
 * */
class PrivateFieldClass {
  #value = 1;
  value2 = 2;
}

class B extends PrivateFieldClass {
  //📒 private과 달리 부모 클래스와 같은 이름으로 선언이 가능하다(#속성은 상속이 안 됐음을 의미)
  #value = 2;
}

class Class extends PrivateFieldClass {}

const c = new Class();
c.#value; //❗ Error: #속성은 어떤 상황에서도 클래스 내부에서만 조회, 접근 가능.
c.value2;
