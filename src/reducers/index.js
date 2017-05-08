import { combineReducers } from 'redux';
import * as types from '../actions/types';

const values = (state=false, action) => {
  switch(action.type) {
    case types.FETCH_DATA:
      return action.payload;
    default:
      return state;
  }
};

const response = (state={}, action) => {
  switch(action.type) {
    case types.GENERATE_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

const inputValue = (state="", action) => {
  switch(action.type) {
    case types.HANDLE_INPUT_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

const typing = (state=-1, action) => {
  switch(action.type) {
    case types.START_TYPING:
      return 1;
    case types.STOP_TYPING:
      return 0;
    default:
      return state;
  }
};

const loading = (state=false, action) => {
  switch(action.type) {
    case types.LOADING:
      return action.payload;
    default:
      return state;
  }
};

const conversationId = (state=null, action) => {
  switch(action.type) {
    case types.START_CONVERSATION:
      return action.payload;
    default:
      return state;
  }
};

const conversations = (state=[], action) => {
  switch(action.type) {
    case types.FETCH_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
};

const delay = (state=[], action) => {
  switch(action.type) {
    case types.START_DELAY:
      return true;
    case types.STOP_DELAY:
      return false;
    default:
      return state;
  }
};

const slices = (state="", action) => {
  switch(action.type) {
    case types.SAVE_SLICES:
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  values,
  response,
  inputValue,
  typing,
  loading,
  conversationId,
  conversations,
  delay,
  slices,
});
