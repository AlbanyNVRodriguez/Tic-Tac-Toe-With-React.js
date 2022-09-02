export const Marker = ({ marker }) => {
    return (
        <div className="marker">
            <h3>Marker</h3>
            <ol>
                {
                    Object.entries(marker).map(element => 
                        <li 
                            key={element[0]}
                            className={element[0] == "x"? "color-red" : "color-violet"}
                            >
                            {`${element[0].toUpperCase()} = ${element[1]}`}
                        </li>
                    )}
            </ol>
        </div>
    )
}