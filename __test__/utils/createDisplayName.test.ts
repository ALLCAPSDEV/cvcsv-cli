import { createDisplayName } from "../../src/utils/createDisplayName";
describe("createDisplayName", () => {
  let path: string,
    fileName: string,
    catNum: number | boolean,
    result: string,
    expected: string;
  let subject: (
    path: string,
    fileName: string,
    catNum: number | boolean
  ) => string;
  beforeAll(() => {
    subject = createDisplayName;
  });
  describe("with category number", () => {
    beforeEach(() => {
      path = "some/path/with/a/category/in/it.jpg";
      fileName = "it.jpg";
    });

    test("when passed a category number it removes it from the display name", () => {
      result = subject(path, fileName, 4);

      expected = "Some Path With A In";
      expect(result).toEqual(expected);
    });
  });

  describe("without category number", () => {
    beforeEach(() => {
      path = "some/path/without/a/category/in/it.jpg";
      fileName = "it.jpg";
    });

    test("when passed false as the category number nothing is removed from the display name", () => {
      result = subject(path, fileName, false);

      expected = "Some Path Without A Category In";
      expect(result).toEqual(expected);
    });
  });
});
