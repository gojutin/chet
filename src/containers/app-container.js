import { connect } from 'react-redux';
import { 
    handleNightMode,
    fetchPhrases, 
    toggleBabyChetMode,
    login,
    logout,
    deleteUserAccount,
    goChet, 
    onInputChange, 
    startChat, 
    saveToChat,
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
   phrases: state.phrases, 
   response: state.response, 
   input: state.input,
   thisChat: state.chat,
   profile: state.profile,
  }),

  // Actions
  {
    handleNightMode,
    fetchPhrases, 
    deleteUserAccount,
    toggleBabyChetMode,
    login,
    logout,
    goChet, 
    onInputChange, 
    startChat, 
    saveToChat, 
    handleBabyChet,
    updateSettings,
    authWatch,
    wipeBabyChetsMind
  }
  )(App)