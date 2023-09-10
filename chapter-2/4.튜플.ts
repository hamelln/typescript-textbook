type Tuple = [boolean, ...string[], number];

const nums: number[] = [1, 2, 3, 4, 5];
const tuple: Tuple = [true, "안녕하세요.", 0];
tuple.push(1);
tuple.push(true); // 에러가 안 난다.
