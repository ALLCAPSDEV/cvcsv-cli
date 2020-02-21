import * as fs from "fs";
import path from "path";
import {
  directoryQuestion,
  filenameQuestion,
  fileLocationQuestion,
  bucketQuestion,
  productCategoryQuestion,
  productSetQuestion
} from "../questions";
import { ConfigObj } from "../interfaces/ConfigObj";
import prompts from "prompts";
import { PromptObject } from "prompts";

export class Config {
  private static configKeys = [
    "bucketName",
    "csvFileLocation",
    "csvFilename",
    "productCategory",
    "vertices",
    "productSet",
    "rootDirectory"
  ];

  public static configQuestions: {
    [index: string]: PromptObject<string>;
  } = {
    bucketName: bucketQuestion,
    csvFileLocation: fileLocationQuestion,
    csvFilename: filenameQuestion,
    productCategory: productCategoryQuestion[0],
    productSet: productSetQuestion,
    rootDirectory: directoryQuestion,
    vertices: productCategoryQuestion[1]
  };

  public static async readFile(): Promise<any> {
    const fileName = ".cvcsvrc";
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
      try {
        const file = fs.readFileSync(filePath, "utf-8");
        const json = JSON.parse(file);
        return json;
      } catch (error) {
        throw Error(error);
      }
    }
    return null;
  }

  public static async completeConfig(
    objToCheck: Partial<ConfigObj>
  ): Promise<ConfigObj> {
    const keys = Object.keys(objToCheck);
    const missing = [this.configKeys, keys]
      .reduce((a, b) => a.filter(c => !b.includes(c)))
      .map(val => this.configQuestions[val]);

    if (missing.length === 0) {
      return await Promise.resolve(objToCheck as ConfigObj);
    }
    const ans: any = await prompts(missing);
    return { ...ans, ...objToCheck };
  }
}
