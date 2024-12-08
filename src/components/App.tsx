import React from 'react'
import { deleteTodo, fetchTodos, Todo } from '../actions'
import { StoreState } from '../reducers'
import { connect } from 'react-redux'

interface AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: typeof deleteTodo
}

interface AppState {
  fetching: boolean
}
class _App extends React.Component<AppProps, AppState> {
  // either defining the state in the constructor like below, and defining the interface that it will adhere to
  // or we could just define the state simply like this
  // state = { fetching: false }
  constructor(props: AppProps) {
    super(props)
    this.state = { fetching: false }
  }

  componentDidUpdate(prevProps: Readonly<AppProps>): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos()
    this.setState({ fetching: true })
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id)
  }
  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => (
      <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
        {todo.title}
      </div>
    ))
  }

  render() {
    console.log(this.props.todos)
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        <br />
        {this.state.fetching && 'Loading...'}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return {
    todos,
  }
}

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App)
