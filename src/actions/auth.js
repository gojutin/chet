import firebase from 'firebase';
import * as types from './types';
import { handleBabyChet } from './index';
const db = firebase.database();

export const logout = () => {
  return dispatch => {
		return new Promise((resolve, reject) => {
			firebase.auth().signOut()
				.then(() => {resolve()})
				.catch(error => {
					resolve();
					console.log("Oops, something went wrong. Please try again.")
			});
		})
  }
}

export const login = (providerName) => {
  return dispatch => {
		return new Promise((resolve, reject )=> {
			dispatch({
				type: types.UPDATE_PROFILE,
				payload: {loggingIn: true},
			})

			let provider;
			switch(providerName) {
				case "facebook":
					provider = new firebase.auth.FacebookAuthProvider();
					break;
				case "google":
					provider = new firebase.auth.GoogleAuthProvider();
					break;
				case "twitter":
					provider = new firebase.auth.TwitterAuthProvider();
					break;
				case "github":
					provider = new firebase.auth.GithubAuthProvider();
					break;
				default:
					break;
			}
			firebase.auth().signInWithPopup(provider)
				.then((res) =>{
					dispatch({
						type: types.UPDATE_PROFILE,
						payload: {loggingIn: false},
					})
					resolve(res.user.uid)
				})
				.catch(err => {
					alert(err.message ? err.message : err)
					resolve(null);
					
				})
			})
    }
  }

	export const deleteUserAccount = (id) => {
		return dispatch => {
			const user = firebase.auth().currentUser;
				user.delete().then( _ =>  {
					dispatch({
						type: types.CLEAR_PROFILE,
					})
					dispatch({
						type: types.BABY_CHET_MODE,
						payload: false,
					})
					db.ref("profiles").child(id).remove();
				}, err => {
					console.log(err)
						alert(err.message)
				});
			}
		}


	export const authWatch = () => {
		return dispatch => {
			return new Promise((resolve, reject) => {
				firebase.auth().onAuthStateChanged( (user) => {
					if (user) {
						if (user != null) {
							let userInfo = {};
							user.providerData.forEach(profile => {
								userInfo = {
									provider: profile.providerId,
									uid: profile.uid,
									userName: profile.displayName,
									email: profile.email,
									photo: profile.photoURL,
								}
								dispatch({
									type: types.UPDATE_PROFILE,
									payload: {user: userInfo},
								})
								handleBabyChet(user.uid);
								resolve(user.uid);
							});
						}
					} else {
						dispatch({type: types.CLEAR_PROFILE})	
						resolve(false);				
					}
				});
			});
		}
	}



