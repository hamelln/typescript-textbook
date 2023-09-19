type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);
  if (item === null) {
    return { success: false, error: new Error(`"${key}"를 못 찾음`) };
  }

  let value: unknown;
  try {
    value = JSON.parse(item);
  } catch (error) {
    return { success: false, error: new Error(`JSON 평가 실패`) };
  }
  return { success: true, value };
}

const result = tryDeserializeLocalStorageItem("dark_mode");

if (result.success) {
  const darkModeEnabled: unknown = result.value;
  if (typeof darkModeEnabled === "boolean") {
  }
} else {
  console.error(result.error);
}
