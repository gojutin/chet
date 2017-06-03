import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

import App from '../components/App';

export default connect(
  // State
 state => ({ 
   nightMode: state.nightMode,
   online: state.online,
   chetPhrases: state.chetPhrases, 
   babyChetPhrases: state.babyChetPhrases,
   response: state.response, 
   input: state.input,
   profile: state.profile,
   currentPhrases: state.profile.babyChetMode ? state.babyChetPhrases : state.chetPhrases,
   currentPhrasesId: state.profile.babyChetMode ? state.profile.babyChetPhrasesId : "phrases",
   currentChat: state.currentChat.sort((a,b) => b.createdAt - a.createdAt ),
  }),
  actionCreators

  )(App)