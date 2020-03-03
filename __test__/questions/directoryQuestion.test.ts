jest.mock("fs");
import directoryQuestion from "../../src/questions/directoryQuestion";
import { Answers, PromptObject } from "prompts";
import * as fs from "fs";
describe("directoryQuestion", () => {
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
    test("returns true if dir exists", () => {
      fsExistsSyncMock.mockImplementationOnce(() => true);
      if (directoryQuestion.validate) {
        const result = directoryQuestion.validate(prev, val, prompt);
        expect(result).toEqual(true);
      }
    });
    test("returns a message if the directory doesn't exist", () => {
      fsExistsSyncMock.mockImplementationOnce(() => false);
      if (directoryQuestion.validate) {
        const result = directoryQuestion.validate(prev, val, prompt);
        expect(result).toMatch(/The directory doesn't exist/);
      }
    });
  });
});
