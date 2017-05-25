import { connect } from 'react-redux';
import { 
    handleNightMode,
    fetchPhrases, 
    toggleBabyChetMode,
    sayHi, 
    login,
    logout,
    deleteUserAccount,
    goChet, 
    onInputChange, 
    startConversation, 
    saveToConversation,
    clearEmptyConversations,
    handleBabyChet,
    updateSettings,
    authWatch,
    wipeBabyChetsMind,
  } from '../actions/index';

import App from '../components/App';

export default connect(
  // State
 state => ({ 
   nightMode: state.nightMode,
   values: state.values, 
   response: state.response, 
   input: state.input,
   thisConversation: state.conversation,
   profile: state.profile,
  }),

  // Actions
  {
    handleNightMode,
    fetchPhrases, 
    sayHi, 
    deleteUserAccount,
    toggleBabyChetMode,
    login,
    logout,
    goChet, 
    onInputChange, 
    startConversation, 
    saveToConversation, 
    clearEmptyConversations,
    handleBabyChet,
    updateSettings,
    authWatch,
    wipeBabyChetsMind
  }
  )(App)