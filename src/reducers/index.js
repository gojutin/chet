import { combineReducers } from 'redux';
import * as types from '../actions/types';

const values = (state=false, action) => {
  switch(action.type) {
    case types.FETCH_VALUES:
      return action.payload;
    default:
      return state;
  }
};

const response = (state={}, action) => {
  switch(action.type) {
    case types.GENERATE_RESPONSE:
      return action.payload;
    case types.CLEAR_RESPONSE:
      return {term: ""};
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

const inputError = (state="", action) => {
  switch(action.type) {
    case types.HANDLE_INPUT_ERROR:
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
    case types.CLEAR_CONVERSATION:
      return "";
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

const userInfo = (state="", action) => {
  switch(action.type) {
    case types.GET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

const initialDbValue = {
  userId : "",
  valuesId : "values",
  convoId : "conversations",
}

const db = (state = initialDbValue, action) => {
  switch(action.type) {
    case types.UPDATE_DB:
      return Object.assign({}, state, action.payload);
    case types.RESET_DB:
      return {
        valuesId: "values",
        convoId: "conversations"
      };
    default:
      return state;
  }
}

const babyChetMode = (state = false, action) => {
    switch(action.type) {
      case types.BABY_CHET_MODE:
        return action.payload;
      default:
        return state;
  }
}

export default combineReducers({
  values,
  response,
  inputValue,
  inputError,
  typing,
  loading,
  conversationId,
  conversations,
  delay,
  slices,
  userInfo,
  db,
  babyChetMode
});
