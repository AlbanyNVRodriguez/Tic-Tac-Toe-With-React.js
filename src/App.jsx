import { useState, useEffect } from "react";
import { Board } from "./components/Board"
import { ButtonRepeat } from "./components/ButtonRepeat";
import { ButtonRestart } from "./components/ButtonRestart";
import { History } from "./components/History"
import { Marker } from "./components/Marker";

export const App = () => {

    const [allSquare, setAllSquare] = useState(Array(9).fill(null));
    const [history, setHistory] = useState([]);
    const [marker, setMarker] = useState(JSON.parse(localStorage.getItem("marker")) || { x: 0, o: 0 });
    const [xIsNexPlayer, setXIsNexPlayer] = useState(true);
    const [title, setTitle] = useState({ text: "", player: "" });

    useEffect(() => {
        let winningPlayer = winner();

        if (winningPlayer) setMarker({ ...marker, [winningPlayer.toLowerCase()]: marker[winningPlayer.toLowerCase()] + 1 });

        setTitle({
            text: history.length == 0 ? "First Player " : winningPlayer ? "Winner " : `Next Player `,
            player: winningPlayer ? winningPlayer : xIsNexPlayer ? "X" : "O"
        });
    }, [allSquare]);

    useEffect(() => {
        localStorage.setItem("marker", JSON.stringify(marker));
    }, [marker]);

    const handleClick = ({ target }) => {
        let index = Number(target.dataset.index);

        if (allSquare[index] || document.querySelectorAll(".square")[index].className.includes("disable")) return;

        let allSquareCopy = [...allSquare];
        allSquareCopy[index] = xIsNexPlayer ? "X" : "O";
        setAllSquare(allSquareCopy);

        setHistory([...history, {
            player: xIsNexPlayer ? "X" : "O",
            index
        }]);
        setXIsNexPlayer(!xIsNexPlayer);
        target.classList.add(allSquareCopy[index] == "X" ? "color-red" : "color-violet");
    }

    const winner = () => {
        let playPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < playPatterns.length; i++) {

            let [a, b, c] = playPatterns[i];

            if (allSquare[a] && allSquare[a] === allSquare[b] && allSquare[a] === allSquare[c]) {
                document.querySelectorAll(".square")[a].classList.add("winner");
                document.querySelectorAll(".square")[b].classList.add("winner");
                document.querySelectorAll(".square")[c].classList.add("winner");
                document.querySelector(".board_btn-rematch").classList = `board_btn-rematch ${allSquare[a] == "X" ? "bg-red" : "bg-violet"}`;
                document.querySelector(".board_btn-rematch").textContent = "Rematch";

                allSquare.forEach((el, index) => el === null && document.querySelectorAll(".square")[index].classList.add("disabled"));

                return allSquare[a];
            }
        }

        if(allSquare.every(el => el !== null)){
            document.querySelector(".board_btn-rematch").classList = "board_btn-rematch";
            document.querySelector(".board_btn-rematch").textContent = "No Winner";
        }
    }

    const restartGame = () => {
        repeatGame();
        setMarker({ x: 0, o: 0 });
    }

    const repeatGame = () => {
        setAllSquare(Array(9).fill(null));
        setHistory([]);
        setXIsNexPlayer(true);
        document.querySelector(".board_btn-rematch").classList.add("hidden");
        document.querySelectorAll(".square").forEach(el => el.classList = "square");
    }

    return (
        <>
            <h1 className="title">Tic Tac Toe With React</h1>
            <Board rematch={repeatGame} allSquare={allSquare} handleClick={handleClick} title={title} />
            <div className="register">
                <History history={history} />
                <Marker marker={marker} />
            </div>
            <div className="buttons">
                <ButtonRestart restartGame={restartGame} />
                <ButtonRepeat repeatGame={repeatGame} />
            </div>
        </>
    )
}
