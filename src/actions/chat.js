import * as types from './types';

export const saveChat = (dispatch, exchange) => {

  const createdAt = new Date();

  dispatch({
    type: types.SAVE_CHAT,
    payload: Object.assign({}, {createdAt}, exchange)
  })
}
  
    // db.ref(chatsId).on('value', snap => {
    //   let chatsArray = [];
    //   snap.forEach(value => {
    //     chatsArray.push({
    //       id: value.key,
    //       createdAt: value.val().createdAt,
    //       exchanges: value.val().exchanges ? Object.values(value.val().exchanges).reverse() : [],
    //     });
    //   })
    // })



// export const startChat = (dbConvoId) => {
//   return dispatch => {
//     return new Promise((resolve, reject) => {
//     // start a new chat
//     const timestamp = firebase.database.ServerValue.TIMESTAMP;
//     db.ref(dbConvoId).push({ createdAt: timestamp })
//       .then(ref => {
//         convoKey = ref.key;
//         let chatKey = ref.key;
//         let chatCount;
        
//         db.ref(dbConvoId).on('value', snap => {
//           let chatsArray = [];
//           chatCount = 0;
//           snap.forEach(value => {
//             chatsArray.push({
//               id: value.key,
//               createdAt: value.val().createdAt,
//               exchanges: value.val().exchanges ? Object.values(value.val().exchanges).reverse() : [],
//             });
//         })
//           const numChildren = snap.numChildren();
//           if (numChildren < 1) {
//             chatCount = 0;
//           } else {
//             chatCount = numChildren;
//           }
        
//           let thisChat = chatsArray.filter(({ id }) => id === chatKey)[0];

//           dispatch({
//             type: types.UPDATE_PROFILE,
//             payload: { chatId: chatKey, chatCount, },
//           })

//           dispatch({
//             type: types.FETCH_CHAT,
//             payload: thisChat,
//           });
//           resolve(); 
//         });  
//        })
//     })
//   }
// }

// export const saveToChat = (exchange, dbConvoId) => {
//   const timestamp = firebase.database.ServerValue.TIMESTAMP;
//   const exchangeWithDate = Object.assign({}, exchange, {
//     createdAt: timestamp,
//   })
//   return db.ref(`${dbConvoId}/${convoKey}`).child("exchanges").push(exchangeWithDate)
//     .catch(err => window.alert(err.reason || err))
// }


