// 이벤트 이름이 추가될 때마다
type EventNames = "click" | "doubleClick" | "mouseDown" | "mouseUp";

type MyElement = {
  addEventListener(eventName: EventNames, handler: (e: Event) => void): void;
  // onEventName() 도 일일이 추가
  onClick(e: Event): void;
  onDoubleClick(e: Event): void;
  onMouseDown(e: Event): void;
  onMouseUp(e: Event): void;
};
function add(a: number, b: number): number {
  return a + b;
}
type A = ReturnType<typeof add>;
