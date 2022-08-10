import { Button, Modal } from 'react-bootstrap';
import { EndGameEvent } from '../App';

type Props = {
  trys: number;
  endGame: EndGameEvent;
  setEndGame: any;
  loadGame: any;
  setTimer: any;
};

export const ModalEndGame = ({
  trys,
  endGame,
  setEndGame,
  loadGame,
  setTimer,
}: Props) => {
  //const [show, setShow] = useState(false);
  const handleClose = () => {
    setTimer(false);
    loadGame(8);
    setEndGame({ end: false });
  };
  //const handleShow = () => setEndGame(true);
  return (
    <Modal
      show={endGame.end}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header>
        {endGame.win === true && <Modal.Title>HAS GANADO</Modal.Title>}
        {endGame.win === false && <Modal.Title>HAS PERDIDO</Modal.Title>}
      </Modal.Header>
      <Modal.Body>INTENTOS: {trys}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          REINICIAR
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
