import { Config } from "./utils/configFile";
import prompts from "prompts";
import { Logger } from "./utils/logger";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";
import { readFiles } from "./utils/readFiles";
import { CsvData } from "./interfaces/CsvData";
import { labelCreator } from "./utils/labelCreator";
import { createDisplayName } from "./utils/createDisplayName";

export class CVCSVCLI {
  private static config: any;
  private static data: CsvData[];
  private static file: boolean;

  public static async run() {
    Logger.showTitleAndBanner();
    await this.getConfig();
    this.data = await this.buildData();
    this.file = await this.writeToFile();
    if (this.file && this.data) Logger.success(this.data.length);
  }

  private static async getConfig() {
    const configFile = await Config.readFile();
    let config;
    if (configFile === null) {
      config = await prompts(Object.values(Config.configQuestions));
    } else {
      if (Object.keys(configFile).includes("labels")) {
        configFile.category = false;
      }
      config = await Config.completeConfig(configFile);
    }
    config.rootDirectory = this.formatDirectory(config.rootDirectory);
    config.csvFileLocation = this.formatDirectory(config.csvFileLocation);
    this.config = config;
  }

  /**
   * Ensures that the directory has a trailing slash
   * @param path The path that requires formatting
   */

  private static formatDirectory(path: string) {
    return path.match(/\/$/) ? path : `${path}/`;
  }

  private static formatRootDir(rootDirectory: string) {
    if (rootDirectory.match(/^\.\//)) {
      return rootDirectory.replace("./", "");
    }
    return rootDirectory;
  }

  private static async buildData() {
    const {
      bucketName,
      categoryNum,
      rootDirectory,
      productCategory,
      productSet,
    } = this.config;
    const paths = await readFiles(rootDirectory);
    if (paths.length < 1) throw Error("No images");
    const fileData: CsvData[] = [];
    paths.forEach((str: string) => {
      const fileName = path.basename(str);
      const gsPath = str.replace(this.formatRootDir(rootDirectory), "");
      const displayName = createDisplayName(gsPath, fileName, categoryNum);
      const productId = displayName.replace(/\s/g, "").toUpperCase();
      const bucketUri = `gs://${bucketName}/images/${gsPath}`;
      const labels = labelCreator(
        gsPath
          .replace(fileName, "")
          .split(/\//)
          .filter((word) => word !== ""),
        this.config
      );

      fileData.push({
        "image-uri": bucketUri,
        "product-id": productId,
        "product-display-name": displayName,
        "product-category": productCategory,
        "product-set-id": productSet,
        labels,
      });
    });

    return fileData;
  }

  private static async writeToFile() {
    const filePath = path.join(
      this.config.csvFileLocation,
      this.config.csvFilename
    );
    const writer = createObjectCsvWriter({
      path: filePath,
      header: [
        "image-uri",
        "image-id",
        "product-set-id",
        "product-id",
        "product-category",
        "product-display-name",
        "labels",
        "bounding-poly",
      ],
    });

    try {
      await writer.writeRecords(this.data);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
