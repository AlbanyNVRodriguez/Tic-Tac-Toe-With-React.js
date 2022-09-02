export const Square = ({index, value, handleClick}) => {
    return (
        <div className='square' data-index={index} onClick={handleClick}>{value}</div>
    )
}
