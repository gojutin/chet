import firebase from 'firebase';
import { handlePrevResponse } from './response';
import { generateResponse } from './response';
import * as types from './types';

const db = firebase.database();

export const goChet = (term, values, responseId, dbId, dbConvoId) => {

    // Set loading to true so that we can show the spinner
    return dispatch => {
        console.time("Total Time");
          dispatch({
            type: types.HANDLE_INPUT_ERROR,
            payload: "",
          })
          dispatch({
            type: types.LOADING,
            payload: true,
          })

        dispatch({ type: types.STOP_TYPING })

        // Save the key of the new value at the top of the function 
        //so that it can be referenced outside of the function
        let refKey;

        // Check if this value has already been submitted.
        const existingValue = values.filter((value) => value.term === term );

        if (existingValue.length === 0) {
            db.ref(dbId).push({
                term,
            }).then(ref => {
                refKey = ref.key;
                db.ref(dbId + '/' + ref.key).child("responses").set({
                    [refKey]: {
                        term: term,
                        id: refKey,
                        count: 1,
                    }
                })
            }).then(_ => {
                handlePrevResponse(term, values, responseId, refKey, dbId)
                    .then((valKey) => {
                        generateResponse(values, term, valKey, dispatch, dbConvoId);
                    })
            })
        } else {

            handlePrevResponse(term, values, responseId, existingValue[0]["id"], dbId)
                .then((valKey) => {
                    generateResponse(values, term, valKey, dispatch, dbConvoId);
                })
        }
        console.timeEnd("Total Time");
    }
    
}