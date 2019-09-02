import path from 'path';
import { readFiles } from './readFiles';

export const buildData = async (bucketName: string, dirPath?: string) => {
  const defaultPath = dirPath ? dirPath : './';
  const paths = await readFiles(defaultPath);
  const fileData: any[] = [];
  paths.forEach((str) => {
    const fileName = path.basename(str);
    const dirName = path.dirname(str);
    const gsPath = str.replace(defaultPath, '');
    const displayName = gsPath.replace(/\/|_/g, ' ').replace(fileName, '').replace(/\w+/g, word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    const productId = displayName.replace(/\s/g, '').toUpperCase();
    const bucketUri = `gs://${bucketName}/images/${gsPath}`;
    fileData.push({
      fileName,
      dirName,
      fullPath: str,
      "image-uri": bucketUri,
      productId,
      displayName,
    });
  });

  return fileData;
}
