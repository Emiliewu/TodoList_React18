import { memo } from 'react';
import TodoItem from './TodoItem';
import './Todo.css';


const Todo = memo(function Todo(props) {
    const {todos, toggleTodo, removeTodo} = props;
  return (
    <div className='todos'>
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem 
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                        />)
                })
            }
        </ul>
    </div>
  )
})

export default Todo;