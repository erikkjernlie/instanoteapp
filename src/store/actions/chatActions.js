
export const addMessage = (chatMessage) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const docRef = firestore.collection('chat').doc(chatMessage.name);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let newChatMessages = doc.data().messages;
                newChatMessages.push(chatMessage.message);
                firestore.collection('chat').doc(chatMessage.name).update({
                    messages: newChatMessages,
                    lastUpdate: new Date(),
                }).then(() => {
                    dispatch({ type: 'ADD_CHAT_MESSAGE', chatMessage: chatMessage });
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("getList: No such document!");
            }
        }).catch(function (error) {
            console.log("getLists: Error getting document:", error);
        })
    }
}

            
export const joinChat = (chat) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'JOIN_CHAT_REQUEST' });
        const firestore = getFirestore(); // reference to firestore
        console.log("CHAT", chat);

        const docRef = firestore.collection('chat').doc(chat.name);
        let messages;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                messages = doc.data().messages;
                console.log("MESSAGES", messages);
            } else {
                // doc.data() will be undefined in this case
                let startMessages = ['first message'];
                messages = startMessages;
                firestore.collection('chat').doc(chat.name).set({
                    messages: startMessages,
                
                }).then(() => {
                // MAYBE CREATE A CHAT HERE?
                    console.log('CREATED CHAT')
                })
            }
        }).catch(function (error) {
            console.log("getMessages: Error getting messages:", error);
            dispatch({ type: 'JOIN_CHAT_FAILURE', error });
        }).then(() => {
            dispatch({ type: 'JOIN_CHAT_SUCCESS', payload: messages }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS
            //.then( for each list, get list from other part)
            // getList(list)
        });
    }
}


export const subToChat = (chat) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('subToChat', chat);

        const firestore = getFirestore(); // reference to firestore
        if (chat.name) {
            var data = {}

            firestore.collection('chat').doc(chat.name).onSnapshot(function (doc) {
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