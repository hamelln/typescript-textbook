# 1. 타입 명시란?
![image](https://user-images.githubusercontent.com/39308313/267523843-cae7aa92-2300-41c9-a737-64173f2f264f.png)

# 2. 타입은 언제 쓸까?

모든 타입을 일일이 적는 건 이상적인 듯하지만 의외로 번거롭다.  
타입스크립트는 타입을 자동 추론하는 기능을 지원한다.  
※ 타입 추론은 코드 실행 전에 하는 것이라 VSCode 같은 IDE로만 볼 수 있다.

### let, 객체는 const보다 느슨하게 추론한다

let은 재할당을 전제하기 때문에 추론을 구체적으로 할 수 없다.  
![](https://user-images.githubusercontent.com/39308313/267523918-2b59014c-6ab5-45c8-a7c8-3a7a7a344d30.png)

const로 선언한 "hello"는 string이 아니라 "hello"라는 구체적인 리터럴 타입으로 지정된다.  
const의 원시 타입 추론은 대체로 정확하다. 그러나 JS는 대부분이 객체다.  
객체의 속성들도 const처럼 리터럴 타입으로 지정하려면 `as const`를 쓴다.

![](https://user-images.githubusercontent.com/39308313/267523923-028d091a-7f39-477c-bd3e-693d94714680.png)

> 즉, 타입 명시는 "타입 추론이 부정확할 때" 해보자. 그렇게 써보다가 유연하게 기준을 바꾸자.  

# 3. 배열과 튜플

튜플은 길이를 고정한 배열이다.  
즉, 튜플 타입이라고 하면 각 index마다 타입을 지정한 타입을 말한다.

![](https://user-images.githubusercontent.com/39308313/267523936-6bf10599-022f-434c-8e87-40f778d49cb7.png)

# 4. 유니온 타입

유니온 타입은 식별자를 몇 가지 타입으로 특정할 수 있을 때 쓴다.  
대부분은 enum 대신 유니온 타입으로 해결할 수 있다.  
위와 같은 케이스를 전부 enum으로 지정하면 코드가 길어질 뿐더러 성능에도 조금 별로다(tree-shaking)  
유니온 타입은 명료하고 간단한 케이스 뿐 아니라 여러 경우에 쓴다.  

![](https://user-images.githubusercontent.com/39308313/267523940-911febfc-4149-4c14-b573-162e8442e4ef.png)

# 5. 그 외 타입

위의 예제 코드처럼, JavaScript에서도 typeof로 "string" 등의 간단한 타입 검사가 가능하다.  
하지만 TypeScript에는 JS에 없는 타입들이 많다.  

### any
만악의 근원. 쓰지 말아야 할 1순위 타입.
any를 쓰면 TypeScript를 쓰는 의미가 없어지는 수준이라 봐도 좋다.

![](https://user-images.githubusercontent.com/39308313/267523912-a8acc044-bc04-4c6c-b4b2-c6b2d846e3ef.png)

### unknown

any: "무슨 값이든 다 OK"  
unknown: "무슨 값이 올 지 미리 장담할 수가 없어"

![](https://user-images.githubusercontent.com/39308313/267523947-0dcff004-2de0-44ed-9002-53a160f82bd3.png)

### void
뭔가를 반환하지 않고 실행만 하는 함수 타입을 가리킨다.  

```
const func = (): void => {
  return 1; // 에러
}

const func2: () => void = () => {
  return 1; // 에러가 안 남
}
```

return하면 안 되는 함수를 작성할 땐 위와 같이 작성한다.

### {}
nullish가 아닌 모든 타입을 가리킨다.  
그러나 어떤 값을 할당해도 속성을 조회하거나 연산자를 쓸 수는 없다.  
왜냐하면 이 타입은 표현 그대로 '빈 객체'를 가리키는 타입이라 그렇다.  
직접 사용할 일은 없겠지만 개발하다보면 {} 타입이 추론되는 경우도 있을 테니 알아만 두자.  

### never
'절대 일어나지 않을 케이스'에 대해 쓰는 타입이다.
주로 switch문이 완벽한지 확인하기 위해 사용한다.
```
enum Flower {
  Rose,
  Rhododendron,
  Violet,
  Daisy,
  Tulip
}

const flowerLatinName = (flower: Flower) => {
  switch (flower) {
    case Flower.Rose:
      return "Rosa rubiginosa";
    case Flower.Rhododendron:
      return "Rhododendron ferrugineum";
    case Flower.Violet:
      return "Viola reichenbachiana";
    case Flower.Daisy:
      return "Bellis perennis";
    default:
      const _exhaustiveCheck: never = flower; // Tulip 케이스에 대한 처리가 없어서 에러 발생. 
      return _exhaustiveCheck;
  }
};
```

# 타입으로 쓸 일 없는 것

String, Number, Object, Boolean 등은 리터럴 타입이 아니라 객체를 가리킨다.  
그래서 일반적으론 쓸 일이 없다.  

# Symbol에 대해

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

# 타입 버전
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

### JS -> TS로 바꿀 때

잘 실행되던 코드가 타입을 입력했더니 에러가 나는 경우는 흔하다.  
임시방편으로 에러 코드 위에 // @ts-expect-error 주석을 달면 된다.  
최종적으론 주석 없이 마이그레이션을 마치는 걸 목표로 하자.  


