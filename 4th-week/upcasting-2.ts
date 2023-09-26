// 😵‍💫 as는 총체적 난국을 부르기 쉽다...
type Animal = { kind: "cat"; meows: true } | { kind: "dog"; barks: true };
let p = { kind: "cat" } as Animal; //❗ meows를 안 적었는데도 통과된다!
upd();
if (p.kind === "dog") {
} else {
  p.meows; //❗ true로서 인식하지만 실제론 undefined다!
}
function upd() {
  if (Math.random() > 0.5) p = { kind: "dog", barks: true };
}
