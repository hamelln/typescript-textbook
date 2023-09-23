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
라이브러리는 이것저것 혼합해서 자유롭게 구현하지만, 프레임워크는 템플릿대로 하도록 강제성이 짙은 대신, 쓸 줄 알면 편리하다.  
추상 클래스는 프레임워크와 비슷하고, 인터페이스는 라이브러리와 비슷하다고 생각하면 된다.  
추상 클래스는 완성된 기능과 템플릿이 있기 때문에 구현 클래스에서 해야할 것들이 다들 비슷하다.  
반면에 인터페이스는 구현하는 측에서 할 것들이 제각각일 수 있다.  

# type narrowing(타입 좁히기)

타입 좁히기는 중요한데, 요청해서 가져오거나 이벤트 분기를 처리할 땐 여러 가지 경우의 수가 있기 때문이다.  

![type-narrowing-1](https://github.com/hamelln/typescript-textbook/assets/39308313/d2da5a46-95fc-4c07-ba98-9343586994cc)
![type-narrowing-2](https://github.com/hamelln/typescript-textbook/assets/39308313/02ba5734-4024-4952-8849-133859484b26)

# 참조

- [Dmitri Pavlutin(2023.03). TypeScript Function Overloading](https://dmitripavlutin.com/typescript-function-overloading/)
