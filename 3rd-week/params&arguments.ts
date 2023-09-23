const arr = ["9", "10", "11"];

const nums1 = arr.map(parseInt);
console.log(nums1); // 9, NaN, 3

/**
 * map<U>(callback: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
 * 기본적으로 value, index, array 세 가지 매개변수를 가져와서 실행하는 함수.
 * 그러나 map을 쓸 때 세 가지를 전부 작성하는 경우는 많지 않다.
 * 콜백 함수에는 인자를 작성해도 되고, 작성 안 해도 실행된다.
 */

const nums2 = arr.map((e) => parseInt(e));
console.log(nums2); // 9, 10, 11
