import { useEffect, useState } from "react";
import { Square } from "./Square"

export const Board = ({ rematch, allSquare, title, handleClick }) => {
    return (
        <div className="board">
            <button className="board_btn-rematch hidden" onClick={rematch}>rematch!</button>
            <h3 className="board_title">{title.text} <span className={title.player == "X"? "color-red" : "color-violet"}>{title.player}</span></h3>
            <div className="board_game" >
                {
                    allSquare.map((value, index) => <Square key={index} index={index} value={allSquare[index]} handleClick={handleClick} />)
                }
            </div>
        </div>
    )
}
