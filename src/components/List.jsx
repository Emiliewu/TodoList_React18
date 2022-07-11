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

let storeState = {
    todos: [],
    count: 0,
};

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

    useEffect(() => {
        Object.assign(storeState, {
            todos,
            count,
        });
        console.log("todos", todos);
    }, [todos, count]);

    
    
    const dispatch = (action) => {
      
        const setters = {
            todos: setTodos,
            count: setCount,
        }
        if('function' === typeof action){
            action(dispatch, () => storeState);
            return;
        }
        const newState = reducer(storeState, action);
        console.log(newState);

        for(let key in newState) {
            setters[key](newState[key]);
        }
    };



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