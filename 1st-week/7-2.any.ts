const nums = [3, 1, 2, 5, 4] as const;

function hellSort(nums: any) {
  nums.sort();
}

hellSort(nums); // [1, 2, 3, 4, 5]

class Person {
  readonly name = "태현";
}
const person = new Person();

function hell(person: any) {
  person.name = "hahaha";
}

hell(person); // "hahaha"

//# 예제 3: any를 완전히 피할 수 없다면 케이스를 최대한 좁히고 exception을 대비.
export type User = { name: string };

const anonymization = (data: User): User => data;

const fetchData = async () => {
  const uri = "";
  const httpOptions: RequestInit = {};

  //# fetch API는 어떤 타입의 데이터가 올 지 모르므로 any로 추론.
  const randomData = await fetch(uri, httpOptions).then((res) => res.json());
  //@ 어떤 타입이 올 지 몇 가지는 예상되지만 전부 예상하기 어렵다면 케이스마다 작성.
  if (randomData satisfies User) {
    const anonymousUser = anonymization(randomData);
    return anonymousUser;
  } else {
  }
};
