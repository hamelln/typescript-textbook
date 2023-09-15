# 타입 호환성

명목적 서브타이핑과 구조적 서브타이핑(덕 타이핑)
TypeScript에서 객체 리터럴은 'fresh'하다고 판단.  
할당되어서 타입이 추론되거나, as 등으로 타입을 단언했을 경우엔 'fresh'를 상실함.  
즉, 객체 리터럴은 타입 검사를 꼼꼼하게 실시한다.

# 참조

[김병묵(2022.10). TypeScript 타입 시스템 뜯어보기: 타입 호환성](https://toss.tech/article/typescript-type-compatibility)
