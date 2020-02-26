import { CVCSVCLI } from "../src/cvcsvcli";
import prompts from "prompts";
import { Config } from "../src/utils/configFile";
describe("CVCSVCLI", () => {
  describe("#getConfig", () => {
    let configRFMock: jest.SpyInstance<any, unknown[]>;
    let configCCMock: jest.SpyInstance<any, unknown[]>;
    let promptMock: jest.SpyInstance<any, unknown[]>;
    beforeEach(() => {
      promptMock = jest.spyOn(prompts, "prompt");
      configRFMock = jest.spyOn(Config, "readFile");
      configCCMock = jest.spyOn(Config, "completeConfig");
    });
    afterEach(() => {
      promptMock.mockRestore();
      configRFMock.mockRestore();
    });
    test("config file null - prompt called with all questions", async () => {
      const expected = {
        rootDirectory: "./test-root/",
        csvFileLocation: "./test-file/"
      };
      configRFMock.mockImplementation(() => null);
      promptMock.mockImplementation(() => expected);
      await CVCSVCLI["getConfig"]();

      expect(prompts).toBeCalledWith(Object.values(Config.configQuestions));
      expect(prompts).toBeCalledTimes(1);
      expect(configRFMock).toBeCalledTimes(1);
      expect(CVCSVCLI["config"]).toEqual(expected);
    });
    test("config file not null - completeConfig called", async () => {
      const mockFile = {
        rootDirectory: "./test-root/",
        csvFileLocation: "./test-file-loc/"
      };
      configRFMock.mockImplementation(() => mockFile);
      configCCMock.mockImplementation(() => mockFile);
      await CVCSVCLI["getConfig"]();
      expect(configCCMock).toBeCalledTimes(1);
      expect(configCCMock).toBeCalledWith(mockFile);
      expect(CVCSVCLI["config"]).toEqual(mockFile);
    });
  });
  describe("#formatDirectory", () => {
    test("returns unmodified dir path if trailing / is present", () => {
      const dir = "./test-dir/";
      const result = CVCSVCLI["formatDirectory"](dir);
      expect(result).toStrictEqual(dir);
    });
    test("returns a string with a trailing / if it is missed in param", () => {
      const dir = "./test-dir";
      const result = CVCSVCLI["formatDirectory"](dir);
      expect(result).toStrictEqual(dir + "/");
    });
  });
  describe("#formatRootDir", () => {
    test("returns unmodified dir path if preceeding ./ is not present", () => {
      const dir = "test-dir/";
      const result = CVCSVCLI["formatRootDir"](dir);
      expect(result).toStrictEqual(dir);
    });
    test("returns string without preceeding ./", () => {
      const dir = "./test-dir/";
      const expected = "test-dir/";
      const result = CVCSVCLI["formatRootDir"](dir);
      expect(result).toStrictEqual(expected);
    });
  });
});
