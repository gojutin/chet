import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

let convoKey;

export const startConversation = (dbConvoId) => {
  // First we fetch all of the conversations and save them to our store
  let convoArray;
  return dispatch => {
    db.ref(dbConvoId).on('value', snap => {
      let conversationsArray = [];
      snap.forEach(value => {
        conversationsArray.push({
          id: value.key,
          createdAt: value.val().createdAt,
          exchanges: value.val().exchanges ? Object.values(value.val().exchanges).reverse() : [],
        });
      });
      dispatch({
        type: types.FETCH_CONVERSATIONS,
        payload: conversationsArray,
      });
      convoArray = conversationsArray.slice();
      
    })

    // Now we create a new conversation and save the Id to the store
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    
    db.ref(dbConvoId).push({ createdAt: timestamp })
      .then(ref => {
        convoKey = ref.key;
        dispatch({
          type: types.UPDATE_DB,
          payload: {conversationId: ref.key},
        })

        // clear empty conversations
        const filteredByEmptyValues = convoArray.filter(val => {
          return val.exchanges.length === 0 && val.id !== ref.key;
        })
      
      filteredByEmptyValues.map(({ id }) => {
        return db.ref(dbConvoId).child(id).remove()
          .catch(err => console.log(err));
      })
      }).catch(err => window.alert(err.reason || err));
  } 
}



export const saveToConversation = (exchange, dbConvoId) => {
  const timestamp = firebase.database.ServerValue.TIMESTAMP;
  const exchangeWithDate = Object.assign({},exchange, {
    createdAt: timestamp,
  })
  return db.ref(`${dbConvoId}/${convoKey}`).child("exchanges").push(exchangeWithDate)
    .catch(err => window.alert(err.reason || err))
}


