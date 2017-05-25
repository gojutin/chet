import firebase from 'firebase';
import * as types from './types';
import randomID from "random-id";
import { login } from './index';
import { fetchPhrases } from './index';
const db = firebase.database();


export const updateSettings = (id, val) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
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

export const toggleBabyChetMode = (babyChetMode, dbRef) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			if ( babyChetMode ) {
				dispatch({
					type: types.BABY_CHET_MODE,
					payload: false,
				})
				resolve("values")
			} else {
				dispatch({
					type: types.BABY_CHET_MODE,
					payload: true,
				})
				resolve(dbRef)
			}
			dispatch({type: types.CLEAR_CONVERSATION})
			dispatch({type: types.CLEAR_RESPONSE})
		})
	}
}

export const handleBabyChet = (uid, dispatch) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			if (!uid) {
				return resolve(false);
			}

			let newProfile;

			// Check to see if the user already has a baby chet
			db.ref("profiles").once("value", snap => {
				let existingProfile;
				let existingProfileId;

				snap.forEach((snap) => {
					if (snap.val().uid === uid) {
						existingProfile = snap.val();
						existingProfileId = snap.key;
					}
				})

				console.log("existing profile", existingProfile)

				if (!existingProfile) {
					// if the user does not have a baby Chet, create a new one. 
					const randomId = randomID();
					const valuesId = "phrases_" + randomId;
					const chatId = "chats_" + randomId;
					newProfile = {
						uid,
						babyChetPhrasesId: valuesId,
						babyChetChatId: chatId,
						babyChetName: "my chatbot",
						babyChetColor: "#ffbb33",
						allowChet: true,
						allowWipe: true,
						allowLogout: true,
						allowEditProfile: true,
						allowDelete: true,
						pin: "",
						babyChetMode: false,
						chatCount: 0,
					}
					db.ref("profiles").push(newProfile)
						.then((ref) => {
							dispatch({
								type: types.UPDATE_PROFILE,
								payload: Object.assign({}, newProfile, {id: ref.key, babyChetMode: false} )
							})
						})
					resolve(newProfile);
				} else if (existingProfile) {
					dispatch({
						type: types.UPDATE_PROFILE,
						payload: Object.assign({}, existingProfile, {id: existingProfileId} )
					})

					

					resolve(existingProfile);
				}
			})
	  })
	}
}

export const wipeBabyChetsMind = (babyChetPhrasesId, babyChetChatId, uid) => {
	return dispatch => {
		db.ref(babyChetPhrasesId).remove()
			.then(() => {
				db.ref(babyChetChatId).remove()
					.then(() => {
							dispatch({
								type: types.CLEAR_RESPONSE
							})
						})		
			}).catch((err) => alert(err.message ? err.message : err))
		}
	}

