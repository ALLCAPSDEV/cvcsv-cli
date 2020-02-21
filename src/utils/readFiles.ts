import globby from 'globby';

export const readFiles = async (dirPath?: string): Promise<string[]> => {
  const defaultPath = dirPath ? dirPath : './';
  const paths = await globby(defaultPath, {
    expandDirectories: {
      files: ['*'],
      extensions: ['jpg', 'jpeg', 'png']
    }
  });
  return paths;
};
