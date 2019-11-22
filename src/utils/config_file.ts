import * as fs from 'fs';
import path from 'path';
import {
  directoryQuestion,
  filenameQuestion,
  fileLocationQuestion,
  bucketQuestion,
  productCategoryQuestion,
  productSetQuestion,
} from '../questions';
import { ConfigObj } from '../interfaces/ConfigObj';
import prompts from 'prompts';

export class Config {
  private static configKeys = [
    'bucketName',
    'csvFileLocation',
    'csvFilename',
    'productCategory',
    'productSet',
    'rootDirectory',
  ];

  private static configQuestions: {
    [index: string]: any;
  } = {
    bucketName: bucketQuestion,
    csvFileLocation: fileLocationQuestion,
    csvFilename: filenameQuestion,
    productCategory: productCategoryQuestion,
    productSet: productSetQuestion,
    rootDirectory: directoryQuestion,
  };

  public static async readFile() {
    const fileName = '.cvcsvrc';
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
      try {
        const file = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(file);
        return json;
      } catch (error) {
        throw Error(error);
      }
    }
    return null;
  }

  public static async completeConfig(objToCheck: any): Promise<ConfigObj> {
    const keys = Object.keys(objToCheck);
    const missing = [this.configKeys, keys]
      .reduce((a, b) => a.filter(c => !b.includes(c)))
      .map(val => this.configQuestions[val]);

    if (missing.length === 0) {
      return await Promise.resolve(objToCheck);
    }
    const ans: Object = await prompts(missing);
    return { ...ans, ...objToCheck };
  }
}
