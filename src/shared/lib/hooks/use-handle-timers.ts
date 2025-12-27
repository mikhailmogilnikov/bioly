import { createGStore } from "create-gstore";
import { useCallback, useState } from "react";

const createDefaultTimerVault = (): TimerVault => ({
  otp: {},
});

type TimerVaultKeyType = "otp";
type TimerId = string;

type Timer = Record<TimerId, number>;

type TimerVault = Record<TimerVaultKeyType, Timer>;

interface StartTimerPayload {
  key: TimerVaultKeyType;
  id: TimerId;
  duration: number;
}

export const useTimers = createGStore(() => {
  const [timers, setTimers] = useState<TimerVault>(createDefaultTimerVault);

  return {
    timers,
    setTimers,
  };
});

export const useHandleTimers = createGStore(() => {
  /**
   * Get the duration of a timer with the given key and id.
   * @param key - The key of the timer to get.
   * @param id - The id of the timer to get.
   * @returns The duration of the timer.
   */
  const getTimer = useCallback((key: TimerVaultKeyType, id: TimerId) => {
    const timers = useTimers.getState().timers;
    return timers[key]?.[id];
  }, []);

  const updateTimer = useCallback(
    (key: TimerVaultKeyType, id: TimerId, duration: number) => {
      const timers = useTimers.getState().timers;
      const nextTimers: TimerVault = {
        ...timers,
        [key]: {
          ...timers[key],
          [id]: duration,
        },
      };
      useTimers.getState().setTimers(nextTimers);
    },
    []
  );

  const removeTimer = useCallback((key: TimerVaultKeyType, id: TimerId) => {
    const timers = useTimers.getState().timers;
    const nextKeyTimers: Timer = { ...timers[key] };
    delete nextKeyTimers[id];

    const nextTimers: TimerVault = {
      ...timers,
      [key]: nextKeyTimers,
    };
    useTimers.getState().setTimers(nextTimers);
  }, []);

  /**
   * Start a timer with the given key, id, and duration.
   * @param key - The key of the timer to start.
   * @param id - The id of the timer to start.
   * @param duration - The duration of the timer to start.
   * @returns A function to clear the timer.
   */
  const startTimer = useCallback(
    ({ key, id, duration }: StartTimerPayload) => {
      const existingTimer = getTimer(key, id);
      if (existingTimer !== undefined) return;

      updateTimer(key, id, duration);

      const interval = setInterval(() => {
        const timer = getTimer(key, id);

        if (timer === undefined) {
          clearInterval(interval);
          return;
        }

        if (timer <= 0) {
          clearInterval(interval);
          removeTimer(key, id);
          return;
        }

        updateTimer(key, id, timer - 1);
      }, 1000);

      return () => clearInterval(interval);
    },
    [getTimer, removeTimer, updateTimer]
  );

  return {
    startTimer,
    getTimer,
    removeTimer,
    updateTimer,
  };
});
