// 템플릿 리터럴은 대수적 타입(ADT)를 매우 편리하게 구현하도록 돕는다.
// 대수적 타입: 타입을 대수적인 관점으로 보는 휴리스틱. 대수는 더하기와 곱하기 연산으로 모든 것을 한다.
// 타입을 더하거나, 타입을 곱해서 새로운 타입을 만들어내 문제를 쉽게 해결하자는 아이디어.

// case 1: 이벤트 이름, 메소드 타입
type EventNames = "click" | "doubleClick" | "mouseDown" | "mouseUp";

// 📘 Capitalize: TS 4.1에 추가된 타입. 타입의 첫 글자를 대문자로 바꾼다.
type CapitalizedEventNames = Capitalize<EventNames>; // 'Click' | 'DoubleClick' | 'MouseDown' | 'MouseUp'
// 📝 위 문법을 template literal을 이용하면...
type HandlerNames = `on${CapitalizedEventNames}`; // 'onClick' | 'onDoubleClick' | 'onMouseDown' | 'onMouseUp';

type Handlers = {
  [H in HandlerNames]: (event: Event) => void;
};

// ✅ 타입만 추가해도 메소드 타입이 자동으로 업데이트된다!
type MyElement = Handlers & {
  addEventListener: (
    eventName: EventNames,
    handler: (event: Event) => void
  ) => void;
};

// case 2: 포커 카드
type CardRank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A";
type CardSuit = "♥" | "♠" | "♣" | "◆";
type Card = `${CardSuit}${CardRank}` | "JOKER"; // 단 세 줄만으로 모든 경우의 수를 만들어냈다!
