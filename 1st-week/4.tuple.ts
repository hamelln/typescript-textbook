//❗ 튜플 타입을 그냥 선언하면 쉽게 무너진다.
type WeakTuple = [number, string, boolean];
const tuple1: WeakTuple = [1, "안녕하세요.", true];
tuple1.push(2); // [1, "안녕하세요.", true, 2];

//❗ readonly를 붙여야 의도한 형태를 유지한다.
type StrongTuple = readonly [number, string, boolean];
const tuple2: StrongTuple = [1, "안녕하세요.", true];
const any: any = 2;
tuple2.push(any);

//❓ REST 문법도 가능하며, 사용법은 동일하다.
type RestTuple = readonly [number, ...string[], boolean];
const tuple3: RestTuple = [1, "안녕하세요.", true];
const tuple4: RestTuple = [1, "a", "b", "c", false];
