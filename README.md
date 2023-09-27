# 전제
$\textcolor{#ffffffc7}{\textsf{}}$
이 글에서 쓰는 몇몇 단어는 아래의 뜻을 의미한다.  

1️⃣ 객체: 보통은 객체, 배열, 클래스, 함수 등 원시 타입이 아닌 것들을 전부 말한다.  
2️⃣ 리터럴 타입: 값 그 자체가 타입. const n = 1의 타입은 number가 아닌, 1이다.  
타이핑: 식별자에 타입을 명시하는 것. const n:number = 1의 타입은 number이다.  

# 1. 타이핑이란?

![image](https://user-images.githubusercontent.com/39308313/267523843-cae7aa92-2300-41c9-a737-64173f2f264f.png)

# 2. 타이핑은 언제?

> $\textcolor{#ffffffc7}{\textsf{타입 추론이 부정확할 때 하고, 필요하면 추가한다.}}$

![1-infer](https://github.com/hamelln/typescript-textbook/assets/39308313/34ee7d79-7d08-400c-8e9c-72cd0859ba2e)

const 변수: 값이 고정됐기 때문에 리터럴로 추론.  
let, 객체: 값이나 속성이 변할 수 있어서 범용적으로 추론.  

# 3. 튜플

각 index마다 타입을 지정한 배열 타입.  

![1-tuple](https://github.com/hamelln/typescript-textbook/assets/39308313/31a06043-8ee4-481b-ab3f-1a12f6898ea9)

# 4. 유니온과 enum

enum이 유니온과 비슷한데 성능면에서 차이가 있다.  
트랜스파일링 때 유니온은 사라지고 enum은 객체로 변환돼 메모리에 남는다.(tree-shaking)  
const enum은 메모리에 안 남지만, TypeScript 문서에서는 reverse-mapping 같은 특이 케이스를 제외하곤 enum 사용을 지양한다고 서술한다.  

![union-enum](https://github.com/hamelln/typescript-textbook/assets/39308313/49f39cd4-f883-419f-9054-5a1089cca2db)

# 5. 그 외 타입

## any

어지간해선 금지해야 할 타입.   

![1-any](https://github.com/hamelln/typescript-textbook/assets/39308313/6e8c3e81-de7d-4c33-9071-294e9c6bc47d)

## unknown

![](https://user-images.githubusercontent.com/39308313/267523865-5c8f4365-f293-4170-a66f-daa6b4cd7a2e.png)

외부에 요청하는 것처럼 어떤 타입이 올지 확신이 없다면 써보자.  

![1-unknown](https://github.com/hamelln/typescript-textbook/assets/39308313/1f4f27db-6421-41b5-8f40-d18574cd72c2)

## void

![1-void](https://github.com/hamelln/typescript-textbook/assets/39308313/2739ea81-3fb9-42b2-bccd-2501846a2933)

## never

단어 뜻처럼, 절대로 발생할 일이 없는 경우에 작성하는 타입. 코드의 완전함을 나타낸다.

![1-never](https://github.com/hamelln/typescript-textbook/assets/39308313/dc3a17cf-dd67-4b40-99fc-7da89ee20637)

## {}

- Nullish가 아니면 전부 할당 가능.
- '빈 객체'를 가리키는 타입.
- 쓸 일은 없지만 볼 일은 가끔 있으니 알아만 두자.

# 7. 인터페이스

## 옵셔널과 undefined

![optional](https://github.com/hamelln/typescript-textbook/assets/39308313/60276aa3-d0ce-4fc5-9585-917b37460052)

옵셔널 속성에 값이 없을 때 조회하면 undefined가 나오는 것과 별개로, 개발자가 '일부러' undefined를 할당해도 되는지는 의문스럽다.  

✅ $\textcolor{#ffffffc7}{\textsf{할당한다면 string만 허용하자.}}$  
❌ $\textcolor{#ed322199}{\textsf{undefined을 할당해도 OK}}$  

`tsconfig.ts`에서 `exactOptionalPropertyTypes: true`로 설정하면 고의로 undefined를 할당하는 게 금지된다.

## 인터페이스 재선언

인터페이스는 **재선언**이 가능하다. 아래 조건을 만족하면 원래의 인터페이스와 **병합**이 일어난다.

1️⃣ 기존 속성의 타입을 바꾸는 건 불가능  
2️⃣ 기존에 없던 속성과 타입 추가 가능   
3️⃣ **다른 모듈에서 import한 인터페이스는 병합 불가능**  

아래와 같이 인터페이스를 **같은 스코프**에서 작성하면 병합된다. 

![interface-merging-0](https://github.com/hamelln/typescript-textbook/assets/39308313/9273b7d0-aad5-4c2a-8599-81d206e49feb)

> $\textcolor{#ffffffc7}{\textsf{“굳이?”}}$

굳이 이렇게 병합을 지원하는 건 다른 이유 때문이다.  

![interface-merging](https://github.com/hamelln/typescript-textbook/assets/39308313/a820aa90-2720-4732-beab-7aa5822f2c1d)

API 타입을 지정할 때 유용하다.  

# 8. 타입 호환성

타이핑은 여러 종류가 있는데 지금은 두 가지만 보겠다.  
### 1️⃣ 명목적 타이핑(Nominal Typing)

![1-nominal-typing](https://github.com/hamelln/typescript-textbook/assets/39308313/21d66e5f-a325-45d1-aa04-86c0597ba60b)

### 2️⃣ 구조적 타이핑(Structure Typing)  

![1-duck-typing](https://github.com/hamelln/typescript-textbook/assets/39308313/f141dd37-9dba-4ed0-a54e-6e955dc897cf)

**타입스크립트가 택한 방식. 최소한의 구조만 같으면 동일.**  
구조적 타이핑은 덕 타이핑이라고 부르기도 한다. 

Q) **“오리란 무엇인가?”**  
만약 동물 협회에서 아래 두 조건만 갖추면 오리로 정의했다고 치자.  

1. 딱 봐도 오리 같은 부리를 가졌다.
2. 딱 봐도 오리 같은 눈을 가졌다.

![rp0g39w789nqe8uzge8p](https://github.com/hamelln/typescript-textbook/assets/39308313/1b280fe5-0bc6-4c4c-bd15-2b34dd8baeaa)

그러면 위의 사진은 진짜 오리라고 공인된다.  
이런 논리로 타입을 맞추는 게 구조적 타이핑이다.  
코드로 확인해보자.  

![type-compatibility-0](https://github.com/hamelln/typescript-textbook/assets/39308313/19f1a3bb-acf8-436a-bd53-937409660fb0)

객체 지향 프로그래밍 관점으로 보자면 구조적 타이핑은 다형성을 허용한다.  
음식이라는 조건만 맞으면 버거든 뭐든 유연하게 처리한다.  
이 유연성은 항상 적용되진 않는다. 특별 케이스가 하나 있다.  

### 객체 리터럴: 엄격하게 검사

TypeScript는 객체 리터럴을 $\textcolor{#3498DB}{\textsf{fresh한 객체}}$라고 분류하고 **구조가 100% 일치**하는지 체크한다. 즉, 속성이 부족해도 안 되고, 넘쳐나도 안 된다.  
**이미 변수에 담겼거나 as로 타입을 단언했다면 $\textcolor{#3498DB}{\textsf{freshness}}$를 잃었기 때문에 잉여 속성을 허용한 채 체크한다.**  
아래 예제를 통해 알아보자.

![object-literal](https://github.com/hamelln/typescript-textbook/assets/39308313/82479a2b-cae1-4ad8-9c9e-51e7019c7332)

### 브랜딩 기법

잉여 속성이 들어오는 걸 원천 차단하고 싶다면 **브랜딩 기법**을 활용한다.  

![branding-type](https://github.com/hamelln/typescript-textbook/assets/39308313/5a0339b3-b04e-4f1a-8e3a-f06e7ebbf101)

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

# satisfies

TS 4.9에 도입된 문법 satisfies는 특이하면서도 강력한데, 조금 길어서 별도의 문서로 분리한다.  
https://github.com/hamelln/typescript-textbook/blob/main/4th-week/SATISFIES.md

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [TypeScript 공식](https://www.typescriptlang.org/)
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성. toss tech](https://toss.tech/article/typescript-type-compatibility)
- [최수범(2022.09). satisfies: 안전한 업캐스팅을 통해 더 안전한 코드작성을 도와주는 새로운 키워드. AB180](https://engineering.ab180.co/stories/satisfies-safe-upcasting)
- [박서진(2021.05). Template Literal Types로 타입 안전하게 코딩하기. toss tech](https://toss.tech/article/template-literal-types)
- [Daniel Bartholomae(2021.01). 10 bad TypeScript habits to break this year](https://ui.toast.com/weekly-pick/ko_20210217)
- [캡틴판교. 제네릭 제약 조건.](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%98-%ED%95%9C-%EC%A4%84-%EC%A0%95%EC%9D%98%EC%99%80-%EC%98%88%EC%8B%9C)
- [멍개(2022.07). [typescript] 트리쉐이킹 - enum을 써야하는가?](https://blog.naver.com/pjt3591oo/222817775732)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
- [magnushiie(2016.03). Operator to ensure an expression is contextually typed by, and satisfies, some type #7481](https://github.com/microsoft/TypeScript/issues/7481)
- [RyanCavanaugh(2022.02). "satisfies" operator to ensure an expression matches some type (feedback reset) #47920](https://github.com/microsoft/TypeScript/issues/47920)
- [Jesse Hallett(2023.05). When to use never and unknown in TypeScript](https://blog.logrocket.com/when-to-use-never-unknown-typescript/)
- [Marius Schulz(2019.05). The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [Antonello Zanini(2022.08). How to extend the Express Request object in TypeScript](https://blog.logrocket.com/extend-express-request-object-typescript/)
- [ジェット(2023.01). [TypeScript] satisfies のつかいかた](https://www.pg-fl.jp/program/tips/ts_satisfies.htm)
- [ジェット(2023.01). [TypeScript] オブジェクトの型をより厳密に判定する](https://www.pg-fl.jp/program/tips/ts_narrowobject.htm)
