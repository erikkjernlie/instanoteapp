const initState = {
    data: {},
    messages: [],
   
}

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case 'JOIN_CHAT_REQUEST':
            return {
                ...state,
                requestingChat: true,
                joinChatFailureMessage: '',
            }
        case 'JOIN_CHAT_FAILURE':
            return {
                ...state,
                requestingChat: false,
                joinChatFailureMessage: 'Failed to join chat',
                
            }
        case 'JOIN_CHAT_SUCCESS':
            console.log("REDUCER", action.payload, state)
            return {
                ...state,
                requestingChat: true,
                joinChatFailureMessage: '',
                messages: action.payload,
            }
        case 'ADD_MESSAGE_REQUEST':
            return {
                ...state,
                requestingAddMessage: true,
                addMessageFailureMessage: '',
            }
        case 'NEW_MESSAGE':
            return {
                ...state,
                newMessage: action.payload
            }
        case 'ADD_MESSAGE_FAILURE':
            return {
                ...state,
                requestingAddMessage: false,
                addMessageFailureMessage: 'Failed to add message',
            }
        case 'ADD_MESSAGE_SUCCESS':
            return {
                ...state,
                requestingAddMessage: false,
                addMessageFailureMessage: '',
            }
        case 'GET_CHAT':
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state;
    }
}

export default chatReducer