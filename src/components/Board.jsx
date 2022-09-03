export const Board = ({ rematch, allSquare, title, handleClick }) => {
    return (
        <div className="board">
            <button className="board_btn-rematch hidden" onClick={rematch}>rematch!</button>
            <h3 className="board_title">{title.text} <span className={title.player == "X"? "color-red" : "color-violet"}>{title.player}</span></h3>
            <div className="board_game" >
                {
                    allSquare.map((value, index) => 
                        <div key={index} className='square' data-index={index} onClick={handleClick}>{value}</div>)
                }
            </div>
        </div>
    )
}
