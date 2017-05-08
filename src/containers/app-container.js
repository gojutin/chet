import { connect } from 'react-redux';
import { 
    fetchData, 
    sayHi, 
    goChet, 
    onInputChange, 
    startConversation, 
    saveToConversation,
    clearEmptyConversations,
  } from '../actions/index';

import App from '../app';

const filterThisConversation = (conversations, id) => {
  return conversations.filter(convo => convo.id === id )[0];
};

export default connect(
 state => ({ 
   values: state.values, 
   response: state.response, 
   typing: state.typing,
   inputValue: state.inputValue,
   loading: state.loading,
   conversationId: state.conversationId,
   conversations: state.conversations,
   thisConversation: filterThisConversation(state.conversations, state.conversationId),
   delay: state.delay,
   phrases: state.response.phrases,
   matched: state.response.matched,
   matchedTo: state.response.matchedTo,
   strength: state.response.strength,
   responseCount: state.response.responseCount,
   responseChoiceCount: state.response.responseChoiceCount,

  }),
  {
    fetchData, 
    sayHi, 
    goChet, 
    onInputChange, 
    startConversation, 
    saveToConversation, 
    clearEmptyConversations
  }
  )(App)