import { memo } from 'react';
import TodoItem from './TodoItem';
import './Todo.css';


const Todo = memo(function Todo(props) {
    const {todos, removeTodo, toggleTodo} = props;
  return (
    <div className='todos'>
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem 
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                        />)
                })
            }
        </ul>
    </div>
  )
})

export default Todo;