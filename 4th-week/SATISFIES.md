# satisfies

TypeScript 4.9에 추가된 새로운 문법으로서, satisfies는 상당히 흥미로운 문법이다.  

satisfies는 어떤 이유로 제안됐을까? 이를 이해하기 위해 Type upcasting을 먼저 알아보자.

![satisfies-1](https://github.com/hamelln/typescript-textbook/assets/39308313/1b4926cf-430b-4d8d-a0be-ca1b12924a0b)

이처럼, 정적 타입 언어에서는 Type을 upcasting해야 하는 상황이 은근히 있다.  
심지어 Java같은 경우, `Animal[]` 타입을 선언하면 [Dog, Cat] 같은 자식 클래스들을 집어넣어도 타입 에러가 발생한다. (TypeScript는 안 그런다.)  
어쨌든, 이런 문제를 해결하려면 서브 클래스(타입)을 슈퍼 클래스(타입)으로 업캐스팅해야 한다.  
그런데 TypeScript에서 업캐스팅하는 방법은 typing을 하거나 as를 쓰는 수밖에 없다.  

![satisfies-2](https://github.com/hamelln/typescript-textbook/assets/39308313/ce8689f3-4169-4b72-abc0-785a5f2c1aeb)

as는 영 좋지 않다. 그러면 typing만이 유일한 희망이 된다. 그러면 typing만 잘하면 만사해결일까?  
upcasting이라는 관점 말고도, typing에는 한계점이 몇 가지 존재한다. 아래 코드를 보자.  

![satisfies-3](https://github.com/hamelln/typescript-textbook/assets/39308313/e0ec27c7-802d-4a15-981a-3194c23a4952)

satisfies는 이런 복잡한 업캐스팅, 다운캐스팅, 타입 체크 문제를 해소하는 문법이다. 위에 제시됐던 문제를 해결하는 모습을 보자.  

![satisfies-4](https://github.com/hamelln/typescript-textbook/assets/39308313/efb55e1c-8269-4c00-99a2-6c65dacccdad)

# 참조
- [TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
- [magnushiie(2016.03). Operator to ensure an expression is contextually typed by, and satisfies, some type #7481](https://github.com/microsoft/TypeScript/issues/7481)
- [RyanCavanaugh(2022.02). "satisfies" operator to ensure an expression matches some type (feedback reset) #47920](https://github.com/microsoft/TypeScript/issues/47920)
- [최수범(2022.09). satisfies: 안전한 업캐스팅을 통해 더 안전한 코드작성을 도와주는 새로운 키워드(TypeScript 4.9)](https://engineering.ab180.co/stories/satisfies-safe-upcasting)
- [ジェット(2023.01). [TypeScript] satisfies のつかいかた](https://www.pg-fl.jp/program/tips/ts_satisfies.htm)
- [ジェット(2023.01). [TypeScript] オブジェクトの型をより厳密に判定する](https://www.pg-fl.jp/program/tips/ts_narrowobject.htm)
