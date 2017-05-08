import { goChet } from './goChet';
import { fetchData } from './fetchData';
import { startConversation, saveToConversation, clearEmptyConversations } from './conversation';
import * as types from './types';

const onInputChange = value => {
  return dispatch => {
    dispatch({
      type: types.HANDLE_INPUT_CHANGE,
      payload: value,
    })
  }
};

const sayHi = () => {
  return dispatch => {
    dispatch({
      type: types.GENERATE_RESPONSE,
      payload: {
        term: "Hi :)",
      },
    })
    dispatch({ type: types.START_TYPING })
  }
};

export {
  sayHi,
  fetchData,
  goChet,
  onInputChange,
  startConversation,
  saveToConversation,
  clearEmptyConversations,
};