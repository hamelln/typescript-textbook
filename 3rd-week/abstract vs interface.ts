/**
 * interface는 클래스 전용이 아니라서 private 같은 속성을 못 쓴다.
 * readonly같은 건 가능.
 */
interface Movable {
  move(): void;
}

class Car implements Movable {
  move() {
    console.log("자동차가 달립니다.");
  }
}

class Airplane implements Movable {
  move() {
    console.log("비행기는 날아갑니다.");
  }
}

/**
 * 추상 클래스: 반만 완성한 클래스라고 생각하자.
 * 자식 클래스는 공통으로 제공된 요소를 이용하되 자체적인 구현을 추가해서 완성한다.
 */
abstract class Human {
  private name: string;
  nation: string;
  countryCode: string;
  internationalNumber: string;
  constructor(name: string, nation: string) {
    this.nation = nation;
    this.name = name;
    this.countryCode = this.#findCountryCode(nation);
    this.internationalNumber = this.#findInternationalNumber(nation);
  }
  #findCountryCode(nation: string) {
    return "KR";
  }
  #findInternationalNumber(nation: string) {
    return "82";
  }
  // 인사법은 자식 클래스에서 작성한다.
  abstract greet(): void;
}

class Member extends Human {
  id: string;
  constructor(name: string, nation: string) {
    super(name, nation);
    this.id = "id";
  }

  greet(): void {
    console.log("안녕하세요.");
  }
}
