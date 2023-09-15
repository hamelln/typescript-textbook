# 인터페이스

인터페이스는 '객체' 타입을 지정한다.  
JS에서 객체라 함은 클래스, 함수, 배열 등이 포함된다.  
할당이 안 된 옵셔널 속성은 undefined로 조회된다. 없는 속성을 조회하면 에러가 뜬다.
원래 JS에선 객체에 없는 속성을 조회할 경우 undefined를 반환하는데, TS의 옵셔널 속성은 이와 비슷하다.  
```
type Person = { name?: string }
const person:Person = {}; 
person.name // undefined
```

### exactOptionalPropertyTypes

옵셔널 속성은 할당이 안 되면 undefined로 조회된다.  
아래의 코드를 보자.

```
type Person = { name?: string }
const person: Person = { name: undefined };
```

기본적으로 TypeScript는 위의 코드를 막지 않는다.  
하지만 "아직 할당이 안 된 것"과 "undefined로 할당한 것"은 의미가 다르다.  
위의 옵셔널은 "할당한다면 string"이지, "undefined도 할당 OK" 아니다.  
이를 엄격히 체크하려면 tsconfig.ts에서 exactOptionalPropertyTypes: true로 바꾼다.  

### 인터페이스 재선언

인터페이스는 재선언이 가능하다. 재선언을 할 경우 이전에 선언한 인터페이스와 '병합'이 일어난다.  
- 기존의 속성을 다른 타입으로 바꾸는 건 불가능
- 기존에 없던 속성을 적으면 추가됨

# 네임스페이스

이름이 겹치면 안 되는 인터페이스, 타입, 클래스, 특정한 값 등이 있다.  
그럴 때 네임스페이스를 쓴다.  


# 타입 호환성

명목적 서브타이핑과 구조적 서브타이핑(덕 타이핑)
TypeScript에서 객체 리터럴은 'fresh'하다고 판단.  
할당되어서 타입이 추론되거나, as 등으로 타입을 단언했을 경우엔 'fresh'를 상실함.  
즉, 객체 리터럴은 타입 검사를 꼼꼼하게 실시한다.

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성](https://toss.tech/article/typescript-type-compatibility)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
