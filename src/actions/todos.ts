import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos
  payload: Todo[]
}
export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo
  payload: number
}

const url = 'https://jsonplaceholder.typicode.com/todos'
export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get<Todo[]>(url)

    dispatch({
      type: ActionTypes.fetchTodos,
      payload: res.data,
    }) as FetchTodosAction
  }
}

export const deleteTodo = (id: number): DeleteTodoAction => {
  return { type: ActionTypes.deleteTodo, payload: id }
}
