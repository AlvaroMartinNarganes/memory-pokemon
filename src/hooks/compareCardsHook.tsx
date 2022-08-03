import PokeAPI from 'pokedex-promise-v2';
import { useEffect } from 'react';

const CompareCardsHook = (
  cardOne: PokeAPI.Pokemon | undefined,
  cardTwo: PokeAPI.Pokemon | undefined,
) => {
  useEffect(() => {
    if (cardOne && cardTwo) {
      console.log(cardOne.id);
      console.log(cardTwo.id);
      if (cardOne.id === cardTwo.id) {
        console.log('PUNTO');
      } else {
        console.log('NOOOO');
      }
    }
  }, [cardOne, cardTwo]);
};

export { CompareCardsHook };
