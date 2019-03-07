import authReducer from './authReducer'
import projectReducer from './projectReducer'
import chatReducer from './chatReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

// auth and project property
const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    chat: chatReducer,
})

export default rootReducer