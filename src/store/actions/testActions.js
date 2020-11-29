import { toast } from "react-toastify";
import { delay } from "../../utils/asyncDelay";
import { INCREMENT, DECREMENT, ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "../actionTypes";
import {  } from '../reducers/asyncReducer'

// OLD WAY BEFORE ASYNC 
export const incrementCounter1 = (amount) => {
  return {
    type: INCREMENT,
    payload: amount,
  };
};

// ASYNC WAY 
export const incrementCounter2 = (amount) => {
 return async function(dispatch) {
  dispatch({type: ASYNC_ACTION_START})
   try{
    await delay(1000)
  dispatch({type: INCREMENT, payload: amount})
  dispatch({type: ASYNC_ACTION_FINISH})
   } catch(e) {
    dispatch({type: ASYNC_ACTION_ERROR, payload: e})
   }
  
 }
};

// ES6 WAY
export const incrementCounter3 = (amount) => {
  return async function(dispatch) {
   dispatch({type: ASYNC_ACTION_START})
    try{
     await delay(1000)
   dispatch({type: INCREMENT, payload: amount})
   dispatch({type: ASYNC_ACTION_FINISH})
    } catch(e) {
     dispatch({type: ASYNC_ACTION_ERROR, payload: e})
    }
   
  }
 };
// ASYNC AWAIT
 export const incrementCounter = (amount) => async (dispatch) => {
  dispatch({type: ASYNC_ACTION_START})
  
  try {
    await delay(1000);
    dispatch({type: INCREMENT, payload: amount});
   dispatch({type: ASYNC_ACTION_FINISH})
  } catch(e) {
    dispatch({type: ASYNC_ACTION_ERROR, payload: e})
    toast.error(e)
     
  }
 }




// OLD WAY DECREMENT
export const decrementCounter1 = (amount) => {
  return {
    type: DECREMENT,
    payload: amount,
  };
};

// ASYNC AWAIT
export const decrementCounter = (amount) => async (dispatch) => {
  dispatch({type: ASYNC_ACTION_START})
    try {
    await delay(1000)
    dispatch({type: DECREMENT, payload: amount})
   dispatch({type: ASYNC_ACTION_FINISH})
  } catch(e) {
    dispatch({type: ASYNC_ACTION_ERROR, payload: e})
     
  }
 }
