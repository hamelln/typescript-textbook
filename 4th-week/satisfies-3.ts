// 🤠 satisfies! Upcasting!

interface SmallNavigator {
  language?: string;
  userAgent?: string;
}

// '정상적인 환경'이라면 Navigator 타입을 잘 추론한다.
const observer = {
  navigator: window.navigator,
};

// 😱 Jest 같은 비브라우저 환경에선 접근할 수 있는 BOM 속성이 제한적이다.
const navigator = {
  language: "ko",
  geolocation: {}, // 이런 거 조회 불가능.
  // 그 외에도 엄청 많은 속성들...
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
  navigator: window.navigator satisfies SmallNavigator as SmallNavigator,
};
