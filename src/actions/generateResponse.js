import * as types from './types';
import { saveToConversation } from './index';


const saveSlices = (slices, dispatch) => {
  return dispatch({
    type: types.SAVE_SLICES,
    payload: slices,
  })
}
export const generateResponse = (values, term, refKey, dispatch) => {
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
      // console.info(`Match: ${term}`);
      // console.info(`Match Strength: 100%`);
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
      matchedTo = finArr[0]["term"]
      strength = Math.floor(sortedSlices[0].length / term.length * 100);
     
      // console.info(`Match: Found "${sortedSlices[0]}" in "${finArr[0]["term"]}"`);
      // console.info("Match Strength: " + Math.floor(sortedSlices[0].length / term.length * 100) + "%");
      return finArr[0];
        
    }


  
  

  // // this is a recursive function that does the heavy lifting
  // // of generating the most relevant response 
  // const findMatch = () => {
  //   var i = -1

  //   // const inputValueSplitByWord = term.toLowerCase().split(" ");
  //   // const wordSlice = inputValueSplitByWord.slice(0, i).join(" ");

  //   const inputValueSplitByChar = term.toLowerCase().split("");
  //   const charSlice = inputValueSplitByChar.slice(0, i).join("");

  //   // Check to see if there is an exact match of the term or
  //   // or a match of the term minus the last character
  //   // that way 'hi!' would also get a match with 'hi'
  //   const exactMatch = values.filter(value =>
  //     value.term.toLowerCase() === term.toLowerCase() 
  //       || 
  //     value.term.toLowerCase() === term.split("").splice(1, -1).join("").toLowerCase()
  //   );

  //   // const matchedByWord = values.filter(value =>
  //   //   value.term.toLowerCase() === wordSlice
  //   // );

  //   const matchedByChar = values.filter(value =>
  //     value.term.toLowerCase().includes(charSlice)
  //   );

  //   if (exactMatch.length > 0) {
  //     // first option is an exact match of the inputValue with an existing value
  //     console.info("Match Strength- 100%")
  //     // console.log("best match", bestMatch[0])
  //     return exactMatch[0];

  //   } 
  //   // else if (matchedByWord.length > 0 && wordSlice !== "") {
  //   //   // second option is to check the inputValue against all values while removing
  //   //   // one word from the end of the inputValue at a time
  //   //   // i.e. "How are you?", "How are", "How" ...
  //   //   console.log(`Matched By Word. Found "${wordSlice}" in "${matchedByWord[0]["term"]}"`)
  //   //   console.info("Match Strength- " + Math.floor(charSlice.length / term.length * 100) + "%")
  //   //   return matchedByWord[0];

  //   // } 
    
  //   else if (matchedByChar.length > 0) {
  //     // third option is to check the inputValue against all values while removing
  //     // one character from the end of the inputValue at a time
  //     // i.e. "Hi there", "Hi ther", "Hi the", "Hi th" ...
  //     console.log(`Matched By character set. Found "${charSlice}" in "${matchedByChar[0]["term"]}"`)
  //     console.info("Match Strength- " + Math.floor(charSlice.length / term.length * 100) + "%")
  //     return matchedByChar[0];

  //   } else if (charSlice.length === 0) {

  //     // third and final option is a random value
  //     const randomIndex = Math.floor(Math.random() * values.length);
  //     const randomValue = values[randomIndex];
  //     console.log("Match Strength- 0%")
  //     console.log("random match", randomValue)
  //     return randomValue;

  //   } else {

  //     i -= 1
  //     return findMatch();
  //   }
  // }

    const finalMatch = findBestMatch();

    responseChoiceCount = finalMatch.responses ? finalMatch.responses.length : 0;
    // now that we have the closest match value, we sort it's responses by count
    // and determine which response to generate
    const finalResponse = () => {
      const sortedResponses = finalMatch && finalMatch.responses ? finalMatch.responses.sort((a, b) => b.count - a.count): false;
      if (!sortedResponses) {
        return { term, id: refKey}
    } else {
        
        if (sortedResponses.length === 1) {
            return sortedResponses[0];
        } else if (sortedResponses.length < 3) {
            return sortedResponses[1];
        } else if (sortedResponses.length >=3 && sortedResponses.length < 7  ) {
            const randomIndex = Math.floor(Math.random() * 3)
            return sortedResponses[randomIndex >= 0 ? randomIndex : 0];
        } else if (sortedResponses.length >=7 ) {
            const randomIndex = Math.floor(Math.random() * 8)
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

    // console.info(`Chet knows ${values.length} phrases.`)

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

    dispatch({
      type: types.LOADING,
      payload: false,
    });

   
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
    })
   
}