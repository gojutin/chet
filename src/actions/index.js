import { goChet } from './goChet';
import { fetchData } from './fetchData';
import * as types from './types';

const onInputChange = value => {
  return dispatch => {
    dispatch({
      type: types.HANDLE_INPUT_CHANGE,
      payload: value,
    })
  }
}

const sayHi = () => {
  return dispatch => {
    dispatch({
      type: types.GENERATE_RESPONSE,
      payload: {
        term: "Hi, human :)",
      },
    })
    dispatch({
      type: types.START_TYPING,
      payload: 1
    })
  }
}

export {
  sayHi,
  fetchData,
  goChet,
  onInputChange,
};