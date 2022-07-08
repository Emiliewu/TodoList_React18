import { memo } from 'react';
import {
    createRemove,
    createToggle,
} from './action';
import './TodoItem.css';


const TodoItem = memo(function TodoItem(props) {
    const {todo: {
        id,
        text,
        complete
        },
        dispatch,
    } = props;

    const onChange = () => {
        dispatch(createToggle(id));
    };

    const onRemove = () => {
        dispatch(createRemove(id));
    };

  return (
    <li className='todo-item'>
        <div className='input-text'>
        <input 
            type="checkbox" 
            onChange={onChange} 
            checked={complete}
        />
        <label className={complete ? 'complete' : ''}>{ text }</label>
        </div>
        <button onClick={onRemove}> &#xd7; </button>
    </li>
  )
})

export default TodoItem