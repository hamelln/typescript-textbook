export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
const day: Day = "monday"; // 에러

type FormEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | MouseClick;
const handleFormData = (e: FormEvent) => {
  if ("name" in e.target && "value" in e.target) {
    const key = e.target.name;
    const value = e.target.value;
    if (typeof key === "string" && typeof value === "string") {
      switch (key) {
        case "breweryDescription":
          if (e.target instanceof HTMLTextAreaElement) {
            handleResizeTextarea(e.target);
            handleForm(key, value);
          }
          break;
        // ...
      }
    }
  }
};
// @ts-nocheck
const randomData = await fetch(uri, httpOptions).then((res) => res.json());
if (randomData satisfies User) {
  const anonymousUser = this.anonymization(randomData);
  return anonymousUser;
} else {
  // ...
}
