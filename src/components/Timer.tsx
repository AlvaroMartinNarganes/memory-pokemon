import { LoseGameHook } from '../hooks/loseGameHook';
import { TimerHook } from '../hooks/timerHook';

type Props = {
  active: boolean;
  setEndGame: any;
};
export const Timer = ({ active, setEndGame }: Props) => {
  const defaultSeconds = 60;
  const seconds = TimerHook({ defaultSeconds, active });
  //Control lose
  LoseGameHook({ seconds, setEndGame });
  if (!active) return <></>;

  return <div>Tiempo: {seconds}</div>;
};
