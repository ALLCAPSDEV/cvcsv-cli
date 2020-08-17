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
  labels?: {
    [key: string]: string | number | boolean;
  };
  productCategory?: string;
  productSet?: string;
  rootDirectory?: string;
}
