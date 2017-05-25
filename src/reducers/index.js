import { combineReducers } from 'redux';
import * as types from '../actions/types';

const nightMode = (state="", action) => {
  switch(action.type) {
    case types.TOGGLE_DAY_MODE:
      return false;
    case types.TOGGLE_NIGHT_MODE:
      return true;
    default:
      return state;
  }
};

const profile = (state={}, action) => {
  switch(action.type) {
    case types.UPDATE_PROFILE:
      return Object.assign({}, state, action.payload);
    case types.CLEAR_PROFILE:
      return {};
    case types.BABY_CHET_MODE:
      return Object.assign({}, state, { babyChetMode: action.payload });
    default:
      return state;
  }
};

const values = (state=false, action) => {
  switch(action.type) {
    case types.FETCH_PHRASES:
      return action.payload;
    default:
      return state;
  }
};

const response = (state={}, action) => {
  switch(action.type) {
    case types.GENERATE_RESPONSE:
      return Object.assign({}, state, action.payload);
    case types.START_TYPING:
      return Object.assign({}, state, {typing: 1});
    case types.STOP_TYPING:
      return Object.assign({}, state, {typing: 0});
    case types.CLEAR_RESPONSE:
      return {term: ""};
    case types.START_DELAY:
      return Object.assign({}, state, {delay: true});
    case types.STOP_DELAY:
      return Object.assign({}, state, {delay: false});
    case types.LOADING:
      return Object.assign({}, state, {loading: action.payload});
    default:
      return state;
  }
};

const input = (state={}, action) => {
  switch(action.type) {
    case types.HANDLE_INPUT_CHANGE:
      return Object.assign({}, state, {value: action.payload});
    case types.HANDLE_INPUT_ERROR:
      return Object.assign({}, state, {error: action.payload});
    default:
      return state;
  }
};

const conversation = (state={}, action) => {
  switch(action.type) {
    case types.FETCH_CONVERSATION:
      return action.payload;
    case types.CLEAR_CONVERSATION:
      return {};
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
  nightMode,
  values,
  response,
  input,
  conversation,
  slices,
  profile,
});
