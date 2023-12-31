# 전제
$\textcolor{#ffffffc7}{\textsf{}}$
이 글에서 쓰는 몇몇 단어는 아래의 뜻을 의미한다.  

1️⃣ 객체: 보통은 객체, 배열, 클래스, 함수 등 원시 타입이 아닌 것들을 전부 말한다.  
2️⃣ 리터럴 타입: 값 그 자체가 타입. const n = 1의 타입은 number가 아닌, 1이다.  
3️⃣ 타이핑: 식별자에 타입을 명시하는 것. const n:number = 1의 타입은 number이다.  

# 1. 타이핑이란?

![image](https://user-images.githubusercontent.com/39308313/267523843-cae7aa92-2300-41c9-a737-64173f2f264f.png)

### 타이핑은 언제?

> $\textcolor{#ffffffc7}{\textsf{타입 추론이 부정확할 때 하고, 필요하면 추가한다.}}$

![1-infer](https://github.com/hamelln/typescript-textbook/assets/39308313/34ee7d79-7d08-400c-8e9c-72cd0859ba2e)

const 변수: 값이 고정됐기 때문에 리터럴로 추론.  
let, 객체: 값이나 속성이 변할 수 있어서 범용적으로 추론.  

# 2. 여러 타입들

### 튜플

각 index마다 타입을 지정한 배열 타입.  

![1-tuple](https://github.com/hamelln/typescript-textbook/assets/39308313/31a06043-8ee4-481b-ab3f-1a12f6898ea9)

### 유니온과 enum

enum이 유니온과 비슷한데 성능면에서 차이가 있다.  
트랜스파일링 때 유니온은 사라지고 enum은 객체로 변환돼 메모리에 남는다.(tree-shaking)  
const enum은 메모리에 안 남지만, TypeScript 문서에서는 reverse-mapping 같은 특이 케이스를 제외하곤 enum 사용을 지양한다고 서술한다.  

![union-enum](https://github.com/hamelln/typescript-textbook/assets/39308313/49f39cd4-f883-419f-9054-5a1089cca2db)

### any

어지간해선 금지해야 할 타입.   

![1-any](https://github.com/hamelln/typescript-textbook/assets/39308313/6e8c3e81-de7d-4c33-9071-294e9c6bc47d)

### unknown

![](https://user-images.githubusercontent.com/39308313/267523865-5c8f4365-f293-4170-a66f-daa6b4cd7a2e.png)

외부에 요청하는 것처럼 어떤 타입이 올지 확신이 없다면 써보자.  

![1-unknown](https://github.com/hamelln/typescript-textbook/assets/39308313/1f4f27db-6421-41b5-8f40-d18574cd72c2)

### void

![1-void](https://github.com/hamelln/typescript-textbook/assets/39308313/2739ea81-3fb9-42b2-bccd-2501846a2933)

### never

단어 뜻처럼, 절대로 발생할 일이 없는 경우에 작성하는 타입. 코드의 완전함을 나타낸다.

![1-never](https://github.com/hamelln/typescript-textbook/assets/39308313/dc3a17cf-dd67-4b40-99fc-7da89ee20637)

### {}

- Nullish가 아니면 전부 할당 가능.
- '빈 객체'를 가리키는 타입.
- 쓸 일은 없지만 볼 일은 가끔 있으니 알아만 두자.

# 3. 인터페이스

### 옵셔널과 undefined

![optional](https://github.com/hamelln/typescript-textbook/assets/39308313/60276aa3-d0ce-4fc5-9585-917b37460052)

옵셔널 속성에 값이 없을 때 조회하면 undefined가 나오는 것과 별개로, 개발자가 '일부러' undefined를 할당해도 되는지는 의문스럽다.  

✅ $\textcolor{#ffffffc7}{\textsf{할당한다면 string만 허용하자.}}$  
❌ $\textcolor{#ed322199}{\textsf{undefined을 할당해도 OK}}$  

`tsconfig.ts`에서 `exactOptionalPropertyTypes: true`로 설정하면 고의로 undefined를 할당하는 걸 금지한다.  

### 인터페이스 재선언

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

# 4. 타입 호환성

타이핑 방식은 여러 가지가 있고, 언어마다 타이핑 방식이 다르다. 지금은 두 가지만 보겠다.  
### 1️⃣ 명목적 타이핑(Nominal Typing)

Java 등의 언어가 사용하는 방식.
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

그러면 위의 사진은 현실 오리라고 공인된다.  
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

# 5. 타입 상속

![type-extends](https://github.com/hamelln/typescript-textbook/assets/39308313/a681f7b3-4787-47f4-9b3b-675e5f213fa8)

# 6. 제네릭

소프트웨어 개발자의 최대 관심사 중 하나는 "재사용성"이다.  
C#, Java 같은 정적 타입 언어들은 다양한 타입이 들어와도 유연하게 실행할 수 있도록 제네릭을 지원한다.  
타입스크립트의 제네릭도 그로부터 비롯했기 때문에 개념은 비슷하다.  
제네릭에는 기본값을 지정할 수 있다.
이는 JS에서 함수에 기본값을 지정하는 것과 매우 흡사하다.
제네릭은 아무 때나 쓰는 게 아니라 재사용과 추상화가 필요하고, 코드가 조금 복잡한 경우에 쓰는 게 좋다.  
단순한 경우에는 제네릭 없이 타입만 명시한다.

### 타입 제한

![constraint-1](https://github.com/hamelln/typescript-textbook/assets/39308313/acc754c2-57fa-4edf-a8be-188cf3659088)

### 조건부 타입과 타입 제한

![constraint-2](https://github.com/hamelln/typescript-textbook/assets/39308313/bf794727-edb7-4fe0-a6c8-58b9a24091f1)

### 에러 처리와 제네릭

에러는 수많은 원인과 속성이 있기 때문에 타입 단언을 못하고 unknown으로 추론한다.  
대비 가능한 에러 케이스는 작성해두는 게 좋은데, 각 케이스를 전부 개별적으로 작성하는 건 고된 일이다.  
이럴 때 제네릭을 쓰면 유용하다. 아래 예제 코드를 조금 훑어보면 작성하는 측에서 ErrorName만 신경쓰면 됨을 알 수 있다.  
그 ErrorName마저도 유니온으로 지정돼있기 때문에 타입스크립트에서 자동 완성을 제공해준다.  

![image](https://github.com/hamelln/typescript-textbook/assets/39308313/216b302f-5f58-409a-a6cc-9a80b65b6bb0)

### const parameters

TypeScript 5.0에 추가된 기능. 예제 코드를 보자.

![const-parameters](https://github.com/hamelln/typescript-textbook/assets/39308313/9fffcbba-bc3f-4303-af57-73e02d440202)

# 7. overloading

![overloading-1](https://github.com/hamelln/typescript-textbook/assets/39308313/b7af46b7-7de4-45ff-8c9c-995aeeef0865)
![overloading-2](https://github.com/hamelln/typescript-textbook/assets/39308313/7d8c74eb-df63-4128-be33-24a8deaadfd1)

쓸 일이 많지는 않을 듯하다.  

# 8. parameters & arguments

![params-args](https://github.com/hamelln/typescript-textbook/assets/39308313/1311448b-63d4-4072-91b2-acaaacbd9d95)

# 9. private vs \#

![private-privateField](https://github.com/hamelln/typescript-textbook/assets/39308313/7d5bb7df-4f24-4d33-9eef-cf9e188030a8)

# 10. interface vs abstract class

![abstract-interface](https://github.com/hamelln/typescript-textbook/assets/39308313/e82d493d-285d-45b2-939c-0f26d416074e)

흔히들 라이브러리 vs 프레임워크를 논할 때 제한과 자유도를 언급한다.  

라이브러리: 이것저것 혼합해서 자유로운 구현이 가능하고 하나의 절대적 규칙이 없음.  
프레임워크: 템플릿대로 하는 강제성이 있는 대신 익숙해지면 편리.  

추상 클래스를 프레임워크로, 인터페이스를 라이브러리라고 생각해보자.  

추상 클래스: 완성된 기능과 템플릿이 있고 하나만 상속하기 때문에 구현 클래스에서 해야할 것이 다들 비슷하다.  
인터페이스: 여러 인터페이스가 섞일 수 있고 구현하는 대상이 제각각일 수 있다.  

# 11. recursive type

![recursive-type](https://github.com/hamelln/typescript-textbook/assets/39308313/86a75181-9aac-4cd0-8848-0088b0a18316)

# 12. infer keyword

TypeScript는 자동 추론 기능이 있다.  
하지만 자동 추론만으로는 부족한 면이 있는데, 특정한 부분에서 타입을 추론해보라고 명시할 수 있다.  

![infer](https://github.com/hamelln/typescript-textbook/assets/39308313/101cb851-4645-467f-bd4c-9a3217708220)

infer는 extends와 같이 써야만 하고, 따로 쓸 수는 없다.

# 13. type narrowing(타입 좁히기)

타입 좁히기는 중요한데, 요청해서 가져오거나 이벤트 분기를 처리할 땐 여러 가지 경우의 수가 있기 때문이다.  

![image](https://github.com/hamelln/typescript-textbook/assets/39308313/5832d12e-af5f-4f4e-906e-f33d26f4eb87)
![type-narrowing-1](https://github.com/hamelln/typescript-textbook/assets/39308313/5f59a381-4b68-4130-8670-6d77550b9275)

# 14. template literal

![template-literal-1](https://github.com/hamelln/typescript-textbook/assets/39308313/7808433d-6a84-44cf-a134-1ef2195eec2e)

![template-literal-2](https://github.com/hamelln/typescript-textbook/assets/39308313/a15cd397-2884-4458-a294-5ac6d3bd5026)

# 15. satisfies

satisfies는 TypeScript 4.9에 추가된 흥미로운 문법이다.  
최초에는 '타입의 호환성이 적절한지 체크하기만 하는 연산자가 있으면 좋겠다'는 의도였지만, stage가 진행되며 여러 시나리오가 참작됐다.  
satisfies의 키워드 중 하나는 safe-upcasting이므로, upcasting이 무엇이고 왜 필요한지 간단하게 짚어보자.  

![satisfies-1](https://github.com/hamelln/typescript-textbook/assets/39308313/1b4926cf-430b-4d8d-a0be-ca1b12924a0b)

이처럼, 정적 타입 언어에서는 type-upcasting이 필요한 때가 은근히 있다.  
이런 문제를 해결하려면 서브 클래스(타입)을 슈퍼 클래스(타입)으로 업캐스팅해야 한다.  
그런데 TypeScript에서 업캐스팅하는 방법은 typing하거나 as밖에 없었다.

![satisfies-2](https://github.com/hamelln/typescript-textbook/assets/39308313/ce8689f3-4169-4b72-abc0-785a5f2c1aeb)

그러면 typing만이 유일한 희망일까?  
사실 typing에는 몇 가지 한계가 존재한다.  
코드를 통해 satisfies가 typing의 어떤 한계점들을 보완하고 유용한지 확인해보자.  

![satisfies-4](https://github.com/hamelln/typescript-textbook/assets/39308313/f02f5e26-0e15-44a4-a0c3-a41c20388c91)

다시금 요약하자면 아래와 같다.

1. 타입체크에 기반한 safe-upcasting
2. 타입체크에 기반한 safe-downcasting

이는 덕 타이핑처럼, 다형성을 구현하기 더 편리하도록 돕는다.  
이 외에도, 경우의 수 대비를 완벽하게 했는지, 타입 체크가 완벽한지 검증하는 용도 등으로도 쓸 수 있고 그 외에도 많은 가능성이 있다고 본다.  

# 참조

- 조현영(2023.08). **타입스크립트 교과서.** 길벗
- [TypeScript 공식](https://www.typescriptlang.org/)
- [김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성. toss tech](https://toss.tech/article/typescript-type-compatibility)
- [최수범(2022.09). satisfies: 안전한 업캐스팅을 통해 더 안전한 코드작성을 도와주는 새로운 키워드. AB180](https://engineering.ab180.co/stories/satisfies-safe-upcasting)
- [박서진(2021.05). Template Literal Types로 타입 안전하게 코딩하기. toss tech](https://toss.tech/article/template-literal-types)
- [캡틴판교. 제네릭 제약 조건.](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%98-%ED%95%9C-%EC%A4%84-%EC%A0%95%EC%9D%98%EC%99%80-%EC%98%88%EC%8B%9C)
- [멍개(2022.07). [typescript] 트리쉐이킹 - enum을 써야하는가?](https://blog.naver.com/pjt3591oo/222817775732)
- [나를 찾는 아이(2023.07). [typescript] optional 속성에 undefined를 할당할수 있을까?](https://trend21c.tistory.com/2332)
- [magnushiie(2016.03). Operator to ensure an expression is contextually typed by, and satisfies, some type #7481](https://github.com/microsoft/TypeScript/issues/7481)
- [RyanCavanaugh(2022.02). "satisfies" operator to ensure an expression matches some type (feedback reset) #47920](https://github.com/microsoft/TypeScript/issues/47920)
- [Jesse Hallett(2023.05). When to use never and unknown in TypeScript](https://blog.logrocket.com/when-to-use-never-unknown-typescript/)
- [Marius Schulz(2019.05). The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [Antonello Zanini(2022.08). How to extend the Express Request object in TypeScript](https://blog.logrocket.com/extend-express-request-object-typescript/)
- [Daniel Bartholomae(2021.01). 10 bad TypeScript habits to break this year](https://ui.toast.com/weekly-pick/ko_20210217)
- [Dmitri Pavlutin(2023.03). TypeScript Function Overloading](https://dmitripavlutin.com/typescript-function-overloading/)
- [ジェット(2023.01). [TypeScript] satisfies のつかいかた](https://www.pg-fl.jp/program/tips/ts_satisfies.htm)
- [ジェット(2023.01). [TypeScript] オブジェクトの型をより厳密に判定する](https://www.pg-fl.jp/program/tips/ts_narrowobject.htm)
