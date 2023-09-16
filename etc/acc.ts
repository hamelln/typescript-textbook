// type User = {
//   name: string | Record<string, string>;
// };

// const user: User = {
//   name: "test",
// };

// user.name.split(""); // error!

type User = {
  name: string | Record<string, string>;
};

const user = {
  name: "test",
} satisfies User;

user.name.split(""); // working!
