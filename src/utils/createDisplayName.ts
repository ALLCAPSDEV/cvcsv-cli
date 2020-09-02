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
  if (config.labels) {
    const newPath = path.split("/");
    const labels = Object.entries(config.labels).reduce<number[]>((acc, label) => {
      if (typeof label[1] === "number") acc.push(label[1])
      return acc;
    }, []).sort((a, b) => b - a)
    if (labels.length > 0) {
      labels.forEach((label) => newPath.splice(label, 1))
    }
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
