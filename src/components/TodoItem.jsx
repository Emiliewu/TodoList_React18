import { memo } from 'react';
import './TodoItem.css';


const TodoItem = memo(function TodoItem(props) {
    const {todo: {
        id,
        text,
        complete
        },
        toggleTodo,
        removeTodo,
    } = props;

    const onChange = () => {
        toggleTodo(id);
    };

    const onRemove = () => {
        removeTodo(id);
    };

  return (
    <li className='todo-item'>
        <div className='input-text'>
        <input 
            type="checkbox" 
            onChange={onChange} c
            hecked={complete}
        />
        <label className={complete ? 'complete' : ''}>{ text }</label>
        </div>
        <button onClick={onRemove}> &#xd7; </button>
    </li>
  )
})

export default TodoItem