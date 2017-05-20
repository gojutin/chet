import { connect } from 'react-redux';
import { 
    fetchData, 
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
   typing: state.typing,
   inputValue: state.inputValue,
   inputError: state.inputError,
   loading: state.loading,
   conversationId: state.conversationId,
   conversations: state.conversations,
   thisConversation: filterThisConversation(state.conversations, state.conversationId),
   delay: state.delay,
   userInfo: state.userInfo,
   db: state.db,
   babyChetMode: state.babyChetMode,
  }),

  // Actions
  {
    fetchData, 
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
    authWatch,
    wipeBabyChetsMind
  }
  )(App)