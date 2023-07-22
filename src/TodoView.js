import { observer } from "mobx-react-lite"
export default observer(
  function ({todo}) {
    return (
      <li> <label>{todo.title}</label><input type="checkbox" onClick={() => todo.toggle()}></input> </li>
    )
  }
)