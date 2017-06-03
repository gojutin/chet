import { combineReducers } from 'redux';
import * as types from '../actions/types';

const nightMode = (state=false, action) => {
  switch(action.type) {
    case types.TOGGLE_NIGHT_MODE:
      return !state;
    default:
      return state;
  }
};

const online = (state=true, action) => {
  switch(action.type) {
    case types.ONLINE:
      return true;
    case types.OFFLINE:
      return false;
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


const chetPhrases = (state=[], action) => {
  switch(action.type) {
    case types.FETCH_CHET_PHRASES:
      return action.payload;
    case types.UPDATE_CHET_PHRASES:
      return state.concat(action.payload)
    default:
      return state;
  }
};

const babyChetPhrases = (state=[], action) => {
  switch(action.type) {
    case types.FETCH_BABYCHET_PHRASES:
      return action.payload;
    case types.UPDATE_BABYCHET_PHRASES:
      return state.concat(action.payload)
    default:
      return state;
  }
};

const response = (state={}, action) => {
  switch(action.type) {
    case (types.GENERATE_RESPONSE || types.UPDATE_RESPONSE):
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
    case types.CLEAR_INPUT_ERROR:
      return Object.assign({}, state, {error: ""});
    default:
      return state;
  }
};

const currentChat = (state=[], action) => {
  switch(action.type) {
    case types.SAVE_CHAT:
      return [...state, action.payload];
    case types.CLEAR_CHAT:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  nightMode,
  online,
  chetPhrases,
  babyChetPhrases,
  response,
  input,
  profile,
  currentChat,
});
