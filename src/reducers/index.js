import { combineReducers } from 'redux';
import * as types from '../actions/types';
import {REHYDRATE} from 'redux-persist/constants'

const nightMode = (state=false, action) => {
  switch(action.type) {
    case types.TOGGLE_NIGHT_MODE:
      return !state;
    default:
      return state;
  }
};

const offline = (state=false, action) => {
  switch(action.type) {
    case types.TOGGLE_OFFLINE_MODE:
      return action.payload;
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
    case REHYDRATE:
      var persistedState = action.payload;
      if (persistedState) return {...state, ...persistedState}
      return state;
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
    case REHYDRATE:
      var persistedState = action.payload;
      if (persistedState) return [...state, ...persistedState]
      return state;
    default:
      return state;
  }
};

const babyChetPhrases = (state=[], action) => {
  switch(action.type) {
    case types.FETCH_BABYCHET_PHRASES:
      return action.payload;
    case types.UPDATE_BABYCHET_PHRASES:
      return state.concat(action.payload);
    case REHYDRATE:
      var persistedState = action.payload;
      if (persistedState) return [...state, ...persistedState]
      return state
    default:
      return state;
  }
};

const response = (state={}, action) => {
  switch(action.type) {
    case (types.GENERATE_RESPONSE || types.UPDATE_RESPONSE):
      return Object.assign({}, state, action.payload);
    case types.CLEAR_RESPONSE:
      return {};
    case types.START_DELAY:
      return Object.assign({}, state, {delay: true});
    case types.STOP_DELAY:
      return Object.assign({}, state, {delay: false});
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
    case REHYDRATE:
      var persistedState = action.payload;
      if (persistedState) return [...state, ...persistedState]
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  nightMode,
  offline,
  chetPhrases,
  babyChetPhrases,
  response,
  profile,
  currentChat,
});
