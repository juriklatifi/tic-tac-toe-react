import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Modal_({gameOver, handleStartNewGame}){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(gameOver,222)

  
  useEffect(() => {
    if(gameOver) {
        handleShow()
    }

  }, [gameOver])

  const handleNewGame = () => {
    handleClose(); // Close the modal
    handleStartNewGame(); // Start a new game
  };

    return <>
    <div className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Winner is {gameOver}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleNewGame}>Start a new Game</Button>
        </Modal.Footer>
      </Modal>
    </div>

 </>
}