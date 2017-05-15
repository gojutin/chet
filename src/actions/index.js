import * as types from './types';
import { goChet } from './goChet';
import { saveDetails, babyChet, wipeBabyChetsMind } from './babyChet';
import { fetchData } from './fetchData';
import { login, logout, authWatch } from './auth';
import { 
    startConversation, 
    saveToConversation, 
    clearEmptyConversations, 
    clearConversation 
  } from './conversation';

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
  login,
  logout,
  fetchData,
  goChet,
  onInputChange,
  startConversation,
  saveToConversation,
  clearEmptyConversations,
  babyChet,
  saveDetails,
  clearConversation,
  authWatch,
  wipeBabyChetsMind,
};