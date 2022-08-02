import './App.scss';
import Button from 'react-bootstrap/Button';
import Pokedex from 'pokedex-promise-v2';
import { useState } from 'react';
import CardPokemon from './components/CardPokemon';
import Timer from './components/Timer';
import PokeAPI from 'pokedex-promise-v2';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const pokedex = new Pokedex();
  const [infoPokemon, setPokemonResponse] = useState<any>([]); //Object of Pokemon
  const [rowsNumber, setRowsNumber] = useState(3); //Number of rows
  const [activeTimer, setTimer] = useState<boolean>(false); //Control timer

  /**
   * Load a number of Pokemons from all the pokedex and load them to cards
   * @param numberOfPkmn Number of Pokemon
   */
  const loadPokemon = (numberOfPkmn: number) => {
    //Adjust the table
    switch (numberOfPkmn) {
      case 8:
        setRowsNumber(3);
        break;
      case 12:
        setRowsNumber(2);
        break;
      case 15:
        setRowsNumber(2);
        break;
      default:
        break;
    }
    //Save random Ids
    var pokemonIds = [];
    var i = numberOfPkmn - 1;
    var firstNum = Math.floor(Math.random() * (898 - 1 + 1) + 1);
    pokemonIds.push(firstNum);
    pokemonIds.push(firstNum);
    while (i !== 0) {
      var num = Math.floor(Math.random() * (898 - 1 + 1) + 1);
      if (!pokemonIds.includes(num)) {
        pokemonIds.push(num);
        pokemonIds.push(num);
        i--;
      }
    }
    //Send Ids and return info
    pokedex.getPokemonByName(pokemonIds).then((response) => {
      setPokemonResponse(response);
      //StartTimer when the cards are loaded
      setTimer((activeTimer) => (activeTimer = !activeTimer));
    });
  };

  //Control Game
  const [selectedCard, setSelectedData] = useState<string>('');
  const [trys, addTry] = useState(0);
  const infoSelectedCard = (card: string) => {
    //Set the first card
    if (selectedCard === '') {
      setSelectedData(card);
    } else {
      if (card === selectedCard) {
        //Correct-> Add a point, block the cards
      } else {
        //Flip cards Again (ONLY SELECTEDCARD AND ACTUAL CARD)
      }
      setSelectedData('');
      addTry((trys) => trys + 1);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>POKEMON</h1>
      </header>
      <main>
        <section>
          <Button variant='light' onClick={() => loadPokemon(8)}>
            Facil
          </Button>
          <Button variant='light' onClick={() => loadPokemon(12)}>
            Normal
          </Button>
          <Button variant='light' onClick={() => loadPokemon(15)}>
            Dificil
          </Button>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg={4}>Intentos: {trys}</Col>
              <Col lg={4}>
                <Timer active={activeTimer} />
              </Col>
              <Col lg={4}>Parejas restantes:{selectedCard}</Col>
            </Row>
          </Container>
          <Container>
            <Row>
              {infoPokemon.map((item: PokeAPI.Pokemon, index: number) => (
                <Col lg={rowsNumber} key={index}>
                  <CardPokemon
                    pkmnProps={item}
                    key={index}
                    infoSelectedCard={infoSelectedCard}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default App;
