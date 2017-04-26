import firebase from 'firebase';

const db = firebase.database();

export const handlePrevResponse = (term, values, responseId, refKey) => {
  return new Promise((resolve, reject) => {
    if (responseId) {
      // if there is a previous response, then get the value of the responseId
      // and see if any of it's responses contains the inputValue
      const previousResponseValue = values.filter(({ id }) => id === responseId)[0] ;
      const responses = previousResponseValue["responses"] || false;
      const responseValue = responses ? responses.find(value =>
        value.id === refKey) : false;

      if (!responseValue) {
        // if there is no response value, add the input value 
        // to the previous response value's responses array
        db.ref('values/' + responseId).child("responses").child(refKey).set({
          term: term,
          id: refKey,
          count: 1,
        })
      } else {
        const prevCount = responses.find(value => value.id === refKey)["count"]
        db.ref('values/' + responseId).child("responses").child(refKey).update({ "count": prevCount + 1 })
      }
    } else {
        db.ref('values/' + refKey).child("responses").child(refKey).set({
          term: term,
          id: refKey,
          count: 1,
        })
    }
    resolve();
  })
}