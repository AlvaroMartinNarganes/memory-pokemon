import { useState } from 'react';
import { Card } from 'react-bootstrap';
import PokeAPI from 'pokedex-promise-v2';

function CardPokemon(pkmnProps: PokeAPI.Pokemon) {
  const [showCard, setFlip] = useState(false);
  const flipCard = () => {
    setFlip(!showCard);
  };

  return (
    <Card style={{ width: '10rem' }} onClick={flipCard} className='card'>
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
