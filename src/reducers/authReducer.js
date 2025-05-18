import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    CLEAR_ERRORS 
} from "../constants/User/authConstants";

const initialState = {
    loading: false,
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true };
            
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
            
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            
        case CLEAR_ERRORS:
            return { ...state, error: null };
            
        default:
            return state;
    }
};