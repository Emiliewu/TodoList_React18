import {useCallback, useState, useEffect} from 'react';
import Control from './Control';
import Todo from './Todo';
import './List.css';

const LS_KEY = "_$todolist_";

function List() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LS_KEY) || '[]'));
   
    // const addTodo = useCallback((todo) => {
    //     setTodos(todos => [...todos, todo]);
    // }, []);

    // const removeTodo = useCallback((id) => {
    //     setTodos(todos => todos.filter(todo => {
    //         return todo.id !== id;
    //     }));
    // }, []);

    // const toggleTodo = useCallback((id) => {
    //     setTodos(todos => todos.map(todo => {
    //         return todo.id === id
    //             ? {
    //                 ...todo,
    //                 complete: !todo.complete,
    //             }
    //             : todo;
    //     }));
    // }, []);

    const dispatch = (action) => {
        const { type, payload } = action;
        switch(type) {
            case 'set':
                setTodos(payload);
                break;
            case 'add':
                setTodos(todos => [...todos, payload]);
                break;
            case 'remove':
                setTodos(todos => todos.filter(todo => {
                    return todo.id !== payload;
                }));
                break;
            case 'toggle':
                setTodos(todos => todos.map(todo => {
                    return todo.id === payload
                        ? {
                            ...todo,
                            complete: !todo.complete,
                        }
                        : todo;
                }));
                break;
            default:
        }
    };

    // useEffect(() => {
    //     // const controller = new AbortController();
    //     const todoslist = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    //     dispatch({type: 'set', payload: todos});
    //     // return () => controller.abort(); 

    // }, []);

    useEffect(() => {
        // const controller = new AbortController();
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
        // return () => controller.abort(); 

    }, [todos]);

 
    

  return (
    <div className='todo-list'>
    <Control dispatch={dispatch} />
    <Todo dispatch={dispatch}  todos={todos}/>
    </div>
  )
}

export default List;