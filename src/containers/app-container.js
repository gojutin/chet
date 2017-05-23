import { connect } from 'react-redux';
import { 
    handleDisplayMode,
    fetchPhrases, 
    sayHi, 
    login,
    logout,
    deleteUserAccount,
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
   displayMode: state.displayMode,
   values: state.values, 
   response: state.response, 
   input: state.input,
   thisConversation: state.conversation,
   db: state.db,
   babyChetMode: state.babyChetMode,
  }),

  // Actions
  {
    handleDisplayMode,
    fetchPhrases, 
    sayHi, 
    deleteUserAccount,
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