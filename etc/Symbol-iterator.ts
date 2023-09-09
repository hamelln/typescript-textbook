let iterableObject = {
  values: [1, 2, 3],

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.values.length) {
          return { value: this.values[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let value of iterableObject) {
  console.log(value);
}
