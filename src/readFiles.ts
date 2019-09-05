import globby from 'globby';
import fs from 'fs';
import { Logger } from './utils/logger';

export const readFiles = async (dirPath?: string) => {
  const defaultPath = dirPath ? dirPath : './';
  if (process.env.NODE_ENV !== 'test') {
    fs.access(defaultPath, err => {
      if (err && err.code === 'ENOENT') {
        const logger = new Logger;
        logger.error("Directory doesn't exist");
      }
    })
  }
  const paths = await globby(defaultPath, {
    expandDirectories: {
      files: ['*'],
      extensions: ['jpg', 'jpeg', 'png']
    }
  });
  return paths;
}
