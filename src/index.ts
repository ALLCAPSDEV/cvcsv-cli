import { createObjectCsvWriter } from 'csv-writer';
import globby from 'globby';

export interface CsvData {
  'image-uri': string;
  'image-id'?: string;
  'product-set-id': string;
  'product-id': string;
  'product-category': string;
  'product-display-name'?: string;
  labels?: string;
  'bounding-poly'?: string;
}

export const writeToFile = async (data: CsvData[], path: string) => {
  const writer = createObjectCsvWriter({
    path,
    header: [
      'image-uri', 
      'image-id',
      'product-set-id',
      'product-id',
      'product-category',
      'product-display-name',
      'labels',
      'bounding-poly',
    ]
  })
  try {
    await writer.writeRecords(data);
    return true;
  } catch (err) {
    throw new Error(err)
  }
}

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

