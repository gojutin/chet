import firebase from 'firebase';
import { handlePrevResponse } from './handlePrevResponse';
import { generateResponse } from './generateResponse';
import * as types from './types';

const db = firebase.database();

export const goChet = (term, values, responseId) => {

    // Set loading to true so that we can show the spinner
    return dispatch => {
        console.time("Total Time");

        dispatch({
            type: types.LOADING,
            payload: true,
        })
        dispatch({
            type: types.START_TYPING,
            payload: -1,
        })

        // Save the key of the new value at the top of the function 
        //so that it can be referenced outside of the function
        let refKey;

        // Check if this value has already been submitted.
        const existingValue = values.filter((value) =>
            (value.term ? value.term.toLowerCase() : "") === term.toLowerCase())

        if (existingValue.length === 0) {
            db.ref('values').push({
                term,
            }).then(ref => {
                refKey = ref.key;
                db.ref('values/' + ref.key).child("responses").set({
                    [refKey]: {
                        term: term,
                        id: refKey,
                        count: 1,
                    }
                })
            }).then(_ => {
                handlePrevResponse(term, values, responseId, refKey)
                    .then(() => {
                        generateResponse(values, term, refKey, dispatch);
                    })
            })
        } else {

            handlePrevResponse(term, values, responseId, existingValue[0]["id"])
                .then(() => {
                    generateResponse(values, term, refKey, dispatch);
                })
        }
        console.timeEnd("Total Time")
    }
    
}