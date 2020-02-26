import { Logger } from "../../src/utils/logger";
import { ConsoleMessage } from "../../src/interfaces/Console";
import { bold } from "kleur";
describe("Logger", () => {
  let csLogMock: jest.SpyInstance<void, [any?, ...any[]]>;
  let csErrMock: jest.SpyInstance<void, [any?, ...any[]]>;
  let proExitMock: jest.SpyInstance<any, unknown[]>;
  beforeEach(() => {
    csLogMock = jest.spyOn(console, "log").mockImplementation(() => true);
    csErrMock = jest.spyOn(console, "error").mockImplementation(() => true);
    proExitMock = jest
      .spyOn(process, "exit")
      .mockImplementation(() => true as never);
  });
  afterEach(() => {
    csLogMock.mockRestore();
    csErrMock.mockRestore();
    proExitMock.mockRestore();
  });
  describe("#showTitleAndBanner", () => {
    test("contains the banner", () => {
      Logger.showTitleAndBanner();
      const bannerRegex = new RegExp(ConsoleMessage.BANNER, "s");
      expect(csLogMock.mock.calls[0].toString()).toMatch(bannerRegex);
    });
    test("console.log is called once", () => {
      Logger.showTitleAndBanner();
      expect(csLogMock).toHaveBeenCalledTimes(1);
    });
  });
  describe("#success", () => {
    test("returns file string for one file", () => {
      Logger.success(1);
      expect(csLogMock.mock.calls[0].toString()).toMatch(
        /Added 1 file to your CSV file./s
      );
    });
    test("returns files string for two files", () => {
      Logger.success(2);
      expect(csLogMock.mock.calls[0].toString()).toMatch(
        /Added 2 files to your CSV file./s
      );
    });
    test("expect console.log to be called once", () => {
      Logger.success(1);
      expect(csLogMock).toHaveBeenCalledTimes(1);
    });
  });
  describe("#error", () => {
    test("formats the error message", () => {
      Logger.error("ERROR!");
      expect(csErrMock).toBeCalledWith(
        bold().red(`${ConsoleMessage.ERROR}ERROR!`)
      );
    });
    test("calls console.error", () => {
      Logger.error("ERROR!");
      expect(csErrMock).toBeCalledTimes(1);
    });
    test("calls process.exit", () => {
      Logger.error("ERROR!");
      expect(proExitMock).toBeCalledTimes(1);
      expect(proExitMock).toBeCalledWith(1);
    });
  });
  describe("#log", () => {
    test("with no error param console.log is used", () => {
      Logger["log"]("Test");
      expect(csLogMock).toBeCalledTimes(1);
      expect(csErrMock).toBeCalledTimes(0);
    });
    test("with an error param console.error is used", () => {
      Logger["log"]("Test", true);
      expect(csLogMock).toBeCalledTimes(0);
      expect(csErrMock).toBeCalledTimes(1);
    });
  });
});
