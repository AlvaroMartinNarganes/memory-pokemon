import { useEffect, useState } from 'react';

//My first hook
const TimerHook = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds]);

  return seconds;
};

export { TimerHook };
