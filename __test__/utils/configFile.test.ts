jest.mock("fs");
import * as fs from "fs";
import { Config } from "../../src/utils/configFile";
import { ConfigObj } from "../../src/interfaces/ConfigObj";
import prompts from "prompts";

describe("Config", () => {
  describe("#readFile", () => {
    let mockFsRead: jest.SpyInstance<unknown>;
    let mockFsExist: jest.SpyInstance<boolean, [fs.PathLike]>;
    describe("config file exists", () => {
      beforeEach(() => {
        const mockFile = JSON.stringify({
          bucketName: "testBucket",
          csvFileLocation: "./test.csv",
        });
        mockFsRead = jest
          .spyOn(fs, "readFileSync")
          .mockImplementation(() => Buffer.from(mockFile, "utf8"));
        mockFsExist = jest
          .spyOn(fs, "existsSync")
          .mockImplementation(() => true);
      });
      afterAll(() => {
        mockFsRead.mockRestore();
        mockFsExist.mockRestore();
      });
      test("reads the file and parses the JSON", async () => {
        const result = await Config.readFile();
        expect(result).toEqual({
          bucketName: "testBucket",
          csvFileLocation: "./test.csv",
        });
      });
      test("throws error when unable to read file", async () => {
        mockFsRead = jest
          .spyOn(fs, "readFileSync")
          .mockImplementationOnce(() => {
            throw "ERROR!";
          });
        expect(Config.readFile()).rejects.toThrowError();
      });
      test("throws error when file not valid json", async () => {
        const mockFile = `test:
          file:
            wontwork: true`;
        mockFsRead = jest
          .spyOn(fs, "readFileSync")
          .mockImplementationOnce(() => Buffer.from(mockFile, "utf8"));
        expect(Config.readFile()).rejects.toThrowError();
      });
    });
    describe("config file does not exist", () => {
      beforeEach(() => {
        mockFsExist = jest
          .spyOn(fs, "existsSync")
          .mockImplementation(() => false);
      });
      afterAll(() => {
        mockFsExist.mockRestore();
      });
      test("returns null", async () => {
        const result = await Config.readFile();
        expect(result).toEqual(null);
      });
    });
  });
  describe("#completeConfig", () => {
    let objToCheck: Partial<ConfigObj>;
    let promptMock: jest.SpyInstance<any, unknown[]>;
    let questions: { [x: string]: prompts.PromptObject<string> };
    beforeEach(() => {
      promptMock = jest.spyOn(prompts, "prompt");
      questions = Object.assign({}, Config.configQuestions);
      delete questions["categoryNum"];
    });
    afterEach(() => {
      promptMock.mockRestore();
    });
    test("does not ask any questions when all answers are provided", async () => {
      objToCheck = Config["configKeys"].reduce((acc, val) => {
        acc[val] = "test-value";
        return acc;
      }, {});
      const result = await Config.completeConfig(objToCheck);
      expect(prompts).toBeCalledTimes(0);
      expect(result).toEqual(objToCheck);
    });
    Object.keys(Config.configQuestions).forEach((val) => {
      if (val === "categoryNum") return;
      test(`asks the remaining questions when only ${val} is in the config file`, async () => {
        objToCheck = {};
        objToCheck[val] = "test-value";
        await Config.completeConfig(objToCheck);
        delete questions[val];
        const expected = Object.values(questions);

        expect(prompts).toBeCalledWith(expected);
      });
      test("prompts is only called once", async () => {
        objToCheck = {};
        objToCheck[val] = "test-value";
        await Config.completeConfig(objToCheck);
        delete questions[val];
        expect(prompts).toBeCalledTimes(1);
      });
    });
  });
});
