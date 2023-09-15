//@ type은 "&"를 써서 상속받고 interface는 "extends"를 써서 상속받는다.
type Animal = { name: string };

interface Dog extends Animal {
  bark(): void;
}

const dog: Dog = {
  name: "탱",
  bark() {
    console.log("멍멍");
  },
};

interface Person {
  name: string;
}

type ProgramMajor = "frontend" | "backend" | "design" | "architect" | "devops";
type DesignMajor = "web" | "UI" | "game" | "colorist" | "graphic";
type Worker = Person & { major: string };
interface Programmer extends Worker {
  major: ProgramMajor;
}
type Designer = Worker & { major: number }; // 에러는 안 띄우고 never로 처리함.

const programmer: Programmer = {
  name: "이태현",
  major: "frontend",
};
