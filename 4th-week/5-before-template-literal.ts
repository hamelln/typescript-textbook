// 🤨 이벤트 타입이 추가될 때마다...
type EventNames = "click" | "doubleClick" | "mouseDown" | "mouseUp";

type MyElement = {
  addEventListener(eventName: EventNames, handler: (e: Event) => void): void;
  // 😒 onEvent 메소드 타입도 일일이 추가해야 했음.
  onClick(e: Event): void;
  onDoubleClick(e: Event): void;
  onMouseDown(e: Event): void;
  onMouseUp(e: Event): void;
};

// 포커용 카드 타입을 어떻게 구성하지?
type CardRank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A";
type CardSuit = "♥" | "♠" | "♣" | "◆";
type Card = [CardSuit, CardRank] | "JOKER"; // tuple | "JOKER" 흠...뭔가 별로다.
