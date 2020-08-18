import { labelCreator } from "../../src/utils/labelCreator";
import { ConfigFileObj } from "../../src/interfaces/ConfigObj";

describe("labelCreator", () => {
  let words: string[], expected: string, result, config: ConfigFileObj;
  const subject = labelCreator;
  describe("when passed category false", () => {
    beforeEach(() => {
      words = ["test", "word", "array"];
      config = {
        category: false,
      };
    });
    test("returns a string containing tags key/values pairs", () => {
      expected = "tag=test,tag=word,tag=array";
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
  });

  describe("when passed a string array and category number", () => {
    beforeAll(() => {
      words = ["test", "word", "array"];
      config = {
        category: 0,
      };
    });
    test("returns 'category=test' at the beginning of the string when passed 0 as category", () => {
      expected = "category=test,tag=word,tag=array";
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
    test("returns 'category=word' in the middle of the string when passed 1 as category", () => {
      expected = "tag=test,category=word,tag=array";
      config.category = 1;
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
    test("returns 'category=array' at the end of the string when passed 2 as category", () => {
      expected = "tag=test,tag=word,category=array";
      config.category = 2;
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
    test("returns no category in the string when passed a number greater than words length", () => {
      expected = "tag=test,tag=word,tag=array";
      config.category = 7;
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
    test("returns no category in the string when passed a negative number", () => {
      expected = "tag=test,tag=word,tag=array";
      config.category = -7;
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
  });
  describe("when passed a string array and labels", () => {
    beforeEach(() => {
      words = ["test", "word", "array"];
      config = {
        category: false,
        labels: {
          category: 0,
          foo: 1,
          bar: "foobar",
          defaults: true,
        },
      };
    });
    test("returns the labels", () => {
      expected = "category=test,foo=word,bar=foobar,tag=array";
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
    test("no `tags` appear when `defaults` is false", () => {
      expected = "category=test,foo=word,bar=foobar";
      if (typeof config.labels !== "undefined") config.labels.defaults = false;
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
    test("no `tags` appear when `defaults` is undefined", () => {
      expected = "category=test,foo=word,bar=foobar";
      if (typeof config.labels !== "undefined") delete config.labels.defaults;
      result = subject(words, config);
      expect(result).toStrictEqual(expected);
    });
  });
});
