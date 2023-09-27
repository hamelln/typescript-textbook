// 문제1: 비교는 같은 타입끼리여야 성립한다.
let bool = false; // let이라서 boolean으로 추론하는 것 같지만...

function changeBool() {
  const someCondition = true;
  if (someCondition) bool = true;
}

changeBool();
// 🚫 ts2367 Error: 타입이 다른 것끼리는 비교하지 마시오.
// bool은 사용할 땐 false 리터럴 타입으로 추론된다. false와 true는 '다른 타입'
bool === true;

// 위와 같은 문제를 해결하려면 어떻게 해야 할까?
// 😞 as로 boolean이라고 '단언'해야 함.
bool = false as boolean;

// 😓 통과: bool이 boolean 타입으로 다뤄지므로 비교 가능.
if (bool === true) {
}

// 문제2: 아래의 상황을 보자.
// button, div, span, a, address... 여러 엘리먼트에서 마우스 이벤트가 발생할 수 있다.
// 그럴 때마다 아래와 같이 타입을 일일이 등록해야 한다.
// event.target 같이 간단한 속성만 사용하는 경우가 많다면 이는 불편을 야기한다.
function onClick(event: MouseEvent<HTMLAnchorElement>): void;
function onClick(event: MouseEvent<HTMLBodyElement>): void;
function onClick(event: MouseEvent<HTMLButtonElement>): void;
function onClick(event: MouseEvent<HTMLInputElement>): void;

// HTMLElement의 서브 타입이면 HTMLElement로 취급한다.
// 제네릭 타입 이름은 <T>처럼 알기 어려운 이름보단 맥락 파악이 되는 이름으로 작성한다.
type MouseEventType<ElementType = HTMLElement> = ElementType extends HTMLElement
  ? MouseEvent<HTMLElement>
  : never;

// 어떤 엘리먼트의 이벤트가 오더라도 공통 속성과 메소드를 사용할 수 있다.
function onClick(event: MouseEventType) {
  const target = event.target; // 통과.
}

// 고유 속성을 쓰고 싶을 때에만 별도로 타이핑한다.
function onTextareaClick(event: MouseEvent<HTMLTextAreaElement>) {}

// 🤕 아이디어: 타입이 좁다고 무조건 좋은 건 아니다.
