import { bgBlue } from 'kleur';
import * as readline from 'readline';
export class ProgressBar {
  private size: number;
  private current = 0;
  private total = 0;

  constructor() {
    this.size = process.stdout.columns - 30;
  }

  public start(total: number): void {
    this.total = total;
    this.current = 0;
    this.update(this.current);
  }

  public update(current: number): void {
    this.current = current;
    const currentProgress = this.current / this.total;
    this.draw(currentProgress);
  }

  private draw(progress: number): void {
    const filledLength = parseInt((progress * this.size).toFixed(0));
    const emptyLength = this.size - filledLength;
    const filledBar = this.bar(filledLength, ' ', bgBlue);
    const emptyBar = this.bar(emptyLength, '\u2591');
    const progressPercent = (progress * 100).toFixed(2);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(
      `Current progress: [${filledBar}${emptyBar}] | ${progressPercent}%`
    );
  }

  private bar(length: number, char: string, colour = (a: any): any => a): any {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += char;
    }
    return colour(str);
  }
}
