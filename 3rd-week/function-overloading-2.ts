/**
 * 오버로드: 케이스마다 함수 명세와 구현을 분리한다. (마치 인터페이스와 클래스처럼).
 * 핵심 1: 명세는 구현을 하지 않는다.
 * 핵심 2: 구현 함수는 케이스를 다 포함할 수 있도록 작성한다.
 * 핵심 3: "핵심 로직은 동일" & "params와 return의 타입만 다를 때" 사용한다.
 * 핵심 4: 오버로딩을 하기 전에는 유니온 타입 등, 다른 간단한 방법으로 해결되는지 먼저 체크.
 * */
function greet(person: string): string;
function greet(persons: string[]): string[];

/**
 * 구현 함수.
 * 여러 케이스가 들어올 수 있으므로 any, unknown, 유니온 타입 등으로 받아들인다.
 */
function greet(person: unknown): unknown {
  if (typeof person === "string") {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map((name) => `Hello, ${name}!`);
  }
  throw new Error("Unable to greet");
}
