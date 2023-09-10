# 2.1 타입마다 버전이 다르다

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

# 2.2 타입 추론, 타입 명시는 필요한 때에 쓴다

모든 코드에 타입을 일일이 입력하긴 어렵다. 그래서 타입 추론을 섞어서 쓴다.  
추론이 어떻게 처리되는지 알면 언제 쓸 지 기준을 정하기 쉽다.  
참고: 타입 추론은 코드 실행 전에 하는 것이라 VSCode 같은 IDE로만 볼 수 있다.

### let은 const보다 느슨하게 추론한다

let은 재할당을 전제하기 때문에 타입을 넓게 추론한다.

```
let k1 = null; // any
const k2 = null; // null

let v1 = undefined; // any
const v2 = undefined; // undefined

let hello1 = "hello"; // string
const hello2 = "hello"; // "hello"

let sym1 = Symbol("현"); // symbol
const sym2 = Symbol("현"); // typeof sym2
```

# 2.3 const의 타입 추론은 원시 타입만 정확하다

const의 원시 타입 추론은 대체로 정확하다. 그러나 JS는 대부분이 객체다.  
객체는 재할당 없이 속성을 바꿀 수 있다. 그래서 객체 타입 추론은 느슨하다.

```
const user1 = {
  name: "John", // name: string
  age: 30, // age: number
};

// 각 property를 고정해서 쓰고 싶다면 as const를 쓴다.
const user2 = {
  name: "John", // name: "John"
  age: 30, // age: 30
} as const;

const nums = [3, 1, 2, 5, 4] as const;
nums.sort(nums); // 에러 발생

// nums는 readonly로 다뤄지지만 함수가 이를 any로 받겠다고 하면 수정할 수 있다.
// 이런 side effect를 피하기 위해 함수에서 typing을 정확히 하고 any를 지양한다.
function sortFunc(nums: any) {
  nums.sort();
}

sortFunc(nums);
console.log(nums); // [1, 2, 3, 4, 5]

// typing과 같이 쓰면 좋은 것들: ES2023에 추가된 메소드
// 인자를 안 바꾸고 새로운 배열을 반환한다는 점에서 함수형 프로그래밍과 궁합이 좋다.
const nums1 = [3, 1, 2, 5, 4];
const nums2 = nums1.toSorted(); // 새 배열 [1,2,3,4,5] 반환
const nums3 = nums1.with(2, 10).with(4, 20); // 새 배열 [3,1,10,5,20] 반환
const nums4 = nums1.toSpliced(1, 3, 6, 7, 8); // 새 배열 [3,4,6,7,8] 반환
```

### JS -> TS로 바꿀 때

잘 실행되던 코드가 타입을 입력했더니 에러가 나는 경우는 흔하다.  
임시방편으로 에러 코드 위에 // @ts-expect-error 주석을 달면 된다.  
최종적으론 주석 없이 마이그레이션을 마치는 걸 목표로 하자.  

### Symbol에 대해

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

# 2.4 배열과 튜플

튜플은 길이를 고정한 배열이다.  
즉, 튜플 타입이라고 하면 각 index마다 타입을 지정한 타입을 말한다.
```
const nums: number[] = [1, 2, 3, 4, 5];
const tuple: [number, string, boolean] = [1, "안녕하세요.", true];
// 그러나 push등의 메소드로 다른 index에 값을 만드는 게 허용된다.
tuple.push(1);
// rest 문법을 쓸 수 있다. 그러나 이것도 새로 들어오는 타입은 엄격히 제한할 수 없다.
const nums: number[] = [1, 2, 3, 4, 5];
const tuple: [number, ...string[], boolean] = [1, "안녕하세요.", true];
tuple.push(0); // 에러 안 남
tuple.push(true);
```

# 2.5 타입으로 쓸 일 없는 것

String, Number, Object, Boolean 등은 리터럴 타입이 아니라 객체를 가리킨다.  
그래서 일반적으론 쓸 일이 없다.  

# 2.6 유니온 타입

```
export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
const day: Day = "monday" // 에러
```

유니온 타입은 식별자가 몇 가지 타입들로만 특정될 때 쓰기 좋다.  
enum을 안 쓰고도 특정 케이스를 지정할 수 있는 강력한 타입이다.  
예를 들어 위와 같은 케이스들을 전부 enum으로 지정한다면 코드가 길어질 뿐더러 성능도 점차 안 좋아질 것이다(tree-shaking)  

유니온 타입은 위와 같이 명료하고 간단한 케이스에만 쓰진 않는다.  
```
type FormEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | MouseClick;
...
  const handleFormData = (e: FormEvent) => {
    if ("name" in e.target && "value" in e.target) {
      const key = e.target.name;
      const value = e.target.value;
      if (typeof key === "string" && typeof value === "string") {
        switch (key) {
          case "breweryDescription":
            if (e.target instanceof HTMLTextAreaElement) {
              handleResizeTextarea(e.target);
              handleForm(key, value);
            }
            break;
...
```

위의 FormEvent는 각기 다른 종류의 이벤트라서 정밀한 타입 검사로 케이스를 좁혀야 이벤트 속성을 바르게 쓸 수 있다.  

- 이벤트 객체에 'name', 'value' 속성이 있는지 검사
- key와 value가 'string' 타입인지 검사
- 이벤트 객체가 HTMLTextAreaElement인지 검사

```
const randomData = await fetch(uri, httpOptions).then((res) => res.json());
if (randomData satisfies User) {
  const anonymousUser = this.anonymization(randomData);
  return anonymousUser;
  } else {
  ...
}
```
satisfies는 TypeScript 4.9에 도입된 기능으로 타입 체크용으로 쓴다.

# 2.7 TypeScript에만 있는 타입

2.6의 예제 코드처럼, JavaScript로도 typeof를 써서 "string" 등의 간단한 타입 검사가 가능하다.  
하지만 TypeScript에는 JS에 없는 타입들이 많다.  

### any
만악의 근원. 쓰지 말아야 할 1순위 타입.
2.3의 예시에서 봤듯, as const로 처리한 배열도 멋대로 고칠 수 있다. 더 최악을 보자.
```
type Person = {
  readonly name: string;
};

const person: Person = {
  name: "태현",
};

function hell(person: any) {
  person.name = "hahaha";
}

hell(person);
console.log(person.name); // "hahaha"
```
- fetch, JSON.parse등은 어떤 결과물이 나올지 확정할 수 없으므로 any로 추론한다. 잘 지정하자.

### unknown
보통 에러 객체에서 많이 보이는 타입. 모든 타입의 값을 허용한다.  

any: "무슨 값이든 다 OK"
unknown: "무슨 값이 올 지 미리 장담할 수가 없어"

외부에 뭔가를 요청했을 때 돌아올 응답이 무슨 타입인지 확실하게 알 수 있으면 좋다.  
보통은 유니온 타입으로 제한할 수 있다. 그러나 확실히 장담하기 어려운 경우 우선 unknown으로 지정한 다음 타입을 좁혀나가는 방법을 권장한다.  
```
type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);

  if (item === null) {
    return {
      success: false,
      error: new Error(`"${key}"에 맞는 아이템이 없습니다.`),
    };
  }

  let value: unknown;

  try {
    value = JSON.parse(item);
  } catch (error) {
    return {
      success: false,
      error: new Error(`JSON 평가가 실패했습니다.`),
    };
  }

  return {
    success: true,
    value,
  };
}

const result = tryDeserializeLocalStorageItem("dark_mode"); // Result로 타입 추론. 함수에서 반환값을 명시했기 때문.
// result.success가 true인지 타입 체크
if (result.success) {
  // result.success가 true이므로 value 속성이 존재.
  const darkModeEnabled: unknown = result.value;

  if (typeof darkModeEnabled === "boolean") {
    // 속성 타입이 boolean인지 검사하고, 해당될 때에만 적용
    console.log("Dark mode enabled: " + darkModeEnabled);
  }
} else {
  // success 값이 false이므로 error 속성이 존재.
  console.error(result.error);
}
```
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
