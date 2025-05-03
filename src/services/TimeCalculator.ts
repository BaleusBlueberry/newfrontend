import { dialogs } from "../dialogs/dialogs";

export class TimeCalculator {
  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;

  constructor(inputSeconds: number) {
    if (inputSeconds <= 0 || !Number.isInteger(inputSeconds)) {
      dialogs.error("input secods in negetive or 0");
      return;
    }

    let remainingTimeInSeconds = inputSeconds;

    this.days = Math.floor(remainingTimeInSeconds / 86400);
    remainingTimeInSeconds %= 86400;

    this.hours = Math.floor(remainingTimeInSeconds / 3600);
    remainingTimeInSeconds %= 3600;

    this.minutes = Math.floor(remainingTimeInSeconds / 60);
    remainingTimeInSeconds %= 60;

    this.seconds = remainingTimeInSeconds;
  }

  printFull() {
    return (
      [
        this.days > 0 ? `${this.days}D` : "",
        this.hours > 0 ? `${this.hours}H` : "",
        this.minutes > 0 ? `${this.minutes}M` : "",
        this.seconds > 0 ? `${this.seconds}S` : "",
      ]
        .filter(Boolean)
        .join(" ") || "0S"
    );
  }
}
