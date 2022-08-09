import { useEffect } from 'react';

type Props = {
  couples: number;
  setEndGame: any;
};

export const EndGameHook = ({ couples, setEndGame }: Props) => {
  //Control end game
  useEffect(() => {
    if (couples === 0) {
      setEndGame({ end: true, win: true });
    }
  }, [couples]);
};
