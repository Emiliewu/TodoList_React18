import {useCallback, useState, useEffect} from 'react';
import {
    createAdd,
    createRemove,
    createSet,
    createToggle,
} from './action';
import reducer from './reducers';
import Control from './Control';
import Todo from './Todo';
import './List.css';

const LS_KEY = "_$todolist_";


function bindActionCreators(actionCreators, dispatch) {
    const ret = {};
    for(let key in actionCreators) {
        ret[key] = function(...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        };
    }
    return ret;
}

function List() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LS_KEY) || '[]'));
    const [count, setCount] = useState(0);

    // function reducer(state, action) {
    //     const {type, payload} = action;
    //     const { todos } = state;

    //     switch(type) {
    //         case 'set':
    //             return {
    //                 ...state,
    //                 todos: payload,
    //                 count: count + 1,
    //             };
    //         case 'add':
    //             return {
    //                 ...state,
    //                 todos:  [...todos, payload],
    //                 count: count + 1,
    //             };
    //         case 'remove':
    //             return {
    //                 ...state,
    //                 todos: todos.filter(todo => {
    //                     return todo.id !== payload;
    //                 }),
    //             };
    //         case 'toggle':
    //             return {
    //                 ...state,
    //                 todos: todos.map(todo => {
    //                     return todo.id === payload
    //                         ? {
    //                             ...todo,
    //                             complete: !todo.complete,
    //                         }
    //                         : todo;
    //                 }),
    //             };
    //         default:
    //     }
    //     return state;
    // }
    
    const dispatch = useCallback((action) => {
        const state = {
            todos,
            count,
        };
        const setters = {
            todos: setTodos,
            count: setCount,
        }
        const newState = reducer(state, action);
        console.log(newState);

        for(let key in newState) {
            setters[key](newState[key]);
        }
    }, [todos, count]);



    useEffect(() => {
        // const controller = new AbortController();
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
        console.log("set todos to local storage");
        // return () => controller.abort(); 

    }, [todos]);

 
    

  return (
    <div className='todo-list'>
    <Control 
    {
        ...bindActionCreators({
            addTodo: createAdd
        }, dispatch)
    }
     />
    <Todo 
    {
        ...bindActionCreators({
            removeTodo: createRemove,
            toggleTodo: createToggle,
        }, dispatch)

    }
    todos={todos}/>
    </div>
  )
}

export default List;