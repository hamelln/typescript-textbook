// 문제 1️⃣ 비교는 같은 타입끼리여야 성립한다.
let bool = false; // ❓ boolean으로 추론하는 것 같지만...

function changeBool() {
  const someCondition = true;
  if (someCondition) bool = true;
}

changeBool();
// ❗ 실제론 false 리터럴 타입으로 추론. false와 true는 '다른 타입'
bool === true; // ❌ ts2367 Error: 타입이 다른 것끼리는 비교하지 마시오.

// ❓ 이런 문제를 해결하려면 어떻게 해야 할까?
// 😞 as로 boolean이라고 '단언'
bool = false as boolean;
bool === true; // 😓 통과

// 문제 2️⃣ button, a, address... 여러 엘리먼트에서 이벤트가 발생할 수 있다.
// 그럴 때마다 아래와 같이 타입을 일일이 등록해야 한다.
function onClick(event: MouseEvent<HTMLAnchorElement>): void;
function onClick(event: MouseEvent<HTMLBodyElement>): void;
function onClick(event: MouseEvent<HTMLButtonElement>): void;
function onClick(event: MouseEvent<HTMLInputElement>): void;

// event.target 같이 간단한 속성을 조회할 뿐인 경우가 많다면?
// HTMLElement의 서브 타입이면 HTMLElement로 취급한다.
type MouseEventType<ElementType = HTMLElement> = ElementType extends HTMLElement
  ? MouseEvent<HTMLElement>
  : never;

// 어떤 엘리먼트의 이벤트가 오더라도 공통 속성과 메소드를 사용할 수 있다.
function onClick(event: MouseEventType) {
  const target = event.target; // 통과.
}

// 🤕 아이디어: 타입이 좁다고 무조건 좋은 건 아니다.
