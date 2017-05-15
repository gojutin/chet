import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

let convoKey;

export const startConversation = (dbConvoId) => {
  // First we fetch all of the conversations and save them to our store
  return dispatch => {
    return new Promise ((resolve, reject) => {
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
        
      })

      // Now we create a new conversation and save the Id to the store
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      
      db.ref(dbConvoId).push({ createdAt: timestamp }).then(ref => {
        convoKey = ref.key;
        dispatch({
          type: types.START_CONVERSATION,
          payload: ref.key,
        })
        }).then(() => {
          resolve();
        }).catch(err => window.alert(err.reason || err));
    })
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

export const clearConversation = () => {
  return dispatch => {
    dispatch({
      type: types.CLEAR_CONVERSATION
    })
  }
}

export const clearEmptyConversations = (conversations, id, dbId) => {

      // Now we filter the empty conversations and delete them from the database one by one
      // This is outside of the Firebase on() method so it only fires once when the page
      // is initially rendered
      return dispatch => {

        const filteredByEmptyValues = conversations.filter(val => {
          return val.exchanges.length === 0 && val.id !== id;
        })
        
        filteredByEmptyValues.map(({ id }) => {
          return db.ref(dbId).child(id).remove()
            .catch(err => console.log(err));
        })
      }
}
