//? const라 해도 함수, 객체, 배열, 클래스 등의 '객체'는 let처럼 추론한다.
//? 객체는 가변적이고 재할당 없이 property를 수정 가능해서 정확히 추론하기 조심스러울 듯.
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
//! nums.sort(nums); 에러 발생

//! nums는 readonly로 추론되지만 함수가 any로 받으면 원본 객체 변경 가능
function sortFunc(nums: any) {
  nums.sort();
}

sortFunc(nums);
console.log(nums); // [1, 2, 3, 4, 5]

//@ typing과 같이 쓰면 좋은 것들: ES2023에 추가된 메소드
//? 원본을 안 바꾸고 새 객체를 반환해서 함수형 프로그래밍에 적합
const nums1 = [3, 1, 2, 5, 4];
const nums2 = nums1.toSorted(); // 새 배열 [1,2,3,4,5] 반환
const nums3 = nums1.with(2, 10).with(4, 20); // 새 배열 [3,1,10,5,20] 반환
const nums4 = nums1.toSpliced(1, 3, 6, 7, 8); // 새 배열 [3,4,6,7,8] 반환
