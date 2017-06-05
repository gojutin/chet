import { handleNightMode } from './nightMode';
import { goChet } from './goChet';
import { fetchData } from './firebase';
import { updateSettings, handleBabyChet, wipeBabyChetsMind, toggleBabyChetMode } from './babyChet';
import { getStats, getInitialStats } from './stats';
import { handleLastResponse } from './handleLastResponse';
import { generateResponse } from './generateResponse';

import { login, logout, authWatch, deleteUserAccount } from './auth';
import { saveChat } from './chat';

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