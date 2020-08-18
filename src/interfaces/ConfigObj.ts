export interface ConfigObj {
  bucketName: string;
  category: boolean | number;
  csvFileLocation: string;
  csvFilename: string;
  productCategory: string;
  productSet: string;
  rootDirectory: string;
}

export interface ConfigFileObj {
  bucketName?: string;
  category?: boolean | number;
  csvFileLocation?: string;
  csvFilename?: string;
  labels?: ConfigFileLabels;
  productCategory?: string;
  productSet?: string;
  rootDirectory?: string;
}

export interface ConfigFileLabels {
  [key: string]: string | number | boolean;
}
