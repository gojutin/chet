import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();
var convoKey;

export const startConversation = (dbConvoId) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
   // let convoArray = [];
    // start a new conversation
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    db.ref(dbConvoId).push({ createdAt: timestamp })
      .then(ref => {
        convoKey = ref.key;
        let chatKey = ref.key;
        let obj;
        let chatCount;
        
        // let thisConversation;
        db.ref(dbConvoId).on('value', snap => {
          let conversationsArray = [];
          chatCount = 0;
          thisConversation = {}
          snap.forEach(value => {
            conversationsArray.push({
              id: value.key,
              createdAt: value.val().createdAt,
              exchanges: value.val().exchanges ? Object.values(value.val().exchanges).reverse() : [],
            });
        })
          let convoArray = conversationsArray.slice();
          const numChildren = snap.numChildren();
          if (numChildren < 2) {
            chatCount = 0;
          } else {
            chatCount = numChildren;
          }
        
          let thisConversation = conversationsArray.filter(({ id }) => id === chatKey)[0];

          dispatch({
            type: types.UPDATE_PROFILE,
            payload: { conversationId: chatKey, chatCount, },
          })

          dispatch({
            type: types.FETCH_CONVERSATION,
            payload: thisConversation,
          });
          resolve(); 
        });  
       })
    })
  }
}

export const saveToConversation = (exchange, dbConvoId) => {
  const timestamp = firebase.database.ServerValue.TIMESTAMP;
  const exchangeWithDate = Object.assign({}, exchange, {
    createdAt: timestamp,
  })
  return db.ref(`${dbConvoId}/${convoKey}`).child("exchanges").push(exchangeWithDate)
    .catch(err => window.alert(err.reason || err))
}


