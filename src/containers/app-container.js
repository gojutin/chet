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
    babyChet,
    saveDetails,
    authWatch,
    wipeBabyChetsMind,
  } from '../actions/index';

import App from '../app';

const filterThisConversation = (conversations, id) => {
  return conversations.filter(convo => convo.id === id )[0];
};

export default connect(
  // State
 state => ({ 
   values: state.values, 
   response: state.response, 
   input: state.input,
   conversations: state.conversations,
   thisConversation: filterThisConversation(state.conversations, state.db.conversationId),
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
    babyChet,
    saveDetails,
    authWatch,
    wipeBabyChetsMind
  }
  )(App)