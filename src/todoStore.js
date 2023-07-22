import { makeObservable, observable, computed, action } from "mobx";
export  class TodoList {
  todos = []
  constructor(todos) {
    makeObservable(this, {
      todos: observable,
      unfinished: computed,
      add: action
    })
    this.todos = todos
  }
  get unfinished () {
    return this.todos.filter(v => !v.finished).length
  }

  add (title) {
    let todo = new Todo(title)
    this.todos.push(todo)
  }
}

export class Todo {
  id = Math.random()
  title = ''
  finished = false
  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action
    })
    this.title = title
  }
  toggle () {
    this.finished = !this.finished
  }
}