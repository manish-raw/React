
export default function Square({value, onSquareClick}){

    return (
        <button className="h-full w-1/3 text-center border-2 text-white text-2xl" onClick={onSquareClick}>
            {value}
        </button>
    )
    
}