import firebase from 'firebase';
import * as types from './types';
import randomID from "random-id";

const db = firebase.database();

export const updateSettings = (id, val) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch({
				type: types.UPDATE_PROFILE,
				payload: val,
			})
			db.ref("profiles").child(id).update(val)
			.then(() => {
				dispatch({
					type: types.UPDATE_PROFILE,
					payload: val,
				})
				resolve();
			})
			.catch(() => {
				reject();
			})
		})
	}	
}

export const toggleBabyChetMode = (babyChetMode, babyChetPhrases) => {
	return dispatch => {
	//	return new Promise((resolve, reject) => {
			if ( babyChetMode ) {
				dispatch({
					type: types.BABY_CHET_MODE,
					payload: false,
				})
			//	resolve("phrases")
			} else {

				dispatch({
					type: types.BABY_CHET_MODE,
					payload: true,
				})
			//	resolve(babyChetPhrases)
			}
			dispatch({type: types.CLEAR_CHAT})
			dispatch({type: types.CLEAR_RESPONSE})
//		})
	}
}

export const handleBabyChet = (uid, dispatch) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			if (!uid) {
				return resolve(false);
			}

			// Check to see if the user already has a baby chet
			db.ref("profiles").once("value", snap => {
				let profile;
				let profileId;

				snap.forEach((snap) => {
					if (snap.val().uid === uid) {
						profile = snap.val();
						profileId = snap.key;
					}
				})

				if (!profile) {
					// if the user does not have a baby Chet, create a new one. 
					const randomId = randomID();
					const phrasesId = "phrases_" + randomId;
					profile = {
						uid,
						babyChetPhrasesId: phrasesId,
						babyChetName: "my chatbot",
						babyChetColor: "#ffbb33",
						allowChet: true,
						allowLogout: true,
						allowEditProfile: true,
						pin: "",
						babyChetMode: false,
					}

					dispatch({
						type: types.UPDATE_PROFILE,
						payload: Object.assign({}, profile, {id: uid} )
					})

					db.ref("profiles/" + profile.uid).set(profile)

				} else if (profile) {
					dispatch({
						type: types.UPDATE_PROFILE,
						payload: Object.assign({}, profile, {id: profileId} )
					})
				}
				resolve(profile);
			})
	  })
	}
}

export const wipeBabyChetsMind = (babyChetPhrasesId, uid) => {
	return dispatch => {
		dispatch({type: types.CLEAR_RESPONSE})	
		dispatch({type: types.CLEAR_CHAT})
		db.ref(babyChetPhrasesId).remove()
			.catch((err) => alert(err.message ? err.message : err))
		}
	}

