const arr = ["9", "10", "11"];

const nums1 = arr.map(parseInt);
console.log(nums1); //❗ 9, NaN, 3

//🔖 arr.map(parseInt)는 아래처럼 실행된다.
arr.map((element, index, array) => {
  //❗ parseInt의 두 번째 인자는 n진법으로 적용한다.
  return parseInt(element, index, array);
});

/**
 * map<U>(callback: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
 * 명세에 따르면 콜백 함수는 value, index, array 세 가지 인자를 가져와서 실행해야 한다.
 * 하지만 value만 써도 정상 작동한다.
 * 📒 타입이 어긋나는 건 Error, 하지만 인자를 안 쓰거나, 덜 쓰는 건 괜찮다.
 */

const nums2 = arr.map((e) => parseInt(e));
console.log(nums2); // 9, 10, 11
