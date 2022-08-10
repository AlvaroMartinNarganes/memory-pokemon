import { useEffect } from 'react';

type Props = {
  couples: number;
  setEndGame: any;
  setTimer: any;
};

export const EndGameHook = ({ couples, setEndGame, setTimer }: Props) => {
  //Control end game
  useEffect(() => {
    if (couples === 0) {
      setEndGame({ end: true, win: true });
      setTimer(false);
    }
  }, [couples]);
};
