import { createDisplayName } from "../../src/utils/createDisplayName";
import { ConfigFileObj, ConfigFileLabels } from "../../src/interfaces/ConfigObj";
describe("createDisplayName", () => {
  let path: string, fileName: string, result: string, expected: string;
  let subject: (
    path: string,
    fileName: string,
    config: ConfigFileObj
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
      result = subject(path, fileName, { category: 4 });

      expected = "Some Path With A In";
      expect(result).toEqual(expected);
    });
  });

  describe("without category number", () => {
    beforeEach(() => {
      path = "some/path/with/a/category/in/it.jpg";
      fileName = "it.jpg";
    });

    describe("without labels", () => {
      test("when passed false as the category number nothing is removed from the display name", () => {
        result = subject(path, fileName, { category: false });

        expected = "Some Path With A Category In";
        expect(result).toEqual(expected);
      });
    })
    describe("with labels", () => {
      let labels: ConfigFileLabels
      test("removes labels from the display name", () => {
        labels = {
          some: 0,
          test: 1,
          labels: 2
        }
        result = subject(path, fileName, { labels })
        expected = "A Category In"
        expect(result).toEqual(expected)
      })
    })
  });
});
