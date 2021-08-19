const globby = (a: string, {}) => {
  if (a === "./") {
    return ["test/1.jpg", "files/2.png"];
  }
  return [`${a}testing/1.jpg`, `${a}another_dir/2.png`];
};

export { globby };
