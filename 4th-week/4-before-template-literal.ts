// 🤨 버튼 타입이 추가될 때마다...
type Buttons = "a" | "b" | "x" | "y" | "home" | "zl" | "zr";
type CapitalizedButtons = Capitalize<Buttons>;
type ButtonHandlers = `on${CapitalizedButtons}`;

// 💔 버튼에 대한 메소드 타입도 일일이 추가해야 한다.
type ButtonsController = {
  onA: () => void;
  onB: () => void;
  onX: () => void;
  onY: () => void;
  onHome: () => void;
  onZl: () => void;
  onZr: () => void;
};

class Controller implements ButtonsController {
  // ... 메소드 구현
}

// 포커용 카드 타입을 어떻게 구성하지?
type CardRank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A";
type CardSuit = "♥" | "♠" | "♣" | "◆";
type Card = [CardSuit, CardRank] | "JOKER"; // 🙇‍♂️ 흠...뭔가 별로다.
