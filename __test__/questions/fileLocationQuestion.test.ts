jest.mock("fs");
import fileLocationQuestion from "../../src/questions/fileLocationQuestion";
import { Answers, PromptObject } from "prompts";
import * as fs from "fs";
describe("fileLocationQuestion", () => {
  describe("#validate", () => {
    let fsExistsSyncMock: jest.SpyInstance<boolean, [fs.PathLike]>;
    const prev = "prev";
    const val: Answers<string> = {
      1: "./test-dir/"
    };
    const prompt: PromptObject<string> = {
      type: "text",
      name: "rootDirectory"
    };
    beforeEach(() => {
      fsExistsSyncMock = jest.spyOn(fs, "existsSync");
    });
    afterEach(() => {
      fsExistsSyncMock.mockRestore();
    });
    test("returns true if the file exists", () => {
      fsExistsSyncMock.mockImplementationOnce(() => true);
      if (fileLocationQuestion.validate) {
        const result = fileLocationQuestion.validate(prev, val, prompt);
        expect(result).toEqual(true);
      }
    });
    test("returns a message if the file doesn't exist", () => {
      fsExistsSyncMock.mockImplementationOnce(() => false);
      if (fileLocationQuestion.validate) {
        const result = fileLocationQuestion.validate(prev, val, prompt);
        expect(result).toMatch(/That location doesn't exist/);
      }
    });
  });
});
