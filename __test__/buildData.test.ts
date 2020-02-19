import { CVCSVCLI } from "../src/cvcsvcli";
import { spyOnImplementing } from "jest-mock-process";
describe("buildData", () => {
  let subject: CVCSVCLI;
  let mockStdoutClearLine: jest.SpyInstance<
    boolean,
    [import("tty").Direction, (() => void)?]
  >;
  let mockStdoutWrite: jest.SpyInstance<
    boolean,
    [string | Uint8Array, string?, ((err?: Error) => void)?]
  >;

  beforeAll(() => {
    mockStdoutClearLine = spyOnImplementing(
      process.stdout,
      "clearLine",
      () => true
    );
    mockStdoutWrite = spyOnImplementing(process.stdout, "write", () => true);
    subject = CVCSVCLI;
    subject["config"] = {
      bucketName: "foo",
      rootDirectory: "foo",
      productCategory: "packagedgoods-v1",
      productSet: "test"
    };
  });
  afterAll(() => {
    mockStdoutClearLine.mockRestore();
    mockStdoutWrite.mockRestore();
  });
  test("with a dirPath", async () => {
    const expected = [
      {
        "image-uri": "gs://foo/images/testing/1.jpg",
        labels: "tag=testing",
        "product-id": "TESTING",
        "product-display-name": "Testing",
        "product-category": "packagedgoods-v1",
        "product-set-id": "test"
      },
      {
        "image-uri": "gs://foo/images/another_dir/2.png",
        labels: "tag=another_dir",
        "product-id": "ANOTHERDIR",
        "product-display-name": "Another Dir",
        "product-category": "packagedgoods-v1",
        "product-set-id": "test"
      }
    ];
    const result = await subject["buildData"]();
    expect(result).toEqual(expected);
  });
});
