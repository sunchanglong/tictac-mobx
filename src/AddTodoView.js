import { useState } from "react"
export default function AddTodoView ({todoStore}) {
  let [val, setVal] = useState('')
  function keyHandler (e) {
    if (e.key === 'Enter') {
      todoStore.add(val)
    }
  }
  return (
    <input 
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyDown={(event) => keyHandler(event)}
    >
    </input>
  )
}