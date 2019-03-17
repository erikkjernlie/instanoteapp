
export const sendMessage = (message, time, createdBy, uid, urlName, messages) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const docRef = firestore.collection('lists').doc(urlName).collection('messages');
        console.log("UID", uid, createdBy)
        console.log("......")
        console.log("......")
        console.log("......")
        console.log("......")
        if (uid !== undefined) {
            firestore.collection('lists').doc(urlName).collection('messages').doc().set({
                message: message,
                time: time,
                createdBy: createdBy,
                uid: uid
            }).then(() => {
                console.log("Added message to firestore");

            })
        } else {
            firestore.collection('lists').doc(urlName).collection('messages').doc().set({
                message: message,
                time: time,
                createdBy: createdBy,
                uid: "0000"
            }).then(() => {
                console.log("Added message to firestore");
            })
        }
    }
}


export const joinChat = (chat) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'JOIN_CHAT_REQUEST' });
        const firestore = getFirestore(); // reference to firestore
        let messages = [];
        let newMessages = []

        console.log("SNAPSHOT CHANGES")
        const docRef = firestore.collection('lists').doc(chat.urlName).collection('messages').orderBy("time", "asc");
        docRef.onSnapshot(function (querySnapshot) {
            querySnapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    // change.doc here is new a new document
                    newMessages.push(change.doc.data());
                    console.log("DOC CHANGES!!!!!", change.doc.data())
                    dispatch({ type: 'NEW_MESSAGE', payload: change.doc.data() })
                    // THIS FOR EACH IS THE REASON FOR SO MANY
                    /*
                   docRef.get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                // doc.data() is never undefined for query doc snapshots
                                newMessages.push(doc.data());
                            });

                            
                            dispatch({ type: 'JOIN_CHAT_SUCCESS', payload: newMessages }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS
                        })
                        */
                }

            })

            // dispatch({ type: 'JOIN_CHAT_SUCCESS', payload: newMessages })
        })



        dispatch({ type: 'JOIN_CHAT_SUCCESS', payload: newMessages }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS

        /*
        docRef.get()
            .then((query) => {
                // if messages exists
                if (query.size > 0) {
                    docRef.get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                // doc.data() is never undefined for query doc snapshots
                                messages.push(doc.data());
                            });
                            dispatch({ type: 'JOIN_CHAT_SUCCESS', payload: messages }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS
                        }).then(() => {

                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });


                }

            })
    */

    }
}


export const subToChat = (chat) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('subToChat', chat);

        const firestore = getFirestore(); // reference to firestore
        if (chat.urlName) {
            var data = {}

            firestore.collection('chat').doc(chat.urlName).onSnapshot(function (doc) {
                if (doc.exists) {
                    data = doc.data();

                    console.log('Data', data)
                    dispatch({ type: 'GET_CHAT', payload: data }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS

                } else {
                    // doc.data() will be undefined in this case
                    console.log("getList: No such document!");
                }
            });
        }

    }
}