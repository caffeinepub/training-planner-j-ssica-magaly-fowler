import { useState, useEffect, useRef } from 'react';

export function useInAppReminder(
  intervalMinutes: number,
  onReminder: () => void
) {
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isActive) {
      const intervalMs = intervalMinutes * 60 * 1000;
      timerRef.current = setInterval(() => {
        onReminder();
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, intervalMinutes, onReminder]);

  return { isActive, start, stop };
}
