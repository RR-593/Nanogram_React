import './nanogram-board.css';
import Tile from './Tile'

export default function NanoBoard(props){

    const createNanoBoard = size => {
      if (size <= 0)
        return []
      let boardArr = []
      let row = []
      let i = size
      while (i --> 0)
        row.push(new Tile(0))
      
      i = size
      while (i --> 0)
        boardArr.push(row)
      return boardArr
    }
    
    let nanoBoard = createNanoBoard(props.size)

    return (
        <div className="nanogram-board">
          {nanoBoard.map( (row,index) => (
              <div key={index} className="row">
                {row.map( (tile,index) => (<Tile size={props.size} key={index}/>))}
              </div>
            )
          )}
        </div>
    )

}