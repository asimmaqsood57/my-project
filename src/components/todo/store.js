import { useReducerAsync } from 'use-reducer-async';
import { push } from 'react-router-redux';
import { createContainer } from 'react-tracked';
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    todoIds: [],
    todoMap: {},
    query: '',
    pending: false,
    error: null,
};
var token = localStorage.getItem("userToken");


const reducer = (state, action) => {
    switch (action.type) {
        case 'STARTED':
            return {
                ...state,
                pending: true,
            };
        case 'TODO_CREATED':
            return {
                ...state,
                todoIds: [...state.todoIds, action.todo.id],
                todoMap: { ...state.todoMap, [action.todo.id]: action.todo },
                pending: false,
            };
        case 'TODO_UPDATED':
            return {
                ...state,
                todoMap: { ...state.todoMap, [action.todo.id]: action.todo },
                pending: false,
            };
        case 'TODO_DELETED': {
            const { [action.id]: _removed, ...rest } = state.todoMap;
            
            return {
                ...state,
                todoIds: state.todoIds.filter((id) => id !== action.id),
                todoMap: rest,
                pending: false,
            };
            
        }
      
        case 'TODO_READ': {
            token = localStorage.getItem("userToken");
            console.log("ACTION");
            console.log(action);
            console.log("END ACTION");
            
            return {
                ...state,
                todoIds: action.todo,
                todoMap: action.todo,
                pending: false,
            };
        }
        case 'FAILED':
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case 'QUERY_CHANGED':
            return {
                ...state,
                query: action.query,
            };
        default:
            return {
                ...state,
                pending: false,
                error: "NO ACTION"
            }
            break;
//            throw new Error('unknown action type');
    }
};

const asyncActionHandlers = {
    
    READ_TODO:
        ({ dispatch }) =>
            
            async (action) => {
                
                try {
                    token = localStorage.getItem("userToken");
                    dispatch({ type: 'STARTED' });
                    const response = await axios.get(`https://api.flowit.pt/APIv1/todo/${token}`
                       );
                    const res = await response.data;
                    console.log("DADOS LIDOS");
                    console.log(res);
                    console.log("FIM DADOS LIDOS");
                    
                    dispatch({ type: 'TODO_READ', todo:res });
                } catch (error) {
                    if (error.response.status != undefined && error.response.status === 403) {
                        localStorage.clear();
                        dispatch(push('/'));
                       // history.push("/");
                        /*history.push("/"); Doesn't work inside class*/
                    } else if (
                        error.response.status != undefined &&
                        error.response.status === 400
                    ) {
                        toast.error(error.response.data.detail);
                    }
                }
            },
    CREATE_TODO:
        ({ dispatch }) =>
            async (action) => {
                try {
                    dispatch({ type: 'STARTED' });
                 
                    const response = await axios.post(`https://api.flowit.pt/APIv1/todo/${token}`, 
                        { title: action.title },
                    );
                    const data = await response.data;
           
                    dispatch({ type: 'TODO_CREATED', todo: data });


                    const response2 = await axios.get(`https://api.flowit.pt/APIv1/todo/${token}`
                    );
                    const res = await response.data;
                    console.log("DADOS LIDOS");
                    console.log(res);
                    console.log("FIM DADOS LIDOS");

                    dispatch({ type: 'TODO_READ', todo: res });


                } catch (error) {
                    dispatch({ type: 'FAILED', error });
                }
            },
    TOGGLE_TODO:
        ({ dispatch, getState }) =>
            async (action) => {
                try {
                    dispatch({ type: 'STARTED' });
                    const todo = getState().todoMap[action.id];
                    const body = {
                        ...todo,
                        completed: !todo.completed,
                    };
                    const response = await fetch(
                        `https://api.flowit.pt/APIv1/todo/${action.id}/${token}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        },
                    );
                    const data = await response.json();
                    if (typeof data.title !== 'string') throw new Error('no title');
                    dispatch({ type: 'TODO_UPDATED', todo: { ...data, id: action.id } });
                } catch (error) {
                    dispatch({ type: 'FAILED', error });
                }
            },
    DELETE_TODO:
        ({ dispatch ,state}) =>
            async (action) => {
                try {
                    dispatch({ type: 'STARTED' });
                    await fetch(`https://api.flowit.pt/APIv1/todo/${action.id}/${token}`, {
                        method: 'DELETE',
                    });
                    dispatch({ type: 'TODO_DELETED', id: action.id });
                    const response = await axios.get(`https://api.flowit.pt/APIv1/todo/${token}`
                    );
                    const res = await response.data;
                    console.log("DADOS LIDOS");
                    console.log(res);
                    state = res;
                    console.log("FIM DADOS LIDOS");

                    dispatch({ type: 'TODO_READ', todo: res });

                } catch (error) {
                    dispatch({ type: 'FAILED', error });
                }
            },
};

const useValue = () => 
    useReducerAsync(reducer, initialState, asyncActionHandlers);
//const history3 = useHistory();
export const {
    Provider,
    useTrackedState,
    useUpdate: useDispatch,
} = createContainer(useValue);
