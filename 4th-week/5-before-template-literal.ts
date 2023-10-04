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
