//@ 옆에 달린 주석들은 타입스크립트가 추론한 해당 식별자의 타입이다

const author = Symbol.for("author");

//? const는 타입 추론을 구체적으로, let은 느슨하게 한다.
let k1 = null; // any
const k2 = null; // null

let v1 = undefined; // any
const v2 = undefined; // undefined

let hello1 = "hello"; // string
const hello2 = "hello"; // "hello"

let sym1 = Symbol("현"); // symbol
const sym2: unique symbol = Symbol("현"); // typeof sym2
const sym3 = Symbol("현");

const any: {} = {}; // nullish를 제외한 모든 타입

//? JS -> TS 마이그레이션 중 에러 발생 시 임시 방편
// @ts-expect-error
console.log(sym2 === sym3);
