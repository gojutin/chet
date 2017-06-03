import * as types from './types';
import { saveChat, getStats } from './index';

import firebase from 'firebase';

const db = firebase.database();

const saveSlices = (slices, dispatch) => {
  return dispatch({
    type: types.UPDATE_RESPONSE,
    payload: {slices},
  })
}

export const generateResponse = (newPhrasesObject, inputValue, currentPhrasesId) => {
  return dispatch => {
  const {phrases, phraseKey, existingPhrase, } = newPhrasesObject;
  let matchedSlice;
  let matchedPhrase;
  let matchStrength;
  let matchResponseChoiceCount;
  let matchResponseCount;

  const findBestMatch = () => {

    if ( existingPhrase ) {
      matchedSlice = inputValue;
      matchStrength = 100;
      saveSlices([], dispatch);
      return existingPhrase;
    } else {
      const stringToArray = inputValue.split("");
      const len = stringToArray.length;
      // let i = 0;
      
      let slicesArray = [];
      let finalMatchArray = [];
      let slice;
      // while (i < len) {
      //   var o = 0;
      //   while( o < len) {
      //     slice = stringToArray.slice(i, len - o).join("");
      //     slicesArray.push(slice);
      //     o += 1;
      //   }
      //   i += 1;
      // }
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          slice = stringToArray.slice(i, len - j).join("");
          slicesArray.push(slice);
        }
      }

      const sortedSlices = slicesArray.sort((a,b) => b.length - a.length);
      sortedSlices.filter(slice => slice !== "");
      saveSlices(sortedSlices, dispatch);

      let finalSlices = [];
      let phrasesNoNewValue  = phrases.filter(val => val.id !== phraseKey);

      if (!phrasesNoNewValue.length) {
        return phrases[0];
      }
      let sortedPhrases = phrasesNoNewValue.sort((a,b) => b.term.length - a.term.length);

      sortedSlices.map(slice => {
        return sortedPhrases.some(val => {
          if (val.term.includes(slice) ){
            finalSlices.push(slice);
            return finalMatchArray.push(val);
          }
          return false;  
        })
      })

      console.log(finalSlices);

      //  sortedSlices.map(slice => {
      //   return sortedPhrases.map(val => {
      //     if (val.term.includes(slice) ){
      //       finalSlices.push(slice);
      //       return finalMatchArray.push(val);
      //     }
      //     return false;  
      //   })
      // })

      // stats
      matchedSlice = finalSlices[0]
      matchedPhrase =  finalMatchArray[0] ? finalMatchArray[0]["term"]: "nothing"
      matchStrength = finalSlices[0] ? Math.floor(finalSlices[0].length / inputValue.length * 100): 0;
     
      return finalMatchArray[0];
    }

  }
  
    const finalMatch = findBestMatch();

    matchResponseChoiceCount = finalMatch ? finalMatch.responses.length : 0;
    // now that we have the closest match value, we sort it's responses by count
    // and determine which response to generate
    const generateFinalResponse = () => {
      const sortedResponses =  finalMatch.responses.sort((a, b) => b.count - a.count);
      if (!sortedResponses) {
        return { inputValue, id: phraseKey}
    } else {
        
        if (sortedResponses.length === 1) {
            return sortedResponses[0];
        } else if (sortedResponses.length <= 5) {
            const randomIndex = Math.floor(Math.random() * sortedResponses.length )
            return sortedResponses[randomIndex >= 0 ? randomIndex : 0];
        } else if (sortedResponses.length >5 && sortedResponses.length < 10  ) {
            const half = Math.floor(sortedResponses.length / 2);
            const randomIndex = Math.floor(Math.random() * half)
            return sortedResponses[randomIndex >= 0 ? randomIndex : 0];
        } else if (sortedResponses.length >=10 ) {
            const third = Math.floor(sortedResponses.length / 3);
            const randomIndex = Math.floor(Math.random() * third)
            return sortedResponses[randomIndex >= 0 ? randomIndex : 0];
        } else {
            const randomIndex = Math.floor(Math.random() * sortedResponses.length)
            return sortedResponses[randomIndex >= 0 ? randomIndex : 0];
        }
      }
      
    };

    const finalResponse = generateFinalResponse();
    const finalResp = phrases.filter(phrase => phrase.id === finalResponse.id)[0]
    matchResponseCount = finalResp ? finalResp.count : 0;

    if (!existingPhrase) {
      db.ref(currentPhrasesId + "/" + phraseKey).set({
        term: inputValue,
        responses: {[phraseKey] : { id: phraseKey, count: 1}}
      })
    }

    if (currentPhrasesId !== "phrases") {
      let stats = getStats(phrases);

      dispatch({
        type: types.UPDATE_PROFILE,
        payload: stats
      })
    }

    // Now we dispatch all the actions to generate the response

     dispatch({
      type: types.GENERATE_RESPONSE,
      payload: {
        userValue: inputValue,
        term: finalResp["term"],
        id: finalResp["id"],
        phrasesCount: phrases.length,
        matchedSlice,
        matchedPhrase,
        matchStrength,
        matchResponseCount,
        matchResponseChoiceCount,
      }
    });


    dispatch({
      type: types.STOP_DELAY,
    });
     window.setTimeout(() => {
      dispatch({
        type: types.START_DELAY,
      })
    }, 500)

    dispatch({ type: types.START_TYPING });

    window.setTimeout(() => {
      dispatch({
        type: types.LOADING,
        payload: false,
      });
    }, 500)

    dispatch({
      type: types.HANDLE_INPUT_CHANGE,
      payload: "",
    });

    saveChat(dispatch, {
      userSays: inputValue,
      chetSays: finalResp["term"]
    }) 
  }
}
