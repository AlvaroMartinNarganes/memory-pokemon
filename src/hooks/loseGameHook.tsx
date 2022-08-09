import { useEffect } from 'react';

type Props = {
  seconds: number;
  setEndGame: any;
};
export const LoseGameHook = ({ seconds, setEndGame }: Props) => {
  //Control losed game
  useEffect(() => {
    if (seconds === 0) {
      setEndGame({ end: true, win: false });
    }
  }, [seconds]);
};
