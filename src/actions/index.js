import * as types from './types';
import { handleNightMode } from './displayMode';
import { goChet } from './goChet';
import { updateSettings, handleBabyChet, wipeBabyChetsMind, toggleBabyChetMode } from './babyChet';

import { fetchPhrases } from './phrases';
import { login, logout, authWatch, deleteUserAccount } from './auth';
import { startConversation, saveToConversation, clearEmptyConversations } from './conversation';

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
  handleNightMode,
  sayHi,
  login,
  logout,
  deleteUserAccount,
  fetchPhrases,
  goChet,
  onInputChange,
  startConversation,
  saveToConversation,
  clearEmptyConversations,
  toggleBabyChetMode,
  handleBabyChet,
  updateSettings,
  authWatch,
  wipeBabyChetsMind,

};