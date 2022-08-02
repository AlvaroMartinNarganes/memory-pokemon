import { useState } from 'react';
import { Card } from 'react-bootstrap';
import PokeAPI from 'pokedex-promise-v2';

function CardPokemon({
  pkmnProps,
  infoSelectedCard,
}: {
  pkmnProps: PokeAPI.Pokemon;
  infoSelectedCard: any;
}) {
  const [showCard, setFlip] = useState(false);
  const flipCard = () => {
    //Flip the card
    setFlip(true);
    //Send the Id to the parent to compare with the second
    infoSelectedCard(pkmnProps.name);
  };

  const resetCard = () => {
    setFlip(false);
  };

  return (
    <Card style={{ width: '10rem' }} onClick={flipCard} className='card'>
      {!showCard && (
        <div>
          <Card.Img src='pkmnLogo.png' />
        </div>
      )}
      {showCard && (
        <div>
          <Card.Title>{pkmnProps.name}</Card.Title>
          <Card.Img src={pkmnProps.sprites.front_default!} />
        </div>
      )}
    </Card>
  );
}

export default CardPokemon;
