import * as types from './types';
import { goChet } from './goChet';
import { saveDetails, babyChet, wipeBabyChetsMind } from './babyChet';
import { fetchPhrases } from './phrases';
import { login, logout, authWatch } from './auth';
import { startConversation, saveToConversation } from './conversation';

const onInputChange = value => {
  return dispatch => {
    if (value.length > 90) {
      dispatch({
        type: types.HANDLE_INPUT_ERROR,
        payload: "Oops, you ran out of space :( ",
      })
    } else {
      dispatch({
        type: types.HANDLE_INPUT_ERROR,
        payload: "",
      })
      dispatch({
        type: types.HANDLE_INPUT_CHANGE,
        payload: value,
      })
    } 
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
  fetchPhrases,
  goChet,
  onInputChange,
  startConversation,
  saveToConversation,
  babyChet,
  saveDetails,
  authWatch,
  wipeBabyChetsMind,
};