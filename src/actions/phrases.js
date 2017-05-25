import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

export const fetchPhrases = (dbRef) => {
  console.log("DBREF", dbRef)
  return dispatch => {
    return new Promise((resolve, reject) => {
    db.ref(dbRef).orderByChild("value").on('value', snap => {
      let valuesArray = [];
      snap.forEach(value => {
        valuesArray.push({
          id: value.key,
          term: value.val().term,
          responses: value.val().responses ? Object.values(value.val().responses) : [],
        });
      });
      dispatch({
        type: types.FETCH_PHRASES,
        payload: valuesArray,
      });  

      // get stats

      if (dbRef !== "values") {

      const removeDuplicates = arr => {
        let i,
          len=arr.length,
          out=[],
          obj={};

        for (i=0;i<len;i++) {
          obj[arr[i]]=0;
        }
        for (i in obj) {
          out.push(i);
        }
        return out;
      };

      let wordsArr = [];
		  let wordCount;
			valuesArray.map(value => wordsArr.push(value.term));
		  const splitWords = wordsArr.join(" ").split(" ");
		  const dupsRemoved = removeDuplicates(splitWords);

      if (dupsRemoved.length < 2 && dupsRemoved[0] === "") {
        wordCount = 0;
      } else {
        wordCount = dupsRemoved.length;
      }

      const growthPercentage = ((wordCount / 20000)*100).toFixed(1)

      const phase = () => {
        if ( wordCount < 500 ) {
          return {
            phase: "baby",
            progress: 5,
            size: "",
          }
        } else if (wordCount < 2000) {
          return {
            phase: "toddler",
            size: "fa-2x",
          }
        } else if (wordCount < 3000) {
          return {
            phase: "kid",
            size: "fa-3x",
          }
        } else if (wordCount < 20000) {
          return {
            phase: "teenager",
            size: "fa-4x",
          }
        } else {
          return {
            phase: "all grown up",
            size: "fa-5x",
          }
			  }
		  }
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: {
          wordCount,
          growthPercentage,
          phrasesCount: valuesArray.length,
          phase: phase(),
          
        }
      })
      }
    })
    resolve();
    })  
  }
}


