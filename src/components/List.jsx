import {useCallback, useState, useEffect} from 'react';
import {
    createAdd,
    createRemove,
    createSet,
    createToggle,
} from './action';
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
    console.log("initial todos");

   
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

    const dispatch = useCallback((action) => {
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
    }, []);



    useEffect(() => {
        const controller = new AbortController();
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
        console.log("set todos to local storage");
        return () => controller.abort(); 

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