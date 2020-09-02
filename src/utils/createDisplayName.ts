import { ConfigFileObj } from "../interfaces/ConfigObj";

export const createDisplayName = (
  path: string,
  fileName: string,
  config: ConfigFileObj
) => {
  if (typeof config.category === "number") {
    const newPath = path.split("/");
    newPath.splice(config.category as number, 1);
    path = newPath.join("/");
  }

  return path
    .replace(/\/|_/g, " ")
    .replace(fileName, "")
    .replace(/\w+/g, (word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .trim();
};
