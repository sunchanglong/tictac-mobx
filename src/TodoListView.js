import { observer } from "mobx-react-lite"
import TodoView from "./TodoView"
import { useState } from "react"
function filter (todos, name) {
  return todos.filter(v => {
    if (name) {
      return v.title.indexOf(name) > -1
    }
    return true
  })
}
export default observer(function ({todoStore}) {
  let [name, setName] = useState('')
  return (
    <div>
      <div>
        <form>
          <input onChange={(event) => setName(event.currentTarget.value)}></input>
        </form>
      </div>
      <ul>
      {filter(todoStore.todos, name).map((v, index) => (<TodoView todo={v} key={v.id}></TodoView>))}
      </ul>
      <p>{todoStore.unfinished}</p>
    </div>
  )
})