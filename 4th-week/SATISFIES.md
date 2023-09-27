# satisfies

satisfies는 TypeScript 4.9에 추가된 흥미로운 문법이다.  
어떤 이유로 제안됐을까?  
최초에는 '타입의 호환성이 적절한지 체크하기만 하는 연산자가 있으면 좋겠다'는 의도였지만, 제안서의 stage가 진행됨에 따라 여러 시나리오가 참작됐다.  
우선 Type upcasting을 알아보자.

![satisfies-1](https://github.com/hamelln/typescript-textbook/assets/39308313/1b4926cf-430b-4d8d-a0be-ca1b12924a0b)

이처럼, 정적 타입 언어에서는 Type을 upcasting해야 하는 상황이 은근히 있다.  
심지어 Java같은 경우, `Animal[]` 타입을 선언하면 [Dog, Cat] 같은 자식 클래스들을 집어넣으면 타입 에러가 발생한다. (TypeScript는 안 그런다.)  
어쨌든, 이런 문제를 해결하려면 서브 클래스(타입)을 슈퍼 클래스(타입)으로 업캐스팅해야 한다.  
그런데 TypeScript에서 업캐스팅하는 방법은 typing을 하거나 as를 쓰는 수밖에 없다.  

![satisfies-2](https://github.com/hamelln/typescript-textbook/assets/39308313/ce8689f3-4169-4b72-abc0-785a5f2c1aeb)

as는 영 좋지 않다. 그러면 typing만이 유일한 희망이 된다. 그러면 typing만 잘하면 만사해결일까?  
upcasting이라는 관점 말고도, typing에는 한계점이 몇 가지 존재한다. 아래 코드에서 문제점과, satisfies가 해결하는 모습들을 보자.  

![satisfies-4](https://github.com/hamelln/typescript-textbook/assets/39308313/f02f5e26-0e15-44a4-a0c3-a41c20388c91)

다시금 요약하자면 아래와 같다.

1. 타입체크에 기반한 safe-upcasting
2. 타입체크에 기반한 safe-downcasting

이는 덕 타이핑처럼, 다형성을 구현하기 더 편리하도록 돕는다.  
이 외에도, 경우의 수 대비를 완벽하게 했는지, 타입 체크가 완벽한지 검증하는 용도 등으로도 쓸 수 있고 그 외에도 많은 가능성이 있다고 본다.  

# 참조
- [TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
- [magnushiie(2016.03). Operator to ensure an expression is contextually typed by, and satisfies, some type #7481](https://github.com/microsoft/TypeScript/issues/7481)
- [RyanCavanaugh(2022.02). "satisfies" operator to ensure an expression matches some type (feedback reset) #47920](https://github.com/microsoft/TypeScript/issues/47920)
- [최수범(2022.09). satisfies: 안전한 업캐스팅을 통해 더 안전한 코드작성을 도와주는 새로운 키워드(TypeScript 4.9)](https://engineering.ab180.co/stories/satisfies-safe-upcasting)
- [ジェット(2023.01). [TypeScript] satisfies のつかいかた](https://www.pg-fl.jp/program/tips/ts_satisfies.htm)
- [ジェット(2023.01). [TypeScript] オブジェクトの型をより厳密に判定する](https://www.pg-fl.jp/program/tips/ts_narrowobject.htm)
