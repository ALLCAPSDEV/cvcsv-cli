export const createDisplayName = (
  path: string,
  fileName: string,
  catNum: number | boolean
) => {
  if (catNum) {
    const newPath = path.split("/");
    newPath.splice(catNum as number, 1);
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
