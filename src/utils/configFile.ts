import * as fs from "fs";
import path from "path";
import {
  categoryQuestion,
  directoryQuestion,
  filenameQuestion,
  fileLocationQuestion,
  bucketQuestion,
  productCategoryQuestion,
  productSetQuestion,
} from "../questions/index";
import { ConfigObj, ConfigFileObj } from "../interfaces/ConfigObj";
import prompts from "prompts";
import { PromptObject } from "prompts";

export class Config {
  private static configKeys = [
    "bucketName",
    "category",
    "csvFileLocation",
    "csvFilename",
    "productCategory",
    "productSet",
    "rootDirectory",
  ];

  public static configQuestions: {
    [index: string]: PromptObject<string>;
  } = {
    bucketName: bucketQuestion,
    category: categoryQuestion[0],
    categoryNum: categoryQuestion[1],
    csvFileLocation: fileLocationQuestion,
    csvFilename: filenameQuestion,
    productCategory: productCategoryQuestion,
    productSet: productSetQuestion,
    rootDirectory: directoryQuestion,
  };

  public static async readFile(): Promise<ConfigFileObj | null> {
    const fileName = ".cvcsvrc";
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
      try {
        const file = fs.readFileSync(filePath, "utf-8");
        const json: ConfigFileObj = JSON.parse(file);
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
      .reduce((a, b) => a.filter((c) => !b.includes(c)))
      .map((val) => this.configQuestions[val]);

    if (missing.length === 0) {
      return await Promise.resolve(objToCheck as ConfigObj);
    }
    const ans: any = await prompts(missing);
    return { ...ans, ...objToCheck };
  }
}
