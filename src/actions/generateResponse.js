import * as types from './types';
import { saveToConversation } from './index';


const saveSlices = (slices, dispatch) => {
  return dispatch({
    type: types.SAVE_SLICES,
    payload: slices,
  })
}

export const generateResponse = (values, term, refKey, dispatch, dbConvoId) => {

  // var i = -1;
  let matched;
  let matchedTo;
  let strength;
  let responseChoiceCount;
  let responseCount;
  const findBestMatch = () => {

    const exactMatch = values.filter(value => 
      value.term.toLowerCase() === term.toLowerCase()
        || 
      value.term.toLowerCase() === term.split("").splice(1, -1).join("").toLowerCase()
    );

    if (exactMatch.length > 0 ) {
      matched = term;
      strength = 100;
      saveSlices([], dispatch);
      return exactMatch[0];
    }

    const stringToArray = term.toLowerCase().split("");
      const len = stringToArray.length;
      let i = 0;
      
      let slicesArray = [];
      let finArr = [];
      let slice;
      while (i < len) {
        var o = 0;
        while( o < len) {
          slice = stringToArray.slice(i, len - o).join("");
          slicesArray.push(slice);
          o += 1;
        }
        i += 1;
      }
      saveSlices(slicesArray, dispatch);

      let finalSlices = [];
      slicesArray.sort((a,b) => b.length - a.length);
       slicesArray.map(slice => {
        return values.map(val => {
          if (val.term.toLowerCase().includes(slice) ){
            finalSlices.push(slice);
            return finArr.push(val);
          }
          return false;  
        })
      })

      const sortedSlices = finalSlices.sort((a,b) => b.length - a.length);
      matched = sortedSlices[0]
      matchedTo =  finArr[0] ? finArr[0]["term"]: "nothing"
      strength = sortedSlices[0] ? Math.floor(sortedSlices[0].length / term.length * 100): 0;
     
      return finArr[0];
        
    }

    const finalMatch = findBestMatch();

    responseChoiceCount = finalMatch ? finalMatch.responses.length : 0;
    // now that we have the closest match value, we sort it's responses by count
    // and determine which response to generate
    const finalResponse = () => {
      const sortedResponses = finalMatch && finalMatch.responses ? finalMatch.responses.sort((a, b) => b.count - a.count): false;
      if (!sortedResponses) {
        return { term, id: refKey}
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

    const finalResp = finalResponse();
    responseCount = finalResp.count;

    // Now we dispatch all the actions to generate the response

     dispatch({
      type: types.GENERATE_RESPONSE,
      payload: {
        userValue: term,
        term: finalResp["term"],
        id: finalResp["id"],
        phrases: values.length,
        matched,
        matchedTo,
        strength,
        responseCount,
        responseChoiceCount,
      },
    });

    dispatch({
      type: types.STOP_DELAY,
    });
     window.setTimeout(() => {
      dispatch({
        type: types.START_DELAY,
      })
    }, 1000)

    window.setTimeout(() => {
      dispatch({
        type: types.LOADING,
        payload: false,
      });
    }, 250)

    

   
    dispatch({ type: types.START_TYPING });
    
    dispatch({
      type: types.HANDLE_INPUT_CHANGE,
      payload: "",
    });

    
   // Save to the conversation
    saveToConversation({
      userSays: {
        id: refKey,
        term,
      },
      chetSays: {
        id: finalResp["id"],
        term: finalResp["term"],
      }
    }, dbConvoId)   
}
