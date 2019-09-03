import path from 'path';
import { readFiles } from './readFiles';
import { CsvData } from './interfaces/CsvData';
import { ProductCategories } from './interfaces/CLI';

export const buildData = async (bucketName: string, dirPath: string, productCategory: ProductCategories, productSetId: string) => {
  const paths = await readFiles(dirPath);
  const fileData: CsvData[] = [];
  paths.forEach((str) => {
    const fileName = path.basename(str);
    const gsPath = str.replace(dirPath, '');
    const displayName = gsPath.replace(/\/|_/g, ' ').replace(fileName, '').replace(/\w+/g, word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    const productId = displayName.replace(/\s/g, '').toUpperCase();
    const bucketUri = `gs://${bucketName}/images/${gsPath}`;
    fileData.push({
      "image-uri": bucketUri,
      "product-id": productId,
      "product-display-name": displayName,
      "product-category": productCategory,
      "product-set-id": productSetId,
    });
  });
  return fileData;
}