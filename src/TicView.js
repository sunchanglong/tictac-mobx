import { makeObservable, observable, computed, action } from "mobx";
import { observer } from "mobx-react-lite"
class TicStore {
  history = [Array(9).fill(0)]
  currStep = 0
  nextIsX = true
  constructor () {
    makeObservable(this,{
      history: observable,
      nextIsX: observable,
      currStep: observable,
      clickCell: action,
      winner: computed,
      cells: computed,
      setCurrStep: action
    })
  }
  get cells () {
    return this.history[this.currStep]
  }
  clickCell (index) {
    if (this.cells[index] !== 0 || this.winner) {
      return
    }
    let cells = this.cells.slice()
    if (this.nextIsX) {
      cells[index] = 'X'
    } else {
      cells[index] = 'O'
    }
    
    this.history = this.history.slice(0, this.currStep + 1)
    this.history.push(cells)
    this.currStep++
    this.nextIsX = !this.nextIsX
  }
  get winner () {
    // console.log('winner')
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let line of lines) {
      let [x, y, z] = line
      // console.log(x, y, z, this.cells)
      if (this.cells[x] !== 0 && this.cells[x] === this.cells[y] && this.cells[y] === this.cells[z]) {
        // console.log('calculate winner', this.cells[x])
        return this.cells[x]
      }
    }
    return ''
  }
  setCurrStep (step) {
    this.currStep = step
    if (step % 2 === 0) {
      this.nextIsX = true
    } else {
      this.nextIsX = false
    }
  } 

}
let ticStore = new TicStore()

let Cell = observer(function Cell ({index}) {
  // console.log(ticStore.cells)
  console.log('render cell', index)
  return (
    <div className={'cell '} onClick={() => ticStore.clickCell(index)}>
      {/* {index} */}
      {ticStore.cells[index] === 0 ? '' : ticStore.cells[index]}
    </div>
  )
})



export default observer(function TicView () {
  let cells = []
  for (let i = 0; i < 9; i++) {
    cells.push(<Cell index={i} key={i}></Cell>)
  }
  // console.log(JSON.stringify(ticStore.cells))
  let winner = ticStore.winner
  return (
    <div>
      <h4> next is {ticStore.nextIsX ? 'X' : 'O'}</h4>
      <div className="cell-wrapper">
        {cells}
      </div>
      {winner && <h4>Winer is {winner}</h4>}
      <ul>
        {ticStore.history.map((v, index) => (
          <li onClick={() => ticStore.setCurrStep(index)} key={index}>go to {index === 0 ? 'start' : index}</li>
        ))}
      </ul>
    </div>
  )
  
})