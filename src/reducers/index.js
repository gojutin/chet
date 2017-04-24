import { combineReducers } from 'redux';
import * as types from '../actions/types';

const values = (state=false, action) => {
  switch(action.type) {
    case types.FETCH_DATA:
      return action.payload;
    default:
      return state;
  }
}

const response = (state={}, action) => {
  switch(action.type) {
    case types.GENERATE_RESPONSE:
      return action.payload;
    default:
      return state;
  }
}

const inputValue = (state="", action) => {
  switch(action.type) {
    case types.HANDLE_INPUT_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

const typing = (state=0, action) => {
  switch(action.type) {
    case types.START_TYPING:
      return action.payload;
    default:
      return state;
  }
}

const loading = (state=false, action) => {
  switch(action.type) {
    case types.LOADING:
      return action.payload;
    default:
      return state;
  }
}


export default combineReducers({
  values,
  response,
  inputValue,
  typing,
  loading,
});
