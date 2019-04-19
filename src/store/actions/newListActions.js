
export const createList = (list) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const profile = getState().firebase.profile;
        // in case not logged in
        if (getState().firebase.profile.isEmpty) {
            const usersRef = firestore.collection('lists').doc(list.listName);
            console.log("USER IS NOT LOGGED IN")
            usersRef.get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        usersRef.onSnapshot((doc) => {
                            // do stuff with the data
                            console.log("list exists")
                            dispatch({ type: 'CREATE_LIST_ALREADY_EXIST' });
                        });
                    } else {
                        let goals = ['My first goal', 'My second goal - tap me to remove me'];
                        let deleted = ['My first recover'];
                        firestore.collection('lists').doc(list.listName).set({
                            name: list.listName,
                            goals: goals,
                            deleted: deleted,
                            madeBy: null,
                            public: true,
                            createdOn: new Date(),
                            password: "",
                        }).then(() => {
                            firestore.collection('lists').doc(list.listName).collection('goals').doc().set({
                                createdBy: 'Instanote',
                                time: new Date(),
                                text: 'My first thing to do',
                                uid: null,
                            }).then(() => {
                                    dispatch({ type: 'CREATE_LIST', list: list });
                            });
                            window.location.replace(list.listName)
                        }).catch((err) => {
                            dispatch({ type: 'CREATE_LIST_ERROR', err });
                        }
                        )
                    }
                });

        } else {
            let goals = ['My first goal', 'My second goal - tap me to remove me'];
            let deleted = ['My first recover'];
            const usersRef = firestore.collection('lists').doc(list.listName);
            console.log("USER IS LOGGED IN, GETS IN HERERE REI")
            console.log("USER IS LOGGED IN, GETS IN HERERE REI")
            console.log("USER IS LOGGED IN, GETS IN HERERE REI")
            console.log("USER IS LOGGED IN, GETS IN HERERE REI")
            console.log("USER IS LOGGED IN, GETS IN HERERE REI")
            console.log("USER IS LOGGED IN, GETS IN HERERE REI")


            usersRef.get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        usersRef.onSnapshot((doc) => {
                            // do stuff with the data
                            console.log("list exists")
                            dispatch({ type: 'CREATE_LIST_ALREADY_EXIST', list: list });
                        });
                    } else {
                        console.log("list does not exists")

                        const authorId = getState().firebase.auth.uid;
                        console.log(getState())
                        firestore.collection('lists').doc(list.listName).set({
                            name: list.listName,
                            madeBy: authorId,
                            public: true,
                            createdOn: new Date(),
                            password: "",
                        }).then(() => {
                            firestore.collection('lists').doc(list.listName).collection('goals').doc().set({
                                createdBy: 'Instanote',
                                time: new Date(),
                                text: 'My first goal',
                                uid: null
                            }).then(() => {
                                var docRef = firestore.collection('users').doc(authorId);
                                docRef.get().then(function (doc) {

                                    if (doc.exists) {
                                        console.log("00000000000000000000")
                                        // could have just set newList = doc.data().lists but tried to see if there was some mutant problems
                                        let newList = []
                                        for (let j = 0; j < doc.data().lists.length; j++) {
                                            newList.push(doc.data().lists[j])
                                        }
                                        newList.push(list.listName);
                                        firestore.collection('users').doc(authorId).update({
                                            lists: newList
                                        });
                                        dispatch({ type: 'CREATE_LIST', list: list });

                                    } else {
                                        console.log("111111111111111")

                                        // doc.data() will be undefined in this case
                                        console.log("No such document!");
                                    }
                                    dispatch({ type: 'CREATE_LIST', list: list });
                                });

                            }).then(() => {
                                window.location.replace(list.listName)

                            }).catch(function (error) {
                                console.log("Error getting document:", error);
                            });

                        }).catch((err) => {
                            dispatch({ type: 'CREATE_LIST_ERROR', err });
                        }
                        )
                    }
                });

        }
    }
}