export const TimeCalculator = (time: number): string => {
  if (time <= 0 || !Number.isInteger(time)) return "0S";

  let remainingTimeInSeconds = time;
  const finalTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  finalTime.days = Math.floor(remainingTimeInSeconds / 86400);
  remainingTimeInSeconds %= 86400;

  finalTime.hours = Math.floor(remainingTimeInSeconds / 3600);
  remainingTimeInSeconds %= 3600;

  finalTime.minutes = Math.floor(remainingTimeInSeconds / 60);
  remainingTimeInSeconds %= 60;

  finalTime.seconds = remainingTimeInSeconds;

  return (
    [
      finalTime.days > 0 ? `${finalTime.days}D` : "",
      finalTime.hours > 0 ? `${finalTime.hours}H` : "",
      finalTime.minutes > 0 ? `${finalTime.minutes}M` : "",
      finalTime.seconds > 0 ? `${finalTime.seconds}S` : "",
    ]
      .filter(Boolean)
      .join(" ") || "0S"
  );
};
