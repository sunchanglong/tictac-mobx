import logo from './logo.svg';
import './App.css';
import {TodoList, Todo} from './todoStore'
// import TodoListView from './TodoListView';
// import AddTodoView from './AddTodoView';
import TicView from './TicView';
function App() {
  let todoStore = new TodoList([new Todo('todo1'), new Todo('todo2')])
  return (
    <div className='container'>
      
      {/* <TodoListView todoStore={todoStore}></TodoListView>
      <AddTodoView todoStore={todoStore}></AddTodoView> */}
      <TicView></TicView>
    </div>
    
  );
}

export default App;
