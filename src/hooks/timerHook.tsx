import { useEffect, useState } from 'react';

type Props = {
  defaultSeconds: number;
  active: boolean;
};

const TimerHook = ({ defaultSeconds, active }: Props) => {
  const [seconds, setSeconds] = useState<number>(defaultSeconds);
  if (!active && seconds !== 60) setSeconds(60);
  useEffect(() => {
    seconds > 0 && active && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds, active]);

  return seconds;
};

export { TimerHook };
