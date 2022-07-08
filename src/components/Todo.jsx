import { memo } from 'react';
import TodoItem from './TodoItem';
import './Todo.css';


const Todo = memo(function Todo(props) {
    const {todos, dispatch} = props;
  return (
    <div className='todos'>
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem 
                        key={todo.id}
                        todo={todo}
                        dispatch={dispatch}
                        />)
                })
            }
        </ul>
    </div>
  )
})

export default Todo;