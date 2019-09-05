import path from 'path';
import { readFiles } from './readFiles';
import { CsvData } from './interfaces/CsvData';
import { ProductCategories } from './interfaces/CLI';
import { Logger } from './utils/logger';

export const buildData = async (bucketName: string, dirPath: string, productCategory: ProductCategories, productSetId: string, logger?: Logger) => {
  const paths = await readFiles(dirPath);
  if (paths.length < 1 && logger) return logger.error("No suitable images found in the directory you provided");
  const fileData: CsvData[] = [];
  paths.forEach((str) => {
    const fileName = path.basename(str);
    const gsPath = str.replace(dirPath, '');
    const displayName = gsPath.replace(/\/|_/g, ' ').replace(fileName, '').replace(/\w+/g, word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).trim();
    const productId = displayName.replace(/\s/g, '').toUpperCase();
    const bucketUri = `gs://${bucketName}/images/${gsPath}`;
    const labels = gsPath.replace(fileName, '').split(/\//).filter(word => word !== '').map(word => `tag=${word}`).toString(); 
    fileData.push({
      "image-uri": bucketUri,
      "product-id": productId,
      "product-display-name": displayName,
      "product-category": productCategory,
      "product-set-id": productSetId,
      labels
    });
  });
  return fileData;
}
