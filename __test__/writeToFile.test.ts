import fs from "fs";
import path from "path";
import { CVCSVCLI } from "../src/cvcsvcli";

import { CsvData } from "../src/interfaces/CsvData";

const positiveData: CsvData[] = [
  {
    "image-uri": "gs://foo/bar.jpg",
    "image-id": "1",
    "product-set-id": "test-set",
    "product-id": "test product",
    "product-category": "test category",
    "product-display-name": "foobar",
    labels: "category='test',category='foo'",
    "bounding-poly": "100,150,450,150,450,550,100,550",
  },
];

const filePath = path.join(__dirname, "test.csv");

describe("writeToFile", () => {
  let result: boolean;
  let subject: CVCSVCLI;
  beforeAll(() => {
    subject = CVCSVCLI;
    subject["config"] = {
      csvFileLocation: "__test__",
      csvFilename: "test.csv",
    };
    subject["data"] = positiveData;
  });
  beforeEach(async () => {
    result = await subject["writeToFile"]();
  });

  test("returns true when passed valid input", () => {
    expect(result).toBeTruthy;
  });

  test("writes the correct data to the file", () => {
    const data = fs.readFileSync(filePath, "utf-8");
    expect(data).toMatch(
      /gs\:\/\/foo\/bar\.jpg,1,test-set,test product,test category,foobar,\"category='test',category='foo'\",\"100,150,450,150,450,550,100,550\"/
    );
  });
  afterEach(() => {
    fs.unlinkSync(filePath);
  });
  afterAll(() => {});
});
