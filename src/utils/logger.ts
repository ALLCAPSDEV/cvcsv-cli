import { bold, blue, green } from "kleur";
import { ConsoleMessage } from "../interfaces/Console";
import figlet from "figlet";

export class Logger {
  public showTitleAndBanner(): void {
    console.log(
      bold().blue(figlet.textSync(ConsoleMessage.TITLE, { font: "Graffiti" }))
    );
    console.log(blue(ConsoleMessage.BANNER));
    console.log("\n");
  }

  public success(files: number): void {
    const plural = files > 1 ? "files" : "file";
    console.log("\n");
    console.log(
      bold()
        .bgWhite()
        .blue(`Added ${files} ${plural} to your CSV file.`)
    );
    console.log("\n");
    console.log(
      bold().blue(
        figlet.textSync(ConsoleMessage.DONE, {
          font: "Graffiti"
        })
      )
    );
  }

  public error(msg: string): void {
    console.log(bold().red(`${ConsoleMessage.ERROR}${msg}`));
    process.exit(1);
  }

  public msg(msg: string): void {
    console.log(green(`${msg}`));
  }
}
