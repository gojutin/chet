import * as types from './types';
import { handleNightMode } from './nightMode';
import { goChet } from './goChet';
import { fetchData } from './firebase';
import { updateSettings, handleBabyChet, wipeBabyChetsMind, toggleBabyChetMode } from './babyChet';
import { getStats, getInitialStats } from './stats';
import { handleLastResponse } from './handleLastResponse';
import { generateResponse } from './generateResponse';

import { login, logout, authWatch, deleteUserAccount } from './auth';
import { saveChat } from './chat';

const onInputChange = value => {
  return dispatch => {
    if (value.length > 75) {
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

// const sayHi = () => {
//   return dispatch => {
//     dispatch({
//       type: types.GENERATE_RESPONSE,
//       payload: {
//         term: "Hi :)",
//       },
//     })
//     dispatch({ type: types.START_TYPING })
//   }
// };

export {
  fetchData,
  handleNightMode,
  login,
  logout,
  deleteUserAccount,
  onInputChange,
  toggleBabyChetMode,
  handleBabyChet,
  updateSettings,
  authWatch,
  wipeBabyChetsMind,
  getInitialStats,
  saveChat,
  goChet,
  handleLastResponse,
  generateResponse,
  getStats,

};