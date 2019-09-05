import globby from 'globby';
import { Logger } from './utils/logger';

export const readFiles = async (dirPath?: string) => {
  const defaultPath = dirPath ? dirPath : './';
  const paths = await globby(defaultPath, {
    expandDirectories: {
      files: ['*'],
      extensions: ['jpg', 'jpeg', 'png']
    }
  });
  return paths;
}