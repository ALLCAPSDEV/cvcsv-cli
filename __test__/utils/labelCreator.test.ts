import { labelCreator } from "../../src/utils/labelCreator";

describe("labelCreator", () => {
  let words: string[], expected: string, result;
  const subject = labelCreator;
  describe("when passed just an array of strings", () => {
    beforeEach(() => {
      words = ["test", "word", "array"];
    });
    test("returns a string containing tags key/values pairs", () => {
      expected = "tag=test,tag=word,tag=array";
      result = subject(words);
      expect(result).toStrictEqual(expected);
    });
  });

  describe("when passed a string array and category number", () => {
    beforeAll(() => {
      words = ["test", "word", "array"];
    });
    test("returns 'category=test' at the beginning of the string when passed 0 as category", () => {
      expected = "category=test,tag=word,tag=array";
      result = subject(words, 0);
      expect(result).toStrictEqual(expected);
    });
    test("returns 'category=word' in the middle of the string when passed 1 as category", () => {
      expected = "tag=test,category=word,tag=array";
      result = subject(words, 1);
      expect(result).toStrictEqual(expected);
    });
    test("returns 'category=array' at the end of the string when passed 2 as category", () => {
      expected = "tag=test,tag=word,category=array";
      result = subject(words, 2);
      expect(result).toStrictEqual(expected);
    });
    test("returns no category in the string when passed a number greater than words length", () => {
      expected = "tag=test,tag=word,tag=array";
      result = subject(words, 7);
      expect(result).toStrictEqual(expected);
    });
    test("returns no category in the string when passed a negative number", () => {
      expected = "tag=test,tag=word,tag=array";
      result = subject(words, -7);
      expect(result).toStrictEqual(expected);
    });
  });
});
