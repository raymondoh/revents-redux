import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "../actionTypes";

export const asyncActionStart = () => {
    return {
      type: ASYNC_ACTION_START,
      
    };
  };

  export const asyncActionFinish = () => {
    return {
      type: ASYNC_ACTION_FINISH,
      
    };
  };

  export const asyncActionError = (error) => {
    return {
      type: ASYNC_ACTION_ERROR,
      payload: error
      
    };
  };