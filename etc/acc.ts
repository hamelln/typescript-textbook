type User = {
  name: string | Record<string, string>;
};

const user: User = {
  name: "test",
};

user.name.split(""); // error!
