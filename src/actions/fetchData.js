import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

export const fetchData = (dbRef) => {
  return dispatch => {
    db.ref(dbRef).orderByChild("value").on('value', snap => {
      let valuesArray = [];
      snap.forEach(value => {
        valuesArray.push({
          id: value.key,
          term: value.val().term,
          responses: value.val().responses ? Object.values(value.val().responses) : [],
        });
      });
      dispatch({
        type: types.FETCH_VALUES,
        payload: valuesArray,
      });  
    })
  }
}


