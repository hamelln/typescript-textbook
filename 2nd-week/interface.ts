import Hyun from "./namespace";

interface Brewery {
  id: string; // "," ";" 사용 가능. 프로젝트 당 하나로 통일해서 사용하자.
}

interface Brewery {
  name?: string;
}

const brewery: Brewery = {
  id: "아이디",
};

//? optional 속성은 할당된 게 없을 땐 undefined로 입력된다.
console.log(brewery.name); // undefined
//? interface에 안 적어둔 속성은 조회 자체가 불가능하고 에러 발생
console.log(brewery.description); // Error

interface Add {
  (x: number, y: number): number;
}

const calc: Add = (x, y) => x + y;

class User implements Hyun.User {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
