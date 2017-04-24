import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

// Initially fetch the data from Firebase
export const fetchData = () => {
  return dispatch => {
    db.ref('values').orderByChild("value").on('value', snap => {
      let valuesArray = [];
      snap.forEach(value => {
        valuesArray.push({
          id: value.key,
          term: value.val().term,
          responses: value.val().responses ? Object.values(value.val().responses) : [],
        });
      });
      dispatch({
        type: types.FETCH_DATA,
        payload: valuesArray,
      });
    })
  }
}

const generateResponse = (term, refKey, dispatch) => {
  dispatch({
    type: 'LOADING',
    payload: false,
  })
  dispatch({
    type: types.GENERATE_RESPONSE,
    payload: {
      term,
      id: refKey,
    },
  })
  dispatch({
    type: types.START_TYPING,
    payload: 1
  })
  dispatch({
    type: types.HANDLE_INPUT_CHANGE,
    payload: "",
  })
}

/////////////////////////////////////////////////////////////////////////

const handlePreviousResponse_NewValue = (term, values, responseId, refKey) => {
  if (responseId) {
    db.ref('values/' + responseId).child("responses").child(refKey).set({
        term: term,
        id: refKey,
        count: 1,
    });
  }
}

////////////////////////////////////////////////////////////////////////////////

const handlePreviousResponse_ExistingValue = (term, values, responseId, refKey) => {

  return new Promise ((resolve, reject) => {
  if (responseId) {

    // if there is a previous response, then get the value of the responseId
    // and see if any of it's responses contains the inputValue
    const previousResponseValue = values.filter(({id}) => id === responseId)[0];
    const responses = previousResponseValue["responses"];
    const responseValue = responses ? responses.find(value =>
      value.id === refKey) : false;

    if (!responseValue) {

      // if there is no response value, add the input value 
      // to the previous response value's responses array
      db.ref('values/' + responseId).child("responses").child(refKey).set({
        term: term,
        id: refKey,
        count: 1,
    });
    } else {
      const prevCount = responses.find(value => value.id === refKey)["count"]
      db.ref('values/' + responseId).child("responses").child(refKey).update({"count": prevCount + 1})
    }
  } else {
    db.ref('values/' + responseId).child("responses").child(refKey).set({
      term: term,
      id: refKey,
      count: 1,
    });
  }

  const value = values.filter(value => value.id === refKey)[0];
  const sorted = value.responses.sort((a,b) => b.count - a.count)
  const sortedResponses = () => {
    if ( (sorted[0]["id"] !== refKey) || sorted.length === 1 ) {
      return sorted[0];
    } else {
      return sorted[1];
    }
  };
  const generatedResponse = {
    term: sortedResponses()["term"],
    id: sortedResponses()["id"]
  }
  resolve(generatedResponse);
  })
}

////////////////////////////////////////////////////////////////////////////////

// This is the action creator that is called when the user submits a value.
export const addValue = (term, values, responseId) => {

  // Set loading to true so that we can show the spinner
  return dispatch => {
    dispatch({
      type: types.LOADING,
      payload: true,
    })

    // Save the refKey at the top of the function so that it can be
    // referenced in the promise then()
    let refKey;

    // Check if this value has already been submitted.
    const existingValue = values.filter((value) =>
      (value.term ? value.term.toLowerCase() : "") === term.toLowerCase())

    // If not, save the value to Firebase, then set loading to false
    // and generate their submitted value as the response.
    if (existingValue.length === 0) {
      db.ref('values').push({
        term,
      }).then(ref => {
        refKey = ref.key;
        db.ref('values/' + refKey).child("responses").set({
          [refKey] : {
            term: term,
            id: refKey,
            count: 1,
         }
        })
      }).then(_ => {
          handlePreviousResponse_NewValue(term, values, responseId, refKey);
      }).then(_ => {
          generateResponse(term, refKey, dispatch);
      })
    } else {
      
      handlePreviousResponse_ExistingValue(term, values, responseId, existingValue[0]["id"])
        .then(({ term, id}) => {
          generateResponse(term, id, dispatch);
        })
      
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

export const onInputChange = value => {
  return dispatch => {
    dispatch({
      type: types.HANDLE_INPUT_CHANGE,
      payload: value,
    })
  }
}
