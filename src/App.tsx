import './App.scss';
import Button from 'react-bootstrap/Button';
import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';
import CardPokemon from './components/CardPokemon';
import { Timer } from './components/Timer';
import PokeAPI from 'pokedex-promise-v2';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ModalEndGame } from './components/ModalEndGame';
import { EndGameHook } from './hooks/endGameHook';

export type SelectedCardType = {
  pokemon: PokeAPI.Pokemon;
  indexSelected: number;
};

export type EndGameEvent = {
  end: boolean;
  win?: boolean | undefined;
};

function App() {
  const pokedex = new Pokedex();
  const [infoPokemon, setPokemonResponse] = useState<any>([]); //Object of Pokemon
  const [rowsNumber, setRowsNumber] = useState(3); //Number of rows
  const [activeTimer, setTimer] = useState<boolean>(false); //Control timer
  const [selectedCards, setSelectedCards] = useState<SelectedCardType[]>([]); //Array to save the selected cards and compare
  const [correctCards, setCorrectCards] = useState<number[]>([]); //Array to save the position of the correct cards
  const [trys, addTry] = useState(0); //Control trys
  const [isInputBlocked, setIsInputBlocked] = useState<boolean>(false); //Block the click
  const [couples, setCouples] = useState<number>(8);
  //const [endGame, setEndGame] = useState(false);
  const [endGame, setEndGame] = useState<EndGameEvent>({ end: false });

  /**
   * Start game
   * Load a number of Pokemons from all the pokedex and load them to cards
   * @param numberOfPkmn Number of Pokemon
   */
  const loadPokemon = (numberOfPkmn: number) => {
    //Default values
    addTry(0);
    setCorrectCards([]);

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

    setCouples(numberOfPkmn);

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
      setTimer(true);
    });
  };

  //Block the game 1 second
  const setTimeOutPromise = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  //Clean the array of selected cards and block the input to prevent bugs in the game
  const emptySelectedCards = async () => {
    setIsInputBlocked(true);
    await setTimeOutPromise(1000);
    setSelectedCards([]);
    setIsInputBlocked(false);
  };

  //Control Game
  useEffect(() => {
    //Two cards selected
    if (selectedCards.length === 2) {
      //Don´t match -> clean the selectedCards Array/ Hidde the cards
      if (selectedCards[0].pokemon.id !== selectedCards[1].pokemon.id) {
        emptySelectedCards();
        addTry(trys + 1);
        return; //Go out of the use effect
      }
      //Match -> Add the two cards to Correct card array so they keep showing/ add a point
      setCorrectCards((currentCorrectCards) => {
        return [
          ...currentCorrectCards,
          selectedCards[0].indexSelected,
          selectedCards[1].indexSelected,
        ];
      });
      setSelectedCards([]); //Just clean the array, don´t need block the input
      addTry(trys + 1);
      setCouples(couples - 1);
    }
  }, [selectedCards]);

  const isCardSelected = (checkCard: PokeAPI.Pokemon, index: number) => {
    return selectedCards.some(
      (selectedCard) =>
        selectedCard.pokemon === checkCard &&
        selectedCard.indexSelected === index,
    );
  };

  const isCardCorrect = (index: number) => {
    return correctCards.some((correctCardIndex) => correctCardIndex === index);
  };

  //Control win
  EndGameHook({ couples, setEndGame });

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Memory Game</h1>
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
                <Timer active={activeTimer} setEndGame={setEndGame} />
              </Col>
              <Col lg={4}>Parejas restantes: {couples}</Col>
            </Row>
          </Container>
          <Container className='game'>
            <Row>
              {infoPokemon.map((item: PokeAPI.Pokemon, index: number) => (
                <Col lg={rowsNumber} key={index}>
                  <CardPokemon
                    pkmnProps={item}
                    isSelected={
                      isCardCorrect(index) || isCardSelected(item, index)
                    }
                    setSelectedCards={setSelectedCards}
                    isInputBlocked={isInputBlocked}
                    index={index}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </main>
      <ModalEndGame
        trys={trys}
        endGame={endGame}
        setEndGame={setEndGame}
        loadPokemon={loadPokemon}
        setTimer={setTimer}
      />
    </div>
  );
}

export default App;
