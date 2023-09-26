// 📘 satisfies: '실제' 객체의 속성으로 '제한'한다.
type Config = Record<string, string>;

const config: Config = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
};

// 😰 통과. 타입 명세에 따르면 새 속성을 추가해도 문제는 없다...하지만 이래도 되나?
config.name223 = "asd";

const config2 = {
  name: "hamelln",
  version: "1.0",
  service: "portfolio",
} satisfies Config;

// 🚫 ts2551 Error: 없는 속성에 접근하지 마시오!
// 😤 없는 속성에 접근하지 말라고 주의한다.
config2.name2 = "Error!";
