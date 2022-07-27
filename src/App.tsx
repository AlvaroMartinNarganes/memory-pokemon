import './App.scss';
import Button from 'react-bootstrap/Button';
import Pokedex from 'pokedex-promise-v2';
import { useState } from 'react';
import CardPokemon from './components/CardPokemon';

function App() {
  const pokedex = new Pokedex();
  const [infoPokemon, setPokemonResponse] = useState(Object);

  /**
   * Load a number of Pokemons from all the pokedex and load them to cards
   * @param numberOfPkmn Number of Pokemon
   */
  const loadPokemon = (numberOfPkmn: number) => {
    var arrNumbers = [];

    const num = Math.floor(Math.random() * (898 - 1 + 1) + 1);

    pokedex.getPokemonByName(num).then((response) => {
      setPokemonResponse(response);
    });
  };

  //Get 5 numbers no repeat
  const tryThis = () => {};

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>POKEMON</h1>
      </header>
      <main>
        <section>
          <Button variant='light' onClick={() => loadPokemon(4)}>
            Facil
          </Button>
          <Button variant='light' onClick={tryThis}>
            Normal
          </Button>
          <Button variant='light'>Dificil</Button>
        </section>
        <div>{infoPokemon && <CardPokemon {...infoPokemon} />}</div>
      </main>
    </div>
  );
}

export default App;
