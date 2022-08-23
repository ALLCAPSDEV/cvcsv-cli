import fg from "fast-glob";

export const readFiles = async (dirPath?: string) => {
  const defaultPath = dirPath ? dirPath : "./";
  const paths = await fg(`${defaultPath}**/*.{jpg,jpeg,png}`);
  return paths;
};
