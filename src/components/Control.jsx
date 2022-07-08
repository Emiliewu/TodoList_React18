import { memo, useRef } from 'react';
import './Control.css';

let idSeq = Date.now();

const Control = memo(function Control(props) {
    const { dispatch } = props;
    const inputRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        if(newText.length === 0) {
            return;
        }
  
        dispatch ({
            type: 'add', 
            payload: {
                id: ++idSeq,
            text: newText,
            complete: false,
            },
        });
        inputRef.current.value = '';
    };
  return (
    <div className='control'>
        <h1>
            Todo List
        </h1>
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                ref = {inputRef}
                className='new-todo'
                placeholder='Add a new task'
            />
        </form>
    </div>
  )
})

export default Control;