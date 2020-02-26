import { bold, blue } from "kleur";
import { ConsoleMessage } from "../interfaces/Console";
import figlet from "figlet";

export class Logger {
  public static showTitleAndBanner(): void {
    this.log(
      `${bold().blue(
        figlet.textSync(ConsoleMessage.TITLE, { font: "Graffiti" })
      )}\n\n${blue(ConsoleMessage.BANNER)}\n\n`
    );
  }

  public static success(files: number): void {
    const plural = files > 1 ? "files" : "file";
    this.log(
      `\n\n${bold()
        .bgWhite()
        .blue(`Added ${files} ${plural} to your CSV file.`)}\n${bold().blue(
        figlet.textSync(ConsoleMessage.DONE, {
          font: "Graffiti"
        })
      )}`
    );
  }

  public static error(msg: string): void {
    this.log(bold().red(`${ConsoleMessage.ERROR}${msg}`), true);
    process.exit(1);
  }

  private static log(message: string, error?: boolean): void {
    console[error ? "error" : "log"](message);
  }
}
