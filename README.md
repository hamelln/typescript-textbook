# 전제
$\textcolor{#ffffffc7}{\textsf{}}$
1️⃣ 이 글에서 '객체'라고 함은 객체, 배열, 클래스, 함수 등 원시 타입이 아닌 것들을 말한다. 

# 1. 타입 명시란?

![image](https://user-images.githubusercontent.com/39308313/267523843-cae7aa92-2300-41c9-a737-64173f2f264f.png)

# 2. 타입 명시는 언제?

> $\textcolor{#ffffffc7}{\textsf{타입 추론이 부정확할 때 하되, 필요하면 추가한다.}}$

## 타입 추론

const 변수: 값이 고정됐으므로 리터럴로 추론.  
let, 객체: let은 값이, 객체는 속성값이 재할당되므로 넓게 추론.  

![1-infer](https://github.com/hamelln/typescript-textbook/assets/39308313/34ee7d79-7d08-400c-8e9c-72cd0859ba2e)

![](https://user-images.githubusercontent.com/39308313/267523923-028d091a-7f39-477c-bd3e-693d94714680.png)

readonly vs const  
readonly와 const를 구별하는 가장 쉬운 방법은 변수에 쓰는 것인지, 속성에 쓰는 것인지 되짚으면 됩니다. const는 변수에 쓰고 readonly는 속성에 씁니다.
-TypeScript 문서-

**∴) 타입 명시는 일단 "타입 추론이 부정확할 때" 해보자. 그러다가 필요에 따라 바꾸면 된다.**

# 3. 배열과 튜플

튜플은 길이를 고정한 배열이다.  
즉, 튜플 타입이라고 하면 각 index마다 타입을 지정한 타입을 말한다.

![](https://user-images.githubusercontent.com/39308313/267523936-6bf10599-022f-434c-8e87-40f778d49cb7.png)

# 4. 유니온 타입

유니온 타입은 타입을 몇 가지로만 특정할 때 쓴다.  
유니온과 제네릭은 타입스크립트의 꽃이란 찬사를 들을 만큼 강력한 기능이다.  
예를 들어 타입을 몇 가지로 지정하는 방법은 enum도 있지만, enum은 tree-shaking에 영향을 받지 않는다.  
따라서 ‘enum이어야만 할 이유’가 없다면 대부분은 유니온 타입으로 해결할 수 있다.

![](https://user-images.githubusercontent.com/39308313/267523940-911febfc-4149-4c14-b573-162e8442e4ef.png)

# 5. 그 외 타입

위의 예제 코드처럼, JavaScript에서도 typeof로 "string" 등의 간단한 타입 검사가 가능하다.  
하지만 TypeScript에는 JS에 없는 타입들이 많다.

### any

만악의 근원. 쓰지 말아야 할 1순위 타입.
any를 쓰면 TypeScript를 쓰는 의미가 없어지는 수준이라 봐도 좋다.

![](https://user-images.githubusercontent.com/39308313/267523912-a8acc044-bc04-4c6c-b4b2-c6b2d846e3ef.png)

### unknown

any: "뭔지 몰라도 일단 다 OK."  
unknown: "일단 담아오긴 했는데 이걸 쓰려면 무슨 타입인지 네가 밝혀줘야 해."

![](https://user-images.githubusercontent.com/39308313/267523865-5c8f4365-f293-4170-a66f-daa6b4cd7a2e.png)

- any는 무슨 타입이든 할당되고, 무슨 타입인지 몰라도 일단 사용할 수 있다.
- unknown은 무슨 타입이든 할당되지만, 어떤 타입인지 밝혀내기 전까지는 사용할 수 없다.

![](https://user-images.githubusercontent.com/39308313/267523947-0dcff004-2de0-44ed-9002-53a160f82bd3.png)

### void

![](https://user-images.githubusercontent.com/39308313/267523906-e974924a-064c-4a18-b6b5-6a1ed9cea65c.png)

### never

![](https://user-images.githubusercontent.com/39308313/267523928-0f5ab06c-d4ac-40aa-9371-c6ddde56045a.png)

### {}

nullish가 아닌 모든 타입을 가리킨다.  
그러나 어떤 값을 할당해도 속성을 조회하거나 연산자를 쓸 수는 없다.  
왜냐하면 이 타입은 표현 그대로 '빈 객체'를 가리키는 타입이라 그렇다.  
직접 사용할 일은 없겠지만 개발하다보면 {} 타입이 추론되는 경우도 있을 테니 알아만 두자.

# 6. 타입으로 쓸 일 없는 것

String, Number, Object, Boolean 등은 리터럴 타입이 아니라 객체를 가리킨다.  
그래서 일반적으론 쓸 일이 없다.

# 7. 타입 버전

```
// BigInt literals are not available when targeting lower than ES2020.
const bigNum:bigint = 2000000000000000000n;
```

자동으로 에러 메시지를 띄우므로 tsconfig.json에서 아래와 같이 target을 바꾼다.

```
"compilerOptions" {
  "target": "ES2020",
}
```

# e.t.c. JS -> TS로 바꿀 때

잘 실행되던 코드가 타입을 입력했더니 에러가 나는 경우는 흔하다.  
임시방편으로 에러 코드 위에 // @ts-expect-error 주석을 달면 된다.  
최종적으론 주석 없이 마이그레이션을 마치는 걸 목표로 하자.

# e.t.c. Symbol

Symbol은 객체의 unique한 key로 쓰는 타입이다.

Symbol(): 즉시 새 심볼을 만드는 지역적인 메소드  
Symbol.for(): 심볼 레지스트리에 등록된 심볼이 있으면 반환하고, 없으면 만들어서 준다. 전역적으로 쓰기 좋다

본래 객체의 비공개 속성으로 쓰기 위해 개발이 시작됐으나 현재 그런 이유로 쓸 일은 없다.  
객체를 JSON으로 파싱할 땐 string 타입의 key만 처리하기 때문에 심볼 속성은 제외되는 특성이 있다.  
그래서 리액트 내부적으로 엘리먼트 체크를 하거나, 라이브러리 개발 시 중첩을 피하기 위한 용도 등으로 쓰인다.  
일반적으로는 쓸 일이 잘 없다.

```
const author = Symbol("저자의 이름");

interface Person {
  [author]: string;
  author: string;
}

class Person implements Person {
  [author]: string;
  author: string;
  // 매개변수 이름이 심볼 이름과 겹치면 Error.
  constructor(symbolAuthor: string, realAuthor: string) {
    this[author] = symbolAuthor;
    this.author = realAuthor;
  }

  print() {
    console.log(`저자의 심볼: ${this[author]}`);
    console.log(`저자의 이름: ${this.author}`);
  }
}

const zeroCho = new Person("제로초", "조현영");
zeroCho.print();
```

$\textcolor{red}{\textsf{}}$

# 네임스페이스

이름이 겹치면 안 되는 인터페이스, 타입, 클래스, 특정한 값은 네임스페이스로 **유일성**을 보장한다.  
예시는 아래에서 확인하자.

# 인터페이스

> _“인터페이스는 객체(함수, 클래스 등 포함) 타입을 지정한다.”_

### 옵셔널과 undefined

![optional](https://github.com/hamelln/typescript-textbook/assets/39308313/60276aa3-d0ce-4fc5-9585-917b37460052)

아마 보통은 이렇게 생각할 것이다.  

✅ $\textcolor{#ffffffc7}{\textsf{할당한다면 string만 허용하자.}}$  
❌ $\textcolor{#ed322199}{\textsf{undefined도 할당 OK}}$  

일부러 undefined가 할당되는 것을 방지하려면 `tsconfig.ts`에서 `exactOptionalPropertyTypes: true`로 바꾼다.

# 인터페이스 재선언

인터페이스는 **재선언**이 가능하다. 아래 조건을 만족하면 원래의 인터페이스와 **병합**이 일어난다.

1️⃣ 기존 속성의 타입을 바꾸는 건 불가능  
2️⃣ 기존에 없던 속성과 타입 추가 가능   
3️⃣ **다른 모듈에서 import한 인터페이스는 병합 불가능**  

즉, 아래와 같이 인터페이스를 같은 공간에서 작성해야 병합이 된다. 

![interface-merging-0](https://github.com/hamelln/typescript-textbook/assets/39308313/9273b7d0-aad5-4c2a-8599-81d206e49feb)

> $\textcolor{#ffffffc7}{\textsf{“굳이?”}}$

굳이 이렇게 병합을 지원하는 건 다른 이유 때문이다.  

![interface-merging](https://github.com/hamelln/typescript-textbook/assets/39308313/a820aa90-2720-4732-beab-7aa5822f2c1d)

API 타입을 지정할 때 유용하다.  

# 타입 호환성

타이핑은 여러 종류가 있다.  
### 1️⃣ 명목적 타이핑(Nominal Typing)
```
type A = { name: string }
type B = { name: string }
let a:A = { name: "현" }
let b:B = { name: "현" }
a = b; //❗ Error: 타입 이름이 다르면 구조가 같아도 거절.
```
### 2️⃣ 구조적 타이핑(Structure Typing)  
**타입스크립트가 채택한 방식. 필수 구조만 같으면 동일**하다고 인정.  
구조적 타이핑은 덕 타이핑이라고 부르기도 한다. 간단한 설명을 보고 가자.  

Q) **“오리란 무엇인가?”**

1. 딱 봐도 오리 같은 부리를 가졌다.
2. 딱 봐도 오리 같은 눈을 가졌다.

위 두 조건을 갖추면 오리라고 정의하겠다.

![rp0g39w789nqe8uzge8p](https://github.com/hamelln/typescript-textbook/assets/39308313/1b280fe5-0bc6-4c4c-bd15-2b34dd8baeaa)

반박할 여지 없이 완벽한 오리다.(포토샵이라는 의문 안 받음)  

코드로도 확인해보자.  

![type-compatibility-0](https://github.com/hamelln/typescript-textbook/assets/39308313/19f1a3bb-acf8-436a-bd53-937409660fb0)

객체 지향 프로그래밍 관점으로 보자면 구조적 타이핑은 다형성을 허용한다.  
버거든 피자든, 음식이라는 조건을 갖추면 칼로리 계산을 허용함으로서 유연성을 발휘한다.  
그런데 이 유연성이 항상 적용되는 건 아니다. 특별 케이스가 하나 있다.  

### 객체 리터럴: 엄격하게 검사

TypeScript는 객체 리터럴을 $\textcolor{#3498DB}{\textsf{fresh한 객체}}$라고 분류하고 **구조가 완벽하게 일치**하는지 체크한다.  
**이미 변수에 담겨 추론되거나 as의 타입 단언 등, 타입이 결정된 객체는 $\textcolor{#3498DB}{\textsf{freshness}}$를 잃어서 덕 타이핑으로 체크.**  
아래 예제를 통해 알아보자.

![type-compatibility-literal](https://github.com/hamelln/typescript-textbook/assets/39308313/82be080e-a9f7-46b9-ba53-59908a822740)

### 브랜딩 기법

잉여 속성이 들어오는 걸 원천 차단하고 싶다면 **브랜딩 기법**을 활용한다.  

![type-compatibility-3](https://github.com/hamelln/typescript-textbook/assets/39308313/3bef8c15-fec4-432a-b933-5c330b4b7bde)

# 타입 상속

![type-extends](https://github.com/hamelln/typescript-textbook/assets/39308313/a681f7b3-4787-47f4-9b3b-675e5f213fa8)

# 제네릭

소프트웨어 개발자의 최대 관심사 중 하나는 "재사용성"이다.  
C#, Java 같은 정적 타입 언어들은 다양한 타입이 들어와도 유연하게 실행할 수 있도록 제네릭을 지원한다.  
타입스크립트의 제네릭도 그로부터 비롯했기 때문에 개념은 비슷하다.  
제네릭에는 기본값을 지정할 수 있다.
이는 JS에서 함수에 기본값을 지정하는 것과 매우 흡사하다.
제네릭은 아무 때나 쓰는 게 아니라 재사용과 추상화가 필요하고, 코드가 조금 복잡한 경우에 쓰는 게 좋다.  
단순한 경우에는 제네릭 없이 타입만 명시한다.

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [Jesse Hallett(2023.05). When to use never and unknown in TypeScript](https://blog.logrocket.com/when-to-use-never-unknown-typescript/)
- [Marius Schulz(2019.05). The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [박서진(2021.05). Template Literal Types로 타입 안전하게 코딩하기.](https://toss.tech/article/template-literal-types)
- [멍개(2022.07). [typescript] 트리쉐이킹 - enum을 써야하는가?](https://blog.naver.com/pjt3591oo/222817775732)
- [TypeScript 공식](https://www.typescriptlang.org/)
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성](https://toss.tech/article/typescript-type-compatibility)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
- [캡틴판교. 제네릭 제약 조건.](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%98-%ED%95%9C-%EC%A4%84-%EC%A0%95%EC%9D%98%EC%99%80-%EC%98%88%EC%8B%9C)
- [Antonello Zanini(2022.08). How to extend the Express Request object in TypeScript](https://blog.logrocket.com/extend-express-request-object-typescript/)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system)
