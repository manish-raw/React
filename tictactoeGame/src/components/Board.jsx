 import Square from "./Square";
 import { useState } from "react";
 export default function Board(){
    const [nextTurn, setNextTurn] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    

    function handleClick(i){
        if(squares[i] || calculateWinner(squares)){
            return
        }
        const newSquare = squares.slice();
        if(nextTurn) {
            newSquare[i]="X";
        } else{
            newSquare[i]="O";
        }
        setSquares(newSquare);
        setNextTurn(!nextTurn)
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Player turn: " + (nextTurn ? "X" : "O");
    }

    return (
        <>
            
            <div className="bg-gray-900 h-screen">
                <div className="text-white sticky w-full bg-gray-600 p-4 text-center font-bold text-3xl cursor-pointer">Tic Tac Toe Game</div>
                <div className="text-black mb-10 p-5 bg-white text-2xl ">{status}</div>

                <div className="w-2/12 border-1 h-14">
                    <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
                </div>
                <div className="w-2/12 border-1 h-14">
                    <Square value={squares[3]} onSquareClick={()=> handleClick(3)}/>
                    <Square value={squares[4]} onSquareClick={()=> handleClick(4)}/>
                    <Square value={squares[5]} onSquareClick={()=> handleClick(5)}/>
                </div>
                <div className="w-2/12 border-1 h-14">
                    <Square value={squares[6]} onSquareClick={()=> handleClick(6)}/>
                    <Square value={squares[7]} onSquareClick={()=> handleClick(7)}/>
                    <Square value={squares[8]} onSquareClick={()=> handleClick(8)}/>
                </div>
            </div>
            
        </>
    )


    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
 }