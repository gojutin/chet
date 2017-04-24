import { connect } from 'react-redux';
import { fetchData, addValue, onInputChange } from '../actions/index';
import App from '../app';

export default connect(
 state => ({ 
   values: state.values, 
   response: state.response, 
   typing: state.typing,
   inputValue: state.inputValue,
   loading: state.loading,
  }),
{fetchData, addValue, onInputChange})(App)