import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();
  var convoKey;


export const startConversation = (dbConvoId) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
    let convoArray = [];
    let chatKey;
    
    // start a new conversation
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    db.ref(dbConvoId).push({ createdAt: timestamp })
      .then(ref => {
        convoKey = ref.key;
        chatKey = ref.key;
        let obj;

        
        let conversationCount;
        
        let thisConversation;
        db.ref(dbConvoId).on('value', snap => {
          let conversationsArray = [];
          conversationCount = 0;
          thisConversation = {}
          snap.forEach(value => {
            conversationsArray.push({
              id: value.key,
              createdAt: value.val().createdAt,
              exchanges: value.val().exchanges ? Object.values(value.val().exchanges).reverse() : [],
            });
        })
          convoArray = conversationsArray.slice();
          const numChildren = snap.numChildren();
          if (numChildren < 2) {
            conversationCount = 0;
          } else {
            conversationCount = numChildren - 1;
          }
        
          thisConversation = convoArray.filter(({ id }) => id === chatKey)[0];

          dispatch({
            type: types.UPDATE_DB,
            payload: { conversationId: chatKey, conversationCount, },
          })
          dispatch({
            type: types.FETCH_CONVERSATION,
            payload: thisConversation,
          });
          obj = {
          dbConvoId, convoArray, convoKey
        }
        resolve(obj)
         
        });  
          
       })
       
    })
  }
}

export const clearEmptyConversations = ( convoId, convArray, key) => {
  return dispatch => {
    let filteredByEmptyValues = convArray.filter(val => {
      return val.exchanges.length === 0 && val.id !== key;
    })
    filteredByEmptyValues.map(({ id }) => {
      return db.ref(convoId).child(id).remove()
        .catch(err => console.log(err));
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


