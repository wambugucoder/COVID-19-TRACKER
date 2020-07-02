import {GET_COVID_DATA, LOADING_DATA} from '../action/Types';

const INITIAL_STATE = {
    isLoading:false,
    isRetrieved:false,
    covid:[]
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COVID_DATA:
            return {...state,
            isRetrieved:true,
            isLoading:false,
            covid:action.payload
            }
            case LOADING_DATA:
            return {...state,
            isLoading:true,
            
            }
        default:
            return state
    }
}