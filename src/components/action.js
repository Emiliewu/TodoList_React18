export function createSet(payload) {
    return {
        type: 'set',
        payload,
    };
}

let idSeq = Date.now();

export function createAdd(text) {
    return (dispatch, state) => {
        const {todos} = state;
        if(!todos.find(todo => todo.text === text)){
            dispatch({
                type: 'add',
                payload: {
                    id: ++idSeq,
                    text,
                    complete: false,
                },
            })
        }
    };
}

export function createRemove(payload) {
    return {
        type: 'remove',
        payload,
    };
}

export function createToggle(payload) {
    return {
        type: 'toggle',
        payload,
    };
}