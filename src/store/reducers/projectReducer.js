const initState = {
    projects: [
        { id: '1', title: 'test1', content: 'blah' },
        { id: '2', title: 'test2', content: 'blah' },
        { id: '3 ', title: 'test3', content: 'blah' },
    ],
    list: [],
    isFetchingUpdate: false,
    listData: '',
    listCreatedError: '',

}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project)
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
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
            return state;
        case 'CREATE_LIST_ALREADY_EXIST':
            console.log('list already exists', action.list)
            return {
                ...state,
                listError: 'failed to create list because a list already exists'
            }
        case 'GET_LISTS':
            console.log('lists are here', action.lists)
            return {
                ...state,
                listError: null,
                lists: action.lists
            }
        case 'GET_LIST':
            console.log('get list action')
            console.log('INSIDE HERE')
            console.log(action.listData)
            return {
                ...state,
                listError: null,
                listData: action.listData,
                listCreatedError: '',
            }
        case 'GET_LIST_FAILURE':
            return {
                ...state,
                listCreatedError: 'List does not exist'

            }
        case 'ADD_ITEM':
            console.log('add item')
            console.log(action)
            return {
                ...state,
                item: action.item,
                urlName: action.urlName
            }
        case 'DELETE_ITEM':
            console.log('delete item')
            console.log(action)
            return {
                ...state,
                item: action.item,
                urlName: action.urlName,
            }
        case 'RECOVERED_ITEM':
            console.log('recovered item');
            return {
                ...state,
                item: action.item,
                urlName: action.urlName
            }
        case 'UPDATE_ITEM':
            console.log('update item')
            return {
                ...state,
                item: action.item,
            }
        case 'UPDATE_PRIVATE_PUBLIC_LIST':
            return {
                ...state,
                payload: action.payload
            }
        case 'CREATE_LIST_ALREADY_EXIST_PRIVATE_PUBLIC':
            return {
                ...state,
            }
        case 'FETCH_USER_DATA_REQUEST':
            return {
                ...state,
                isFetching: true,
            }
        case 'FETCH_USER_DATA_SUCCESS':
            console.log("FETCH_USER_DATA_SUCCESS", new Date())
            return {
                ...state,
                // ADD SOME DATA HERE
                isFetching: false,
                errorMessage: '',
                data_list: action.data_list
            }
        case 'FETCH_USER_DATA_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: 'Error fetching data'

            }
        case 'UPDATE_PRIVATE_PUBLIC_REQUEST':
            return {
                ...state,
                isFetchingUpdate: true,
                key: action.key
            }
        case 'UPDATE_PRIVATE_PUBLIC_SUCCESS':
            return {
                ...state,
                isFetchingUpdate: false,
                errorMessage: '',
                publicValue: action.payload,
                key: action.key
            }
        case 'UPDATE_PRIVATE_PUBLIC_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: 'Error fetching data',
            }
        case 'DATA_CHANGED':
            return {
                ...state,
                listData: action.payload
            }
        case 'UPDATED_PASSWORD_SUCCESS':
            return {
                ...state,
                errorMessage: '',
                isFetchingPassword: false,
            }
        case 'UPDATED_PASSWORD_REQUEST': 
            return {
                ...state,
                isFetchingPassword: true,
            }
        case 'UPDATED_PASSWORD_FAIL':
            return {
                ...state,
                errorMessage: action.err,
                isFetchingPassword: false,
            }
        case 'FETCH_USER_DATA_EMPTY_SUCCESS':
            return {
                ...state,
                noData: 'You have no data',
                isFetching: false,

            }
        default:
            return state;
    }
}

export default projectReducer