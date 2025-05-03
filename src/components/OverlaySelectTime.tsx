import React, { useEffect, useState } from "react";
import { TimeCalculator } from "../services/TimeCalculator";

interface OverlayProps {
  isOverlayOpen: boolean;
  onClose: () => void;
  onTimeCalculated?: (totalSeconds: number) => void;
  timeInSeconds: number;
}

const OverlaySelectTime: React.FC<OverlayProps> = ({
  isOverlayOpen,
  onClose,
  onTimeCalculated,
  timeInSeconds,
}) => {
  const timer = new TimeCalculator(timeInSeconds);

  const [time, setTime] = useState({
    days: timer.days,
    hours: timer.hours,
    minutes: timer.minutes,
    seconds: timer.seconds,
  });

  useEffect(() => {
    const timer = new TimeCalculator(timeInSeconds);
    setTime({
      days: timer.days,
      hours: timer.hours,
      minutes: timer.minutes,
      seconds: timer.seconds,
    });
  }, [timeInSeconds]);

  if (!isOverlayOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime((prev) => ({ ...prev, [name]: +value }));
  };

  const calculateTime = () => {
    const totalSeconds =
      time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds;
    onTimeCalculated?.(totalSeconds);
    onClose();
  };

  return (
    <div className="overlay-backdrop inset-0" onClick={onClose}>
      <div
        className="overlay-container"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)", margin: "20px" }}
      >
        <div className="inner-container p-4">
          {/* X button in top-right */}
          <div
            className="absolute top-2 right-2 text-xl cursor-pointer"
            onClick={onClose}
          >
            ✕
          </div>
          <h2 className="overlay-title text-center mb-4">Time Calculator</h2>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {["seconds", "minutes", "hours", "days"].map((field) => (
              <div key={field} className="flex flex-col">
                <label
                  className="text-base font-medium capitalize mb-1"
                  htmlFor={field}
                >
                  {field}
                </label>
                <input
                  id={field}
                  type="number"
                  name={field}
                  value={time[field]}
                  onChange={handleChange}
                  className="border text-base p-1 w-1/4"
                  min={0}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={calculateTime}
            className="btn btn-primary"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlaySelectTime;
