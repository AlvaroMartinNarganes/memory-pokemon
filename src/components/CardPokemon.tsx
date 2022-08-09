import { Card } from 'react-bootstrap';
import PokeAPI from 'pokedex-promise-v2';
import { SelectedCardType } from '../App';

function CardPokemon({
  pkmnProps,
  isSelected,
  setSelectedCards,
  index,
  isInputBlocked,
}: {
  pkmnProps: PokeAPI.Pokemon;
  isSelected: boolean;
  setSelectedCards: React.Dispatch<React.SetStateAction<SelectedCardType[]>>;
  index: number;
  isInputBlocked: boolean;
}) {
  const flipCard = () => {
    setSelectedCards((currentSelectedCards) => {
      const newSelectedCards: SelectedCardType[] = [...currentSelectedCards];

      newSelectedCards.push({
        indexSelected: index,
        pokemon: pkmnProps,
      });

      return newSelectedCards;
    });
  };

  return (
    <Card
      style={{
        width: '10rem',
        pointerEvents: isInputBlocked ? 'none' : 'auto',
      }}
      onClick={flipCard}
      className='card'
    >
      {!isSelected && (
        <div>
          <Card.Img src='pkmnLogo.png' />
        </div>
      )}
      {isSelected && (
        <div>
          <Card.Title>{pkmnProps.name}</Card.Title>
          <Card.Img src={pkmnProps.sprites.front_default!} />
        </div>
      )}
    </Card>
  );
}

export default CardPokemon;
