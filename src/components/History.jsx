export const History = ({history}) => {
    return (
        <div className="history">
            <h3>History</h3>
            <ol className="history_moves">
                {history.map(el => <li key={el.index}>{el.player} - {el.index + 1}</li>)}
            </ol>
        </div>
    )
}
