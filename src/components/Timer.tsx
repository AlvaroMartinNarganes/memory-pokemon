import { TimerHook } from '../hooks/timerHook';

function Timer({ active }: { active: boolean }) {
  const seconds = TimerHook();
  if (!active) return <></>;
  return <div>Tiempo: {seconds}</div>;
}
export default Timer;
