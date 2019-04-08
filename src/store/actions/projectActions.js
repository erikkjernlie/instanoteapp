export const createProject = (project) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        dispatch({ type: 'UPDATE_PRIVATE_PUBLIC_REQUEST' });

        const firestore = getFirestore(); // reference to firestore
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project: project })
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err });
        }
        )
        //same: dispatch({ type: 'CREATE_PROJECT', project})
    }
};


export const setPassword = (password, urlName) => {
        console.log(password, urlName)

        
return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: 'UPDATED_PASSWORD_REQUEST'})

        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const profile = getState().firebase.profile;
        // in case not logged in
        const usersRef = firestore.collection('lists').doc(urlName).update({
            password: password
        }).then(() => {
            dispatch({ type: 'UPDATED_PASSWORD_SUCCESS'})
        }).catch((err) => {
                    dispatch({ type: 'UPDATED_PASSWORD_FAIL', err });
                    });

       
    }
}

















export const getListsWithInformation = () => {

    // DISPATCH ACTION - load everything here
    // 1. jeg henter ting. 2. Det er ferdig hentet. 3. det faila

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'FETCH_USER_DATA_REQUEST' });
        let data_list = []
        const firestore = getFirestore(); // reference to firestore
        if (getState().firebase.auth.uid) {
            const authorId = getState().firebase.auth.uid;
            var docRef = firestore.collection('users').doc(authorId);
            var lists = []

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    lists = doc.data().lists;
                    if (lists.length === 0) {
                    dispatch({ type: 'FETCH_USER_DATA_EMPTY_SUCCESS' })
                    }
                    for (let i = 0; i < lists.length; i++) {
                        let list = lists[i];

                        firestore.collection('lists').doc(list).get().then(function (doc) {
                            if (doc.exists) {

                                let listData = doc.data();
                                
                                data_list.push(listData);
                                if (i === (lists.length - 1)) {
                                    dispatch({ type: 'FETCH_USER_DATA_SUCCESS', data_list })
                                    
                                }
                            } else {
                                console.log("Document: No such document!");
                            }
                        })
                    }
                } else {
                    console.log("getLists: No such document!");
                }
            }).catch(function (error) {
            }).then(() => {
                

            });
        }

    }
};



export const getLists = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to firestore
        if (getState().firebase.auth.uid) {
            const authorId = getState().firebase.auth.uid;
            var docRef = firestore.collection('users').doc(authorId);
            var lists = []
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    lists = doc.data().lists;

                } else {
                    // doc.data() will be undefined in this case
                    console.log("getLists: No such document!");
                }
            }).catch(function (error) {
                console.log("getLists: Error getting document:", error);
            }).then(() => {
                console.log('HERE IS THE LIST')
                dispatch({ type: 'GET_LISTS', lists: lists }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS
                //.then( for each list, get list from other part)
                // getList(list)
            });
        }

    }
};

export const getList = (list) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to firestore
        if (list.urlName) {
            var listData = {}

            firestore.collection('lists').doc(list.urlName).onSnapshot(function (doc) {
                if (doc.exists) {
                    listData = doc.data();
                    dispatch({ type: 'GET_LIST', listData: listData }) // MAKE SOMETHING HERE SO I CAN GET THE LISTS CORRESPONDING TO A USERS

                } else {
                    // doc.data() will be undefined in this case
                    console.log("getList: No such document!");
                    dispatch({ type: 'GET_LIST_FAILURE' })
                }
            });
        }

    }
};



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
                            firestore.collection('lists').doc(list.listName).collection('messages').doc().set({
                                createdBy: 'Instanote',
                                time: new Date(),
                                message: 'Chat here',
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
                            goals: goals,
                            deleted: deleted,
                            madeBy: authorId,
                            public: true,
                            createdOn: new Date(),
                            password: "",
                        }).then(() => {
                            firestore.collection('lists').doc(list.listName).collection('messages').doc().set({
                                createdBy: 'Instanote',
                                time: new Date(),
                                message: 'Chat here',
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


export function makeListPrivateAndPublic(name, newValue, key, mounting) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        dispatch({ type: 'UPDATE_PRIVATE_PUBLIC_REQUEST', key: key });
        const firestore = getFirestore(); // reference to firestore
        const profile = getState().firebase.profile;
        // in case not logged in
        if (profile.isEmpty === false) {
            const docRef = firestore.collection('lists').doc(name);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    // do stuff with the data
                    let publicValue = doc.data().public
                    console.log(publicValue)
                    if (mounting) {
                        console.log('you are mounting')
                        dispatch({ type: 'UPDATE_PRIVATE_PUBLIC_SUCCESS', payload: publicValue, key: key })
                    } else {
                        console.log('you are notmounting')

                        firestore.collection('lists').doc(name).update({
                            public: !publicValue,
                        }).then(() => {
                            dispatch({
                                type: 'UPDATE_PRIVATE_PUBLIC_SUCCESS', payload: !publicValue,
                                key: key
                            });
                        }).catch(function (error) {
                            dispatch({ type: 'UPDATE_PRIVATE_PUBLIC_FAILURE', error });
                        });
                    }

                }
            });
        } else {
            console.log("list does not exists")
            // dispatch something here as well?
        }
    }
}





export const addItem = (information) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const docRef = firestore.collection('lists').doc(information.urlName);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let goals2 = doc.data().goals;
                goals2.push(information.item)
                firestore.collection('lists').doc(information.urlName).update({
                    goals: goals2
                }).then(() => {
                    dispatch({ type: 'ADD_ITEM', information: information });
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


export const deleteItem = (information) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const docRef = firestore.collection('lists').doc(information.urlName);
        docRef.get().then(function (doc) {
            if (doc.exists) {

                let goals2 = doc.data().goals;
                var index = goals2.indexOf(information.inputText);
                // SPLICE
                if (index > -1) {
                    goals2.splice(index, 1);
                }
                let deleted2 = doc.data().deleted;
                deleted2.push(information.inputText)
                firestore.collection('lists').doc(information.urlName).update({
                    goals: goals2,
                    deleted: deleted2
                }).then(() => {
                    dispatch({ type: 'DELETE_ITEM', information: information });
                })

            } else {
                // doc.data() will be undefined in this case
                console.log("Document: No such document!");
            }
        }).catch(function (error) {
            console.log("Document: Error getting document:", error);
        })
    }
}

export const recoverItem = (information) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const docRef = firestore.collection('lists').doc(information.urlName);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let goals2 = doc.data().goals;
                let deleted2 = doc.data().deleted;
                goals2.push(information.inputText);
                var index = deleted2.indexOf(information.inputText);
                if (index > -1) {
                    deleted2.splice(index, 1);
                }
                firestore.collection('lists').doc(information.urlName).update({
                    goals: goals2,
                    deleted: deleted2
                }).then(() => {
                    dispatch({ type: 'RECOVERED_ITEM', information: information });
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("Document: No such document!");
            }
        }).catch(function (error) {
            console.log("Document: Error getting document:", error);
        })
    }
}

export const updateItem = (information) => {
    // returning a function, dispatch en action
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore(); // reference to firestore
        const docRef = firestore.collection('lists').doc(information.urlName);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let goals2 = doc.data().goals;
                var index = goals2.indexOf(information.oldText);
                if (index > -1) {
                    goals2[index] = information.inputText;
                }
                firestore.collection('lists').doc(information.urlName).update({
                    goals: goals2
                }).then(() => {
                    dispatch({ type: 'UPDATE_ITEM', information: information });
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("Document: No such document!");
            }
        }).catch(function (error) {
            console.log("Document: Error getting document:", error);
        })
    }
}