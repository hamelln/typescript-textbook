// 템플릿 리터럴: 대수적 타입(ADTs, 타입을 대수적으로 보는 휴리스틱)를 매우 편리하게 구현하도록 돕는다.
// 타입을 연산해서 안전하고 쉽게 문제를 해결. -> 함수형 프로그래밍에 최적.

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
type Card = `${CardSuit}${CardRank}` | "JOKER";

// Rust 같은 언어에서 ADT는 시스템적 기능으로서 지원: 무결성, 패턴 매칭 등 추가적인 보강.
#[derive(Debug)]
enum CardRank {
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}

#[derive(Debug)]
enum CardSuit {
     Hearts = '♥' as isize, 
     Spades = '♠' as isize, 
     Clubs = '♣' as isize, 
     Diamonds = '◆' as isize
}

#[derive(Debug)]
enum Card {
   Regular(CardSuit, CardRank),
   Joker
}