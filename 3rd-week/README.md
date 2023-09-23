# overloading & overriding

![overloading-1](https://github.com/hamelln/typescript-textbook/assets/39308313/a7df4c84-77f9-4952-8351-57edcd551f49)
![overloading-2](https://github.com/hamelln/typescript-textbook/assets/39308313/f0183532-bd07-410e-bd36-925daec630b7)

쓸 일이 많지는 않을 듯하다.  

# parameters & arguments

![params-args](https://github.com/hamelln/typescript-textbook/assets/39308313/f81fde11-526e-4bfe-8f1a-6de69b78664a)

# private vs \#

![private](https://github.com/hamelln/typescript-textbook/assets/39308313/dcc018ca-f29f-42a4-a5c7-c5df215b1f77)

# interface vs abstract class

흔히들 라이브러리 vs 프레임워크를 논할 때 제한과 자유도를 언급한다.  

라이브러리: 이것저것 혼합해서 자유로운 구현이 가능하고 하나의 절대적 규칙이 없음.  
프레임워크: 템플릿대로 하는 강제성이 있는 대신 익숙해지면 편리.  

추상 클래스를 프레임워크로, 인터페이스를 라이브러리라고 생각해보자.  

추상 클래스: 완성된 기능과 템플릿이 있고 하나만 상속하기 때문에 구현 클래스에서 해야할 것이 다들 비슷하다.  
인터페이스: 여러 인터페이스가 섞일 수 있고 구현하는 대상이 제각각일 수 있다.  

# type narrowing(타입 좁히기)

타입 좁히기는 중요한데, 요청해서 가져오거나 이벤트 분기를 처리할 땐 여러 가지 경우의 수가 있기 때문이다.  

![type-narrowing-1](https://github.com/hamelln/typescript-textbook/assets/39308313/d2da5a46-95fc-4c07-ba98-9343586994cc)
![type-narrowing-2](https://github.com/hamelln/typescript-textbook/assets/39308313/02ba5734-4024-4952-8849-133859484b26)

# 참조

- [Dmitri Pavlutin(2023.03). TypeScript Function Overloading](https://dmitripavlutin.com/typescript-function-overloading/)
