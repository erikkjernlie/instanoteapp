export const signIn = (credentials) => {

    return (dispatch, getState, {getFirebase}) => {
        dispatch({ type: 'USER_REQUEST', payload: true });
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

// equal to a function without input, and it returns a function which takes in dispatch,getstate...
export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch( { type: 'SIGNOUT_SUCCESS'});
        });
    }
}
// getFirebase to sign up a database. firestore because of the data
export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({ type: 'USER_REQUEST', payload: true });
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log("SIGNING UP!!!!!")
        
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                lists: []
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })

    }
}