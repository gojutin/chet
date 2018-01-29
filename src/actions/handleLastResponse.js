import * as types from './types';
import * as firebase from "firebase";

const db = firebase.database();

export const handleLastResponse = (newPhrasesObject, inputValue, responseId, currentPhrasesId) => {
    return dispatch => {
      const {phrases, phraseKey } = newPhrasesObject;
      // if there is a previous response, then get the value of the responseId
      // and see if any of it's responses contains the inputValue
      const previousResponseValue = phrases.filter(({ id }) => id === responseId)[0] ;
      const responses = previousResponseValue["responses"];
      const responseValue =  responses.find(value =>
        value.id === phraseKey);

      if (responseValue) {
        const prevCount = responses.find(value => value.id === phraseKey)["count"]
        dispatch({
          type: currentPhrasesId === "chetPhrases" 
            ? types.UPDATE_CHET_PHRASES
            : types.UPDATE_BABYCHET_PHRASES,
          payload: {
            [responseId]: {
              term: inputValue,
              responses: {
                [phraseKey]:{
                  id: phraseKey,
                  count: prevCount + 1,
                }
              }
          }
        }
        })
        db.ref(currentPhrasesId + '/' + responseId).child("responses/" + phraseKey ).update({ "count": prevCount + 1 })
      } else {
        // if there is no response value, add the input value 
        // to the previous response value's responses array

        dispatch({
          type: currentPhrasesId === "phrases" 
            ? types.UPDATE_CHET_PHRASES
            : types.UPDATE_BABYCHET_PHRASES,
          payload: {
            [responseId]: {
              responses: {
                [phraseKey]:{
                  // term,
                  id: phraseKey,
                  count: 1,
                }
              }
            }
          }
        })

        db.ref(currentPhrasesId + '/' + responseId).child("responses").child(phraseKey).set({
          // term: term,
          id: phraseKey,
          count: 1,
        })
      }
    }
}