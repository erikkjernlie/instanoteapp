const initState = {
    data: {},
    messages: [],

}

const newListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_LIST':
            console.log('created list', action.list)
            return {
                ...state,
                listError: null
            }
        case 'CREATE_LIST_ERROR':
            console.log('created list error', action.err);
            return {
                ...state,
                listError: 'Failed to create list'
            }
        case 'CREATE_LIST_ALREADY_EXIST':
            console.log('list already exists', action.list)
            return {
                ...state,
                listError: 'A list with this name already exists.'
            }
        default:
            return state;
    }
}

export default newListReducer