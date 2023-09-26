const download = () => {
  return { name: "a", id: "id" };
};

// 속성이 부족할 뿐이라면 통과한다. 이것이 업캐스팅이다. 타입이 넓어졌다.
const obj = download() satisfies { name: string };

// ts1360 Error: 타입이 올바르지 않으면 에러를 낸다.
const obj2 = download() satisfies { name: number };

// ts1360 Error: 추가적인 속성을 검사하려고 하면 에러를 낸다.
const obj3 = download() satisfies { name?: string; iid: string };

// 결론: 실제로 있는 속성만 검사하되, 업캐스팅에 한해서는 허용한다.
