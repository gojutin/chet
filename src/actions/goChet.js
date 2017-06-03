import * as types from './types';
import randomID from "random-id";

export const goChet = (inputValue, phrases, babyChetMode) => {
  // Set loading to true so that we can show the spinner
  return dispatch => {
    return new Promise(resolve => {

      console.time("Total Time");

      let phrasesSlice = phrases.slice();

      dispatch({ type: types.CLEAR_INPUT_ERROR })
      dispatch({ type: types.STOP_TYPING })
      dispatch({ type: types.LOADING, payload: true, })

      // Check if this value has already been submitted.
      const existingPhrase = phrases.length ? phrases.filter((phrase) => phrase.term === inputValue)[0] : null;

      let phraseKey;

      if (!existingPhrase) {
        // create our own id so that we can optomistically update the UI.
        phraseKey = randomID();
        phrasesSlice.push({
          id: phraseKey,
          term: inputValue,
          responses: [{
            id: phraseKey,
            count: 1,
          }],
        })

      } else {
        phraseKey = existingPhrase["id"]
      }

      let newPhraseObject = {
        phrases: existingPhrase ? phrases : phrasesSlice,
        phraseKey,
        existingPhrase,
      }

      dispatch({
        type: babyChetMode
            ? types.UPDATE_BABYCHET_PHRASES
            : types.UPDATE_CHET_PHRASES,
        payload: existingPhrase ? phrases : phrasesSlice,
      })
      resolve(newPhraseObject)
      console.timeEnd("Total Time");
    })
  }
}