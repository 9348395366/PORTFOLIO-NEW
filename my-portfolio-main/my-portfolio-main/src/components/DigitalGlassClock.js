import { useEffect, useState } from "react";

const formatTime = (date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

const formatDate = (date) =>
  date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const DigitalGlassClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="digital-glass-clock" aria-live="polite">
      <div className="clock-glow-orb" />
      <div className="clock-popup-shell">
        <div className="clock-time">{formatTime(now)}</div>
        <div className="clock-date">{formatDate(now)}</div>
      </div>
    </div>
  );
};

export default DigitalGlassClock;
