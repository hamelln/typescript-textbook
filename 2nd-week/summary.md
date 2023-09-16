# 인터페이스

'객체(함수, 클래스 등 포함)' 타입 지정.  
옵셔널 속성은 없을 시에 undefined. 없는 속성을 조회하면 에러가 뜬다.
(원래 JS에선 객체에 없는 속성을 조회할 경우 undefined를 반환하는데, TS의 옵셔널이 비슷하다.)  

```
type Person = { name?: string }
const person:Person = {};
person.name // undefined
```

### exactOptionalPropertyTypes

```
type Person = { name?: string }
const person: Person = { name: undefined };
```

기본적으로 TypeScript는 위의 코드를 막지 않는다.  
그런데 "아직 할당이 안 된 것"과 "undefined로 할당한 것"은 의미가 다르다.  
"할당한다면 string"이지, "undefined도 OK"가 아니다.  
엄격히 체크하려면 tsconfig.ts에서 exactOptionalPropertyTypes: true로 바꾼다.

### 인터페이스 재선언

인터페이스는 재선언이 가능하다. 재선언 시 이전에 선언한 인터페이스와 '병합'이 일어난다.

- 기존의 속성을 다른 타입으로 바꾸는 건 불가능
- 기존에 없던 속성을 적으면 추가됨

# 네임스페이스

이름이 겹치면 안 되는 인터페이스, 타입, 클래스, 특정한 값은 네임스페이스로 유일성을 보장해둔다.  

# 타입 호환성

타이핑은 명목적 서브타이핑과 구조적 서브타이핑(덕 타이핑)이 있다.  
TS는 객체 리터럴을 'fresh'한 객체라고 판단한다.  
변수에 담겨서 타입이 추론되거나, as로 타입을 단언한 경우엔 'fresh'를 잃는다.  
요점은 TS에서 객체 리터럴은 타입 검사가 꼼꼼하다.  

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
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성](https://toss.tech/article/typescript-type-compatibility)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
- [캡틴판교. 제네릭 제약 조건.](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%98-%ED%95%9C-%EC%A4%84-%EC%A0%95%EC%9D%98%EC%99%80-%EC%98%88%EC%8B%9C)
