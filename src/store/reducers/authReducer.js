const initState = {
    authError: null,
    loadingUser: false,
    
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login failed',
                loadingUser: false
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null,
                loadingUser: false,
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null,
                loadingUser: false
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message,
                loadingUser: false
            }
        case 'USER_REQUEST':
            console.log("Want to do something with user");
            return {
                ...state,
                loadingUser: action.payload
            }
        
        default: 
            return state
    }
}

export default authReducer