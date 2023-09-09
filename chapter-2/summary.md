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
추론이 어떻게 일어나는지 이해하면 언제 쓸 지 기준을 정하기도 쉬울 것이다.  
참고: 타입 추론은 코드 실행 전에 하는 것이라 VSCode 같은 IDE로만 볼 수 있다.

### let은 const보다 느슨하게 추론한다

let은 값이 재할당될 것으로 전제하는 식별자다. 그래서 타입을 넓게 추론한다.

```
// 옆에 달린 주석들은 타입스크립트가 추론한 해당 식별자의 타입이다

let k1 = null; // any
const k2 = null; // null

let v1 = undefined; // any
const v2 = undefined; // undefined

let hello1 = "hello"; // string
const hello2 = "hello"; // "hello"

let sym1 = Symbol.for("현"); // symbol
const sym2 = Symbol.for("현"); // typeof sym2
const sym3 = Symbol.for("현");

// @ts-expect-error
console.log(sym2 === sym3); // 주석을 지우면 에러 발생함

```

# 2.3 const의 타입 추론은 원시 타입에서만 정확하다

원시 타입에 한해서라면 const의 타입 추론은 정확하다. 다만 JS는 대부분이 객체다.  
객체는 재할당 없이 내부 값을 바꿀 수 있다. 그래서 객체 타입 추론은 느슨하다.

```
//? const라 해도 함수, 객체, 배열, 클래스 등의 '객체'는 타입 추론이 let과 흡사하게 느슨하다.
//? 객체는 가변성이라 재할당 없이 property값을 수정 가능하기에 정확히 추론하면 에러가 빈번할 듯.
const user1 = {
  name: "John", // name: string
  age: 30, // age: number
};

//@ 객체 property들도 리터럴 타입으로 지정하고 싶으면 as const 접미사를 붙인다.
const user2 = {
  name: "John", // name: "John"
  age: 30, // age: 30
} as const; // readonly로 추론

const nums = [3, 1, 2, 5, 4] as const;
// nums.sort(nums); 에러 발생

//! readonly로 추론하더라도 any로서 받아들이면 수정할 수 있다.
//! 함수를 실행했을 뿐인데 발생하는 side effect
//@ 따라서 함수에서도 typing을 정확히 해야 좋음.
function sortFunc(nums: any) {
  nums.sort();
}

sortFunc(nums);
console.log(nums); // [1, 2, 3, 4, 5]

//@ typing과 같이 쓰면 좋을 ES2023 메소드
//? 인자를 안 바꾸고 새로운 배열을 반환한다는 점에서 함수형 프로그래밍과 궁합이 좋음
const nums1 = [3, 1, 2, 5, 4];
const nums2 = nums1.toSorted(); // 새 배열 [1, 2, 3, 4, 5] 반환
const nums3 = nums1.with(2, 10).with(4, 20); // 새 배열 [3, 1, 10, 5, 20] 반환
const nums4 = nums1.toSpliced(1, 3); // 새 배열 [3, 4] 반환
const nums5 = nums1.toSpliced(1, 3, 6, 7, 8); // 새 배열 [3, 4, 6, 7, 8] 반환
```

### JS -> TS로 바꿀 때

잘 실행되던 코드가 타입을 입력했더니 에러가 나는 경우는 흔하다.
임시방편으로 에러 코드 위에 // @ts-expect-error 주석을 달면 된다.
최종적으론 주석 없이 마이그레이션을 마치도록 한다.
