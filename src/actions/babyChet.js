import firebase from 'firebase';
import * as types from './types';
import randomID from "random-id";
const db = firebase.database();

export const saveDetails = (_db, name, color) => {
	return dispatch => {
		return new Promise((resolve, reject) => { 
			if (!name) {
				name="my chatbot"
			}
			if (!color) {
				color="#ffbb33"
			}
			const { id } = _db;
			db.ref("babyChets").child(id).update({ name, color })
			.then(() => {
				dispatch({
					type: types.UPDATE_DB,
					payload: Object.assign({}, _db, {name, color})
				})
				resolve();
			})
			.catch(() => {
				reject();
			})
		})
	}	
}

export const babyChet = (userId, babyChetMode) => {
	return dispatch => {
		return new Promise((resolve, reject) => {

			if (babyChetMode) {
				dispatch({
					type: types.RESET_DB,
				})
				dispatch({
					type: types.BABY_CHET_MODE,
					payload: false,
				})
				resolve({ valuesId: "values", convoId: "conversations" });
			} else if (!babyChetMode) {
				let newBabyChet;;
				db.ref("babyChets").once("value", snap => {
					let thisBabyChet;
					let thisBabyChetId;

					snap.forEach((val) => {
						if (val.val().userId === userId) {
							thisBabyChet = val.val();
							thisBabyChetId = val.key;
						}
					})

					if (!thisBabyChet) {
						const randomId = randomID();
						const valuesId = "values_" + randomId;
						const convoId = "conversations_" + randomId;
						newBabyChet = {
							userId: userId,
							valuesId,
							convoId,
							name: "my chatbot",
							color: "#ffbb33",
						}
						db.ref("babyChets").push(newBabyChet)
							.then((ref) => {
								dispatch({
									type: types.UPDATE_DB,
									payload: Object.assign({}, newBabyChet, {id: ref.key} )
								})
								dispatch({
									type: types.BABY_CHET_MODE,
									payload: true
								})
							})
						resolve(newBabyChet);
					} else if (thisBabyChet) {
						dispatch({
							type: types.UPDATE_DB,
							payload: Object.assign({}, thisBabyChet, {id: thisBabyChetId} )
						})
						dispatch({
							type: types.BABY_CHET_MODE,
							payload: true
						})
						resolve(thisBabyChet);
					}
				})
			}
			dispatch({
				type: types.CLEAR_RESPONSE,
			})
			dispatch({
				type: types.STOP_TYPING,
			})
		})
	}
}

export const wipeBabyChetsMind = (valuesId, convoId, uid) => {
	return dispatch => {
		db.ref(valuesId).remove()
			.then(() => {
				db.ref(convoId).remove()
					.then(() => {
							dispatch({
							type: types.UPDATE_DB,
								payload: {
									valuesId,
									convoId,
								}
							})
							dispatch({
								type: types.CLEAR_RESPONSE
							})
						})		
			}).catch((err) => alert(err.reason ? err.reason : err))
		}
	}
