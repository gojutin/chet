import { connect } from 'react-redux';
import { 
    fetchPhrases, 
    sayHi, 
    login,
    logout,
    goChet, 
    onInputChange, 
    startConversation, 
    saveToConversation,
    clearEmptyConversations,
    babyChet,
    saveDetails,
    saveSettings,
    authWatch,
    wipeBabyChetsMind,
  } from '../actions/index';

import App from '../app';

export default connect(
  // State
 state => ({ 
   values: state.values, 
   response: state.response, 
   input: state.input,
   thisConversation: state.conversation,
   db: state.db,
   babyChetMode: state.babyChetMode,
  }),

  // Actions
  {
    fetchPhrases, 
    sayHi, 
    login,
    logout,
    goChet, 
    onInputChange, 
    startConversation, 
    saveToConversation, 
    clearEmptyConversations,
    babyChet,
    saveDetails,
    saveSettings,
    authWatch,
    wipeBabyChetsMind
  }
  )(App)