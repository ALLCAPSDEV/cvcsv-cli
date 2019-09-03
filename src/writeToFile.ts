import { createObjectCsvWriter } from 'csv-writer';
import { CsvData } from './interfaces/CsvData';

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