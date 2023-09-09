//@ 심볼은 block level 단위로 중복이 있는지 체크한다.
//@ 다른 파일에서 author라는 심볼을 만들면 에러가 난다.
const author = Symbol("저자의 이름");

interface Person {
  [author]: string;
  author: string;
}

class Person implements Person {
  [author]: string;
  author: string;
  //! 매개변수 이름이 심볼 이름과 겹치면 Error.
  constructor(symbolAuthor: string, realAuthor: string) {
    this[author] = symbolAuthor;
    this.author = realAuthor;
  }

  print() {
    console.log(`저자의 심볼: ${this[author]}`);
    console.log(`저자의 이름: ${this.author}`);
  }
}

const zeroCho = new Person("제로초", "조현영");
zeroCho.print();
