// 🤠 satisfies! Upcasting!

// '정상적인 환경'이라면 Navigator 타입을 잘 추론한다.
const observer = {
  navigator: window.navigator,
};

// 😱 그런데 만약 JS 코드만 알고 '타입이 등록 안 된 API'라면? Jest 같은 Node 환경에선? 다른 환경에선?
const navigator = {
  language: "ko",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
  // ... 그 외 40개 이상의 속성들.
};

// 😦 위와 같은 상황이 올 때마다 '매번' 인터페이스를 선언하거나 병합하거나 mocking하거나 업캐스팅 함수를 써야한다...?
interface Navigator {
  readonly language: string;
  readonly userAgent: string;
  // ...그 외 속성들....
}

// 🥳 satisfies를 하면 편하게 upcasting한다.
// 다른 속성, 타입은 몰라도 내가 원하는 language, userAgent 속성에 접근 가능.
const observer2 = {
  navigator: window.navigator satisfies {
    language?: string;
    userAgent?: string;
  },
};
