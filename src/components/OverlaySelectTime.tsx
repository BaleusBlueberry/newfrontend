import React, { useState } from "react";

interface OverlayProps {
  isOverlayOpen: boolean;
  onClose: () => void;
  timeInSeconds: number;
  onTimeCalculated?: (totalSeconds: number) => void; // callback to pass time back
}

const OverlaySelectTime: React.FC<OverlayProps> = ({
  isOverlayOpen,
  onClose,
  onTimeCalculated,
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState(0);

  if (!isOverlayOpen) return null;

  const calculateTime = () => {
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    setResult(totalSeconds);
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
          <div className="overlay-title">Time Calculator</div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="number"
              placeholder="Days"
              onChange={(e) => setDays(+e.target.value)}
            />
            <input
              type="number"
              placeholder="Hours"
              onChange={(e) => setHours(+e.target.value)}
            />
            <input
              type="number"
              placeholder="Minutes"
              onChange={(e) => setMinutes(+e.target.value)}
            />
            <input
              type="number"
              placeholder="Seconds"
              onChange={(e) => setSeconds(+e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={calculateTime}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlaySelectTime;
