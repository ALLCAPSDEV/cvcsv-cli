import { CVCSVCLI } from "../src/cvcsvcli";
describe("buildData", () => {
  let subject: CVCSVCLI;
  let mockStdoutClearLine: { (): typeof jest; mockRestore?: any };
  let mockStdoutWrite: jest.SpyInstance<
    boolean,
    [
      string | Uint8Array,
      (
        | "ascii"
        | "utf8"
        | "utf-8"
        | "utf16le"
        | "ucs2"
        | "ucs-2"
        | "base64"
        | "latin1"
        | "binary"
        | "hex"
        | undefined
      )?,
      (((err?: Error | undefined) => void) | undefined)?
    ]
  >;

  beforeAll(() => {
    mockStdoutClearLine = jest.mock("readline").autoMockOn;
    mockStdoutWrite = jest
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
    subject = CVCSVCLI;
    subject["config"] = {
      bucketName: "foo",
      rootDirectory: "foo",
      productCategory: "packagedgoods-v1",
      productSet: "test",
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
        "product-set-id": "test",
      },
      {
        "image-uri": "gs://foo/images/another_dir/2.png",
        labels: "tag=another_dir",
        "product-id": "ANOTHERDIR",
        "product-display-name": "Another Dir",
        "product-category": "packagedgoods-v1",
        "product-set-id": "test",
      },
    ];
    const result = await subject["buildData"]();
    expect(result).toEqual(expected);
  });
});
