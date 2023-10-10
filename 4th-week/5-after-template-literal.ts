// 💭 대부분의 정적 타입은 ad-hoc types system -> 고수준 추상화가 어렵다.
// 🔍 이에 대한 조치로 Generic, Dependent Types, Algebraic Data Types 등 여러 이론과 개념이 나옴.
// 📝 템플릿 리터럴: 대수적 타입(ADTs, 타입을 대수적으로 보는 휴리스틱)의 domain modeling을 더 편리하게 지원한다.
// 📌 요약: 리터럴 타입 모델링에 유용함.

// ✍️ 버튼에 대한 타입을 추가하거나 이름을 변경하더라도
type Buttons = "a" | "b" | "x" | "y" | "home" | "zl" | "zr" 
type CapitalizedButtons = Capitalize<Buttons>

// "onA" | "onB" | "onX" | "onY" | "onHome" | "onZl" | "onZr"
type ButtonHandlers = `on${CapitalizedButtons}` 

// 🎉 메소드 타입은 자동으로 업데이트된다.
type ButtonsController = {
  [BH in ButtonHandlers]: () => void;
}

class Controller implements ButtonsController {
  // ... 메소드 구현
}

// 📘 Capitalize: TS 4.1에 추가된 타입. 타입의 첫 글자를 대문자로 바꾼다.
// 👀 위 문법을 template literal과 혼용하면...

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