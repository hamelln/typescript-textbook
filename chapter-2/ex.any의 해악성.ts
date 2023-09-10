type Person = {
  readonly name: string;
};

const person: Person = {
  name: "태현",
};

function hell(person: any) {
  person.name = "hahaha";
}

hell(person);
console.log(person.name); // "hahaha"
