// import firebase from 'firebase';
// import * as types from './types';

// const db = firebase.database();

// const getStats = (dbRef, phrasesArray) => {

//    if (dbRef !== "phrases") {
     
//       const removeDuplicates = arr => {
//         let i,
//           len=arr.length,
//           out=[],
//           obj={};

//         for (i=0;i<len;i++) {
//           obj[arr[i]]=0;
//         }
//         for (i in obj) {
//           out.push(i);
//         }
//         return out;
//       };

//       let wordsArr = [];
// 		  let wordsCount;
// 			phrasesArray.map(value => wordsArr.push(value.term));
// 		  const splitWords = wordsArr.join(" ").split(" ");
// 		  const dupsRemoved = removeDuplicates(splitWords);

//       if (dupsRemoved.length < 2 && dupsRemoved[0] === "") {
//         wordsCount = 0;
//       } else {
//         wordsCount = dupsRemoved.length;
//       }

//       const growthPercentage = ((wordsCount / 20000)*100).toFixed(1)

//       const phase = () => {
//         if ( wordsCount < 100 ) {
//           return {
//             level: 1,
//             progress: 5,
//             size: "",
//           }
//         } else if (wordsCount < 2000) {
//           return {
//             level: 2,
//             size: "fa-2x",
//           }
//         } else if (wordsCount < 3000) {
//           return {
//             level: 3,
//             size: "fa-3x",
//           }
//         } else if (wordsCount < 20000) {
//           return {
//             level: 4,
//             size: "fa-4x",
//           }
//         } else if (wordsCount < 150000) {
//           return {
//             level: 5,
//             size: "fa-5x",
//           }
// 			  } else {
//           return {
//             level: 6,
//             size: "fa-5x",
//           }
//         }
// 		  }

//       const stats = {
//         wordsCount,
//         growthPercentage,
//         phrasesCount: phrasesArray.length,
//         phase: phase(),
//         }
//         return stats;

//       } else return {};
// }


// export const fetchPhrases = (dbRef, chatId) => {
//   return dispatch => {
//     return new Promise((resolve, reject) => {

//       dispatch({type: types.CLEAR_RESPONSE});


//     var connectedRef = db.ref(".info/connected");
//       connectedRef.on("value", function(snap) {
//         if (snap.val() === true) {
//           dispatch({
//             type: types.ONLINE
//           })
//           db.ref(dbRef).orderByChild("value").on('value', snap => {
//             let phrasesArray = [];
//             snap.forEach(value => {
//               phrasesArray.push({
//                 id: value.key,
//                 term: value.val().term,
//                 responses: Object.values(value.val().responses ? value.val().responses : []),
//               });
//             });

//             dispatch({
//               type: dbRef === "phrases" ? types.FETCH_PHRASES : types.FETCH_BABYCHET_PHRASES,
//               payload: phrasesArray,
//             });  
        

//           // get stats if in babyChetMode
//           const stats = getStats(dbRef, phrasesArray);
        
//           dispatch({
//             type: types.UPDATE_PROFILE,
//             payload: stats,
//           })
//         })
//         } else {
//           dispatch({
//             type: types.OFFLINE
//           })
//         }
//     });


    // get the chat count only once when the phrases are initially fetched
    // if (chatId) {
    //   db.ref(chatId).once('value', snap => {
    //     const len = snap.val() ? Object.keys(snap.val()).length : 0;
    //     dispatch({
    //       type: types.UPDATE_PROFILE,
    //       payload:{ chatCount: len }
    //     })
    //   })
    // }
//     resolve();
//     })  
//   }
// }






