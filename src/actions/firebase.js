import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

export const fetchData = (babyChetPhrasesId) => {
  return dispatch => {
    // promise
    return new Promise((resolve) => {

    dispatch({type: types.CLEAR_CHAT})
		dispatch({type: types.CLEAR_RESPONSE})
    
    const connectedRef = db.ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        dispatch({
          type: types.ONLINE
        })

        db.ref("phrases").on('value', snap => {
          let phrasesArray = [];
          
          snap.forEach(value => {
            let responses = value.val()
            phrasesArray.push({
              id: value.key,
              term: value.val().term,
              responses: Object.keys(value.val().responses).map(function(k) { return value.val().responses[k] }),
            });
          });
          dispatch({
            type: types.FETCH_CHET_PHRASES,
            payload: phrasesArray,
          })
        })

        if (babyChetPhrasesId) {

          // fetch babyChet's phrases
          db.ref(babyChetPhrasesId).on('value', snap => {
            let phrasesArray = [];
            snap.forEach(value => {
              phrasesArray.push({
                id: value.key,
                term: value.val().term,
                responses: Object.keys(value.val().responses).map(function(k) { return value.val().responses[k] }),
              });
            });
            dispatch({
              type: types.FETCH_BABYCHET_PHRASES,
              payload: phrasesArray,
            })
            resolve(phrasesArray);
          })
        }
      } else {
        dispatch({
          type: types.OFFLINE,
        })
        resolve();
      }
    })
  })
  }
}