type EventNames = "click" | "doubleClick" | "mouseDown" | "mouseUp";

// 'Click' | 'DoubleClick' | 'MouseDown' | 'MouseUp'
type CapitalizedEventNames = Capitalize<EventNames>;
// Intrinsic string manipulation types: Capitalize, UpperCase 등등

// 'onClick' | 'onDoubleClick' | 'onMouseDown' | 'onMouseUp';
type HandlerNames = `on${CapitalizedEventNames}`;

type Handlers = {
  [H in HandlerNames]: (event: Event) => void;
};

type MyElement = Handlers & {
  addEventListener: (
    eventName: EventNames,
    handler: (event: Event) => void
  ) => void;
};

// 그 외에도 getter, setter, 메소드 등에 쓰기 좋음.
