"use client"

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal_ from '@/components/Modal_';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Import your CSS file

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleStartNewGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderBox(i) {
    const isWinner = calculateWinner(squares);
    const isFilled = squares[i];

    let boxClass = 'box';
    if (isWinner) {
      boxClass += isWinner === squares[i] ? ' winner-box' : ' loser-box';
    }
    if (isFilled) {
      boxClass += ' filled-box';
    }

    return (
      <Col className={boxClass} onClick={() => handleClick(i)}>
        <div className="box-content">{squares[i]}</div>
      </Col>
    );
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <Container>
      <Modal_ gameOver={winner} handleStartNewGame={handleStartNewGame} />
      <Row className='m-5'>
        <Col className='text-center'>
          <h1>{status}</h1>
          <h2>Epic Game - Tic Tac Toe</h2>
          <Button variant='primary' onClick={handleStartNewGame}>
            Reset game
          </Button>
        </Col>
      </Row>
      <Row>
        {renderBox(0)}
        {renderBox(1)}
        {renderBox(2)}
      </Row>
      <Row>
        {renderBox(3)}
        {renderBox(4)}
        {renderBox(5)}
      </Row>
      <Row>
        {renderBox(6)}
        {renderBox(7)}
        {renderBox(8)}
      </Row>
    </Container>
  );
}
